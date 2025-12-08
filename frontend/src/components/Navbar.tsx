"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Jika pathname belum tersedia (rendering sementara), jangan render navbar
  if (!pathname) return null;
  const is404 = pathname === "/404" || pathname.includes("/404");
  const isAuthRoute =
    pathname.toLowerCase() === "/login" ||
    pathname.toLowerCase() === "/register" ||
    pathname.toLowerCase().startsWith("/login") ||
    pathname.toLowerCase().startsWith("/register");

  if (is404 || isAuthRoute) return null;

  return (
    <nav className="top-0 z-50 h-16 bg-yellow-100 sticky w-full shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              src="/images/jamu-logo.png"
              alt="Logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="font-semibold text-[#b6770F] text-base sm:text-lg">
              Jamu Kita
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4 lg:space-x-8 items-center">
            <Link
              href="/beranda"
              className="font-bold text-[#B6771D] hover:text-[#945d15] transition-colors text-sm lg:text-base"
            >
              Beranda
            </Link>
            <Link
              href="/sejarah"
              className="font-bold text-[#B6771D] hover:text-[#945d15] transition-colors text-sm lg:text-base"
            >
              Sejarah
            </Link>
            <Link
              href="/about-us"
              className="font-bold text-[#B6771D] hover:text-[#945d15] transition-colors text-sm lg:text-base"
            >
              Tentang Kami
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2 lg:space-x-4">
                <a className="circler-full text-[#B6771D] hover:text-[#945d15] font-bold text-sm lg:text-base cursor-pointer" onClick={() => router.push("/profile")}>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                </a>
                <button
                  onClick={() => logout()}
                  className="bg-red-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-red-700 transition font-bold text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#B6771D] text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-[#945d15] transition font-bold text-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#B6771D] focus:outline-none p-2 hover:bg-yellow-200 rounded-lg transition"
              aria-label="Toggle menu"
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
        <div className="md:hidden bg-yellow-50 px-4 pt-2 pb-4 space-y-2 shadow-lg border-t border-yellow-200">
          <Link
            href="/beranda"
            onClick={() => setMenuOpen(false)}
            className="block text-[#B6771D] hover:bg-yellow-200 font-semibold py-3 px-3 rounded-lg transition"
          >
            Beranda
          </Link>
          <Link
            href="/sejarah"
            onClick={() => setMenuOpen(false)}
            className="block text-[#B6771D] hover:bg-yellow-200 font-semibold py-3 px-3 rounded-lg transition"
          >
            Sejarah
          </Link>
          <Link
            href="/about-us"
            onClick={() => setMenuOpen(false)}
            className="block text-[#B6771D] hover:bg-yellow-200 font-semibold py-3 px-3 rounded-lg transition"
          >
            Tentang Kami
          </Link>

          {isAuthenticated ? (
            <>
              <a
                className="rounded-lg text-[#B6771D] hover:bg-yellow-200 font-semibold py-3 px-3 block transition"
                onClick={() => {
                  router.push("/profile");
                  setMenuOpen(false);
                }}
              >
                <i className="mr-2 fas fa-user"></i>
              </a>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full bg-red-600 text-white text-center py-3 rounded-lg hover:bg-red-700 font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block bg-[#B6771D] text-white text-center py-3 rounded-lg hover:bg-[#945d15] font-semibold transition"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
