# 📊 Dokumentasi Fitur TOP 7 Minggu Ini

## 🎯 Overview

Fitur **TOP 7 Minggu Ini** menampilkan 7 resep jamu paling populer dalam seminggu terakhir berdasarkan kombinasi rating, jumlah favorit, dan aktivitas pengguna minggu ini.

## 🏗️ Arsitektur

### Backend (Node.js + Prisma)

#### 1. Model Layer (`backend/src/models/resep.models.js`)

**Method Baru:** `getTop7Weekly()`

**Algoritma Scoring:**
```javascript
score = (rataRataRating × 0.4) + (totalFavorit × 0.3) + ((komentarMinggIni + favoritMinggIni) × 0.3)
```

**Bobot:**
- 40% - Rating rata-rata dari semua komentar
- 30% - Total jumlah favorit
- 30% - Aktivitas minggu ini (komentar + favorit dalam 7 hari terakhir)

**Fitur:**
- ✅ Menghitung data 7 hari terakhir
- ✅ Agregasi rating dari tabel komentar
- ✅ Agregasi favorit dari tabel favorit
- ✅ Tracking aktivitas minggu ini
- ✅ Sorting berdasarkan skor tertinggi
- ✅ Return top 7 resep dengan data lengkap

**Response Data:**
```typescript
{
  id: string;
  judul: string;
  deskripsi: string;
  gambarURL: string | null;
  kategori: {
    id: number;
    nama: string;
  };
  bahan: string[];
  langkahPembuatan: string[];
  rataRataRating: number;
  totalKomentar: number;
  totalFavorit: number;
}
```

#### 2. Controller Layer (`backend/src/controllers/resep.controller.js`)

**Endpoint:** `GET /api/resep/top/weekly`

**Handler:** `ResepController.getTop7Weekly`

**Response Format:**
```json
{
  "success": true,
  "message": "Berhasil mendapatkan TOP 7 resep minggu ini",
  "data": [...]
}
```

#### 3. Route Layer (`backend/src/routes/resep.routes.js`)

**Route Definition:**
```javascript
router.get("/top/weekly", ResepController.getTop7Weekly);
```

**Karakteristik:**
- ✅ Public endpoint (tidak memerlukan autentikasi)
- ✅ No rate limiting
- ✅ Posisi sebelum route `:id` untuk menghindari konflik

### Frontend (Next.js + TypeScript)

#### 1. API Service Layer (`frontend/src/lib/api.ts`)

**Method Baru:** `getTop7Weekly()`

