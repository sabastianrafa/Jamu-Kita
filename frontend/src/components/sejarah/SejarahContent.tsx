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
    <div className="relative bg-[#FAF8F1] rounded-[20px] sm:rounded-[30px] mt-6 sm:mt-10 mx-auto w-[95%] sm:w-[92%] p-4 sm:p-6 md:p-10">
      {/* Background ilustrasi */}
      <img
        src="/images/1.png"
        alt="Background decoration"
        className="absolute w-[300px] sm:w-[450px] md:w-[650px] top-[80px] sm:top-[120px] right-[10%] sm:right-[20%] opacity-10 pointer-events-none hidden sm:block"
      />

      {/* Header Title */}
      <div className="text-center mt-3 sm:mt-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold italic text-[#026301] px-2">
          Sejarah & Tradisi Pengolahan Jamu Indonesia
        </h1>
        <p className="mt-2 text-sm sm:text-base md:text-[18px] opacity-60 px-2">
          Dipublikasikan pada 21 November 2025 • Kategori Budaya Herbal
        </p>
      </div>

      {/* Articles */}
      {sejarahArticles.map((article, idx) => (
        <div
          key={idx}
          className={`flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-10 md:mt-14 ${
            idx % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full md:w-[280px] lg:w-[350px] h-[250px] sm:h-[300px] md:h-[380px] rounded-[15px] sm:rounded-[20px] shadow-md object-cover"
          />
          <div className="flex-1">
            <h2
              className={`text-xl sm:text-2xl md:text-3xl italic mb-3 sm:mb-4 leading-tight sm:leading-[38px] ${
                idx % 2 === 1 ? "text-left md:text-left" : ""
              }`}
            >
              {article.title}
            </h2>
            <p
              className={`text-sm sm:text-base md:text-lg opacity-70 leading-relaxed sm:leading-[28px] md:leading-[30px] ${
                idx % 2 === 1 ? "text-left md:text-left" : ""
              }`}
            >
              {article.content.slice(0, 150)}...
            </p>
            <div className={`${idx % 2 === 1 ? "flex justify-start md:justify-start" : ""}`}>
              <button
                onClick={() => openArticle(article)}
                className="mt-3 sm:mt-4 text-sm sm:text-base md:text-[18px] font-bold text-[#026301] opacity-70 hover:underline"
              >
                Baca selengkapnya →
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Popup Detail Artikel */}
      {isOpen && activeArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-auto p-2 sm:p-4">
          <div className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-4xl shadow-lg p-4 sm:p-6 mt-4 sm:mt-10 md:mt-20 mb-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 text-black text-2xl sm:text-3xl font-bold hover:text-red-500 w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 pr-8">{activeArticle.title}</h2>
            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-3 sm:mb-4"
            />
            <p className="text-sm sm:text-base md:text-lg leading-relaxed sm:leading-7 md:leading-8">{activeArticle.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
