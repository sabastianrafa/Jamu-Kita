"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  // Jika pathname belum tersedia (rendering sementara), jangan render navbar
  if (!pathname) return null;
  const is404 = pathname === "/404" || pathname.includes("/404");
  const isAuthRoute = pathname.toLowerCase() === "/login" || pathname.toLowerCase() === "/register" || pathname.toLowerCase().startsWith("/login") || pathname.toLowerCase().startsWith("/register");

  if (is404 || isAuthRoute) return null;

  return (
    <nav className="top-0 z-50 h-16 bg-yellow-100 sticky w-full shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/images/jamu-logo.png"
              alt="Logo"
              className="w-8 h-8"
            />
            <span className="font-semibold text-brown-900 text-lg">Jamu Kita</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/"
              className="font-bold text-[#B6771D] hover:text-[#945d15]"
            >
              Beranda
            </Link>
            <Link
              href="#tentang"
              className="font-bold text-[#B6771D] hover:text-[#945d15]"
            >
              Sejarah
            </Link>
            <Link
              href="/about-us"
              className="font-bold text-[#B6771D] hover:text-[#945d15]"
            >
              Tentang Kami
            </Link>
            <Link
              href="/login"
              className="bg-[#B6771D] text-white px-4 py-2 rounded-lg hover:bg-[#945d15] transition font-bold"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-green-900 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-yellow-50 px-4 pt-2 pb-3 space-y-1 shadow">
          <Link
            href="/"
            className="block text-gray-800 hover:text-green-700 font-medium"
          >
            Beranda
          </Link>
          <Link
            href="#tentang"
            className="block text-gray-800 hover:text-green-700 font-medium"
          >
            Sejarah
          </Link>
          <Link
            href="/about-us"
            className="block text-gray-800 hover:text-green-700 font-medium"
          >
            Tentang Kami
          </Link>
          <Link
            href="/login"
            className="block bg-green-700 text-white text-center py-2 rounded-lg hover:bg-green-800 font-medium"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
