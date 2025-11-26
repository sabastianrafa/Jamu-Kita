'use client';

import { useState } from 'react';

export default function UserPage() {
  // Data dummy user yang sudah register
  const [users, setUsers] = useState([
    { 
      id: 1, 
      nama: 'Budi Santoso', 
      email: 'budi@email.com', 
      tanggalDaftar: '2024-01-15',
      status: 'Aktif'
    },
    { 
      id: 2, 
      nama: 'Siti Nurhaliza', 
      email: 'siti@email.com', 
      tanggalDaftar: '2024-01-20',
      status: 'Aktif'
    },
    { 
      id: 3, 
      nama: 'Ahmad Fauzi', 
      email: 'ahmad@email.com', 
      tanggalDaftar: '2024-02-05',
      status: 'Nonaktif'
    },
    { 
      id: 4, 
      nama: 'Dewi Lestari', 
      email: 'dewi@email.com', 
      tanggalDaftar: '2024-02-10',
      status: 'Aktif'
    },
    { 
      id: 5, 
      nama: 'Rudi Hartono', 
      email: 'rudi@email.com', 
      tanggalDaftar: '2024-02-15',
      status: 'Aktif'
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header Image */}
      <div className="w-full h-32 rounded-2xl overflow-hidden">
        <img 
           src="/images/header.png"
          alt="Herbs Header" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#B6771D]" style={{fontFamily: 'Inter'}}>
            DATA USER TERDAFTAR
          </h1>
          <div className="text-lg font-semibold text-gray-600">
            Total User: <span className="text-[#B6771D]">{users.length}</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 font-bold" style={{fontFamily: 'Inter'}}>ID</th>
                <th className="text-left p-4 font-bold" style={{fontFamily: 'Inter'}}>Nama Lengkap</th>
                <th className="text-left p-4 font-bold" style={{fontFamily: 'Inter'}}>Email</th>
                <th className="text-left p-4 font-bold" style={{fontFamily: 'Inter'}}>Tanggal Daftar</th>
                <th className="text-left p-4 font-bold" style={{fontFamily: 'Inter'}}>Status</th>
                <th className="text-left p-4 font-bold" style={{fontFamily: 'Inter'}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4 font-semibold">{user.nama}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.tanggalDaftar}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.status === 'Aktif' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-red-600 hover:underline font-semibold">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total User</h3>
            <p className="text-3xl font-bold text-blue-600">{users.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">User Aktif</h3>
            <p className="text-3xl font-bold text-green-600">
              {users.filter(u => u.status === 'Aktif').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">User Nonaktif</h3>
            <p className="text-3xl font-bold text-red-600">
              {users.filter(u => u.status === 'Nonaktif').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}