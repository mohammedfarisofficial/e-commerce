import { Request, Response } from "express";
import mongoose from "mongoose";
import { asyncHandler, JSON200, JSON400 } from "../../../../utils";
import { CartRepository } from "../repository";
import Product from "../../products/models/product";

export const cartControllers = {
  getCart: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const cart = await CartRepository.findByUserId(userId);

    const items = cart?.items || [];
    const total = items.reduce((sum, item: any) => {
      const price = item.product?.price || item.price;
      return sum + price * item.quantity;
    }, 0);

    JSON200(res, {
      items: items.map((item: any) => ({
        productId: item.product?._id || item.product,
        name: item.product?.name || "",
        slug: item.product?.slug || "",
        image: item.product?.images?.[0] || "",
        price: item.product?.price || item.price,
        originalPrice: item.product?.originalPrice || item.price,
        quantity: item.quantity,
        stock: item.product?.stock || 0,
      })),
      total,
      itemCount: items.length,
    });
  }),

  addToCart: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { productId, quantity = 1, price } = req.body;

    if (!productId || price === undefined || price === null) {
      JSON400(res, "productId and price are required");
      return;
    }

    const product = await Product.findById(productId);
    if (!product || product.stock < quantity) {
      JSON400(res, "Product is out of stock or insufficient quantity");
      return;
    }

    await CartRepository.addItem(userId, productId, quantity, price);
    const cart = await CartRepository.findByUserId(userId);

    const items = cart?.items || [];
    const total = items.reduce((sum, item: any) => {
      const p = item.product?.price || item.price;
      return sum + p * item.quantity;
    }, 0);

    JSON200(res, {
      items: items.map((item: any) => ({
        productId: item.product?._id || item.product,
        name: item.product?.name || "",
        slug: item.product?.slug || "",
        image: item.product?.images?.[0] || "",
        price: item.product?.price || item.price,
        originalPrice: item.product?.originalPrice || item.price,
        quantity: item.quantity,
        stock: item.product?.stock || 0,
      })),
      total,
      itemCount: items.length,
    });
  }),

  updateQuantity: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      JSON400(res, "Quantity must be at least 1");
      return;
    }

    const product = await Product.findById(productId);
    if (!product || product.stock < quantity) {
      JSON400(res, "Product is out of stock or insufficient quantity");
      return;
    }

    await CartRepository.updateItemQuantity(userId, productId as string, quantity);
    const cart = await CartRepository.findByUserId(userId);

    const items = cart?.items || [];
    const total = items.reduce((sum, item: any) => {
      const p = item.product?.price || item.price;
      return sum + p * item.quantity;
    }, 0);

    JSON200(res, {
      items: items.map((item: any) => ({
        productId: item.product?._id || item.product,
        name: item.product?.name || "",
        slug: item.product?.slug || "",
        image: item.product?.images?.[0] || "",
        price: item.product?.price || item.price,
        originalPrice: item.product?.originalPrice || item.price,
        quantity: item.quantity,
        stock: item.product?.stock || 0,
      })),
      total,
      itemCount: items.length,
    });
  }),

  removeFromCart: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { productId } = req.params;

    await CartRepository.removeItem(userId, productId as string);
    const cart = await CartRepository.findByUserId(userId);

    const items = cart?.items || [];
    const total = items.reduce((sum, item: any) => {
      const p = item.product?.price || item.price;
      return sum + p * item.quantity;
    }, 0);

    JSON200(res, {
      items: items.map((item: any) => ({
        productId: item.product?._id || item.product,
        name: item.product?.name || "",
        slug: item.product?.slug || "",
        image: item.product?.images?.[0] || "",
        price: item.product?.price || item.price,
        originalPrice: item.product?.originalPrice || item.price,
        quantity: item.quantity,
        stock: item.product?.stock || 0,
      })),
      total,
      itemCount: items.length,
    });
  }),

  clearCart: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    await CartRepository.clearCart(userId);
    JSON200(res, { items: [], total: 0, itemCount: 0 });
  }),

  checkout: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const cart = await CartRepository.findByUserId(userId);

    if (!cart || cart.items.length === 0) {
      JSON400(res, "Cart is empty");
      return;
    }

    const staleItems = [];
    for (const item of cart.items) {
      const product = item.product as any;
      if (!product || product.stock < item.quantity) {
        staleItems.push({
          id: product?._id || item.product,
          name: product?.name || "Unknown Product",
          requested: item.quantity,
          available: product?.stock || 0
        });
      }
    }

    if (staleItems.length > 0) {
      res.status(400).json({ success: false, message: "Some items in your cart went out of stock. Please update your cart.", data: { staleItems } });
      return;
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      for (const item of cart.items) {
        const product = item.product as any;

        const updatedProduct = await Product.findOneAndUpdate(
          { _id: product._id, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } },
          { session, new: true }
        );

        if (!updatedProduct) {
          throw new Error(`Item ${product.name} went out of stock just now! Checkout failed cleanly.`);
        }
      }

      await CartRepository.clearCart(userId);

      await session.commitTransaction();
      session.endSession();

      JSON200(res, { message: "Checkout successful!" });
    } catch (err: any) {
      await session.abortTransaction();
      session.endSession();
      JSON400(res, err.message || "Checkout failed due to simultaneous stock changes");
    }
  }),
};
