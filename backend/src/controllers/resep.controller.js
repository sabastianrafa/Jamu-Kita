import { ResepModel } from "../models/resep.models.js";
import { KategoriModel } from "../models/kategori.models.js";
import { ResponseError } from "../models/error.models.js";

export const ResepController = {
  // GET /resep - Get all resep with filters
  async getAll(req, res, next) {
    try {
      const { q, kategori, page, limit } = req.query;

      const result = await ResepModel.getAll({
        q,
        kategori,
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
      });

      res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan daftar resep",
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /resep/search - Advanced search with multiple filters
  async search(req, res, next) {
    try {
      const { keyword, kategoriId, minRating, sortBy, sortOrder, page, limit } = req.query;

      const result = await ResepModel.search({
        keyword,
        kategoriId,
        minRating,
        sortBy,
        sortOrder,
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
      });

      res.status(200).json({
        success: true,
        message: "Berhasil melakukan pencarian resep",
        data: result.data,
        pagination: result.pagination,
        filters: result.filters,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /resep/:id - Get resep by ID
  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const resep = await ResepModel.getById(id);

      if (!resep) {
        throw new ResponseError(404, "Resep tidak ditemukan");
      }

      res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan detail resep",
        data: resep,
      });
    } catch (error) {
      next(error);
    }
  },
};

export const AdminResepController = {
  // POST /admin/resep - Create new resep
  async create(req, res, next) {
    try {
      const { kategoriId } = req.body;

      // Check if kategori exists
      const kategori = await KategoriModel.getById(kategoriId);
      if (!kategori) {
        throw new ResponseError(400, "Kategori tidak ditemukan");
      }

      const resep = await ResepModel.create(req.body);

      res.status(201).json({
        success: true,
        message: "Resep berhasil ditambahkan",
        data: {
          id: resep.id,
          judul: resep.judul,
          deskripsi: resep.deskripsi,
          gambarURL: resep.gambarURL,
          kategori: {
            id: resep.kategori.id,
            nama: resep.kategori.nama,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /admin/resep/:id - Update resep
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { kategoriId } = req.body;

      // Check if resep exists
      const existingResep = await ResepModel.getById(id);
      if (!existingResep) {
        throw new ResponseError(404, "Resep tidak ditemukan");
      }

      // Check if kategori exists (if provided)
      if (kategoriId) {
        const kategori = await KategoriModel.getById(kategoriId);
        if (!kategori) {
          throw new ResponseError(400, "Kategori tidak ditemukan");
        }
      }

      const resep = await ResepModel.update(id, req.body);

      res.status(200).json({
        success: true,
        message: "Resep berhasil diperbarui",
        data: {
          id: resep.id,
          judul: resep.judul,
          deskripsi: resep.deskripsi,
          gambarURL: resep.gambarURL,
          kategori: {
            id: resep.kategori.id,
            nama: resep.kategori.nama,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /admin/resep/:id - Delete resep
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      // Check if resep exists
      const existingResep = await ResepModel.getById(id);
      if (!existingResep) {
        throw new ResponseError(404, "Resep tidak ditemukan");
      }

      await ResepModel.delete(id);

      res.status(200).json({
        success: true,
        message: "Resep berhasil dihapus",
      });
    } catch (error) {
      next(error);
    }
  },
};
