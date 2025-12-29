"use client";

import Image from "next/image";

export default function TeamSection() {
  const team = [
    { name: "Irani Lutfiani Putri", role: "Project Manager & UI/UX Designer", img: "https://infokalteng.co/foto_berita/135642-dbb76965-0732-4b1b-bbe2-cbea751844c6.jpeg" },
    { name: "Safril Rendiantoro", role: "Project Manager & UI/UX Designer", img: "https://media.istockphoto.com/id/824860820/id/foto/kera-barbary.jpg?s=1024x1024&w=is&k=20&c=fljqHlJ9ZJKsGTFWQ_Z6JX6uSCuK3btHw9LDJNvasdk=" },
    { name: "Agung Cahyandi", role: "Frontend Developer", img: "https://akcdn.detik.net.id/community/media/visual/2017/12/06/6414c1ae-fcd1-49a6-8316-4a71c29f93ff_43.jpg?w=700&q=90" },
    { name: "Athallah Dzaki Anggoro Seputro", role: "Backend Developer", img: "https://i.pinimg.com/736x/51/81/50/5181504867608b81c9f5b848eb2c967e.jpg" },
  ];

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#FAF8F1]">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-[#026301]">Tim Kami</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
        {team.map((person, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-5 rounded-2xl shadow-lg text-center hover:scale-105 transition-all"
          >
            <Image
              src={person.img}
              alt={person.name}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full object-cover mb-3 sm:mb-4 shadow-md"
            />
            <h3 className="text-base sm:text-lg md:text-xl font-bold px-2">{person.name}</h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 px-2">{person.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
