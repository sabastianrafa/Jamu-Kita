"use client";

import { useState, useEffect, Suspense } from "react";
import NavbarDashboard from "@/components/dashboard/Navbardashboard";
import JamuCard from "@/components/dashboard/JamuCard";
import { useSearchParams } from "next/navigation";

// Data jamu lengkap
const jamuData = [
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
  {
    id: 4,
    name: "Sari Delima",
    image: "/images/jamu4.jpg",
    rating: 4.6,
    benefits: ["Menjaga kesehatan jantung", "Antioksidan tinggi"],
    ingredients: ["Buah delima 2 buah", "Gula secukupnya"],
    steps: ["Peras buah delima", "Tambahkan gula", "Aduk rata dan sajikan"],
  },
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
];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<typeof jamuData>([]);

  useEffect(() => {
    const filtered = jamuData.filter((jamu) =>
      jamu.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Hasil Pencarian: "{query}"</h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((jamu) => (
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
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          Tidak ada jamu yang ditemukan untuk kata kunci "{query}".
        </p>
      )}
    </>
  );
}

export default function SearchResultsPage() {
  return (
    <div className="min-h-screen bg-[#FFFBEA]">
      <NavbarDashboard />

      <div className="pt-32 px-8">
        <Suspense fallback={<div className="text-center p-8">Loading search results...</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
