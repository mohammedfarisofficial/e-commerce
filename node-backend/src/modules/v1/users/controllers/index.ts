import { queryFunctions } from "./query";
import { mutateFunctions } from "./mutate";

const userController = {
    ...queryFunctions,
    ...mutateFunctions,
};

export { userController };