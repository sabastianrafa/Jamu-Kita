"use client";

import { useState } from "react";
import { sejarahArticles, SejarahArticle } from "@/data/Sejarah";

export default function SejarahContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<SejarahArticle | null>(null);

  const openArticle = (article: SejarahArticle) => {
    setActiveArticle(article);
    setIsOpen(true);
  };

  return (
    <div className="relative bg-[#FAF8F1] rounded-[30px] mt-10 mx-auto w-[92%] p-10">
      {/* Background ilustrasi */}
      <img
        src="/images/1.png"
        className="absolute w-[650px] top-[120px] right-[20%] opacity-10 pointer-events-none"
      />

      {/* Header Title */}
      <div className="text-center mt-5">
        <h1 className="text-[40px] font-semibold italic text-[#026301]">
          Sejarah & Tradisi Pengolahan Jamu Indonesia
        </h1>
        <p className="mt-2 text-[18px] opacity-60">
          Dipublikasikan pada 21 November 2025 • Kategori Budaya Herbal
        </p>
      </div>

      {/* Articles */}
      {sejarahArticles.map((article, idx) => (
        <div
          key={idx}
          className={`flex flex-col md:flex-row gap-10 mt-14 ${
            idx % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <img
            src={article.image}
            className="w-full md:w-[350px] h-[380px] rounded-[20px] shadow-md object-cover"
          />
          <div className="flex-1">
            <h2
              className={`text-[32px] italic mb-4 leading-[38px] ${
                idx % 2 === 1 ? "text-right md:text-left" : ""
              }`}
            >
              {article.title}
            </h2>
            <p
              className={`text-[20px] opacity-70 leading-[30px] ${
                idx % 2 === 1 ? "text-right md:text-left" : ""
              }`}
            >
              {article.content.slice(0, 150)}...
            </p>
            <div className={`${idx % 2 === 1 ? "flex justify-end md:justify-start" : ""}`}>
              <button
                onClick={() => openArticle(article)}
                className="mt-4 text-[18px] font-bold text-[#026301] opacity-70 hover:underline"
              >
                Baca selengkapnya →
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Popup Detail Artikel */}
      {isOpen && activeArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-auto p-4">
          <div className="relative bg-white rounded-3xl w-full max-w-4xl shadow-lg p-6 mt-20">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-black text-2xl font-bold hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4">{activeArticle.title}</h2>
            <img
              src={activeArticle.image}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-lg leading-8">{activeArticle.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
