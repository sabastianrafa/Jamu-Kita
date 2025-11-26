"use client";

export default function AboutHero() {
  return (
   <section className="relative z-0 w-full py-28 px-6 bg-white text-[#3B2F0B] overflow-hidden">

      
      {/* Background pattern */}
      <img
        src="/img/ilustrasi-daun.png"
        className="absolute opacity-10 w-[550px] right-0 top-0 pointer-events-none z-0"
        alt="pattern"
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-6xl font-extrabold drop-shadow-md leading-tight">
            Tentang Jamu Kita
          </h1>
          <p className="mt-6 text-lg leading-relaxed opacity-90">
            Menjaga tradisi, meningkatkan kesehatan. Edukasi jamu & herbal Indonesia
            dalam pendekatan modern dan terpercaya.
          </p>

          <button className="mt-8 px-8 py-3 bg-[#8E6C1A] text-[#FFF8A6] font-bold rounded-xl shadow-lg hover:scale-105 transition">
            Jelajahi Lebih Dalam
          </button>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="/images/jamu-logo.png"
            alt="Foto Jamu"
            className="w-[420px] h-auto rounded-3xl shadow-2xl object-cover border-4 border-white/20 hover:scale-105 transition transform"
          />
        </div>
      </div>
    </section>
  );
}
