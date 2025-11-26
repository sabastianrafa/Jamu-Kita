"use client";

import { FaLeaf, FaBook, FaShieldAlt, FaPeopleCarry } from "react-icons/fa";

export default function BenefitSection() {
  const list = [
    { icon: <FaLeaf size={35} />, title: "Bahan Alami Terpercaya", desc: "Menggunakan informasi herbal asli Nusantara yang aman dan terbukti." },
    { icon: <FaBook size={35} />, title: "Edukasi Ilmiah", desc: "Konten berbasis riset, studi pustaka dan dokumentasi budaya." },
    { icon: <FaShieldAlt size={35} />, title: "Akurat & Terverifikasi", desc: "Informasi yang disusun oleh peneliti & praktisi jamu." },
    { icon: <FaPeopleCarry size={35} />, title: "Mendukung Pelestarian Budaya", desc: "Menjaga warisan leluhur dalam bentuk modern & relevan." },
  ];

  return (
    <section className="w-full py-20 px-8 bg-white">
      <h2 className="text-4xl font-bold text-center mb-14 text-[#026301]">Mengapa Memilih Jamu Kita?</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {list.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-[#FAF8F1] rounded-xl shadow-lg text-center hover:-translate-y-2 transition-all"
          >
            <div className="flex justify-center text-[#026301] mb-3">
              {item.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
