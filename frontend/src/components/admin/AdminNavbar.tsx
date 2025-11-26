'use client';

import { useRouter } from 'next/navigation';

export default function AdminNavbar() {
  const router = useRouter();
  
  // PERUBAHAN: Handler untuk pindah ke halaman profil admin
  const handleProfileClick = () => {
    router.push('/admin/profil');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-full px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img src="/images/jamu-logo.png" alt="Logo" className="w-16 h-16" />
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input 
                type="text"
                placeholder="Cari..."
                className="w-full px-6 py-3 rounded-full border-2 border-[#B6771D] focus:outline-none focus:border-[#8B5A15]"
                style={{fontFamily: 'Inter'}}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#B6771D] text-white p-3 rounded-full hover:bg-[#8B5A15] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Profile Icon - PERUBAHAN: Tambah onClick handler */}
          <button 
            onClick={handleProfileClick}
            className="w-12 h-12 rounded-full bg-[#B6771D] flex items-center justify-center hover:bg-[#8B5A15] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
