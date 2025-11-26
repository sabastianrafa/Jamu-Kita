"use client";

export default function HistorySection() {
  return (
    <section className="w-full py-20 px-8 bg-[#FAF8F1]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <img
          src="/images/jamu1.jpg"
          className="rounded-2xl shadow-xl w-full object-cover hover:scale-105 transition"
        />

        <div>
          <h2 className="text-4xl font-bold text-[#026301] mb-4">
            Sejarah Jamu Kita
          </h2>
          <p className="text-gray-700 text-lg leading-[28px]">
            Jamu Kita berdiri tahun 2024 sebagai platform edukasi untuk memperkenalkan
            tanaman herbal Nusantara melalui metode modern dan ilmiah. Menggabungkan
            dokumentasi tradisi leluhur dengan teknologi, kami ingin membawa jamu
            Indonesia menuju era kesehatan masa depan.
          </p>
        </div>
      </div>
    </section>
  );
}
