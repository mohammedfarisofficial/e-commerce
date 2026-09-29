import { Document, Types } from "mongoose";

export interface CartItemDocument {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface CartDocument extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: CartItemDocument[];
  created_at: Date;
  updated_at: Date;
}
