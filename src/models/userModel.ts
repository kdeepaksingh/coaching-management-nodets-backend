import mongoose, { Schema } from "mongoose";
import type { IUser } from "../interfaces/user-interface.js";

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },

    roleType: {
      type: String,
      enum: ["admin", "teacher", "student", "parent"],
      required: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isMobileVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: Date,

    refreshToken: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser>("User", userSchema);
