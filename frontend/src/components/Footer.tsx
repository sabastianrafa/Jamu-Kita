'use client';

export default function Footer() {
  return (
    <footer className="mt-24 z-40" style={{
      position: 'relative'
    }}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <img src="/images/cup.png" alt="Cup Left" className="w-40 h-30" />
            <div className="h-px bg-[#B6771D] flex-1"></div>
          </div>
          
          <div className="px-8">
            <img src="/images/jamu-logo.png" alt="Logo" className="w-25 h-30" />
          </div>
          
          <div className="flex items-center gap-4 flex-1">
            <div className="h-px bg-[#B6771D] flex-1"></div>
            <img src="/images/cup.png" alt="Cup Right" className="w-40 h-30" />
          </div>
        </div>
        
        <div className="text-center mt-4">
          <div className="inline-block bg-white px-6 py-2 rounded-full">
            <p className="text-[#B6771D] font-semibold" style={{fontFamily: 'Inter'}}>
              Copyright © Jamu Kita 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}