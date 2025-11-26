'use client';

export default function PostingPage() {
  const postings = [
    { id: 'Cell text', terlapor: 'Cell text', pelapor: 'Cell text', alasan: 'Cell text', aksi: '(Terima) (Tolak)' },
    { id: 'Cell text', terlapor: 'Cell text', pelapor: 'Cell text', alasan: 'Cell text', aksi: '(Terima) (Tolak)' },
    { id: 'Cell text', terlapor: 'Cell text', pelapor: 'Cell text', alasan: 'Cell text', aksi: '(Terima) (Tolak)' },
  ];

  return (
    <div className="space-y-6">
      <div className="w-full h-32 rounded-2xl overflow-hidden">
        <img 
           src="/images/header.png"
          alt="Herbs Header" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#B6771D] mb-6" style={{fontFamily: 'Inter'}}>
        REPORT
        </h1>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4 font-bold" style={{fontFamily: 'Inter'}}>ID</th>
              <th className="text-left p-4 font-bold" style={{fontFamily: 'Inter'}}>Terlapor</th>
              <th className="text-left p-4 font-bold" style={{fontFamily: 'Inter'}}>Pelapor</th>
              <th className="text-left p-4 font-bold" style={{fontFamily: 'Inter'}}>Alasan</th>
              <th className="text-left p-4 font-bold" style={{fontFamily: 'Inter'}}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {postings.map((post, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{post.id}</td>
                <td className="p-4">{post.terlapor}</td>
                <td className="p-4">{post.pelapor}</td>
                <td className="p-4">{post.alasan}</td>
                <td className="p-4">
                  <button className="text-green-600 hover:underline mr-3">Terima</button>
                  <button className="text-red-600 hover:underline">Tolak</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}