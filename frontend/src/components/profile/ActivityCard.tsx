"use client";

import Image from "next/image";
import { FaHistory, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { ActivityHistory } from "@/lib/api";

interface ActivityCardProps {
  activity: ActivityHistory;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeJamu, setActiveJamu] = useState<{ title: string; image: string; description: string } | null>(null);

  const openPopup = (item: { title: string; image: string; description: string }) => {
    setActiveJamu(item);
    setIsOpen(true);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="flex flex-col text-start">
        <h2 className="text-3xl font-bold mt-2 flex items-center gap-2 text-green-800">
          <FaHistory className="text-2xl" /> Activity
        </h2>
        <p className="text-sm opacity-60 mt-1">Riwayat aktivitas Anda</p>

        <div className="mt-8 w-full space-y-4">
          {activity.favorites.length === 0 && activity.comments.length === 0 && (
            <p className="text-sm text-gray-600">Belum ada aktivitas.</p>
          )}

          {activity.favorites.map((fav) => (
            <button
              key={`fav-${fav.id}`}
              onClick={() =>
                openPopup({
                  title: fav.judul,
                  image: fav.gambarURL || "/images/jamu1.jpg",
                  description: fav.deskripsi,
                })
              }
              className="w-full flex items-center justify-between border border-green-700 rounded-xl py-4 px-4 font-medium hover:bg-green-50 transition text-sm"
            >
              <span className="flex items-center gap-4">
                <Image
                  src={fav.gambarURL || "/images/jamu1.jpg"}
                  width={55}
                  height={55}
                  className="rounded-lg object-cover"
                  alt="jamu-item"
                />
                {fav.judul} – Favorit
              </span>
              <FaChevronRight />
            </button>
          ))}

          {activity.comments.map((comment) => (
            <button
              key={`comment-${comment.id}`}
              onClick={() =>
                openPopup({
                  title: comment.judul,
                  image: "/images/jamu2.jpg",
                  description: comment.isiKomentar,
                })
              }
              className="w-full flex items-center justify-between border border-green-700 rounded-xl py-4 px-4 font-medium hover:bg-green-50 transition text-sm"
            >
              <span className="flex items-center gap-4">
                <Image
                  src="/images/jamu2.jpg"
                  width={55}
                  height={55}
                  className="rounded-lg object-cover"
                  alt="jamu-item"
                />
                {comment.judul} – Ulasan {comment.rating}/5
              </span>
              <FaChevronRight />
            </button>
          ))}
        </div>
      </div>

      {/* Popup Detail Jamu */}
      {isOpen && activeJamu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-auto p-4">
          <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-lg p-6 mt-20">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-black text-2xl font-bold hover:text-red-500"
              aria-label="Tutup detail aktivitas"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{activeJamu.title}</h2>
            <Image
              src={activeJamu.image}
              width={500}
              height={250}
              className="w-full h-64 object-cover rounded-lg mb-4"
              alt={activeJamu.title}
            />
            <p className="text-lg leading-8">{activeJamu.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
