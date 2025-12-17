# 🔍 Search Feature Documentation

## Overview
Fitur search yang fully integrated dengan backend API, dilengkapi dengan filtering, sorting, dan tracking recent search.

## Frontend Implementation

### Search Page: `/search`
**File:** `frontend/src/app/search/page.tsx`

#### Features:
- ✅ **Real-time search** dari backend API
- ✅ **Protected route** - hanya untuk logged in users
- ✅ **Advanced filters:**
  - Filter by kategori
  - Filter by minimum rating
  - Sort by: Terbaru, Rating, Nama
- ✅ **Auto-save** to recent search
- ✅ **Loading states** dengan skeleton
- ✅ **Error handling** dengan retry
- ✅ **Empty state** dengan helpful tips

#### States:
```typescript
- results: Array<Resep>        // Search results from API
- loading: boolean              // Loading indicator
- error: string | null          // Error message
- kategoriList: Array          // Category options
- filters: SearchFilters       // Active filters
```

#### API Integration:
```typescript
// Menggunakan endpoint backend: /api/resep/search
const response = await apiService.searchResep({
  keyword: query,
  kategoriId: filters.kategoriId,
  minRating: filters.minRating,
  sortBy: filters.sortBy,
  sortOrder: filters.sortOrder,
  page: 1,
  limit: 50,
});
```

### Navbar Search
**File:** `frontend/src/components/Navbar.tsx`

#### Features:
- ✅ **Desktop:** Search bar di center navbar
- ✅ **Mobile:** Expandable search dengan icon
- ✅ **Auto-redirect** ke `/search?q=...`
- ✅ **Only visible** untuk logged in users

## Backend API

### Search Endpoint
**Route:** `GET /api/resep/search`

**Query Parameters:**
```
- keyword: string          // Search in judul, deskripsi, bahan, langkah
- kategoriId: number       // Filter by category
- minRating: number        // Minimum rating (e.g., 4.0)
- sortBy: string          // "createdAt" | "rating" | "judul"
- sortOrder: string       // "asc" | "desc"
- page: number            // Pagination
- limit: number           // Results per page
```

**Response:**
```json
{
  "success": true,
  "message": "Berhasil melakukan pencarian resep",
  "data": [
    {
      "id": "uuid",
      "judul": "Kunyit Asam",
      "deskripsi": "...",
      "gambarURL": "...",
      "kategori": {
        "id": 1,
        "nama": "Kesehatan"
      },
      "rataRataRating": 4.5
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 15,
    "totalPages": 1
  },
  "filters": {
    "keyword": "kunyit",
    "kategoriId": null,
    "minRating": null,
    "sortBy": "createdAt",
    "sortOrder": "desc"
  }
}
```

### Recent Search API
**Base Route:** `/api/recent-search`

#### Endpoints:
1. `GET /` - Get user's recent searches
2. `POST /` - Save search (body: `{query, resultCount}`)
3. `DELETE /:id` - Delete one search
4. `DELETE /` - Clear all searches

## User Flow

```
1. User login → Search box muncul di navbar
2. User ketik "kunyit" → submit
3. Redirect ke /search?q=kunyit
4. Frontend call API: GET /api/resep/search?keyword=kunyit
5. Backend search di judul, deskripsi, bahan, langkah
6. Return results dengan pagination
7. Auto-save to recent search via POST /api/recent-search
8. Display results dengan filter options
9. User apply filter (e.g., kategori = Kesehatan)
10. Re-fetch dengan query parameters tambahan
11. User click result → Modal dengan detail resep
```

## UI/UX Features

### Filter Panel
- **Kategori dropdown** - Load from API
- **Rating slider** - 3.0+ to 4.5+
- **Sort options** - Terbaru, Rating, Nama
- **Clear filters button** - Reset to default

### Search Results
- **Grid layout** - 2-4 columns responsive
- **Card hover** - Scale effect
- **Rating display** - ⭐ format
- **Default image** - Jika gambarURL null

### Loading States
- **Skeleton cards** - 8 cards pulsing
- **Smooth transition** - From loading to results

### Empty State
- **Friendly icon** - 🔍
- **Helpful message** - Tips untuk search
- **Suggestions** - Coba kata kunci lain

### Error State
- **Error message** - User-friendly
- **Retry button** - Reload search
- **Red accent** - Clear error indicator

## Performance Optimizations

1. **Debounced search** - (Future: add debounce)
2. **Lazy loading** - Images dengan Next.js Image
3. **Pagination** - Limit 50 per request
4. **Index-based queries** - Database indexed on judul, kategoriId
5. **Caching** - (Future: implement SWR/React Query)

## Security

- ✅ **Protected routes** - Authentication required
- ✅ **Input sanitization** - Backend trim & validate
- ✅ **SQL injection prevention** - Prisma ORM
- ✅ **XSS prevention** - React auto-escaping

## Future Enhancements

1. **Autocomplete** - Suggest while typing
2. **Search history dropdown** - Quick re-search
3. **Fuzzy search** - Typo tolerance
4. **Search analytics** - Track popular queries
5. **Infinite scroll** - Instead of pagination
6. **Voice search** - Web Speech API
7. **Image search** - Upload image to find similar
8. **Save search alerts** - Notify when new results

## Testing Scenarios

### Happy Path:
- [x] Search dengan keyword valid
- [x] Filter by kategori
- [x] Sort by rating
- [x] Save to recent search

### Edge Cases:
- [x] Empty query
- [x] No results found
- [x] Backend error
- [x] Network timeout
- [x] Invalid filter values

### Authentication:
- [x] Redirect to login if not authenticated
- [x] Search only available for logged users
- [x] Recent search tied to user account

---

**Last Updated:** December 18, 2025
**Status:** ✅ Production Ready
