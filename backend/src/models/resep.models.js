import prisma from "../lib/prisma.js";

export const ResepModel = {
  // Get all resep with optional filters
  async getAll({ q, kategori, page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (q) {
      where.OR = [
        { judul: { contains: q, mode: "insensitive" } },
        { deskripsi: { contains: q, mode: "insensitive" } },
      ];
    }

    if (kategori) {
      where.kategori = {
        nama: kategori,
      };
    }

    const [resep, total] = await Promise.all([
      prisma.resep.findMany({
        where,
        include: {
          kategori: true,
          komentar: {
            select: {
              rating: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.resep.count({ where }),
    ]);

    // Calculate average rating for each resep
    const resepWithRating = resep.map((r) => {
      const ratings = r.komentar.map((k) => k.rating);
      const rataRataRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;

      return {
        id: r.id,
        judul: r.judul,
        deskripsi: r.deskripsi,
        gambarURL: r.gambarURL,
        kategori: {
          id: r.kategori.id,
          nama: r.kategori.nama,
        },
        rataRataRating: Math.round(rataRataRating * 10) / 10,
      };
    });

    return {
      data: resepWithRating,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // Advanced search with multiple filters
  async search({ 
    keyword, 
    kategoriId, 
    minRating, 
    sortBy = "createdAt", 
    sortOrder = "desc",
    page = 1, 
    limit = 10 
  }) {
    const skip = (page - 1) * limit;
    const where = {};

    // Search by keyword in multiple fields
    if (keyword) {
      where.OR = [
        { judul: { contains: keyword, mode: "insensitive" } },
        { deskripsi: { contains: keyword, mode: "insensitive" } },
        { bahan: { contains: keyword, mode: "insensitive" } },
        { langkahPembuatan: { contains: keyword, mode: "insensitive" } },
        { sumberLiteratur: { contains: keyword, mode: "insensitive" } },
      ];
    }

    // Filter by kategori ID
    if (kategoriId) {
      where.kategoriId = parseInt(kategoriId);
    }

    // Get all resep matching criteria
    const allResep = await prisma.resep.findMany({
      where,
      include: {
        kategori: true,
        komentar: {
          select: {
            rating: true,
          },
        },
      },
    });

    // Calculate ratings and filter by minRating
    let resepWithRating = allResep.map((r) => {
      const ratings = r.komentar.map((k) => k.rating);
      const rataRataRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;

      return {
        id: r.id,
        judul: r.judul,
        deskripsi: r.deskripsi,
        gambarURL: r.gambarURL,
        kategori: {
          id: r.kategori.id,
          nama: r.kategori.nama,
        },
        rataRataRating: Math.round(rataRataRating * 10) / 10,
        createdAt: r.createdAt,
      };
    });

    // Filter by minimum rating
    if (minRating) {
      resepWithRating = resepWithRating.filter(
        (r) => r.rataRataRating >= parseFloat(minRating)
      );
    }

    // Sort results
    resepWithRating.sort((a, b) => {
      let compareA, compareB;
      
      switch (sortBy) {
        case "rating":
          compareA = a.rataRataRating;
          compareB = b.rataRataRating;
          break;
        case "judul":
          compareA = a.judul.toLowerCase();
          compareB = b.judul.toLowerCase();
          break;
        case "createdAt":
        default:
          compareA = new Date(a.createdAt);
          compareB = new Date(b.createdAt);
      }

      if (sortOrder === "asc") {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });

    const total = resepWithRating.length;
    const paginatedResep = resepWithRating.slice(skip, skip + limit);

    // Remove createdAt from response
    const finalResep = paginatedResep.map(({ createdAt, ...rest }) => rest);

    return {
      data: finalResep,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      filters: {
        keyword: keyword || null,
        kategoriId: kategoriId || null,
        minRating: minRating || null,
        sortBy,
        sortOrder,
      },
    };
  },

  // Get all resep with optional filters (legacy method, kept for backward compatibility)
  async getAllLegacy({ q, kategori, page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (q) {
      where.OR = [
        { judul: { contains: q, mode: "insensitive" } },
        { deskripsi: { contains: q, mode: "insensitive" } },
      ];
    }

    if (kategori) {
      where.kategori = {
        nama: kategori,
      };
    }

    const [resep, total] = await Promise.all([
      prisma.resep.findMany({
        where,
        include: {
          kategori: true,
          komentar: {
            select: {
              rating: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.resep.count({ where }),
    ]);

    // Calculate average rating for each resep
    const resepWithRating = resep.map((r) => {
      const ratings = r.komentar.map((k) => k.rating);
      const rataRataRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;

      return {
        id: r.id,
        judul: r.judul,
        deskripsi: r.deskripsi,
        gambarURL: r.gambarURL,
        kategori: {
          id: r.kategori.id,
          nama: r.kategori.nama,
        },
        rataRataRating: Math.round(rataRataRating * 10) / 10,
      };
    });

    return {
      data: resepWithRating,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // Get resep by ID with full details
  async getById(id) {
    const resep = await prisma.resep.findUnique({
      where: { id },
      include: {
        kategori: true,
        komentar: {
          select: {
            rating: true,
          },
        },
      },
    });

    if (!resep) return null;

    // Calculate average rating
    const ratings = resep.komentar.map((k) => k.rating);
    const rataRataRating =
      ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0;

    return {
      id: resep.id,
      judul: resep.judul,
      deskripsi: resep.deskripsi,
      gambarURL: resep.gambarURL,
      sumberLiteratur: resep.sumberLiteratur,
      kategori: {
        id: resep.kategori.id,
        nama: resep.kategori.nama,
      },
      bahan: JSON.parse(resep.bahan),
      langkahPembuatan: JSON.parse(resep.langkahPembuatan),
      rataRataRating: Math.round(rataRataRating * 10) / 10,
    };
  },

  // Create new resep (Admin only)
  async create(data) {
    const { judul, deskripsi, gambarURL, sumberLiteratur, kategoriId, bahan, langkahPembuatan } = data;

    return await prisma.resep.create({
      data: {
        judul,
        deskripsi,
        gambarURL,
        sumberLiteratur,
        kategoriId: parseInt(kategoriId),
        bahan: JSON.stringify(bahan),
        langkahPembuatan: JSON.stringify(langkahPembuatan),
      },
      include: {
        kategori: true,
      },
    });
  },

  // Update resep (Admin only)
  async update(id, data) {
    const { judul, deskripsi, gambarURL, sumberLiteratur, kategoriId, bahan, langkahPembuatan } = data;

    const updateData = {};
    if (judul) updateData.judul = judul;
    if (deskripsi) updateData.deskripsi = deskripsi;
    if (gambarURL !== undefined) updateData.gambarURL = gambarURL;
    if (sumberLiteratur !== undefined) updateData.sumberLiteratur = sumberLiteratur;
    if (kategoriId) updateData.kategoriId = parseInt(kategoriId);
    if (bahan) updateData.bahan = JSON.stringify(bahan);
    if (langkahPembuatan) updateData.langkahPembuatan = JSON.stringify(langkahPembuatan);

    return await prisma.resep.update({
      where: { id },
      data: updateData,
      include: {
        kategori: true,
      },
    });
  },

  // Delete resep (Admin only)
  async delete(id) {
    return await prisma.resep.delete({
      where: { id },
    });
  },
};
