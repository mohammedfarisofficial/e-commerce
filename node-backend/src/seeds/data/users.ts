import { USER_ROLES } from "../../modules/v1/users/models/user/constants";

export const users = [
    {
        name: "Admin User",
        email: "admin@store.com",
        password: "AdminPassword123!",
        role: USER_ROLES.ADMIN,
    }
];
