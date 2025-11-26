"use client";

import { useState } from "react";
import {
  Leaf,
  HeartPulse,
  Users,
  Apple,
  Sprout,
  Flower,
  CupSoda,
  CookingPot,
} from "lucide-react";

const categories = [
  { id: 1, name: "Kesehatan", icon: HeartPulse },
  { id: 2, name: "Keluarga", icon: Users },
  { id: 3, name: "Buah", icon: Apple },
  { id: 4, name: "Rempah", icon: CookingPot },
  { id: 5, name: "Daun", icon: Leaf },
  { id: 6, name: "Akar", icon: Sprout },
  { id: 7, name: "Bunga", icon: Flower },
  { id: 8, name: "Minuman", icon: CupSoda },
];

export default function CategoryCarousel({
  onSelect,
}: {
  onSelect?: (cat: string) => void;
}) {
  const [active, setActive] = useState("Kesehatan");
  const [message, setMessage] = useState("");

  const handleSelect = (name: string) => {
    setActive(name);

    // Munculkan pesan bahwa kategori butuh login
    setMessage("🔒 Anda harus login untuk melihat data di kategori ini.");

    // tetap kirim ke parent (tidak error)
    onSelect?.(name);
  };

  return (
    <div className="w-60 sticky top-24">
      {/* BOX KATEGORI */}
      <div className="bg-white rounded-2xl shadow-lg border p-5">
        <h2 className="text-lg font-bold mb-4">Kategori</h2>

        <div className="flex flex-col gap-3 overflow-y-auto max-h-[65vh] pr-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = active === cat.name;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelect(cat.name)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-sm transition-all duration-200 w-full text-left
                  ${
                    isActive
                      ? "bg-green-600 text-white border-green-700 shadow-md scale-[1.03]"
                      : "bg-white hover:bg-green-100 border-gray-300"
                  }`}
              >
                <Icon size={20} className={isActive ? "text-white" : "text-green-700"} />
                <span className="font-medium">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PESAN LOGIN */}
      {message && (
        <div className="mt-4 bg-yellow-100 text-yellow-800 px-4 py-3 rounded-xl border border-yellow-300 shadow-sm text-sm">
          {message}
        </div>
      )}
    </div>
  );
}
