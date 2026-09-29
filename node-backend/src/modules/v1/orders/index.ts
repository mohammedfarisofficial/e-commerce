import { Router } from "express";
import { authenticate } from "../../../middlewares";
import { cartControllers } from "./controllers";

const orderRouter = Router();

orderRouter.get("/cart", authenticate, cartControllers.getCart);
orderRouter.post("/cart/add", authenticate, cartControllers.addToCart);
orderRouter.post("/cart/checkout", authenticate, cartControllers.checkout);
orderRouter.patch("/cart/:productId", authenticate, cartControllers.updateQuantity);
orderRouter.delete("/cart/:productId", authenticate, cartControllers.removeFromCart);
orderRouter.delete("/cart", authenticate, cartControllers.clearCart);

export default orderRouter;
