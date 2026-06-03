import { Router } from "express";
import { userController } from "../controllers/user-controller.js";

const userRouter = Router();

userRouter.route("/register").post(userController.registerUser);
userRouter.route("/verify-otp").post(userController.verifyOtp);
userRouter.post("/resend-otp", userController.resendOtp);
userRouter.post("/login", userController.login);
userRouter.post("/refresh-token", userController.refreshToken);
userRouter.post("/forgot-password", userController.forgotPassword);
userRouter.post("/reset-password", userController.resetPassword);
userRouter.post("/logout", userController.logout);

export default userRouter;
