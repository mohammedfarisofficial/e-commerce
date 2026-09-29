import Cart from "../models/cart";
import type { CartDocument } from "../models/cart/types";
import { Types } from "mongoose";

export const CartRepository = {
  async findByUserId(userId: string): Promise<CartDocument | null> {
    return Cart.findOne({ user: new Types.ObjectId(userId) })
      .populate("items.product");
  },

  async addItem(userId: string, productId: string, quantity: number, price: number): Promise<CartDocument> {
    const cart = await Cart.findOne({ user: new Types.ObjectId(userId) });

    if (!cart) {
      return Cart.create({
        user: new Types.ObjectId(userId),
        items: [{ product: new Types.ObjectId(productId), quantity, price }],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: new Types.ObjectId(productId) as any,
        quantity,
        price,
      });
    }

    await cart.save();
    return cart;
  },

  async updateItemQuantity(userId: string, productId: string, quantity: number): Promise<CartDocument | null> {
    const cart = await Cart.findOne({ user: new Types.ObjectId(userId) });
    if (!cart) return null;

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) return null;

    item.quantity = quantity;
    await cart.save();
    return cart;
  },

  async removeItem(userId: string, productId: string): Promise<CartDocument | null> {
    const cart = await Cart.findOne({ user: new Types.ObjectId(userId) });
    if (!cart) return null;

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    ) as any;
    await cart.save();
    return cart;
  },

  async clearCart(userId: string): Promise<CartDocument | null> {
    const cart = await Cart.findOne({ user: new Types.ObjectId(userId) });
    if (!cart) return null;

    cart.items = [] as any;
    await cart.save();
    return cart;
  },
} as const;
