'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      {/* === NAVBAR === */}
      
      <nav className="fixed top-0 left-0 w-full h-20 bg-white flex items-center justify-between px-10 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-4 transform -translate-x-28 md:-translate-x-32">
              <img src="/images/jamu-logo.png" alt="Logo" className="w-16 h-16 md:w-20 md:h-20" />
              <div className="leading-tight">
                <h1 className="text-2xl md:text-3xl font-extrabold italic text-[#B6771D]" style={{ fontFamily: 'Inter' }}>
                  Jamu Kita
                </h1>
                <p className="text-sm md:text-base text-[#B6771D]" style={{ fontFamily: 'Josefin Sans' }}>
                  Herbal Indonesia
                </p>
              </div>
            </div>

            {/* Menu */}
            <div className="flex items-center gap-10 transform md:translate-x-44 lg:translate-x-64">
              <a
                href="/beranda"
                className="text-[#B6771D] font-bold text-xl md:text-2xl"
                style={{ fontFamily: 'Inter' }}>
                Beranda
              </a>

              {/* === SEJARAH langsung masuk tanpa popup === */}
              <Link
                href="/sejarahlanding"
                className="text-[#B6771D] font-bold text-xl md:text-2xl"
                style={{ fontFamily: 'Inter' }}
              >
                Sejarah
              </Link>

              <a
                href="/aboutlanding"
                className="text-[#B6771D] font-bold text-xl md:text-2xl"
                style={{ fontFamily: 'Inter' }}>
                About us
              </a>

              <Link href="/login">
                <button
                  className="bg-[#B6771D] text-white px-8 py-3 rounded-lg font-bold text-xl md:text-2xl shadow-sm hover:shadow-lg transition"
                  style={{ fontFamily: 'Inter' }}
                >
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

    </>
  );
}
