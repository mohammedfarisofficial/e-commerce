import { Document, Types } from "mongoose";

export interface ProductDocument extends Document {
    _id: Types.ObjectId;
    slug: string;
    name: string;
    brand: string;
    description?: string;
    category: Types.ObjectId;
    images: string[];
    variants: Types.ObjectId[];
    price: number;
    created_at: Date;
    updated_at: Date;
}