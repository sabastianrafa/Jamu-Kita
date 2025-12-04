"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileCard from "@/components/profile/ProfileCard";
import ActivityCard from "@/components/profile/ActivityCard";
import AccountSettings from "@/components/profile/AccountSettings";
import SavedList from "@/components/profile/SavedList";
import ReviewsList from "@/components/profile/ReviewsList";
import { useAuth } from "@/context/AuthContext";


export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Ambil UUID dari query parameter
  const uuid = searchParams.get("u");
  
  // Tab kanan atas: activity / settings
  const [activeTab, setActiveTab] = useState<"activity" | "settings">("activity");

  // Tab kiri: saved / reviews
  const [leftTab, setLeftTab] = useState<"saved" | "reviews" | null>(null);

  // Proteksi halaman - redirect ke login jika melihat profil sendiri (tanpa UUID) dan tidak terautentikasi
  useEffect(() => {
    if (!isLoading && !uuid && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, uuid, router]);

  // Tampilkan loading saat mengecek autentikasi
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B6771D] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Jangan render konten jika melihat profil sendiri tanpa login
  if (!uuid && !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />

      <div className="pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">

          {/* LEFT – PROFILE NAVIGATION */}
          <div className="w-full md:w-[35%] lg:w-[30%]">
            <ProfileCard activeTab={leftTab ?? ""} setActiveTab={setLeftTab} />
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="flex-1 min-w-0">
            
            {/* Top Right Tabs */}
            <ProfileTabs 
              activeTab={activeTab} 
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setLeftTab(null);
              }} 
            />

            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl min-h-[400px] sm:min-h-[500px] mt-4 sm:mt-6">
              {/* Prioritas content: kiri > kanan */}
              {leftTab === "saved" && <SavedList />}
              {leftTab === "reviews" && <ReviewsList />}
              {!leftTab && activeTab === "activity" && <ActivityCard />}
              {!leftTab && activeTab === "settings" && <AccountSettings />}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
