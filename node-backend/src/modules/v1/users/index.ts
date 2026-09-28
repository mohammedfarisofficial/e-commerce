import { Router } from "express";
import { userController } from "./controllers";
import { authenticate } from "../../../middlewares";

const userRouter = Router();

userRouter.get("/get-user", authenticate, userController.getUser);

export default userRouter;
