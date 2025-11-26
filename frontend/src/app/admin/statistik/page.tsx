'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StatistikPage() {
  // MODIFIKASI: Data pengunjung harian (30 hari terakhir)
  const chartData = [
    { tanggal: 'Sen 1', pengunjung: 245 },
    { tanggal: 'Sel 2', pengunjung: 312 },
    { tanggal: 'Rab 3', pengunjung: 289 },
    { tanggal: 'Kam 4', pengunjung: 401 },
    { tanggal: 'Jum 5', pengunjung: 478 },
    { tanggal: 'Sab 6', pengunjung: 523 },
    { tanggal: 'Min 7', pengunjung: 445 },
    { tanggal: 'Sen 8', pengunjung: 267 },
    { tanggal: 'Sel 9', pengunjung: 334 },
    { tanggal: 'Rab 10', pengunjung: 298 },
    { tanggal: 'Kam 11', pengunjung: 389 },
    { tanggal: 'Jum 12', pengunjung: 456 },
    { tanggal: 'Sab 13', pengunjung: 612 },
    { tanggal: 'Min 14', pengunjung: 534 },
    { tanggal: 'Sen 15', pengunjung: 278 },
    { tanggal: 'Sel 16', pengunjung: 345 },
    { tanggal: 'Rab 17', pengunjung: 312 },
    { tanggal: 'Kam 18', pengunjung: 423 },
    { tanggal: 'Jum 19', pengunjung: 501 },
    { tanggal: 'Sab 20', pengunjung: 589 },
    { tanggal: 'Min 21', pengunjung: 498 },
    { tanggal: 'Sen 22', pengunjung: 289 },
    { tanggal: 'Sel 23', pengunjung: 367 },
    { tanggal: 'Rab 24', pengunjung: 334 },
    { tanggal: 'Kam 25', pengunjung: 412 },
    { tanggal: 'Jum 26', pengunjung: 489 },
    { tanggal: 'Sab 27', pengunjung: 578 },
    { tanggal: 'Min 28', pengunjung: 512 },
    { tanggal: 'Sen 29', pengunjung: 301 },
    { tanggal: 'Sel 30', pengunjung: 378 },
  ];

  // Hitung statistik
  const totalPengunjung = chartData.reduce((sum, data) => sum + data.pengunjung, 0);
  const rataRataHarian = Math.round(totalPengunjung / chartData.length);
  const pengunjungTertinggi = Math.max(...chartData.map(d => d.pengunjung));
  const pengunjungTerendah = Math.min(...chartData.map(d => d.pengunjung));

  const kategoriData = [
    { nama: 'Kesehatan', pencarian: 92, aksi: 'Lihat Konten' },
    { nama: 'Manfaat', pencarian: 75, aksi: 'Lihat Konten' },
    { nama: 'Bahan', pencarian: 54, aksi: 'Lihat Konten' },
  ];

  const jamuData = [
    { nama: 'Jamu Beras Kencur', pencarian: 154, aksi: 'Cek Konten' },
    { nama: 'Jamu Temulawak', pencarian: 122, aksi: 'Cek Konten' },
    { nama: 'Jamu Kunir Madu', pencarian: 96, aksi: 'Cek Konten' },
  ];

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
        <h1 className="text-3xl font-bold text-[#B6771D] mb-6" style={{fontFamily: 'Inter'}}>
          STATISTIK PENGUNJUNG
        </h1>

        {/* MODIFIKASI: Statistics Cards - Pengunjung */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Pengunjung</h3>
            <p className="text-3xl font-bold text-blue-600">{totalPengunjung.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">30 hari terakhir</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Rata-rata Harian</h3>
            <p className="text-3xl font-bold text-green-600">{rataRataHarian.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">pengunjung/hari</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Pengunjung Tertinggi</h3>
            <p className="text-3xl font-bold text-purple-600">{pengunjungTertinggi.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">dalam sehari</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Pengunjung Terendah</h3>
            <p className="text-3xl font-bold text-orange-600">{pengunjungTerendah.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">dalam sehari</p>
          </div>
        </div>

        {/* MODIFIKASI: Chart Pengunjung Harian */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#B6771D] mb-4" style={{fontFamily: 'Inter'}}>
            Grafik Pengunjung Harian (30 Hari Terakhir)
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="tanggal" 
                tick={{ fontSize: 11 }}
                interval={2}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: 'Pengunjung', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '2px solid #B6771D',
                  borderRadius: '8px',
                  padding: '10px'
                }}
                labelStyle={{ fontWeight: 'bold', color: '#B6771D' }}
              />
              <Line 
                type="monotone" 
                dataKey="pengunjung" 
                stroke="#B6771D" 
                strokeWidth={3}
                dot={{ fill: '#B6771D', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-center text-gray-500 mt-2 font-semibold">
            November 2024
          </p>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-2 gap-6">
          {/* Kategori Table */}
          <div>
            <h2 className="text-xl font-bold text-[#B6771D] mb-4" style={{fontFamily: 'Inter'}}>
              Kategori yang Paling Sering dicari
            </h2>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3 font-bold" style={{fontFamily: 'Inter'}}>Nama Kategori</th>
                  <th className="text-left p-3 font-bold" style={{fontFamily: 'Inter'}}>Pencarian</th>
                  <th className="text-left p-3 font-bold" style={{fontFamily: 'Inter'}}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kategoriData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.nama}</td>
                    <td className="p-3">{item.pencarian}</td>
                    <td className="p-3 text-blue-600 cursor-pointer hover:underline">{item.aksi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Jamu Table */}
          <div>
            <h2 className="text-xl font-bold text-[#B6771D] mb-4" style={{fontFamily: 'Inter'}}>
              Jamu yang Paling Sering dicari
            </h2>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3 font-bold" style={{fontFamily: 'Inter'}}>Jamu</th>
                  <th className="text-left p-3 font-bold" style={{fontFamily: 'Inter'}}>Pencarian</th>
                  <th className="text-left p-3 font-bold" style={{fontFamily: 'Inter'}}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {jamuData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.nama}</td>
                    <td className="p-3">{item.pencarian}</td>
                    <td className="p-3 text-blue-600 cursor-pointer hover:underline">{item.aksi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}