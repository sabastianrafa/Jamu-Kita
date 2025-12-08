"use client";

import Image from "next/image";

interface ProfileCardProps {
  activeTab: string;
  setActiveTab: (tab: "saved" | "reviews") => void;
  user: { nama: string; email: string } | null;
  savedCount: number;
  reviewsCount: number;
}

export default function ProfileCard({ activeTab, setActiveTab, user, savedCount, reviewsCount }: ProfileCardProps) {

  return (
    <div className="w-full md:w-[350px] bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <div className="flex flex-col items-center text-center">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/4/40/Bahlil_Lahadalia%2C_Menteri_ESDM_%282024%29.jpg"
          width={120}
          height={120}
          className="rounded-full object-cover w-20 h-20 sm:w-28 sm:h-28 md:w-[120px] md:h-[120px]"
          alt="User profile"
        />

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-3 sm:mt-4">{user?.nama || "Pengguna"}</h2>
        <p className="text-sm text-gray-600">{user?.email}</p>

        <div className="mt-4 sm:mt-6 w-full space-y-2 sm:space-y-3">
          <button
            onClick={() => setActiveTab("saved")}
            className={`w-full border border-green-700 rounded-xl py-2.5 sm:py-3 font-medium text-sm sm:text-base transition ${
              activeTab === "saved" ? "bg-green-700 text-white" : "hover:bg-green-50"
            }`}
          >
            Tersimpan ({savedCount})
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`w-full border border-green-700 rounded-xl py-2.5 sm:py-3 font-medium text-sm sm:text-base transition ${
              activeTab === "reviews" ? "bg-green-700 text-white" : "hover:bg-green-50"
            }`}
          >
            Ulasan ({reviewsCount})
          </button>
        </div>
      </div>
    </div>
  );
}
