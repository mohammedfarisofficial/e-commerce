export const DOCUMENT_NAME = "Category";
export const COLLECTION_NAME = "categories";

export const schemaConfig = {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
} as const;