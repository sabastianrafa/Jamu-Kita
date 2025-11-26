"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import CategoryCarousel from "@/components/dashboard/CategoryCarouselNonLogin";
import Top7Carousel from "@/components/dashboard/Top7Carousellanding";
import BannerSlider from "@/components/dashboard/BannerSlider";

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("Kesehatan");

  // ❗ Tidak diteruskan ke komponen lain agar tidak memicu API fetch
  // Misal: Top7Carousel tidak menerima category lagi

  return (
    <div className="min-h-screen bg-[#FFFBEA]">
      <Navbar />

      <div className="pt-32 px-8 flex gap-8">
        <div className="w-64 mt-2">
          <CategoryCarousel onSelect={(cat) => setSelectedCategory(cat)} />
        </div>

        <div className="flex-1">
          <BannerSlider />

          <h2 className="text-xl font-bold mb-4 mt-8">Top 7 Jamu Populer</h2>

          <Top7Carousel />

          {/* Tidak ada data dinamis berdasarkan kategori */}
        </div>
      </div>
    </div>
  );
}
