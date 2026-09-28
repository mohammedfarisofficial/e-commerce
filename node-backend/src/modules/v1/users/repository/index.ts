import User from "../models/user";
import type { UserDocument } from "../models/user/types";

export const UserRepository = {
    async findByEmail(email: string): Promise<UserDocument | null> {
        return User.findOne({ email: email.toLowerCase() });
    },

    async findByEmailWithPassword(email: string): Promise<UserDocument | null> {
        return User.findOne({ email: email.toLowerCase() }).select("+password");
    },

    async findById(id: string): Promise<UserDocument | null> {
        return User.findById(id);
    },

    async create(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<UserDocument> {
        return User.create({
            name: data.name,
            email: data.email.toLowerCase(),
            password: data.password,
        });
    },

    toSafeUser(user: UserDocument) {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    },
} as const;