**Configuration:**
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/v1";
```

**Usage:**
```typescript
const result = await apiService.getTop7Weekly();
```

#### 2. Component Layer

##### A. Top7Carousel (`frontend/src/components/dashboard/Top7Carousel.tsx`)

**Untuk:** User yang sudah login

**Features:**
- ✅ Auto-fetch data saat mount
- ✅ Loading state dengan skeleton
- ✅ Error handling dengan retry
- ✅ Empty state handling
- ✅ Horizontal scrollable carousel

**State Management:**
```typescript
const [data, setData] = useState<Resep[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

**UI States:**
1. **Loading**: Skeleton dengan 7 cards animasi pulse
2. **Error**: Pesan error dengan tombol "Coba lagi"
3. **Empty**: Pesan "Belum ada resep populer minggu ini"
4. **Success**: Carousel dengan JamuCard components

##### B. Top7Carousellanding (`frontend/src/components/dashboard/Top7Carousellanding.tsx`)

**Untuk:** User yang belum login (landing page)

**Differences:**
- Menggunakan `JamuCardlanding` component
- Styling sedikit berbeda (mt-4)
- Sama-sama fetch dari endpoint yang sama

#### 3. Integration di Beranda (`frontend/src/app/beranda/page.tsx`)

**Conditional Rendering:**
```tsx
{isLoggedIn ? <Top7Carousel /> : <Top7Carousellanding />}
```

## 📊 Data Flow

```
1. User membuka halaman beranda
   ↓
2. Component mount → useEffect triggered
   ↓
3. apiService.getTop7Weekly() called
   ↓
4. Fetch ke http://localhost:3000/v1/resep/top/weekly
   ↓
5. Backend: ResepController.getTop7Weekly()
   ↓
6. Model: ResepModel.getTop7Weekly()
   ↓
7. Query database (Resep + Komentar + Favorit)
   ↓
8. Calculate scores & sort
   ↓
9. Return top 7 results
   ↓
10. Frontend: Update state & render cards
```

## 🎨 UI/UX Features

### Loading State
- 7 skeleton cards dengan animasi pulse
- Warna: `bg-gray-200`
- Dimensi: `w-48 h-48`

### Error State
- ❌ Icon dengan pesan error
- Tombol "Coba lagi" untuk reload
- Warna: `text-red-600`

### Empty State
- Pesan informatif
- Warna: `text-gray-500`

### Success State
- Horizontal scroll carousel
- Gap antar card: `gap-4`
- Card component: JamuCard/JamuCardlanding

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=3000
DATABASE_URL="mysql://..."
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/v1
```

## 🧪 Testing

### Manual Testing Checklist

#### Backend
- [ ] GET /api/resep/top/weekly returns 200
- [ ] Response format sesuai spesifikasi
- [ ] Data terurut berdasarkan score
- [ ] Maksimal 7 resep
- [ ] Handle kasus database kosong

#### Frontend
- [ ] Loading state muncul saat fetch
- [ ] Data ditampilkan setelah fetch success
- [ ] Error handling bekerja (disconnect backend)
- [ ] Empty state muncul jika data kosong
- [ ] Carousel scrollable horizontal
- [ ] Responsive di berbagai ukuran layar

### Test Scenarios

1. **Happy Path**
   - Ada data resep di database
   - Ada komentar dan favorit
   - TOP 7 muncul dengan benar

2. **Edge Cases**
   - Database kosong → Empty state
   - Kurang dari 7 resep → Tampilkan semua yang ada
   - Backend error → Error state + retry button
   - Slow network → Loading state

3. **Data Calculation**
   - Resep dengan rating tertinggi prioritas tinggi
   - Resep dengan banyak favorit minggu ini naik ranking
   - Kombinasi score bekerja dengan benar

## 📈 Performance Considerations

### Backend
- ✅ Single query dengan include relations
- ✅ In-memory calculation (tidak ada multiple queries)
- ⚠️ Consider caching untuk high traffic (Redis)

### Frontend
- ✅ Lazy load images dengan Next.js Image
- ✅ Single fetch on mount
- ⚠️ Consider stale-while-revalidate pattern (SWR)
- ⚠️ Consider pagination untuk mobile

## 🚀 Deployment Checklist

- [ ] Set `NEXT_PUBLIC_API_URL` di production
- [ ] Verify CORS settings di backend
- [ ] Test dengan production API
- [ ] Check image URLs (absolute vs relative)
- [ ] Monitor API response time
- [ ] Set up error tracking (Sentry)

## 🔮 Future Enhancements

1. **Caching Strategy**
   - Redis cache untuk 5-10 menit
   - Invalidate saat ada komentar/favorit baru

2. **Real-time Updates**
   - WebSocket untuk live updates
   - Optimistic UI updates

3. **Personalization**
   - User-specific recommendations
   - Based on user's favorite categories

4. **Analytics**
   - Track click-through rate
   - A/B testing different scoring algorithms

5. **Gamification**
   - Badge untuk resep yang masuk TOP 7
   - Notifikasi ke pembuat resep

## 📝 Notes

- Route `/top/weekly` harus sebelum `/:id` untuk menghindari konflik
- Backend menggunakan Prisma ORM dengan MySQL
- Frontend menggunakan Next.js 14+ dengan App Router
- Semua komponen adalah Client Components (`"use client"`)

## 🤝 Contributing

Saat menambah fitur baru terkait TOP 7:
1. Update algoritma scoring di `resep.models.js`
2. Update response type di `api.ts`
3. Test dengan berbagai kondisi data
4. Update dokumentasi ini

---

**Last Updated:** December 17, 2025
**Version:** 1.0.0
