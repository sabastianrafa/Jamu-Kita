"use client";

import JamuCard from "./JamuCard";

export default function Recent() {
  // DATA STATIC – RECENT SEARCH
  const recentSearch = [
    {
      title: "Kunyit Asam",
      img: "/img/jamu1.jpg",
      rating: 4.9,
      searchedAt: "2 menit lalu",
      benefits: ["Meningkatkan imun", "Melancarkan pencernaan"],
      ingredients: ["Kunyit", "Asam Jawa", "Gula Merah"],
      steps: ["Rebus kunyit", "Tambahkan asam & gula", "Saring dan sajikan"]
    },
    {
      title: "Beras Kencur",
      img: "/img/jamu2.jpg",
      rating: 4.8,
      searchedAt: "10 menit lalu",
      benefits: ["Meredakan pegal linu", "Melancarkan pencernaan"],
      ingredients: ["Beras", "Kencur", "Gula Merah"],
      steps: ["Rendam beras", "Haluskan bahan", "Rebus & saring"]
    },
    {
      title: "Jahe Merah",
      img: "/img/jamu4.jpg",
      rating: 4.7,
      searchedAt: "Kemarin",
      benefits: ["Menghangatkan tubuh", "Meningkatkan imun"],
      ingredients: ["Jahe Merah", "Gula Merah"],
      steps: ["Cuci jahe", "Rebus jahe & gula", "Saring dan sajikan"]
    },
    {
      title: "Temulawak",
      img: "/img/jamu3.jpg",
      rating: 4.8,
      searchedAt: "2 hari lalu",
      benefits: ["Detoksifikasi", "Melancarkan pencernaan"],
      ingredients: ["Temulawak", "Jahe", "Gula Merah"],
      steps: ["Parut temulawak", "Rebus & saring"]
    }
  ];

  return (
    <div className="overflow-x-auto pb-2 mt-2 sm:mt-3">
      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold mb-3">🔍 Recent Pencarian Anda</h3>

      <div className="flex gap-4 w-max">
        {recentSearch.map((item, i) => (
          <div key={i}>
            <JamuCard
             index={i} 
              title={item.title}
              img={item.img}
              rating={item.rating}
              benefits={item.benefits}
              ingredients={item.ingredients}
              steps={item.steps}
            />

            {/* Info waktu pencarian */}
            <p className="text-sm text-gray-500 mt-1 ml-1">
              {item.searchedAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
