"use client";

import Image from "next/image";
import { Carousel, type CarouselImage } from "@/components/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faMortarPestle,
  faClock,
  faLeaf,
  faUsers,
  faAppleWhole,
  faStethoscope,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false;

type CategoryItem = { icon: any; label: string; active?: boolean };
type JamuItem = { name: string; image?: string; bg?: string; rating?: number };

const categoryItems: CategoryItem[] = [
  { icon: faStethoscope, label: "Kondisi Kesehatan" },
  { icon: faLeaf, label: "Manfaat" },
  { icon: faMortarPestle, label: "Jamu Rumahan", active: true },
  { icon: faUsers, label: "Families" },
  { icon: faAppleWhole, label: "Buah" },
];

const topJamu: JamuItem[] = [
  { name: "Teh Rosella", image: "/images/jamu-dummy.jpg#1", rating: 4.8 },
  { name: "Beras Kencur", bg: "/images/jamu-dummy.jpg#2", rating: 4.6 },
  { name: "Kunyit Asam", bg: "/images/jamu-dummy.jpg#3", rating: 4.9 },
  { name: "Temulawak", bg: "/images/jamu-dummy.jpg#4", rating: 4.7 },
  { name: "Sinom", bg: "/images/jamu-dummy.jpg#5", rating: 4.5 },
  { name: "Wedang Jahe", bg: "/images/jamu-dummy.jpg#6", rating: 4.6 },
  { name: "Jeruk Nipis Hangat", bg: "/images/jamu-dummy.jpg#7", rating: 4.4 },
];

const otherJamu: JamuItem[] = [
  { name: "Brotowali", bg: "/images/jamu-dummy.jpg#8", rating: 4.2 },
  { name: "Jahe Merah", bg: "/images/jamu-dummy.jpg#9", rating: 4.5 },
  { name: "Kunyit Segar", bg: "/images/jamu-dummy.jpg#10", rating: 4.1 },
  { name: "Temulawak Manis", bg: "/images/jamu-dummy.jpg#11", rating: 4.3 },
  { name: "Kayu Manis Hangat", bg: "/images/jamu-dummy.jpg#12", rating: 4.0 },
  { name: "Sambiloto", bg: "/images/jamu-dummy.jpg#13", rating: 3.9 },
  { name: "Daun Sirih", bg: "/images/jamu-dummy.jpg#14", rating: 4.0 },
];

const carouselImages: CarouselImage[] = [
  { src: "/images/jamu-hero.png#1", alt: "Hero jamu 1" },
  { src: "/images/jamu-hero.png#2", alt: "Hero jamu 2" },
  { src: "/images/jamu-hero.png#3", alt: "Hero jamu 3" },
];

function CategoryList({ items }: { items: CategoryItem[] }) {
  return (
    <aside className="rounded-xl border border-[#b9d5ea] bg-white shadow-sm">
      <h2 className="p-4 text-lg font-semibold text-[#29372a] sm:text-xl">Kategori</h2>
      <ul className="divide-y divide-gray-100">
        {items.map((item) => (
          <li
            key={item.label}
            className={
              item.active
                ? "flex items-center gap-3 px-4 py-3 bg-[#026301] text-white"
                : "flex items-center gap-3 px-4 py-3 text-[#29372a]"
            }
          >
            <span
              aria-hidden
              className={
                item.active
                  ? "grid size-6 place-items-center rounded text-white"
                  : "grid size-6 place-items-center rounded text-[#026301]"
              }
            >
              <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
            </span>
            <span className={item.active ? "text-sm font-semibold sm:text-[15px]" : "text-sm font-normal sm:text-[15px]"}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function JamuCard({ item }: { item: JamuItem }) {
  return (
    <div className="group relative w-[140px] shrink-0 sm:w-[150px]">
      <div className="relative h-40 overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 sm:h-48">
        <Image
          src={item.image ?? item.bg ?? "/images/image-8.png"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 140px, 150px"
        />

        {/* Label nama di atas (ribbon) */}
        <div className="absolute left-2 top-2 max-w-[80%] truncate rounded-md bg-[#ffe993] px-2 py-0.5 text-[11px] font-semibold text-[#3a2a00] shadow-sm sm:text-xs">
          {item.name}
        </div>

        {/* Badge rating kanan-bawah */}
        {typeof item.rating === "number" && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-white/90 px-1.5 py-0.5 text-[11px] font-semibold text-[#3a2a00] shadow ring-1 ring-black/5 sm:text-xs">
            <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-amber-400" />
            {item.rating.toFixed(1)}
          </div>
        )}
      </div>
    </div>
  );
}

function JamuSection({ top, others }: { top: JamuItem[]; others: JamuItem[] }) {
  return (
    <section className="relative z-10 rounded-2xl border border-gray-200 bg-white p-3 sm:p-4">
      <div className="mb-3 flex items-center gap-2">
        <Image src="/images/union.svg" alt="Union" width={20} height={20} className="sm:h-6 sm:w-6" />
        <h3 className="text-xs italic font-semibold text-[#29372a] sm:text-sm">TOP 7 Minggu Ini</h3>
      </div>

      <div className="mb-4 flex gap-3 overflow-x-auto sm:mb-6">
        {top.map((it) => (
          <JamuCard key={it.name} item={it} />
        ))}
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {others.map((it) => (
          <JamuCard key={it.name} item={it} />
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-white">
      {/* Header kuning + 1 carousel kecil sesuai desain */}
      <div className="w-full rounded-b-2xl bg-[#fffd8f] px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
        <div className="mx-auto max-w-[1200px]">
          <Carousel
            images={carouselImages}
            autoPlay
            interval={4500}
            loop
            height={"clamp(140px, 28vw, 260px)"} // kecil di mobile, proporsional di desktop
            rounded="rounded-xl"
            className="ring-1 ring-black/5"
            imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 900px, 1200px"
          />
        </div>
      </div>

      {/* Konten utama */}
      <section className="-mt-4 sm:-mt-6">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 rounded-2xl bg-[#faf8f1] px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 md:grid-cols-[260px_1fr]">
          <div>
            <CategoryList items={categoryItems} />
          </div>

          {/* Wrapper isolate agar watermark tetap di belakang dan tidak “tembus” */}
          <div className="relative isolate overflow-hidden">
            <JamuSection top={topJamu} others={otherJamu} />

            {/* Watermark/Maskot — posisi di belakang, transparan */}
            <Image
              src="/images/untitled-design-removebg-preview-1-7.png"
              alt=""
              width={360}
              height={360}
              className="pointer-events-none absolute right-2 top-2 -z-10 hidden h-auto w-[300px] opacity-10 md:block lg:right-4 lg:top-4 lg:w-[360px]"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}