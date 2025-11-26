'use client';

import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminSidebar from '../../components/admin/AdminSidebar';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #FFFD8F 0%, rgba(250,214,145,0.9) 100%)'
    }}>
      <AdminNavbar />
      <div className="flex pt-24">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}