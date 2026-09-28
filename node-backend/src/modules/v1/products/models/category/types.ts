import { Document, Types } from "mongoose";

export interface CategoryDocument extends Document {
    _id: Types.ObjectId;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parent_id?: Types.ObjectId;
    created_at: Date;
    updated_at: Date;
}