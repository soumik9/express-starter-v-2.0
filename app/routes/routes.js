import { ProductRoutes } from "./ProductRoutes.js";
import { UserRoutes } from "./UserRoutes.js";

// Define all routes
export const routes = [
    { path: '/user', router: UserRoutes },
    { path: '/product', router: ProductRoutes },
];