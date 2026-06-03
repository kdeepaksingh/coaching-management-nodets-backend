import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    email: String,
    mobileNumber: String,
    otp: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      enum: ["REGISTER", "FORGOT_PASSWORD", "VERIFY_MOBILE"],
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Otp", otpSchema);
