import { Router } from "express";
import { userController } from "../controllers/user-controller.js";

const userRouter = Router();

userRouter.route("/register").post(userController.registerUser);

export default userRouter;
