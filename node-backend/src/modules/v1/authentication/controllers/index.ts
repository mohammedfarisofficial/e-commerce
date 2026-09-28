import { queryFunctions } from "./query";
import { mutateFunctions } from "./mutate";

const authController = {
    ...queryFunctions,
    ...mutateFunctions,
}

export { authController };