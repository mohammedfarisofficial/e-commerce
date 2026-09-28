export const DOCUMENT_NAME = "Product";
export const COLLECTION_NAME = "products";

export const schemaConfig = {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
} as const;