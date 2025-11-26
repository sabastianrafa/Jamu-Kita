"use client";

import Image from "next/image";
import { FaHistory, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

interface Jamu {
  title: string;
  image: string;
  description: string;
  lastRead: string;
}

export default function ActivityCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeJamu, setActiveJamu] = useState<Jamu | null>(null);

  const jamuList: Jamu[] = [
    {
      title: "Kunyit Asam",
      image: "/images/jamu1.jpg",
      description: "Kunyit Asam adalah jamu tradisional untuk menjaga kesehatan dan memperlancar peredaran darah.",
      lastRead: "Dibaca 2 hari lalu",
    },
    {
      title: "Beras Kencur",
      image: "/images/jamu2.jpg",
      description: "Beras Kencur membantu meningkatkan stamina dan menjaga daya tahan tubuh secara alami.",
      lastRead: "Disimpan 4 hari lalu",
    },
    {
      title: "Temulawak",
      image: "/images/jamu3.jpg",
      description: "Temulawak bermanfaat untuk kesehatan hati dan pencernaan serta kaya antioksidan.",
      lastRead: "Dibuka minggu lalu",
    },
  ];

  const openPopup = (jamu: Jamu) => {
    setActiveJamu(jamu);
    setIsOpen(true);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="flex flex-col text-start">
        <h2 className="text-3xl font-bold mt-2 flex items-center gap-2 text-green-800">
          <FaHistory className="text-2xl" /> Activity
        </h2>
        <p className="text-sm opacity-60 mt-1">Riwayat aktivitas Anda</p>

        {/* Example History Items */}
        <div className="mt-8 w-full space-y-4">
          {jamuList.map((jamu, idx) => (
            <button
              key={idx}
              onClick={() => openPopup(jamu)}
              className="w-full flex items-center justify-between border border-green-700 rounded-xl py-4 px-4 font-medium hover:bg-green-50 transition text-sm"
            >
              <span className="flex items-center gap-4">
                <Image
                  src={jamu.image}
                  width={55}
                  height={55}
                  className="rounded-lg object-cover"
                  alt="jamu-item"
                />
                {jamu.title} – {jamu.lastRead}
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
            >
              &times;
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
