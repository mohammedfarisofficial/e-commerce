import { CategoryDocument } from "./types";
import { model, Schema, type SchemaDefinition, type SchemaDefinitionType } from "mongoose";
import { COLLECTION_NAME, DOCUMENT_NAME, schemaConfig } from "./constants";

const definition: SchemaDefinition<SchemaDefinitionType<CategoryDocument>> = {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, trim: true },
    image: { type: String },
    parent_id: { type: Schema.Types.ObjectId, ref: "Category" },
};

const CategorySchema = new Schema<CategoryDocument>(definition, {
    ...schemaConfig,
    collection: COLLECTION_NAME,
});

CategorySchema.index({ parent_id: 1 });

export default model<CategoryDocument>(DOCUMENT_NAME, CategorySchema);
