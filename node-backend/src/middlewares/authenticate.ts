import { Request, Response, NextFunction } from "express";
import { TokenUtils, JSON401 } from "../utils";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        JSON401(res, "Access token is required");
        return;
    }

    const token = header.split(" ")[1];

    try {
        const payload = TokenUtils.verifyAccessToken(token);
        req.user = { id: payload.id, email: payload.email };
        next();
    } catch {
        JSON401(res, "Invalid or expired access token");
    }
};
