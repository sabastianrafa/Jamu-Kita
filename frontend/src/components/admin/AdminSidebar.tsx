'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  
  // PERUBAHAN: Ganti PROFIL jadi USER dengan path ke /admin/user
  const menuItems = [
    { name: 'STATISTIK', path: '/admin/statistik' },
    { name: 'USER', path: '/admin/user' },
    { name: 'SEJARAH', path: '/admin/sejarah' },
    { name: 'POSTING', path: '/admin/posting' },
    { name: 'REPORT', path: '/admin/laporan' },
  ];
  
  return (
    <aside className="w-64 bg-white rounded-3xl shadow-lg ml-6 p-8 h-fit sticky top-28">
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-6 py-3 rounded-lg font-bold text-lg transition-colors ${
              pathname === item.path
                ? 'bg-[#B6771D] text-white'
                : 'text-[#B6771D] hover:bg-[#FFFEC7]'
            }`}
            style={{fontFamily: 'Inter'}}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}