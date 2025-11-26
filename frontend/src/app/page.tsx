import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CardsSection from '@/components/CardsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CardsSection />
      <Footer />
      <div className="h-32"></div>
    </div>
  );
}