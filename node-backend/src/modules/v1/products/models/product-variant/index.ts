import { ProductVariantDocument } from "./types";
import { model, Schema, type SchemaDefinition, type SchemaDefinitionType } from "mongoose";
import { COLLECTION_NAME, DOCUMENT_NAME, schemaConfig } from "./constants";

const definition: SchemaDefinition<SchemaDefinitionType<ProductVariantDocument>> = {
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    sku: { type: String, required: true, trim: true },
    size: { type: String, trim: true },
    colour: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    original_price: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
};

const ProductVariantSchema = new Schema<ProductVariantDocument>(definition, {
    ...schemaConfig,
    collection: COLLECTION_NAME,
});

ProductVariantSchema.index({ product_id: 1 });
ProductVariantSchema.index({ sku: 1 }, { unique: true });

export default model<ProductVariantDocument>(DOCUMENT_NAME, ProductVariantSchema);
