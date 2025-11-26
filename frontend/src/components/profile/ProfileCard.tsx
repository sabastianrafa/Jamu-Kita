"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileCardProps {
  activeTab: string;
  setActiveTab: (tab: "saved" | "reviews") => void;
}

export default function ProfileCard({ activeTab, setActiveTab }: ProfileCardProps) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleLogout = () => {
    router.push("/"); // arahkan ke landing page
  };

  return (
    <div className="w-full md:w-[350px] bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/images/profile-photo.png"
          width={120}
          height={120}
          className="rounded-full object-cover"
          alt="User profile"
        />

        <h2 className="text-2xl font-semibold mt-4">Irani Lutfiani Putri</h2>

        <div className="mt-6 w-full space-y-3">
          <button
            onClick={() => setActiveTab("saved")}
            className={`w-full border border-green-700 rounded-xl py-3 font-medium transition ${
              activeTab === "saved" ? "bg-green-700 text-white" : "hover:bg-green-50"
            }`}
          >
            Tersimpan (10)
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`w-full border border-green-700 rounded-xl py-3 font-medium transition ${
              activeTab === "reviews" ? "bg-green-700 text-white" : "hover:bg-green-50"
            }`}
          >
            Ulasan (10)
          </button>

          {/* Logout Button */}
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="w-full border border-red-500 text-red-500 rounded-xl py-3 font-medium hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Popup Konfirmasi Logout */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Konfirmasi Logout</h3>
            <p className="mb-6">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Ya
              </button>
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
