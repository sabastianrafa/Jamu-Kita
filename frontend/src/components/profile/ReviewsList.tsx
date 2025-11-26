"use client";

import Image from "next/image";

export default function ReviewsList() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Ulasan</h2>

      <div className="space-y-4">
        <div className="p-4 border rounded-xl hover:bg-green-50">
          <p className="font-medium">Kunyit Asam – "Sangat bermanfaat!"</p>
          <p className="text-sm opacity-60">Dibaca 2 hari lalu</p>
        </div>

        <div className="p-4 border rounded-xl hover:bg-green-50">
          <p className="font-medium">Beras Kencur – "Rasa enak dan segar"</p>
          <p className="text-sm opacity-60">Disimpan 4 hari lalu</p>
        </div>
      </div>
    </div>
  );
}
