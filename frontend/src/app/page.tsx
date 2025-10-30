import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-yellow-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-100 to-green-100 py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 leading-snug">
              SEHAT DENGAN <br />
              <span className="text-green-700">JAMU ALAMI</span>
            </h1>
            <p className="text-lg mb-6 text-gray-700">
              Temukan kebaikan alam untuk menjaga kesehatan dan keseimbangan tubuh Anda
              melalui jamu tradisional Indonesia.
            </p>
            <Link
              href="#pilihan"
              className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg shadow hover:bg-green-800 transition"
            >
              MULAI SEKARANG
            </Link>
          </div>

          {/* Gambar Hero */}
          <div className="flex justify-center">
            <Image
              src="/images/jamu-hero.png"
              alt="Jamu Alami"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Pilihan Jamu Kita */}
      <section id="pilihan" className="py-14 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-10">
          Pilihan Jamu Kita
        </h2>

        <div className="space-y-10">
          {/* Card 1 */}
          <div className="bg-yellow-100 rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 items-center">
            <Image
              src="/images/jamu1.jpg"
              alt="Temukan Jamu"
              width={160}
              height={160}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Temukan Jamu yang Anda Butuhkan dalam Sekejap
              </h3>
              <p className="text-gray-700">
                Cukup dengan beberapa klik, Anda bisa menemukan jenis jamu yang sesuai
                dengan kebutuhan dan kondisi tubuh Anda.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-green-100 rounded-xl shadow p-6 flex flex-col md:flex-row-reverse gap-6 items-center">
            <Image
              src="/images/jamu2.jpg"
              alt="Pelajari Jamu"
              width={160}
              height={160}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Pelajari Jamu Secara Mendalam
              </h3>
              <p className="text-gray-700">
                Setiap jenis jamu memiliki manfaat unik. Pelajari kandungan dan khasiatnya
                agar Anda dapat memilih yang terbaik.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-yellow-100 rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 items-center">
            <Image
              src="/images/jamu3.jpg"
              alt="Solusi Kesehatan"
              width={160}
              height={160}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Solusi Jamu untuk Kesehatan Anda
              </h3>
              <p className="text-gray-700">
                Dapatkan rekomendasi jamu sesuai kebutuhan: daya tahan tubuh, pencernaan,
                relaksasi, dan lainnya.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-green-100 rounded-xl shadow p-6 flex flex-col md:flex-row-reverse gap-6 items-center">
            <Image
              src="/images/jamu4.jpg"
              alt="Kekayaan Tradisi"
              width={160}
              height={160}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Jelajahi Kekayaan Tradisi Herbal Nusantara
              </h3>
              <p className="text-gray-700">
                Kami berkomitmen melestarikan warisan herbal Indonesia melalui inovasi
                dan edukasi jamu alami.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-yellow-100 rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 items-center">
            <Image
              src="/images/jamu5.jpg"
              alt="Perawatan Anak"
              width={160}
              height={160}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Rawat Kesehatan Anak, Rawat Tradisi Nusantara
              </h3>
              <p className="text-gray-700">
                Perkenalkan jamu sejak dini untuk menjaga kesehatan keluarga sekaligus
                melestarikan budaya bangsa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yellow-200 text-center py-4 mt-10 text-gray-700">
        <p>© 2025 Jamu Kita. Semua Hak Dilindungi.</p>
      </footer>
    </main>
  );
}
