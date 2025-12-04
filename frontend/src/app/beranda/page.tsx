"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar";
import BannerSlider from "@/components/dashboard/BannerSlider";
import CategoryCarousel from "@/components/dashboard/CategoryCarousel";
import CategoryCarouselNonLogin from "@/components/dashboard/CategoryCarouselNonLogin";
import Top7Carousel from "@/components/dashboard/Top7Carousel";
import Top7Carousellanding from "@/components/dashboard/Top7Carousellanding";
import RecentSearchCarousel from "@/components/dashboard/RecentSearchCarousel";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

config.autoAddCss = false;

export default function HybridPage() {
  const [selectedCategory, setSelectedCategory] = useState("Kesehatan");
  const { isAuthenticated } = useAuth();
  const isLoggedIn = isAuthenticated;

  return (
    <>
      {/* Navbar - hanya tampil jika sudah login */}
      {isLoggedIn && <Navbar />}

      <main className={`min-h-screen w-full bg-white ${isLoggedIn ? 'pt-20' : ''}`}>
        {/* Header kuning + Banner Slider */}
        <div className="w-full rounded-b-2xl bg-[#fffd8f] px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
          <div className="mx-auto max-w-[1200px]">
            <BannerSlider />
          </div>
        </div>

        {/* Konten utama */}
        <section className="-mt-4 sm:-mt-6">
          <div className="mx-auto flex max-w-[1200px] gap-4 rounded-2xl bg-[#faf8f1] px-4 py-4 sm:gap-6 sm:px-6 sm:py-6">
            
            {/* Sidebar Kategori - berbeda untuk login/non-login */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                <CategoryCarousel onSelect={setSelectedCategory} />
              ) : (
                <CategoryCarouselNonLogin onSelect={setSelectedCategory} />
              )}
            </div>

            {/* Main Content Area */}
            <div className="relative isolate overflow-hidden flex-1">
              
              {/* Recent Search Section - hanya untuk user yang sudah login */}
              {isLoggedIn && (
                <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-3 sm:p-4">
                  <RecentSearchCarousel />
                </section>
              )}

              {/* TOP 7 Section - berbeda untuk login/non-login */}
              <section className="relative z-10 rounded-2xl border border-gray-200 bg-white p-3 sm:p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Image src="/images/union.svg" alt="Union" width={20} height={20} className="sm:h-6 sm:w-6" />
                  <h3 className="text-xs italic font-semibold text-[#29372a] sm:text-sm">
                    TOP 7 Minggu Ini
                  </h3>
                </div>

                {isLoggedIn ? <Top7Carousel /> : <Top7Carousellanding />}
              </section>

              {/* Watermark/Maskot — posisi di belakang, transparan */}
              <Image
                src="/images/untitled-design-removebg-preview-1-7.png"
                alt=""
                width={360}
                height={360}
                className="pointer-events-none absolute right-2 top-2 -z-10 hidden h-auto w-[300px] opacity-10 md:block lg:right-4 lg:top-4 lg:w-[360px]"
                priority
              />
            </div>
          </div>
        </section>

        {/* Dev Tools - hapus di production */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsLoggedIn(! isLoggedIn)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            {isLoggedIn ? '🔓 Logout (Dev)' : '🔒 Login (Dev)'}
          </button>
        </div>
      </main>
    </>
  );
}