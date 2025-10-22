import { KomentarModel } from "../models/komentar.models.js";
import { ResepModel } from "../models/resep.models.js";
import { ResponseError } from "../models/error.models.js";

export const KomentarController = {
  // GET /resep/:id/komentar - Get all comments for a resep
  async getByResepId(req, res, next) {
    try {
      const { id } = req.params;

      // Check if resep exists
      const resep = await ResepModel.getById(id);
      if (!resep) {
        throw new ResponseError(404, "Resep tidak ditemukan");
      }

      const komentar = await KomentarModel.getByResepId(id);

      res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan daftar komentar",
        data: komentar,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /resep/:id/komentar - Add comment to resep
  async create(req, res, next) {
    try {
      const { id: resepId } = req.params;
      const userId = req.user.id;

      // Check if resep exists
      const resep = await ResepModel.getById(resepId);
      if (!resep) {
        throw new ResponseError(404, "Resep tidak ditemukan");
      }

      // Check if user already commented
      const hasCommented = await KomentarModel.hasUserCommented(resepId, userId);
      if (hasCommented) {
        throw new ResponseError(400, "Anda sudah memberikan komentar pada resep ini");
      }

      const komentar = await KomentarModel.create(resepId, userId, req.body);

      res.status(201).json({
        success: true,
        message: "Komentar berhasil ditambahkan",
        data: {
          id: komentar.id,
          isiKomentar: komentar.isiKomentar,
          rating: komentar.rating,
          tanggalPosting: komentar.tanggalPosting.toISOString(),
          pengguna: {
            nama: komentar.user.nama,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
