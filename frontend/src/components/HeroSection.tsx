'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // toggle visibility each time the hero section intersects
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full" style={{
      /* Make hero occupy viewport minus navbar (approx 4rem) and center content vertically */
      minHeight: 'calc(100vh - 4rem)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '4rem'
    }}>
      <div className="max-w-7xl mx-auto px-8 py-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 md:space-y-12 transform -translate-x-28 md:-translate-x-32 relative z-30`}>
            <h1 className={`text-7xl md:text-8xl font-black leading-tight ${visible ? 'hero-animate delay-150' : 'hero-init'}`} style={{fontFamily: 'Elsie'}}>
              <span className="block whitespace-nowrap">SEHAT DENGAN</span>
              <span className="block whitespace-nowrap">JAMU ALAMI</span>
            </h1>
            <p className={`${visible ? 'hero-animate delay-300' : 'hero-init'} text-xl md:text-2xl leading-relaxed`} style={{fontFamily: 'Poppins'}}>
              Jaga kesehatan Anda secara alami dengan mengandalkan khasiat jamu, resep tradisional yang telah teruji lintas generasi.
            </p>
            <button 
              className={`${visible ? 'hero-animate delay-10' : 'hero-init'} bg-[#FFFEC7] text-[#B6771D] px-14 py-5 rounded-full font-bold text-xl transition transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:bg-[#FFF5B8] focus:outline-none focus:ring-4 focus:ring-[#B6771D33]`}
              style={{
                fontFamily: 'Poppins'
              }}
            >
              MULAI JELAJAH
            </button>
          </div>
          
          <div className="relative flex justify-center">
              <div className="hidden md:block" />
          </div>
          {/* Large absolute image that extends past the text (behind it) */}
          <div className={`${visible ? 'hero-image-animate delay-300' : 'hero-init'} absolute top-1/2 right-4 md:right-[-180px] lg:right-[-260px] transform -translate-y-1/2 pointer-events-none`} style={{zIndex: 20}}>
            <div style={{width: 'min(1100px, 95vw)'}} className="rounded-3xl overflow-hidden">
              <img
                src="/images/jamu-hero.png"
                alt="Herbal Ingredients"
                className="w-full h-auto object-cover"
                style={{display: 'block'}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}