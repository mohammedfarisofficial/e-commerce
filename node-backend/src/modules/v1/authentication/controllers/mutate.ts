import { Request, Response } from "express";
import {
    asyncHandler,
    EncryptionUtils,
    TokenUtils,
    JSON200,
    JSON201,
    JSON400,
    JSON401,
    JSON409,
} from "../../../../utils";
import { UserRepository } from "../../users/repository";
import { registerSchema, loginSchema } from "../validations";

export const mutateFunctions = {
    registerUser: asyncHandler(async (req: Request, res: Response) => {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            JSON400(res, parsed.error.issues[0].message);
            return;
        }

        const { name, email, password } = parsed.data;

        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            JSON409(res, "User already exists with this email");
            return;
        }

        const hashedPassword = await EncryptionUtils.encrypt(password);

        const user = await UserRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        const tokens = TokenUtils.generateTokenPair({
            id: user._id.toString(),
            email: user.email,
        });

        JSON201(res, {
            message: "User registered successfully",
            user: UserRepository.toSafeUser(user),
            ...tokens,
        });
    }),

    loginUser: asyncHandler(async (req: Request, res: Response) => {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            JSON400(res, parsed.error.issues[0].message);
            return;
        }

        const { email, password } = parsed.data;

        const user = await UserRepository.findByEmailWithPassword(email);
        if (!user) {
            JSON401(res, "Invalid email or password");
            return;
        }

        const isValid = await EncryptionUtils.decrypt(user.password!, password);
        if (!isValid) {
            JSON401(res, "Invalid email or password");
            return;
        }

        const tokens = TokenUtils.generateTokenPair({
            id: user._id.toString(),
            email: user.email,
        });

        JSON200(res, {
            message: "Login successful",
            user: UserRepository.toSafeUser(user),
            ...tokens,
        });
    }),
};