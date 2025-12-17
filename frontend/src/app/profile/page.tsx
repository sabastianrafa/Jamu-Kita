"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileCard from "@/components/profile/ProfileCard";
import ActivityCard from "@/components/profile/ActivityCard";
import AccountSettings from "@/components/profile/AccountSettings";
import SavedList from "@/components/profile/SavedList";
import ReviewsList from "@/components/profile/ReviewsList";
import { useAuth } from "@/context/AuthContext";
import { apiService } from "@/lib/api";
import type { ActivityHistory, Resep } from "@/types";


export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading, user, refreshProfile } = useAuth();
  
  // Ambil UUID dari query parameter
  const uuid = searchParams.get("u");
  
  // Tab kanan atas: activity / settings
  const [activeTab, setActiveTab] = useState<"activity" | "settings">("activity");

  // Tab kiri: saved / reviews
  const [leftTab, setLeftTab] = useState<"saved" | "reviews" | null>(null);

  const [favorites, setFavorites] = useState<Resep[]>([]);
  const [activity, setActivity] = useState<ActivityHistory>({ favorites: [], comments: [] });
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Proteksi halaman - redirect ke login jika melihat profil sendiri (tanpa UUID) dan tidak terautentikasi
  useEffect(() => {
    console.log(isLoading, uuid, isAuthenticated)
    if (!isLoading && !uuid && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, uuid, router]);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!isAuthenticated) return;
      setIsDataLoading(true);
      setError(null);

      try {
        const [favRes, activityRes] = await Promise.all([
          apiService.getFavorites(),
          apiService.getActivityHistory(),
        ]);

        if (favRes.success && favRes.data) {
          setFavorites(favRes.data);
        } else {
          setError(favRes.message || "Gagal memuat favorit");
        }

        if (activityRes.success && activityRes.data) {
          setActivity(activityRes.data);
        } else {
          setError(activityRes.message || "Gagal memuat aktivitas");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat profil");
      } finally {
        setIsDataLoading(false);
      }
    };

    loadProfileData();
  }, [isAuthenticated]);

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

  if (isDataLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B6771D] mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">

          {/* LEFT – PROFILE NAVIGATION */}
          <div className="w-full md:w-[35%] lg:w-[30%]">
            <ProfileCard
              activeTab={leftTab ?? ""}
              setActiveTab={setLeftTab}
              user={user}
              savedCount={favorites.length}
              reviewsCount={activity.comments.length}
            />
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
              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              {/* Prioritas content: kiri > kanan */}
              {leftTab === "saved" && <SavedList favorites={favorites} />}
              {leftTab === "reviews" && <ReviewsList comments={activity.comments} />}
              {!leftTab && activeTab === "activity" && <ActivityCard activity={activity} />}
              {!leftTab && activeTab === "settings" && <AccountSettings user={user} onProfileUpdate={refreshProfile} />}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
