"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavbarDashboard() {
  const [showPopup, setShowPopup] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();       // cegah pindah halaman
    setShowPopup(true);       // tampilkan popup login
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

          <h2 className="text-2xl font-bold text-[#B6771D]">Jamu Kita</h2>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border rounded-lg px-4 py-2 w-64"
              placeholder="Cari artikel..."
            />
            <button
              type="submit"
              className="bg-[#B6771D] text-white px-5 py-2 rounded-lg hover:brightness-110"
            >
              Search
            </button>
          </form>
        </div>
      </nav>

      {/* === POPUP LOGIN === */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-[#B6771D]">Anda harus login</h2>
            <p className="text-gray-700 mt-2 mb-6">
              Silakan login terlebih dahulu untuk menggunakan fitur pencarian.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Tutup
              </button>

              <Link href="/login">
                <button className="px-6 py-2 rounded-lg bg-[#B6771D] text-white hover:brightness-110">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
