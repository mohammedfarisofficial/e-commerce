import { Router } from "express";
import authRouter from "./authentication";
import userRouter from "./users";
import productRouter from "./products";
import orderRouter from "./orders";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/users", userRouter);
v1Router.use("/products", productRouter);
v1Router.use("/orders", orderRouter);

export default v1Router;
