import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.route("/register").post(userController.registerUser);
userRouter.route("/verify-otp").post(userController.verifyOtp);
userRouter
  .route("/verify-forgot-password-otp")
  .post(userController.verifyForgotPasswordOtp);
userRouter.post("/resend-otp", userController.resendOtp);
userRouter.post("/login", userController.login);
userRouter.post("/refresh-token", userController.refreshToken);
userRouter.post("/forgot-password", userController.forgotPassword);
userRouter.post("/reset-password", userController.resetPassword);
userRouter.post("/logout", userController.logout);

userRouter.post("/logout", authMiddleware, userController.logoutByUserID);
userRouter.get("/profile", authMiddleware, userController.getProfile);
userRouter.put("/update-profile", authMiddleware, userController.updateProfile);

export default userRouter;
