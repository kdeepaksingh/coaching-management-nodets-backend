import bcrypt from "bcryptjs";
import useragent from "useragent";
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import Session from "../models/sessionModel.js";

import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid password",
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

    const agent = useragent.parse(req.headers["user-agent"]);

    const browser = agent.toString();

    const deviceName =
      typeof req.headers["user-agent"] === "string"
        ? req.headers["user-agent"]
        : "Unknown";

    const ipAddress = req.ip || req.socket.remoteAddress || "Unknown";

    await Session.create({
      userId: user._id,
      refreshToken,
      deviceName,
      browser,
      ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "strict",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      accessToken,

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        roleType: user.roleType,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
      return;
    }

    const session = await Session.findOne({
      refreshToken,
    });

    if (!session) {
      res.status(401).json({
        success: false,
        message: "Invalid session",
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
      success: true,
      accessToken,
    });
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await Session.deleteOne({
        refreshToken,
      });
    }

    res.clearCookie("refreshToken");

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

export const logoutAllDevices = async (
  req: any,
  res: Response,
): Promise<void> => {
  try {
    await Session.deleteMany({
      userId: req.user.userId,
    });

    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logged out from all devices",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMySessions = async (req: any, res: Response): Promise<void> => {
  try {
    const sessions = await Session.find({
      userId: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// router.post(
//   "/login",
//   authController.login
// );

// router.post(
//   "/refresh-token",
//   authController.refreshToken
// );

// router.post(
//   "/logout",
//   protect,
//   authController.logout
// );

// router.post(
//   "/logout-all",
//   protect,
//   authController.logoutAllDevices
// );

// router.get(
//   "/sessions",
//   protect,
//   authController.getMySessions
// );
