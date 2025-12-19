# GTAG Analytics - Quick Reference

## 🎯 Quick Start Commands

### Setup Backend
```bash
cd backend
npx prisma migrate dev --name add_analytics_events
npx prisma generate
npm run dev
```

### Setup Frontend
```bash
cd frontend
cp .env.example .env.local
# Add NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
npm run dev
```

### Test Everything
```bash
# Visit these URLs:
http://localhost:3001/admin/statistik    # Admin dashboard
http://localhost:3001/search?q=jamu      # Test search tracking
http://localhost:3001/resep/[id]         # Test recipe view tracking
```

## 📊 Statistics Dashboard Preview

```
┌──────────────────────────────────────────────────────────────────┐
│                    STATISTIK PENGUNJUNG                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────┐│
│  │Total         │ │Rata-rata     │ │Pengunjung    │ │Pengunjung││
│  │Pengunjung    │ │Harian        │ │Tertinggi     │ │Terendah │││
│  │              │ │              │ │              │ │         │││
│  │  12,189      │ │    406       │ │    612       │ │   245   │││
│  │30 hari       │ │pengunjung    │ │dalam sehari  │ │dalam    │││
│  │terakhir      │ │/hari         │ │              │ │sehari   │││
│  └──────────────┘ └──────────────┘ └──────────────┘ └─────────┘│
│                                                                  │
│  Grafik Pengunjung Harian (30 Hari Terakhir)                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 800 │                                                      │ │
│  │ 600 │        ╱╲     ╱╲                   ╱╲              │ │
│  │ 400 │   ╱╲  ╱  ╲   ╱  ╲   ╱╲    ╱╲      ╱  ╲     ╱╲      │ │
│  │ 200 │  ╱  ╲╱    ╲_╱    ╲_╱  ╲__╱  ╲____╱    ╲___╱  ╲    │ │
│  │   0 │_________________________________________________│ │
│  │     Sen  Kam  Min  Rab  Sab  Sel  Jum  Sen  Kam  Min │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────┐ ┌───────────────────────────┐  │
│  │ Kategori Paling Dicari     │ │ Jamu Paling Dicari        │  │
│  ├────────────────────────────┤ ├───────────────────────────┤  │
│  │ Kesehatan          92      │ │ Jamu Beras Kencur    154  │  │
│  │ Manfaat            75      │ │ Jamu Temulawak       122  │  │
│  │ Bahan              54      │ │ Jamu Kunir Madu       96  │  │
│  └────────────────────────────┘ └───────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagram

```
┌─────────────┐
│   User      │
│   Action    │
└──────┬──────┘
       │
       ├─────────────────────────────────┐
       │                                 │
       v                                 v
┌──────────────┐                 ┌──────────────┐
│   GTAG       │                 │   Frontend   │
│   (Google    │                 │   Tracking   │
│   Analytics) │                 │              │
└──────────────┘                 └──────┬───────┘
                                        │
                                        v
                                 ┌──────────────┐
                                 │   Backend    │
                                 │   API        │
                                 │   /analytics │
                                 └──────┬───────┘
                                        │
                                        v
                                 ┌──────────────┐
                                 │   MySQL      │
                                 │   Database   │
                                 │   (analytics_│
                                 │   events)    │
                                 └──────┬───────┘
                                        │
                                        v
                                 ┌──────────────┐
                                 │   Admin      │
                                 │   Dashboard  │
                                 │   /statistik │
                                 └──────────────┘
