import { Document, Types } from "mongoose";

export interface ProductVariantDocument extends Document {
    _id: Types.ObjectId;
    product_id: Types.ObjectId;
    sku: string;
    size?: string;
    colour?: string;
    price: number;
    original_price?: number;
    stock: number;
    created_at: Date;
    updated_at: Date;
}
