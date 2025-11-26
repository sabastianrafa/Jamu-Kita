"use client";

import Image from "next/image";
import { useState } from "react";

interface Jamu {
  title: string;
  image: string;
  description: string;
}

export default function SavedList() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeJamu, setActiveJamu] = useState<Jamu | null>(null);

  const savedJamu: Jamu[] = [
    {
      title: "Kunyit Asam",
      image: "/images/jamu1.jpg",
      description:
        "Kunyit Asam adalah jamu tradisional yang membantu menjaga kesehatan, melancarkan peredaran darah, dan meningkatkan daya tahan tubuh.",
    },
    {
      title: "Beras Kencur",
      image: "/images/jamu2.jpg",
      description:
        "Beras Kencur merupakan jamu yang membantu meningkatkan stamina, menjaga vitalitas, dan cocok dikonsumsi sehari-hari.",
    },
  ];

  const openPopup = (jamu: Jamu) => {
    setActiveJamu(jamu);
    setIsOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tersimpan</h2>

      <div className="space-y-4">
        {savedJamu.map((jamu, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-3 border rounded-xl hover:bg-green-50 cursor-pointer"
            onClick={() => openPopup(jamu)}
          >
            <Image
              src={jamu.image}
              width={60}
              height={60}
              className="rounded-lg object-cover"
              alt={jamu.title}
            />
            <p className="font-medium">{jamu.title}</p>
          </div>
        ))}
      </div>

      {/* Popup Detail */}
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
