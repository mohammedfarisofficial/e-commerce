import { ProductDocument } from "./types";
import { model, Schema, type SchemaDefinition, type SchemaDefinitionType } from "mongoose";
import { COLLECTION_NAME, DOCUMENT_NAME, schemaConfig } from "./constants";

const definition: SchemaDefinition<SchemaDefinitionType<ProductDocument>> = {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    images: [{ type: String }],
    variants: [{ type: Schema.Types.ObjectId, ref: "ProductVariant" }],
    originalPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    price: { type: Number, default: 0, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
};

const ProductSchema = new Schema<ProductDocument>(definition, {
    ...schemaConfig,
    collection: COLLECTION_NAME,
});

ProductSchema.index({ category: 1 });

export default model<ProductDocument>(DOCUMENT_NAME, ProductSchema);
