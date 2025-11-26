"use client";

import { useState } from "react";
import { articles, Article } from "@/data/Articles";

export default function BlogSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openArticle = (article: Article) => {
    setActiveArticle(article);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-[#026301] mb-3">Cari Artikel</h3>
        <input
          type="text"
          placeholder="Ketik kata kunci..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {searchQuery && (
          <div className="mt-4 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((article) => (
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
              <p className="text-gray-500 text-sm mt-2">Tidak ada artikel ditemukan</p>
            )}
          </div>
        )}
      </div>

      {/* Top News */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-[#026301] mb-3">Top News</h3>
        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {articles.map((article) => (
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

      {/* Popup Detail */}
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

            <p className="text-lg leading-8">
              {activeArticle.content || activeArticle.excerpt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
