/**
 * Routes configuration for Jamu Kita API
 * Base URL: /v1
 */
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import resepRoutes from "./routes/resep.routes.js";
import kategoriRoutes from "./routes/kategori.routes.js";
import komentarRoutes from "./routes/komentar.routes.js";
import favoritRoutes from "./routes/favorit.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import profileRoutes from "./routes/profile.routes.js";

const router = express.Router();

// Public routes
router.use("/auth", authRoutes);
router.use("/resep", resepRoutes);
router.use("/kategori", kategoriRoutes);
router.use("/resep", komentarRoutes); // /resep/:id/komentar

// Protected routes (Anggota)
router.use("/favorit", favoritRoutes);
router.use("/me", profileRoutes);

// Admin routes
router.use("/admin", adminRoutes);

export default router;
