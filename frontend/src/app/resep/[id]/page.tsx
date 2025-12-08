"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiService, Resep } from "@/lib/api";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowLeft, faBook } from "@fortawesome/free-solid-svg-icons";

export default function ResepDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [resep, setResep] = useState<Resep | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchResepDetail(params.id as string);
    }
  }, [params.id]);

  const fetchResepDetail = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.getResepDetail(id);
      console.log("[ResepDetail] API Response:", response);

      if (response.success && response.data) {
        setResep(response.data);
      } else {
        setError(response.message || "Resep tidak ditemukan");
      }
    } catch (err) {
      console.error("[ResepDetail] Error:", err);
      setError("Terjadi kesalahan saat memuat resep");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#4C763B] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Memuat resep...</p>
        </div>
      </div>
    );
  }

  if (error || !resep) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <span className="text-6xl">😕</span>
          <h2 className="mt-4 text-2xl font-bold text-gray-700">Resep Tidak Ditemukan</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => router.push("/beranda")}
            className="mt-6 rounded-full bg-[#4C763B] px-6 py-3 text-white hover:brightness-110"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f1]">
      {/* Header */}
      <div className="bg-[#4C763B] py-4">
        <div className="mx-auto max-w-[1200px] px-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:opacity-80"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            <span>Kembali</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Hero Image */}
          <div className="relative h-64 w-full bg-gradient-to-br from-green-50 to-yellow-50 sm:h-96">
            {resep.gambarURL ? (
              <Image
                src={resep.gambarURL}
                alt={resep.judul}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-9xl">🍵</span>
              </div>
            )}
            
            {/* Category Badge */}
            <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 font-semibold text-[#4C763B] shadow-lg">
              {resep.kategori.nama}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8">
            {/* Title and Rating */}
            <div className="mb-6">
              <h1 className="mb-3 text-3xl font-bold text-[#2f3e2a] sm:text-4xl">
                {resep.judul}
              </h1>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faStar} className="h-5 w-5 text-yellow-400" />
                <span className="text-lg font-semibold text-gray-700">
                  {resep.rataRataRating > 0 ? resep.rataRataRating.toFixed(1) : "Belum ada rating"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-3 text-xl font-bold text-[#4C763B]">Deskripsi</h2>
              <p className="text-gray-700 leading-relaxed">{resep.deskripsi}</p>
            </div>

            {/* Sumber Literatur */}
            {resep.sumberLiteratur && (
              <div className="mb-8 rounded-lg bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faBook} className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900">Sumber Literatur</h3>
                    <p className="text-sm text-blue-700">{resep.sumberLiteratur}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bahan */}
            {resep.bahan && resep.bahan.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold text-[#4C763B]">Bahan-Bahan</h2>
                <ul className="space-y-2">
                  {resep.bahan.map((bahan, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#4C763B]"></span>
                      <span className="text-gray-700">{bahan}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Langkah Pembuatan */}
            {resep.langkahPembuatan && resep.langkahPembuatan.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-bold text-[#4C763B]">Langkah Pembuatan</h2>
                <ol className="space-y-4">
                  {resep.langkahPembuatan.map((langkah, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#4C763B] text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="flex-1 pt-1 text-gray-700">{langkah}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
