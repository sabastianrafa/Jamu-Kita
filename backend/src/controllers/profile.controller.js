import prisma from "../lib/prisma.js";
import { UserModel } from "../models/user.models.js";
import { ResponseError } from "../models/error.models.js";

// Controller untuk operasi profil pengguna
export const ProfileController = {
  // GET /me - dapatkan profil pengguna yang sedang login
  async getMe(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await UserModel.getById(userId);

      if (!user) {
        throw new ResponseError(404, "Pengguna tidak ditemukan");
      }

      res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan profil",
        data: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // PATCH /me - perbarui nama atau email
  async updateMe(req, res, next) {
    try {
      const userId = req.user.id;
      const { nama, email } = req.body;

      if (!nama && !email) {
        throw new ResponseError(400, "Nama atau email wajib diisi");
      }

      const updated = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(nama ? { nama: nama.trim() } : {}),
          ...(email ? { email: email.trim().toLowerCase() } : {}),
        },
      });

      res.status(200).json({
        success: true,
        message: "Profil berhasil diperbarui",
        data: {
          id: updated.id,
          nama: updated.nama,
          email: updated.email,
          role: updated.role,
        },
      });
    } catch (error) {
      if (error.code === "P2002") {
        return next(new ResponseError(400, "Email sudah terdaftar"));
      }
      next(error);
    }
  },

  // GET /me/activity - riwayat aktivitas (favorit + komentar)
  async getActivity(req, res, next) {
    try {
      const userId = req.user.id;

      const favorites = await prisma.favorit.findMany({
        where: { userId },
        include: {
          resep: {
            include: { kategori: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      });

      const comments = await prisma.komentar.findMany({
        where: { userId },
        include: {
          resep: {
            include: { kategori: true },
          },
        },
        orderBy: { tanggalPosting: "desc" },
        take: 20,
      });

      res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan riwayat aktivitas",
        data: {
          favorites: favorites.map((f) => ({
            id: f.resep.id,
            judul: f.resep.judul,
            deskripsi: f.resep.deskripsi,
            kategori: f.resep.kategori,
            gambarURL: f.resep.gambarURL,
            createdAt: f.createdAt,
          })),
          comments: comments.map((c) => ({
            id: c.id,
            resepId: c.resepId,
            judul: c.resep.judul,
            isiKomentar: c.isiKomentar,
            rating: c.rating,
            kategori: c.resep.kategori,
            tanggalPosting: c.tanggalPosting,
          })),
        },
      });
    } catch (error) {
      next(error);
    }
  },
};