import { Router } from "express";
import { KomentarController } from "../controllers/komentar.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { createKomentarSchema } from "../validators/komentar.validator.js";

const router = Router();

// GET /resep/:id/komentar - Get all comments for resep (PUBLIC)
router.get("/:id/komentar", KomentarController.getByResepId);

// POST /resep/:id/komentar - Add comment (ANGGOTA)
router.post(
  "/:id/komentar",
  authenticateToken,
  validate({ body: createKomentarSchema }),
  KomentarController.create
);

export default router;
