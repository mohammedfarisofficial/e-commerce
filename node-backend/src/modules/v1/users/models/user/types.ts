import { Document, Types } from "mongoose";

export interface UserDocument extends Document {
    _id: Types.ObjectId;
    email: string;
    password?: string;
    name: string;
    role: number;
    created_at: Date;
    updated_at: Date;
}