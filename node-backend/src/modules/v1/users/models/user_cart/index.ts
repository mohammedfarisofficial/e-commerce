import { UserCartDocument } from "./types";
import { model, Schema, type SchemaDefinition, type SchemaDefinitionType } from "mongoose";
import { CART_ITEM_LIMITS, COLLECTION_NAME, DOCUMENT_NAME, schemaConfig, } from "./constants";

const definition: SchemaDefinition<SchemaDefinitionType<UserCartDocument>> = {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    sku: { type: String, required: true, trim: true },
    quantity: {
        type: Number,
        required: true,
        min: CART_ITEM_LIMITS.MIN_QUANTITY,
        max: CART_ITEM_LIMITS.MAX_QUANTITY,
        validate: { validator: Number.isInteger, message: "quantity must be an integer" },
    },
};

const UserCartSchema = new Schema<UserCartDocument>(definition, {
    ...schemaConfig,
    collection: COLLECTION_NAME,
});

UserCartSchema.index({ user: 1, sku: 1 }, { unique: true });

export default model<UserCartDocument>(DOCUMENT_NAME, UserCartSchema);