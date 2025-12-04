"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import CategoryCarousel from "@/components/dashboard/CategoryCarousel";
import Recent from "@/components/dashboard/RecentSearchCarousel";
import Top7Carousel from "@/components/dashboard/Top7Carousel";
import BannerSlider from "@/components/dashboard/BannerSlider";
import JamuCard from "@/components/dashboard/JamuCard";
import { useAuth } from "@/context/AuthContext";

// Data jamu lengkap
const jamuData: Record<
  string,
  {
    id: number;
    name: string;
    image: string;
    rating: number;
    benefits: string[];
    ingredients: string[];
    steps: string[];
  }[]
> = {
  Kesehatan: [
    {
      id: 1,
      name: "Kunyit Asam",
      image: "/images/jamu1.jpg",
      rating: 4.9,
      benefits: [
        "Meningkatkan daya tahan tubuh",
        "Membantu pencernaan",
        "Mengurangi peradangan",
      ],
      ingredients: ["100 gr Kunyit", "50 gr Asam Jawa", "2 sdm Gula Merah", "500 ml Air"],
      steps: [
        "Cuci kunyit hingga bersih",
        "Rebus kunyit dan air hingga mendidih",
        "Tambahkan asam jawa dan gula merah",
        "Saring dan sajikan hangat",
      ],
    },
    {
      id: 2,
      name: "Beras Kencur",
      image: "/images/jamu2.jpg",
      rating: 4.8,
      benefits: [
        "Menghilangkan pegal linu",
        "Meningkatkan nafsu makan",
        "Meredakan batuk dan sakit tenggorokan",
      ],
      ingredients: [
        "100 gr beras putih",
        "150 gr kencur segar",
        "50 gr jahe",
        "1 sdm asam jawa",
        "150-200 gr gula merah",
        "1 liter air",
      ],
      steps: [
        "Rendam beras dan kencur",
        "Rebus jahe, kencur, dan beras",
        "Tambahkan gula dan asam jawa",
        "Saring dan sajikan",
      ],
    },
  ],
  Keluarga: [
    {
      id: 3,
      name: "Temulawak",
      image: "/images/jamu3.jpg",
      rating: 4.7,
      benefits: ["Meningkatkan nafsu makan", "Mendukung fungsi hati", "Anti-inflamasi"],
      ingredients: ["100 gr temulawak", "50 gr jahe", "500 ml air", "Gula aren secukupnya"],
      steps: [
        "Cuci temulawak dan jahe",
        "Rebus dengan air hingga mendidih",
        "Tambahkan gula aren",
        "Saring dan sajikan hangat",
      ],
    },
  ],
  Buah: [
    {
      id: 4,
      name: "Sari Delima",
      image: "/images/jamu4.jpg",
      rating: 4.6,
      benefits: ["Menjaga kesehatan jantung", "Antioksidan tinggi"],
      ingredients: ["Buah delima 2 buah", "Gula secukupnya"],
      steps: ["Peras buah delima", "Tambahkan gula", "Aduk rata dan sajikan"],
    },
  ],
  Rempah: [
    {
      id: 5,
      name: "Jahe Merah",
      image: "/images/jamu5.jpg",
      rating: 4.8,
      benefits: ["Meningkatkan imun tubuh", "Menghangatkan badan"],
      ingredients: ["100 gr jahe merah", "500 ml air", "Gula merah secukupnya"],
      steps: [
        "Cuci jahe merah",
        "Rebus dengan air dan gula merah",
        "Saring dan sajikan hangat",
      ],
    },
  ],
};

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("Kesehatan");
  const [showCategories, setShowCategories] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#FFFBEA]">

      {/* Content Wrapper */}
      <div className="pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Mobile Category Toggle Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="w-full bg-[#B6771D] text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-between"
          >
            <span>Kategori: {selectedCategory}</span>
            <svg
              className={`w-5 h-5 transition-transform ${showCategories ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* LEFT: Category Carousel - Desktop always show, Mobile conditional */}
        <div className={`${showCategories ? 'block' : 'hidden'} md:block w-full md:w-56 lg:w-64 mt-2`}>
          <CategoryCarousel onSelect={(cat) => {
            setSelectedCategory(cat);
            setShowCategories(false);
          }} />
        </div>

        {/* RIGHT: Main Content */}
        <div className="flex-1 min-w-0">
          {/* Banner Slide */}
          <BannerSlider />

          {/* Recent - Hanya tampil jika sudah login */}
          {isAuthenticated && <Recent />}

          {/* Top 7 Jamu */}
          <h2 className="text-lg sm:text-xl font-bold mb-4 mt-4 sm:mt-5">Top 7 Jamu Populer</h2>
          <Top7Carousel />

          {/* Section Jamu Berdasarkan Kategori */}
          <div className="mt-6 sm:mt-8 pb-8 sm:pb-10">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Jamu Kategori: {selectedCategory}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {jamuData[selectedCategory]?.length > 0 ? (
                jamuData[selectedCategory].map((jamu) => (
                  <JamuCard
                    index={jamu.id} 
                    key={jamu.id}
                    title={jamu.name}
                    img={jamu.image}
                    rating={jamu.rating}
                    benefits={jamu.benefits}
                    ingredients={jamu.ingredients}
                    steps={jamu.steps}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  Belum ada jamu untuk kategori ini.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
