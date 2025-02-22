import { Router } from "express";
import healthRoutes from "../../domains/health/routes";
import authenticationRoutes from "../../domains/authentication/routes"

const router = Router();

// Prefixo para todas as rotas
router.use("/health", healthRoutes);
router.use("/auth", authenticationRoutes);

export default router;
 
