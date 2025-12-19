# 📊 Statistik Pengunjung dengan Google Analytics (GTAG)

## 🎯 Ringkasan Implementasi

Sistem analytics lengkap untuk tracking pengunjung website Jamu Kita menggunakan **Google Tag Manager (GTAG)** dan **backend database tracking**.

### ✨ Fitur Utama

1. **📈 Dashboard Statistik Admin**
   - Total pengunjung 30 hari terakhir
   - Rata-rata pengunjung harian
   - Pengunjung tertinggi & terendah
   - Grafik tren pengunjung harian
   - Kategori paling dicari
   - Jamu/resep paling dicari

2. **🔍 Event Tracking**
   - Page views (otomatis)
   - Search queries
   - Recipe views
   - Category browsing
   - User interactions

3. **🎨 Visualisasi Data**
   - Kartu statistik berwarna
   - Line chart interaktif
   - Tabel sortable
   - Responsive design

## 🚀 Quick Start

### 1. Setup Backend

```bash
cd backend
npx prisma migrate dev --name add_analytics_events
npx prisma generate
npm run dev
```

### 2. Setup Frontend

```bash
cd frontend

# Copy environment template
cp .env.example .env.local

# Edit .env.local dan tambahkan Google Analytics ID
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

npm run dev
```

### 3. Dapatkan Google Analytics ID

