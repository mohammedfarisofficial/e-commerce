import { CartDocument } from "./types";
import { model, Schema, type SchemaDefinition, type SchemaDefinitionType } from "mongoose";
import { COLLECTION_NAME, DOCUMENT_NAME, schemaConfig } from "./constants";

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  price: { type: Number, required: true, min: 0 },
}, { _id: false });

const definition: SchemaDefinition<SchemaDefinitionType<CartDocument>> = {
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [cartItemSchema],
};

const CartSchema = new Schema<CartDocument>(definition, {
  ...schemaConfig,
  collection: COLLECTION_NAME,
});

export default model<CartDocument>(DOCUMENT_NAME, CartSchema);
