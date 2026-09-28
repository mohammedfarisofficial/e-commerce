export const DOCUMENT_NAME = "UserCart";
export const COLLECTION_NAME = "user_carts";

export const CART_ITEM_LIMITS = {
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 99,
} as const;

export const schemaConfig = {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
} as const;