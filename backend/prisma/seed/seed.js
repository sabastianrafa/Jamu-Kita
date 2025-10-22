import bcrypt from "bcryptjs";
import prisma from "../../src/lib/prisma.js";

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.favorit.deleteMany();
  await prisma.komentar.deleteMany();
  await prisma.resep.deleteMany();
  await prisma.kategori.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Cleared existing data");

  // Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      nama: "Admin Jamu Kita",
      email: "admin@jamukita.com",
      password: adminPassword,
      role: "admin",
    },
  });
  console.log("✅ Created admin user");

  // Create Sample Users (Anggota)
  const userPassword = await bcrypt.hash("password123", 10);
  const users = await Promise.all([
    prisma.user.create({
      data: {
        nama: "Budi Hartono",
        email: "budi@example.com",
        password: userPassword,
        role: "anggota",
      },
    }),
    prisma.user.create({
      data: {
        nama: "Siti Aminah",
        email: "siti@example.com",
        password: userPassword,
        role: "anggota",
      },
    }),
    prisma.user.create({
      data: {
        nama: "Ahmad Yani",
        email: "ahmad@example.com",
        password: userPassword,
        role: "anggota",
      },
    }),
  ]);
  console.log("✅ Created sample users");

  // Create Categories
  const categories = await Promise.all([
    prisma.kategori.create({ data: { nama: "Pegal Linu" } }),
    prisma.kategori.create({ data: { nama: "Flu & Batuk" } }),
    prisma.kategori.create({ data: { nama: "Stamina & Vitalitas" } }),
    prisma.kategori.create({ data: { nama: "Pencernaan" } }),
    prisma.kategori.create({ data: { nama: "Kesehatan Wanita" } }),
  ]);
  console.log("✅ Created categories");

  // Create Resep
  const resep1 = await prisma.resep.create({
    data: {
      judul: "Jamu Beras Kencur",
      deskripsi:
        "Minuman penyegar tubuh yang berkhasiat mengatasi pegal linu dan meningkatkan stamina. Jamu tradisional yang populer di Indonesia.",
      gambarURL: "https://example.com/images/beras-kencur.jpg",
      sumberLiteratur: "Buku Resep Herbal Warisan, Hal. 12",
      kategoriId: categories[0].id,
      bahan: JSON.stringify([
        "Beras 100 gram",
        "Kencur 50 gram",
        "Gula merah 100 gram",
        "Gula pasir 50 gram",
        "Air 1 liter",
      ]),
      langkahPembuatan: JSON.stringify([
        "1. Rendam beras selama 3-4 jam",
        "2. Cuci bersih kencur dan iris tipis",
        "3. Blender beras dan kencur dengan sedikit air",
        "4. Rebus air hingga mendidih, masukkan gula merah",
        "5. Saring campuran beras dan kencur, masukkan ke air rebusan",
        "6. Aduk rata dan masak hingga mendidih",
        "7. Dinginkan dan sajikan",
      ]),
    },
  });

  const resep2 = await prisma.resep.create({
    data: {
      judul: "Jamu Kunyit Asam",
      deskripsi:
        "Jamu tradisional untuk melancarkan haid dan menjaga kesehatan organ kewanitaan. Kaya akan antioksidan dan anti-inflamasi.",
      gambarURL: "https://example.com/images/kunyit-asam.jpg",
      sumberLiteratur: "Ensiklopedia Jamu Indonesia, Hal. 45",
      kategoriId: categories[4].id,
      bahan: JSON.stringify([
        "Kunyit 200 gram",
        "Asam jawa 50 gram",
        "Gula merah 150 gram",
        "Air 1,5 liter",
      ]),
      langkahPembuatan: JSON.stringify([
        "1. Kupas dan cuci bersih kunyit",
        "2. Parut atau blender kunyit",
        "3. Rebus air hingga mendidih",
        "4. Masukkan kunyit parut dan asam jawa",
        "5. Tambahkan gula merah, aduk rata",
        "6. Masak selama 20 menit dengan api kecil",
        "7. Saring dan dinginkan sebelum diminum",
      ]),
    },
  });

  const resep3 = await prisma.resep.create({
    data: {
      judul: "Wedang Jahe",
      deskripsi:
        "Minuman hangat berbahan dasar jahe yang berkhasiat menghangatkan tubuh, mengatasi flu, batuk, dan meningkatkan daya tahan tubuh.",
      gambarURL: "https://example.com/images/wedang-jahe.jpg",
      sumberLiteratur: "Ramuan Tradisional Nusantara, Hal. 78",
      kategoriId: categories[1].id,
      bahan: JSON.stringify([
        "Jahe merah 100 gram",
        "Gula aren 100 gram",
        "Serai 2 batang",
        "Kayu manis 1 batang",
        "Cengkeh 5 butir",
        "Air 1 liter",
      ]),
      langkahPembuatan: JSON.stringify([
        "1. Cuci bersih jahe dan geprek",
        "2. Geprek serai dan potong kayu manis",
        "3. Rebus air hingga mendidih",
        "4. Masukkan semua bahan",
        "5. Masak dengan api kecil selama 15 menit",
        "6. Tambahkan gula aren, aduk hingga larut",
        "7. Sajikan hangat",
      ]),
    },
  });

  const resep4 = await prisma.resep.create({
    data: {
      judul: "Jamu Kunci Sirih",
      deskripsi:
        "Jamu khusus wanita yang bermanfaat untuk menjaga kesehatan organ kewanitaan dan mengencangkan otot.",
      gambarURL: null,
      sumberLiteratur: null,
      kategoriId: categories[4].id,
      bahan: JSON.stringify([
        "Kunci pepet 50 gram",
        "Daun sirih 10 lembar",
        "Kapur sirih secukupnya",
        "Madu 2 sendok makan",
        "Air 1 liter",
      ]),
      langkahPembuatan: JSON.stringify([
        "1. Cuci bersih kunci pepet dan daun sirih",
        "2. Rebus air hingga mendidih",
        "3. Masukkan kunci pepet dan daun sirih",
        "4. Tambahkan kapur sirih sedikit saja",
        "5. Masak selama 20 menit",
        "6. Saring dan tambahkan madu",
        "7. Minum selagi hangat",
      ]),
    },
  });

  const resep5 = await prisma.resep.create({
    data: {
      judul: "Jamu Temulawak",
      deskripsi:
        "Jamu untuk meningkatkan nafsu makan, menjaga kesehatan hati, dan meningkatkan stamina tubuh.",
      gambarURL: "https://example.com/images/temulawak.jpg",
      sumberLiteratur: "Khasiat Tanaman Obat Indonesia, Hal. 156",
      kategoriId: categories[2].id,
      bahan: JSON.stringify([
        "Temulawak 200 gram",
        "Kunyit 50 gram",
        "Asam jawa 30 gram",
        "Gula aren 150 gram",
        "Air 1,5 liter",
      ]),
      langkahPembuatan: JSON.stringify([
        "1. Kupas dan cuci bersih temulawak dan kunyit",
        "2. Parut atau blender halus",
        "3. Rebus air hingga mendidih",
        "4. Masukkan temulawak, kunyit, dan asam jawa",
        "5. Masak selama 30 menit dengan api kecil",
        "6. Tambahkan gula aren, aduk hingga larut",
        "7. Saring dan dinginkan",
      ]),
    },
  });

  console.log("✅ Created resep");

  // Create Comments
  await Promise.all([
    prisma.komentar.create({
      data: {
        resepId: resep1.id,
        userId: users[0].id,
        isiKomentar:
          "Jamu ini sangat manjur untuk mengatasi pegal linu! Rasanya juga enak.",
        rating: 5,
      },
    }),
    prisma.komentar.create({
      data: {
        resepId: resep1.id,
        userId: users[1].id,
        isiKomentar: "Sudah coba dan memang terasa khasiatnya. Recommended!",
        rating: 5,
      },
    }),
    prisma.komentar.create({
      data: {
        resepId: resep2.id,
        userId: users[2].id,
        isiKomentar: "Bagus untuk kesehatan wanita. Saya rutin minum setiap hari.",
        rating: 4,
      },
    }),
    prisma.komentar.create({
      data: {
        resepId: resep3.id,
        userId: users[0].id,
        isiKomentar: "Wedang jahe ini pas banget diminum saat cuaca dingin.",
        rating: 5,
      },
    }),
    prisma.komentar.create({
      data: {
        resepId: resep5.id,
        userId: users[1].id,
        isiKomentar: "Nafsu makan saya meningkat setelah rutin minum jamu ini.",
        rating: 4,
      },
    }),
  ]);
  console.log("✅ Created comments");

  // Create Favorites
  await Promise.all([
    prisma.favorit.create({
      data: {
        userId: users[0].id,
        resepId: resep1.id,
      },
    }),
    prisma.favorit.create({
      data: {
        userId: users[0].id,
        resepId: resep3.id,
      },
    }),
    prisma.favorit.create({
      data: {
        userId: users[1].id,
        resepId: resep2.id,
      },
    }),
    prisma.favorit.create({
      data: {
        userId: users[1].id,
        resepId: resep5.id,
      },
    }),
  ]);
  console.log("✅ Created favorites");

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📝 Sample credentials:");
  console.log("Admin: admin@jamukita.com / admin123");
  console.log("User: budi@example.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
