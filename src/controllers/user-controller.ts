import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET as string | undefined;
const OTP_EXPIRY_MINUTES = 10;
const emailOtpStore: { [email: string]: { otp: string; expiresAt: number } } =
  {};

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, mobileNo, password, verificationCode, role } =
      req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      mobileNo,
      password: hashedPassword,
      verificationCode,
      role: role || "user",
    });

    res
      .status(201)
      .json({ status: 201, message: "User registered successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const userController = {
  registerUser,
};