```

## 🎨 Color Scheme

```css
/* Statistic Cards */
Total Pengunjung:     Blue   (#3B82F6) - from-blue-50 to-blue-100
Rata-rata Harian:     Green  (#10B981) - from-green-50 to-green-100
Pengunjung Tertinggi: Purple (#8B5CF6) - from-purple-50 to-purple-100
Pengunjung Terendah:  Orange (#F97316) - from-orange-50 to-orange-100

/* Primary Brand */
Main Color:  #B6771D (Brown/Gold)
Background:  #FAF8F1 (Cream)
Text:        #29372A (Dark Green)
```

## 📱 Responsive Breakpoints

```
Mobile:  < 640px   - Single column cards, stacked tables
Tablet:  640-1024px - 2 column cards, side-by-side tables
Desktop: > 1024px  - 4 column cards, full layout
```

## 🔐 Access Control

```
Public Endpoints:
  POST /v1/analytics/log          ✅ Anyone can log events

Admin Endpoints:
  GET /v1/analytics/statistics    🔒 Admin only (JWT required)
  
Frontend Routes:
  /admin/statistik                🔒 Admin only (client-side check)
```

## 📦 Database Schema

```sql
analytics_events:
  - id: INT (PK, AUTO_INCREMENT)
  - eventType: VARCHAR(50)         # page_view, search, recipe_view, etc.
  - eventData: TEXT (JSON)         # Flexible event data
  - userId: INT (nullable)         # Optional user ID
  - sessionId: VARCHAR(255)        # Session identifier
  - ipAddress: VARCHAR(45)         # User IP (anonymize for privacy)
  - userAgent: TEXT                # Browser info
  - createdAt: DATETIME            # Timestamp
  
  Indexes:
    - eventType
    - createdAt
    - userId
```

## 🎯 Event Types

```javascript
// Implemented
'page_view'      - All page views
'search'         - Search queries
'recipe_view'    - Recipe detail views

// Ready to implement
'category_view'  - Category browsing
'favorite_add'   - Add to favorites
'favorite_remove'- Remove from favorites
'comment_add'    - Comment submission
'download'       - Recipe download
'share'          - Recipe share
```

## 📊 Metrics Calculated

```javascript
// Summary Metrics
totalVisitors    = COUNT(DISTINCT sessionId)
averageDaily     = totalVisitors / days
highestVisitors  = MAX(daily_visitors)
lowestVisitors   = MIN(daily_visitors)

// Trending Data
topCategories    = GROUP BY category, ORDER BY count DESC
topRecipes       = GROUP BY recipe, ORDER BY views DESC
topSearchTerms   = GROUP BY query, ORDER BY count DESC
```

## 🧪 Testing Checklist

```
□ Backend running on port 3000
□ Frontend running on port 3001
□ Database migration successful
□ Google Analytics ID configured
□ Admin login working
□ Search tracking working
□ Recipe view tracking working
□ Statistics page loading
□ Charts rendering correctly
□ Tables showing data
□ No console errors
```

## 🚀 Production Deployment

```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
npm start

# Environment variables
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
DATABASE_URL=mysql://user:pass@host:3306/jamukita
NODE_ENV=production
```

## 📈 Key Performance Indicators (KPIs)

```
User Engagement:
  - Daily Active Users (DAU)
  - Page Views per Session
  - Average Session Duration
  - Bounce Rate

Content Performance:
  - Top Recipes by Views
  - Top Categories by Searches
  - Search Success Rate
  - Recipe Interaction Rate

Growth Metrics:
  - New vs Returning Visitors
  - User Growth Rate
  - Content Growth Rate
  - Engagement Growth Rate
```

## 🎓 Best Practices

1. **Privacy First**: Anonymize sensitive data
2. **Performance**: Async tracking to not block UI
3. **Error Handling**: Silent failures for analytics
4. **Data Quality**: Validate event data
5. **Regular Cleanup**: Archive old data
6. **Monitor Costs**: Google Analytics quotas
7. **Documentation**: Keep tracking documented
8. **Testing**: Test in dev before production

## 📞 Support & Resources

- Google Analytics: https://analytics.google.com/
- Prisma Docs: https://www.prisma.io/docs
- Recharts: https://recharts.org/
- Next.js Analytics: https://nextjs.org/docs/app/building-your-application/optimizing/analytics

---
**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: December 19, 2025
