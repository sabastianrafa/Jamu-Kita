'use client';

import { useState } from 'react';

// ==========================
// TYPE DEFINITIONS
// ==========================

interface Posting {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  gambar: string | null;
  kategori: string[];
}

interface FormType {
  judul: string;
  deskripsi: string;
  tanggal: string;
  gambar: File | null;
  kategori: string[];
}

// Daftar kategori yang tersedia
const KATEGORI_OPTIONS = [
  'Kesehatan',
  'Keluarga', 
  'Buah',
  'Rempah',
  'Daun',
  'Akar',
  'Bunga',
  'Minuman'
];

export default function PostingPage() {
  const [postings, setPostings] = useState<Posting[]>([
    { 
      id: 1, 
      judul: 'Manfaat Jamu Kunyit', 
      deskripsi: 'Jamu kunyit memiliki banyak manfaat untuk kesehatan', 
      tanggal: '2024-01-15',
      gambar: null,
      kategori: ['Kesehatan', 'Rempah']
    },
    { 
      id: 2, 
      judul: 'Resep Jamu Tradisional', 
      deskripsi: 'Kumpulan resep jamu warisan nenek moyang', 
      tanggal: '2024-01-20',
      gambar: null,
      kategori: ['Kesehatan', 'Keluarga', 'Minuman']
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [formData, setFormData] = useState<FormType>({
    judul: '',
    deskripsi: '',
    tanggal: '',
    gambar: null,
    kategori: [],
  });

  // ==========================
  // MODAL HANDLER
  // ==========================

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditId(null);
    setFormData({
      judul: '',
      deskripsi: '',
      tanggal: '',
      gambar: null,
      kategori: [],
    });
    setPreviewImage(null);
  };

  const handleOpenEditModal = (posting: Posting) => {
    setIsEditMode(true);
    setEditId(posting.id);
    setFormData({
      judul: posting.judul,
      deskripsi: posting.deskripsi,
      tanggal: posting.tanggal,
      gambar: null,
      kategori: posting.kategori,
    });
    setPreviewImage(posting.gambar);
    setIsModalOpen(true);
  };

  // ==========================
  // FORM INPUT HANDLER
  // ==========================

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKategoriChange = (kategori: string) => {
    setFormData(prev => {
      const isSelected = prev.kategori.includes(kategori);
      if (isSelected) {
        return {
          ...prev,
          kategori: prev.kategori.filter(k => k !== kategori)
        };
      } else {
        return {
          ...prev,
          kategori: [...prev.kategori, kategori]
        };
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setFormData(prev => ({ ...prev, gambar: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ==========================
  // SUBMIT FORM
  // ==========================

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.kategori.length < 2) {
      alert('Pilih minimal 2 kategori!');
      return;
    }

    if (isEditMode && editId !== null) {
      setPostings(prev => prev.map(post => 
        post.id === editId 
          ? {
              ...post,
              judul: formData.judul,
              deskripsi: formData.deskripsi,
              tanggal: formData.tanggal,
              gambar: previewImage,
              kategori: formData.kategori,
            }
          : post
      ));
      alert('Postingan berhasil diupdate!');
    } else {
      const newPosting: Posting = {
        id: postings.length > 0 ? Math.max(...postings.map(p => p.id)) + 1 : 1,
        judul: formData.judul,
        deskripsi: formData.deskripsi,
        tanggal: formData.tanggal,
        gambar: previewImage,
        kategori: formData.kategori,
      };
      setPostings(prev => [...prev, newPosting]);
      alert('Postingan berhasil ditambahkan!');
    }

    handleCloseModal();
  };

  // ==========================
  // DELETE
  // ==========================

  const handleDelete = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
      setPostings(prev => prev.filter(post => post.id !== id));
      alert('Postingan berhasil dihapus!');
    }
  };

  // ==========================
  // RENDER
  // ==========================

  return (
    <div className="space-y-6">

      {/* HEADER IMAGE */}
      <div className="w-full h-32 rounded-2xl overflow-hidden">
        <img
          src="/image/gambar_1.png"
          alt="Herbs Header"
          className="w-full h-full object-cover"
        />
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#B6771D]" style={{ fontFamily: 'Inter' }}>
            POSTINGAN
          </h1>
          <button
            onClick={handleOpenModal}
            className="bg-[#B6771D] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#8B5A15] transition-colors"
            style={{ fontFamily: 'Inter' }}
          >
            + Tambah Postingan
          </button>
        </div>

        {/* TABLE */}
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-bold" style={{ fontFamily: 'Inter' }}>ID</th>
              <th className="p-4 text-left font-bold" style={{ fontFamily: 'Inter' }}>Gambar</th>
              <th className="p-4 text-left font-bold" style={{ fontFamily: 'Inter' }}>Judul</th>
              <th className="p-4 text-left font-bold" style={{ fontFamily: 'Inter' }}>Deskripsi</th>
              <th className="p-4 text-left font-bold" style={{ fontFamily: 'Inter' }}>Kategori</th>
              <th className="p-4 text-left font-bold" style={{ fontFamily: 'Inter' }}>Tanggal</th>
              <th className="p-4 text-left font-bold" style={{ fontFamily: 'Inter' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {postings.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  Belum ada postingan. Klik "Tambah Postingan" untuk menambah.
                </td>
              </tr>
            ) : (
              postings.map(post => (
                <tr key={post.id} className="border-b hover:bg-gray-50 align-top">
                  <td className="p-4">{post.id}</td>
                  <td className="p-4">
                    {post.gambar ? (
                      <img 
                        src={post.gambar} 
                        alt={post.judul}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-semibold">{post.judul}</td>
                  <td className="p-4 max-w-xs truncate">{post.deskripsi}</td>
                  <td className="p-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {post.kategori.map((kat, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-[#B6771D] bg-opacity-10 text-white text-xs rounded-full font-semibold whitespace-normal"
                        >
                          {kat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">{post.tanggal}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleOpenEditModal(post)}
                      className="text-blue-600 hover:underline mr-3 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:underline font-semibold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#B6771D]" style={{ fontFamily: 'Inter' }}>
                {isEditMode ? 'Edit Postingan' : 'Tambah Postingan Baru'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800 text-3xl font-bold">×</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* UPLOAD GAMBAR */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700" style={{ fontFamily: 'Inter' }}>
                  Upload Gambar
                </label>
                <div className="border-2 border-dashed border-[#B6771D] rounded-xl p-6 text-center">
                  {previewImage ? (
                    <div className="space-y-3">
                      <img src={previewImage} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData(prev => ({ ...prev, gambar: null }));
                        }}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Hapus Gambar
                      </button>
                    </div>
                  ) : (
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <input id="upload-gambar" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      <label htmlFor="upload-gambar" className="cursor-pointer text-[#B6771D] hover:text-[#8B5A15] font-semibold">Klik untuk upload gambar</label>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG hingga 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* JUDUL */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700" style={{ fontFamily: 'Inter' }}>
                  Judul Postingan *
                </label>
                <input
                  type="text"
                  name="judul"
                  required
                  value={formData.judul}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B6771D] focus:outline-none"
                  placeholder="Masukkan judul postingan"
                  style={{ fontFamily: 'Inter' }}
                />
              </div>

              {/* DESKRIPSI */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700" style={{ fontFamily: 'Inter' }}>
                  Deskripsi *
                </label>
                <textarea
                  name="deskripsi"
                  rows={6}
                  required
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B6771D] focus:outline-none resize-none"
                  placeholder="Masukkan deskripsi postingan"
                  style={{ fontFamily: 'Inter' }}
                />
              </div>

              {/* TANGGAL */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700" style={{ fontFamily: 'Inter' }}>
                  Tanggal Upload *
                </label>
                <input
                  type="date"
                  name="tanggal"
                  required
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B6771D] focus:outline-none"
                  style={{ fontFamily: 'Inter' }}
                />
              </div>

              {/* KATEGORI */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700" style={{ fontFamily: 'Inter' }}>
                  Kategori * (Pilih minimal 2)
                </label>
                <div className="grid grid-cols-2 gap-3 p-4 border-2 border-gray-300 rounded-lg">
                  {KATEGORI_OPTIONS.map((kategori) => (
                    <label key={kategori} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={formData.kategori.includes(kategori)}
                        onChange={() => handleKategoriChange(kategori)}
                        className="w-4 h-4 text-[#B6771D] border-gray-300 rounded focus:ring-[#B6771D]"
                      />
                      <span className="text-sm" style={{ fontFamily: 'Inter' }}>{kategori}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Terpilih: {formData.kategori.length} kategori
                  {formData.kategori.length > 0 && ` (${formData.kategori.join(', ')})`}
                </p>
              </div>

              {/* BUTTON */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  style={{ fontFamily: 'Inter' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#B6771D] text-white rounded-lg font-bold hover:bg-[#8B5A15] transition-colors"
                  style={{ fontFamily: 'Inter' }}
                >
                  {isEditMode ? 'Update Postingan' : 'Simpan Postingan'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
