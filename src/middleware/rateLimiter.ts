import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,

  message: "Too many login attempts",
});

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,

  max: 3,

  message: "Too many OTP requests",
});
