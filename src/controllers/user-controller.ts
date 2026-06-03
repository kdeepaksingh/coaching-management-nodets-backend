import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import tokenModel from "../models/tokenModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const OTP_EXPIRY_MINUTES = 10;

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      roleType,
      profilePicture,
      gender,
      dateOfBirth,
      address,
      password,
    } = req.body;

    // Check Email
    const existingEmail = await userModel.findOne({
      email,
    });

    if (existingEmail) {
      res.status(400).json({
        success: false,
        message: "Email already registered",
      });
      return;
    }

    // Check Mobile
    const existingMobile = await userModel.findOne({
      mobileNumber,
    });

    if (existingMobile) {
      res.status(400).json({
        success: false,
        message: "Mobile number already registered",
      });
      return;
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await userModel.create({
      fullName,
      email,
      mobileNumber,
      roleType,
      profilePicture,
      gender,
      dateOfBirth,
      address,
      password: hashedPassword,

      isEmailVerified: false,
      isMobileVerified: false,
      isActive: true,
    });

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    // Save OTP
    await otpModel.create({
      email,
      mobileNumber,
      otp,
      purpose: "REGISTER",
      expiresAt,
    });

    // TODO
    // Send Email OTP Here
    console.log("OTP Registered:", otp);

    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify OTP.",
      data: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await otpModel.findOne({
      email,
      otp,
      purpose: "REGISTER",
    });

    if (!otpRecord) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
      return;
    }

    if (otpRecord.expiresAt.getTime() < Date.now()) {
      res.status(400).json({
        success: false,
        message: "OTP expired",
      });
      return;
    }

    await userModel.findOneAndUpdate(
      { email },
      {
        isEmailVerified: true,
      },
    );

    await otpModel.deleteMany({
      email,
      purpose: "REGISTER",
    });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    await otpModel.deleteMany({
      email,
      purpose: "REGISTER",
    });

    await otpModel.create({
      email,
      otp,
      purpose: "REGISTER",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    console.log("OTP:", otp);

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    if (!user.isEmailVerified) {
      res.status(400).json({
        success: false,
        message: "Email not verified",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.roleType,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    await tokenModel.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({
        message: "Refresh token required",
      });
      return;
    }

    const tokenDoc = await tokenModel.findOne({
      refreshToken,
    });

    if (!tokenDoc) {
      res.status(401).json({
        message: "Invalid refresh token",
      });
      return;
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as any;

    const accessToken = generateAccessToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

    res.status(200).json({
      accessToken,
    });
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    await otpModel.create({
      email,
      otp,
      purpose: "FORGOT_PASSWORD",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    console.log("Forgot OTP:", otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body;

    const otpRecord = await otpModel.findOne({
      email,
      otp,
      purpose: "FORGOT_PASSWORD",
    });

    if (!otpRecord) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
      return;
    }

    if (otpRecord.expiresAt.getTime() < Date.now()) {
      res.status(400).json({
        success: false,
        message: "OTP expired",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userModel.updateOne(
      { email },
      {
        password: hashedPassword,
      },
    );

    await otpModel.deleteMany({
      email,
      purpose: "FORGOT_PASSWORD",
    });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    await tokenModel.deleteOne({
      refreshToken,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userController = {
  registerUser,
  verifyOtp,
  resendOtp,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  logout,
};
