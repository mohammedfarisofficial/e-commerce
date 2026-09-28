import { Document, Types } from "mongoose";

export interface UserCartDocument extends Document {
    user_id: Types.ObjectId;
    product_id: Types.ObjectId;
    sku: string;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}