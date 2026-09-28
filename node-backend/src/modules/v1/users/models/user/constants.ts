export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export const USER_ROLES = {
    ADMIN: 1,
    CUSTOMER: 2,
}

export const schemaConfig = {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
} as const;