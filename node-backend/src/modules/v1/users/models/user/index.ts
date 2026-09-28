import { UserDocument } from "./types";
import { model, Schema, type SchemaDefinition, type SchemaDefinitionType } from "mongoose";
import { COLLECTION_NAME, DOCUMENT_NAME, schemaConfig, USER_ROLES } from "./constants";

const definition: SchemaDefinition<SchemaDefinitionType<UserDocument>> = {
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    role: {
        type: Number,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.CUSTOMER,
    },
};

const UserSchema = new Schema<UserDocument>(definition, {
    ...schemaConfig,
    collection: COLLECTION_NAME,
});

UserSchema.index({ email: 1 }, { unique: true });

export default model<UserDocument>(DOCUMENT_NAME, UserSchema);