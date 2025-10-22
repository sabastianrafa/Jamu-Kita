import { Router } from "express";
import { ResepController } from "../controllers/resep.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { getResepQuerySchema, searchResepQuerySchema } from "../validators/resep.validator.js";

const router = Router();

// GET /resep - Get all resep (PUBLIC)
router.get("/", validate({ query: getResepQuerySchema }), ResepController.getAll);

// GET /resep/search - Advanced search (PUBLIC)
router.get("/search", validate({ query: searchResepQuerySchema }), ResepController.search);

// GET /resep/:id - Get resep by ID (PUBLIC)
router.get("/:id", ResepController.getById);

export default router;
