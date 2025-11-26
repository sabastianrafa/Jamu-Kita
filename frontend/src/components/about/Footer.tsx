"use client";

export default function Footer() {
  return (
    <footer className="relative w-full py-6 px-6 bg-white text-black overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
        
        <p className="text-lg font-semibold tracking-wide">
          Jamu Kita — Edukasi Herbal Nusantara
        </p>

        <p className="text-sm opacity-75 mt-2">
          Menjaga tradisi, meningkatkan kesehatan dengan bahan alami Indonesia.
        </p>

        <div className="w-full border-t border-white/20 mt-4 pt-4">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Jamu Kita. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
