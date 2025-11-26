"use client";

import { useState } from "react";
import NavbarDashboard from "@/components/dashboard/Navbardashboard";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileCard from "@/components/profile/ProfileCard";
import ActivityCard from "@/components/profile/ActivityCard";
import AccountSettings from "@/components/profile/AccountSettings";
import SavedList from "@/components/profile/SavedList";
import ReviewsList from "@/components/profile/ReviewsList";


export default function ProfilePage() {
  // Tab kanan atas: activity / settings
  const [activeTab, setActiveTab] = useState<"activity" | "settings">("activity");

  // Tab kiri: saved / reviews
  const [leftTab, setLeftTab] = useState<"saved" | "reviews" | null>(null);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <NavbarDashboard />

      <div className="pt-32 w-[90%] max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT – PROFILE NAVIGATION */}
          <div className="md:w-[30%]">
            <ProfileCard activeTab={leftTab ?? ""} setActiveTab={setLeftTab} />
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="flex-1">
            
            {/* Top Right Tabs */}
            <ProfileTabs 
              activeTab={activeTab} 
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setLeftTab(null); // Reset left tab saat klik kanan
              }} 
            />

            <div className="bg-white p-8 rounded-2xl shadow-xl min-h-[500px] mt-6">
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
