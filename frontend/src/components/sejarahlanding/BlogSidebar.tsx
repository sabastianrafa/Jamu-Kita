"use client";

import { useState, useEffect } from "react";
import { blogArticles } from "@/data/BlogArticles";

export default function BlogSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const filtered = blogArticles.filter((a: any) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openArticle = (article: any) => {
    setShowPopup(true);
    return;
  };

  const handleTyping = (text: string) => {
    setSearchQuery(text);
    setShowPopup(true);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-[#026301] mb-3">
          Cari Artikel
        </h3>

        <input
          type="text"
          placeholder="Ketik kata kunci..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          value={searchQuery}
          onChange={(e) => handleTyping(e.target.value)}
        />

        {searchQuery && (
          <div className="mt-4 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((article: any) => (
                <div
                  key={article.id}
                  className="bg-[#FAF8F1] p-3 rounded-lg shadow hover:shadow-md cursor-pointer transition"
                  onClick={() => openArticle(article)}
                >
                  <p className="text-xs text-gray-500">
                    {article.date} • {article.category}
                  </p>
                  <h4 className="font-semibold">{article.title}</h4>
                  <p className="text-sm text-gray-700">
                    {article.excerpt.slice(0, 60)}...
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm mt-2">
                Tidak ada artikel ditemukan
              </p>
            )}
          </div>
        )}
      </div>

      {/* Top News */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-[#026301] mb-3">
          Top News
        </h3>

        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {blogArticles.map((article: any) => (
            <div
              key={article.id}
              className="flex flex-col gap-1 bg-[#FAF8F1] p-2 rounded-lg shadow hover:shadow-md cursor-pointer transition"
              onClick={() => openArticle(article)}
            >
              <p className="text-xs text-gray-500">
                {article.date} • {article.category}
              </p>
              <h4 className="font-semibold">{article.title}</h4>
              <p className="text-sm text-gray-700">
                {article.excerpt.slice(0, 60)}...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-[#B6771D]">
              Anda harus login
            </h2>
            <p className="text-gray-700 mt-2 mb-6">
              Silakan login terlebih dahulu untuk membuka artikel dan mencari
              konten.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Tutup
              </button>

              <a href="/login">
                <button className="px-6 py-2 rounded-lg bg-[#B6771D] text-white hover:brightness-110">
                  Login
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
