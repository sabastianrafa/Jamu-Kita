'use client';

import { useState, useEffect, useRef } from "react";
import { FaSearch, FaStar, FaChevronDown, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavbarDashboard() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("Semua");
  const [mounted, setMounted] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Klik di luar popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  const recentSearch = ["Asam Jawa", "Pelangsing Badan", "Kesehatan Kulit"];
  const topSearch = [
    { name: "Beras Kencur", img: "/images/jamu2.jpg", rating: 5 },
    { name: "Kunyit Asam", img: "/images/jamu1.jpg", rating: 4.5 },
    { name: "Temulawak", img: "/images/jamu3.jpg", rating: 4.8 },
  ];
  const filters = ["Semua", "Manfaat", "Bahan Jamu", "Gejala Kesehatan"];

  const handleSearch = (searchQuery: string, selectedFilter?: string) => {
    if (searchQuery.trim() !== "") {
      const params = new URLSearchParams();
      params.set("q", searchQuery);
      if (selectedFilter) params.set("filter", selectedFilter);
      router.push(`/search?${params.toString()}`);
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-[#FFF8A6] flex items-center justify-between px-10 shadow-md z-50">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/images/jamu-logo.png" className="h-14" alt="Logo" />
        <p className="font-bold text-xl text-[#8E6C1A]">Jamu Kita</p>
      </div>

      {/* Search Bar */}
      <div className="relative w-[40%] z-40">
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow">
          <input
            type="text"
            placeholder="Cari Jamu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query, filter)}
            className="w-full outline-none"
          />
          <FaSearch
            className="text-gray-600 cursor-pointer"
            onClick={() => handleSearch(query, filter)}
          />
        </div>

        {/* Popup */}
        {isOpen && (
          <div
            ref={popupRef}
            className="absolute top-full mt-3 w-full bg-white rounded-xl shadow-xl z-30 flex p-4 gap-6 max-h-[400px] overflow-auto"
          >

            {/* Left: Recent & Top Search */}
            <div className="flex-1">
              <h3 className="font-bold mb-3 text-gray-700">Recent Search</h3>
              <ul className="space-y-2 mb-4">
                {recentSearch.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSearch(item, filter)}
                    className="p-2 rounded hover:bg-green-50 cursor-pointer transition"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="font-bold mb-3 text-gray-700">Top Search</h3>
              <div className="space-y-3">
                {topSearch.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSearch(item.name, filter)}
                    className="flex items-center gap-3 p-3 border rounded-xl hover:shadow-md transition cursor-pointer"
                  >
                    <Image
                      src={item.img}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                      alt={item.name}
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs">
                        {Array.from({ length: Math.floor(item.rating) }).map((_, i) => (
                          <FaStar key={i} />
                        ))}
                        <span className="text-gray-500 ml-1">{item.rating} / 5</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Filter */}
            <div className="w-[200px] border-l border-gray-200 pl-4">
              <h3 className="font-bold mb-3 text-gray-700">Filter</h3>
              <div className="flex flex-col gap-2">
                {filters.map((f, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(query || "", f)}
                    className={`px-4 py-2 rounded-lg text-left hover:bg-green-50 transition ${
                      filter === f ? "bg-green-700 text-white" : "bg-white text-gray-700"
                    }`}
                  >
                    {f} {filter === f && <FaChevronDown className="inline ml-2" />}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Menu / Profile */}
      <div className="flex items-center gap-10 font-semibold text-[#8E6C1A] z-50">
        <a href="/dashboard" className="hover:text-green-700 transition">Beranda</a>
        <a href="/sejarah" className="hover:text-green-700 transition">Sejarah</a>
        <a href="/about" className="hover:text-green-700 transition">About us</a>
        <FaUserCircle
          className="text-3xl cursor-pointer hover:text-green-700 transition"
          onClick={() => router.push("/profile")}
        />
      </div>
    </nav>
  );
}
