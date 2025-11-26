"use client";

export default function VisionMission() {
  return (
    <section className="w-full py-20 px-8 bg-white">
      <h2 className="text-4xl font-bold text-center mb-14 text-[#026301]">
        Visi & Misi
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <div className="bg-green-100 p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-all">
          <h3 className="text-2xl font-semibold mb-3">Visi</h3>
          <p className="text-gray-700 leading-relaxed">
            Menjadi pusat informasi jamu modern terbesar di Indonesia berbasis sains dan tradisi nusantara.
          </p>
        </div>

        <div className="bg-yellow-100 p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-all">
          <h3 className="text-2xl font-semibold mb-3">Misi</h3>
          <ul className="list-disc ml-5 space-y-2 text-gray-700">
            <li>Mengedukasi masyarakat tentang kesehatan herbal.</li>
            <li>Melestarikan budaya jamu tradisional Indonesia.</li>
            <li>Mempermudah akses informasi akurat & terpercaya.</li>
            <li>Mempromosikan gaya hidup sehat berbasis alam.</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
