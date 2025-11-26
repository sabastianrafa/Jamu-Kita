"use client";

import JamuCardlanding from "./JamuCardlanding";

export default function Top7Carousel() {
  const data = [
    {
      title: "Kunyit Asam",
      img: "/img/jamu1.jpg",
      rating: 4.9,
      benefits: ["Meningkatkan imun", "Melancarkan pencernaan", "Menghangatkan tubuh"],
      ingredients: ["100 gr kunyit", "50 gr asam jawa", "Gula merah secukupnya", "Air 500ml"],
      steps: ["Cuci kunyit", "Rebus dengan air", "Tambahkan asam jawa & gula", "Saring & sajikan"]
    },
    {
      title: "Beras Kencur",
      img: "/img/jamu2.jpg",
      rating: 4.8,
      benefits: ["Meredakan pegal linu", "Meningkatkan nafsu makan", "Melancarkan pencernaan"],
      ingredients: ["100 gr beras", "150 gr kencur", "50 gr jahe", "150 gr gula merah", "3 sdm air asam jawa"],
      steps: ["Cuci dan rendam beras", "Haluskan beras & kencur", "Rebus dengan air & gula merah", "Tambahkan asam jawa", "Saring dan sajikan"]
    },
    {
      title: "Temulawak",
      img: "/img/jamu3.jpg",
      rating: 4.7,
      benefits: ["Meningkatkan nafsu makan", "Melancarkan pencernaan", "Membantu detoksifikasi"],
      ingredients: ["100 gr temulawak", "50 gr jahe", "Gula merah", "Air 500ml"],
      steps: ["Cuci temulawak", "Parut dan rebus dengan air", "Tambahkan gula merah", "Saring & sajikan"]
    },
    {
      title: "Jahe Merah",
      img: "/img/jamu4.jpg",
      rating: 4.8,
      benefits: ["Menghangatkan tubuh", "Meredakan masuk angin", "Meningkatkan imun"],
      ingredients: ["100 gr jahe merah", "50 gr gula merah", "Air 500ml"],
      steps: ["Cuci jahe", "Rebus dengan air & gula merah", "Saring & sajikan"]
    },
    {
      title: "Jamu Urat",
      img: "/img/jamu5.jpg",
      rating: 4.6,
      benefits: ["Meredakan pegal & nyeri otot", "Melancarkan peredaran darah"],
      ingredients: ["100 gr kunyit", "50 gr kencur", "50 gr jahe", "Gula merah", "Air 500ml"],
      steps: ["Cuci & haluskan bahan", "Rebus dengan air & gula merah", "Saring & sajikan"]
    },
  ];

  return (
    <div className="overflow-x-auto pb-2 mt-4">
      <div className="flex gap-4 w-max">
        {data.map((item, i) => (
          <JamuCardlanding
  key={i}
  index={i} // <--- tambahkan ini
  title={item.title}
  img={item.img}
  rating={item.rating}
  benefits={item.benefits}
  ingredients={item.ingredients}
  steps={item.steps}
/>

        ))}
      </div>
    </div>
  );
}