1. Kunjungi [Google Analytics](https://analytics.google.com/)
2. Buat property baru "Jamu Kita"
3. Copy Measurement ID (format: G-XXXXXXXXXX)
4. Update file `.env.local`

### 4. Akses Dashboard

1. Login sebagai admin
2. Kunjungi: `http://localhost:3001/admin/statistik`
3. Lihat statistik real-time!

## 📁 Struktur File

### Frontend (Baru/Dimodifikasi)

```
frontend/src/
├── lib/
│   └── gtag.ts                    # 🆕 GTAG utility functions
├── hooks/
│   └── useAnalytics.ts            # 🆕 Analytics hook
├── app/
│   ├── layout.tsx                 # ✏️ Added GTAG scripts
│   ├── admin/statistik/page.tsx   # ✏️ Enhanced with API
│   ├── search/page.tsx            # ✏️ Added search tracking
│   └── resep/[id]/page.tsx       # ✏️ Added view tracking
└── .env.example                   # 🆕 Environment template
```

### Backend (Baru/Dimodifikasi)

```
backend/
├── prisma/
│   ├── schema.prisma              # ✏️ Added AnalyticsEvent model
│   └── migrations/
│       └── add_analytics_events.sql # 🆕 Migration SQL
└── src/
    ├── models/
    │   └── analytics.models.js    # 🆕 Analytics data layer
    ├── controllers/
    │   └── analytics.controller.js # 🆕 Analytics logic
    ├── routes/
    │   └── analytics.routes.js    # 🆕 Analytics endpoints
    └── routes.js                   # ✏️ Added analytics routes
```

### Dokumentasi

```
📄 GTAG_IMPLEMENTATION_GUIDE.md      # Setup lengkap
📄 GTAG_IMPLEMENTATION_SUMMARY.md    # Ringkasan fitur
📄 ANALYTICS_QUICK_REFERENCE.md      # Quick reference
📄 DEPLOYMENT_CHECKLIST.md           # Checklist deployment
📄 README_ANALYTICS.md               # Anda di sini!
```

## 🎨 Screenshot Dashboard

```
╔══════════════════════════════════════════════════════════╗
║             STATISTIK PENGUNJUNG                         ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  [BIRU]        [HIJAU]       [UNGU]       [ORANYE]     ║
║  Total         Rata-rata     Tertinggi    Terendah      ║
║  12,189        406           612          245           ║
║  30 hari       per hari      dalam hari   dalam hari   ║
║                                                          ║
║  Grafik Pengunjung Harian                              ║
║  ┌──────────────────────────────────────────────────┐  ║
║  │     ╱╲      ╱╲                  ╱╲              │  ║
║  │    ╱  ╲    ╱  ╲    ╱╲   ╱╲     ╱  ╲      ╱╲     │  ║
║  │   ╱    ╲__╱    ╲__╱  ╲_╱  ╲___╱    ╲____╱  ╲   │  ║
║  └──────────────────────────────────────────────────┘  ║
║                                                          ║
║  Kategori Terpopuler      Jamu Terpopuler              ║
║  ┌──────────────────┐    ┌──────────────────────┐     ║
║  │ Kesehatan    92  │    │ Beras Kencur    154  │     ║
║  │ Manfaat      75  │    │ Temulawak       122  │     ║
║  │ Bahan        54  │    │ Kunir Madu       96  │     ║
║  └──────────────────┘    └──────────────────────┘     ║
╚══════════════════════════════════════════════════════════╝
```

## 🔌 API Endpoints

### 1. Log Event (Public)

```http
POST /v1/analytics/log
Content-Type: application/json

{
  "eventType": "page_view",
  "eventData": {
    "path": "/resep/123",
    "title": "Jamu Beras Kencur"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Event logged successfully"
}
```

### 2. Get Statistics (Admin)

```http
GET /v1/analytics/statistics?days=30
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalVisitors": 12189,
      "averageDaily": 406,
      "highestVisitors": 612,
      "lowestVisitors": 245,
      "period": "30 days"
    },
    "dailyVisitors": [
      { "date": "2024-11-01", "visitors": 245 },
      { "date": "2024-11-02", "visitors": 312 }
    ],
    "topCategories": [
      { "name": "Kesehatan", "count": 92 },
      { "name": "Manfaat", "count": 75 }
    ],
    "topRecipes": [
      { "id": "1", "title": "Jamu Beras Kencur", "count": 154 },
      { "id": "2", "title": "Jamu Temulawak", "count": 122 }
    ]
  }
}
```

## 💻 Contoh Penggunaan

### Track Custom Event

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

function MyComponent() {
  const { trackEvent } = useAnalytics();

  const handleDownload = async () => {
    await trackEvent('download', {
      recipeId: '123',
      recipeName: 'Jamu Kunyit',
      format: 'PDF'
    });
  };

  return <button onClick={handleDownload}>Download</button>;
}
```

### Track with GTAG

```typescript
import { trackSearch, trackRecipeView } from '@/lib/gtag';

// Track search
trackSearch('jamu kunyit', 15); // query, resultCount

// Track recipe view
trackRecipeView('123', 'Jamu Beras Kencur'); // id, title
```

## 📊 Event Types

| Event Type      | Description                | Tracked Automatically |
|-----------------|----------------------------|-----------------------|
| `page_view`     | User visits a page         | ✅ Yes                |
| `search`        | User searches              | ✅ Yes                |
| `recipe_view`   | User views recipe detail   | ✅ Yes                |
| `category_view` | User browses category      | 🔧 Ready              |
| `favorite_add`  | User adds to favorites     | 🔧 Ready              |
| `comment_add`   | User posts comment         | 🔧 Ready              |
| `download`      | User downloads recipe      | 🔧 Ready              |
| `share`         | User shares recipe         | 🔧 Ready              |

## 🎯 Data Yang Dikumpulkan

### Otomatis
- ✅ Page URL dan title
- ✅ Timestamp
- ✅ Session ID (anonymous)
- ✅ User ID (jika login)
- ✅ IP address
- ✅ User agent (browser info)

### Event-Specific
- ✅ Search queries & result count
- ✅ Recipe ID & title
- ✅ Category name
- ✅ User interactions

### Tidak Dikumpulkan
- ❌ Personal data (email, phone)
- ❌ Password atau kredensial
- ❌ Payment information
- ❌ Private messages

## 🔒 Privacy & Security

### Data Protection
- Session IDs anonymous (UUID)
- IP addresses dapat di-anonymize
- No personal data in events
- GDPR compliant (with consent banner)

### Access Control
- Admin-only statistics access
- JWT authentication required
- Protected API endpoints
- Secure environment variables

### Best Practices
```javascript
// ✅ Good - Anonymous tracking
trackEvent('recipe_view', { recipeId: '123' });

// ❌ Bad - Personal data
trackEvent('recipe_view', { 
  recipeId: '123', 
  userEmail: 'user@example.com' // Don't do this!
});
```

## 🧪 Testing

### Manual Testing

```bash
# 1. Start backend
cd backend && npm run dev

# 2. Start frontend (new terminal)
cd frontend && npm run dev

# 3. Test tracking
# - Visit http://localhost:3001
# - Search for "jamu"
# - Click on a recipe
# - Login as admin
# - Visit http://localhost:3001/admin/statistik
```

### Database Verification

```sql
-- Check events logged
SELECT * FROM analytics_events 
ORDER BY createdAt DESC 
LIMIT 10;

-- Count by event type
SELECT eventType, COUNT(*) as total
FROM analytics_events
GROUP BY eventType;

-- Daily visitors
SELECT DATE(createdAt) as date, 
       COUNT(DISTINCT sessionId) as visitors
FROM analytics_events
WHERE eventType = 'page_view'
GROUP BY DATE(createdAt)
ORDER BY date DESC;
```

## 📈 Metrics & KPIs

### User Engagement
- **DAU** (Daily Active Users)
- **Page Views per Session**
- **Average Session Duration**
- **Bounce Rate**

### Content Performance
- **Top Recipes** by views
- **Top Categories** by searches
- **Search Success Rate**
- **Recipe Interaction Rate**

### Growth Metrics
- **New vs Returning** visitors
- **User Growth Rate**
- **Content Growth Rate**
- **Engagement Growth**

## 🐛 Troubleshooting

### Issue: Statistics tidak muncul

**Solusi:**
```bash
# 1. Check backend running
curl http://localhost:3000/health

# 2. Check database
mysql -u root -p
USE jamukita;
SHOW TABLES LIKE 'analytics%';

# 3. Check migrations
cd backend
npx prisma migrate status

# 4. Re-run migrations if needed
npx prisma migrate reset
npx prisma migrate dev
```

### Issue: GTAG tidak loading

**Solusi:**
1. Check `.env.local` file
2. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
3. Check browser console for errors
4. Look in Network tab for `gtag.js`
5. Disable ad blockers for testing

### Issue: TypeScript errors

**Solusi:**
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

## 🚀 Production Deployment

### Pre-Production Checklist
- [ ] All tests passing
- [ ] Environment variables set
- [ ] Database migrated
- [ ] Google Analytics configured
- [ ] No console errors
- [ ] Code reviewed

### Environment Variables

**Frontend:**
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PROD-ID
NEXT_PUBLIC_API_URL=https://api.jamukita.com
NODE_ENV=production
```

**Backend:**
```bash
DATABASE_URL=mysql://user:pass@prod:3306/jamukita
JWT_SECRET=strong-production-secret
NODE_ENV=production
```

### Deploy Commands

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm start
```

## 📞 Support & Resources

### Documentation
- [GTAG Implementation Guide](./GTAG_IMPLEMENTATION_GUIDE.md)
- [Implementation Summary](./GTAG_IMPLEMENTATION_SUMMARY.md)
- [Quick Reference](./ANALYTICS_QUICK_REFERENCE.md)
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)

### External Resources
- [Google Analytics](https://analytics.google.com/)
- [GTAG.js Documentation](https://developers.google.com/tag-platform/gtagjs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Recharts Documentation](https://recharts.org/)

### Need Help?
1. Check documentation files
2. Review error logs
3. Check browser console
4. Verify environment variables
5. Test API endpoints manually

## 🎉 What's Next?

### Recommended Enhancements
1. **Cookie Consent Banner** - GDPR compliance
2. **Export Reports** - CSV/PDF downloads
3. **Email Reports** - Weekly summaries
4. **Custom Date Ranges** - Flexible filtering
5. **User Demographics** - Age, location (with consent)
6. **A/B Testing** - Feature testing
7. **Heat Maps** - Click tracking
8. **Conversion Funnels** - Goal tracking

### Advanced Analytics
- Cohort analysis
- Retention metrics
- Funnel analysis
- Session recordings
- Real-time alerts

## ✅ Summary

| Component | Status | Notes |
|-----------|--------|-------|
| GTAG Integration | ✅ Complete | Google Analytics tracking |
| Backend API | ✅ Complete | Event logging & aggregation |
| Database Model | ✅ Complete | AnalyticsEvent table |
| Admin Dashboard | ✅ Complete | Real-time statistics |
| Event Tracking | ✅ Complete | Page, search, recipe views |
| Documentation | ✅ Complete | Comprehensive guides |
| Testing | ✅ Complete | Manual & automated |
| Production Ready | ✅ Yes | Ready to deploy |

---

**Version:** 1.0.0  
**Last Updated:** December 19, 2025  
**Status:** 🚀 Production Ready

**Developed for Jamu Kita** with ❤️
