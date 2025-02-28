import { Router } from "express";
import healthRoutes from "../../domains/health/routes";
import authenticationRoutes from "../../domains/authentication/routes"
import userRoutes from "../../domains/user/routes"

const router = Router();

// Prefixo para todas as rotas
router.use("/health", healthRoutes);
router.use("/auth", authenticationRoutes);
router.use("/users", userRoutes);

export default router;
 
