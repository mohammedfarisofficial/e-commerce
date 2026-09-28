import { Request, Response } from "express";
import { asyncHandler, JSON200, JSON401, JSON404 } from "../../../../utils";
import { UserRepository } from "../../users/repository";

export const queryFunctions = {
    getUser: asyncHandler(async (req: Request, res: Response) => {
        if (!req.user) {
            JSON401(res, "Authentication required");
            return;
        }

        const user = await UserRepository.findById(req.user.id);
        if (!user) {
            JSON404(res, "User not found");
            return;
        }

        JSON200(res, { user: UserRepository.toSafeUser(user) });
    }),
};