import AboutHero from "@/components/about/AboutHero";
import TeamSection from "@/components/about/TeamSection";
import Navbar from "@/components/Navbar";
import VisionMission from "@/components/about/VisionMision";
import HistorySection from "@/components/about/HistorySection";
import BenefitSection from "@/components/about/BenefitSection";
import Footer from "@/components/about/Footer";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[#FAF8F1]">
      <Navbar />
      <AboutHero />
      <HistorySection />
      <VisionMission />
       <BenefitSection />
      <TeamSection />
      <Footer />
    </main>
  );
}
