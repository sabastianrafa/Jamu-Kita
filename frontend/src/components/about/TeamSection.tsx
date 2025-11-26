"use client";

export default function TeamSection() {
  const team = [
    { name: "Irani Lutfiani Putri", role: "Project Manager & UI/UX Designer", img: "/img/team1.jpg" },
    { name: "Safril Rendiantoro", role: "Project Manager & UI/UX Designer", img: "/img/team2.jpg" },
    { name: "Agung Cahyandi", role: "Frontend Developer", img: "/img/team3.jpg" },
    { name: "Athallah Dzaki Anggoro Seputro", role: "Backend Developer", img: "/img/team4.jpg" },
  ];

  return (
    <section className="w-full py-20 px-8 bg-[#FAF8F1]">
      <h2 className="text-4xl font-bold text-center mb-12 text-[#026301]">Tim Kami</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {team.map((person, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-lg text-center hover:scale-105 transition-all"
          >
            <img
              src={person.img}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4 shadow-md"
            />
            <h3 className="text-xl font-bold">{person.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{person.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
