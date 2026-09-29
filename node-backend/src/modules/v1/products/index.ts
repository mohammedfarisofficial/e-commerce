import { Router } from "express";
import { productControllers } from "./controllers";

const productRouter = Router();

productRouter.get("/", productControllers.getProducts);
productRouter.get("/categories", productControllers.getCategories);
productRouter.get("/:slug", productControllers.getProductBySlug);

export default productRouter;
