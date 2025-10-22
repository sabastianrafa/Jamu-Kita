import prisma from "../lib/prisma.js";

export const KomentarModel = {
  // Get all comments for a resep
  async getByResepId(resepId) {
    const komentar = await prisma.komentar.findMany({
      where: { resepId },
      include: {
        user: {
          select: {
            nama: true,
          },
        },
      },
      orderBy: { tanggalPosting: "desc" },
    });

    return komentar.map((k) => ({
      id: k.id,
      isiKomentar: k.isiKomentar,
      rating: k.rating,
      tanggalPosting: k.tanggalPosting.toISOString(),
      pengguna: {
        nama: k.user.nama,
      },
    }));
  },

  // Create new comment
  async create(resepId, userId, data) {
    const { isiKomentar, rating } = data;

    return await prisma.komentar.create({
      data: {
        resepId,
        userId,
        isiKomentar,
        rating,
      },
      include: {
        user: {
          select: {
            nama: true,
          },
        },
      },
    });
  },

  // Check if user already commented on this resep
  async hasUserCommented(resepId, userId) {
    const count = await prisma.komentar.count({
      where: {
        resepId,
        userId,
      },
    });
    return count > 0;
  },
};
