# ✅ GTAG Analytics Implementation - Deployment Checklist

## 📋 Pre-Deployment Checklist

### 1. Database Migration
```bash
cd backend
□ npx prisma migrate dev --name add_analytics_events
□ npx prisma generate
□ Verify analytics_events table created
□ Check indexes are created
```

### 2. Environment Configuration

#### Frontend (.env.local)
```bash
cd frontend
□ Create .env.local from .env.example
□ Add NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
□ Verify NEXT_PUBLIC_API_URL if needed
```

#### Backend (.env)
```bash
cd backend
□ Verify DATABASE_URL is correct
□ Check JWT_SECRET is set
□ Ensure PORT is configured (default 3000)
```

### 3. Code Verification

#### Frontend Files Created/Modified
```
□ frontend/src/lib/gtag.ts                     ✅ Created
□ frontend/src/hooks/useAnalytics.ts           ✅ Created
□ frontend/src/app/layout.tsx                  ✅ Modified
□ frontend/src/app/admin/statistik/page.tsx    ✅ Modified
□ frontend/src/app/search/page.tsx             ✅ Modified
□ frontend/src/app/resep/[id]/page.tsx        ✅ Modified
□ frontend/.env.example                        ✅ Created
```

#### Backend Files Created/Modified
```
□ backend/src/models/analytics.models.js       ✅ Created
□ backend/src/controllers/analytics.controller.js ✅ Created
□ backend/src/routes/analytics.routes.js       ✅ Created
□ backend/src/routes.js                        ✅ Modified
□ backend/prisma/schema.prisma                 ✅ Modified
□ backend/prisma/migrations/add_analytics_events.sql ✅ Created
```

#### Documentation Files
```
□ GTAG_IMPLEMENTATION_GUIDE.md                 ✅ Created
□ GTAG_IMPLEMENTATION_SUMMARY.md               ✅ Created
□ ANALYTICS_QUICK_REFERENCE.md                 ✅ Created
```

### 4. Dependencies Check

#### Frontend
```bash
cd frontend
□ recharts installed (for charts)
□ No additional installs needed
□ npm install (if fresh clone)
```

#### Backend
```bash
cd backend
□ @prisma/client updated
□ All dependencies in package.json
□ npm install (if fresh clone)
```

## 🧪 Testing Checklist

### Backend Testing
```bash
cd backend
npm run dev

□ Server starts without errors
□ Check console for "Server running on port 3000"
□ Verify no Prisma errors
□ Test endpoint: curl http://localhost:3000/v1/analytics/statistics
```

### Frontend Testing
```bash
cd frontend
npm run dev

□ App starts without errors
□ Check console for GTAG script loaded
□ No TypeScript errors
□ No build warnings
```

### Feature Testing

#### 1. Page View Tracking
```
□ Open homepage
□ Check browser console (no errors)
□ Check network tab for gtag requests
□ Visit different pages
□ Verify page_view events logged
```

#### 2. Search Tracking
```
□ Login as user
□ Navigate to /search?q=jamu
□ Perform search
□ Check network tab for /analytics/log POST
□ Verify eventType: "search" logged
□ Check eventData contains query and resultCount
```

#### 3. Recipe View Tracking
```
□ Click on a recipe
□ Navigate to /resep/[id]
□ Check network tab for /analytics/log POST
□ Verify eventType: "recipe_view" logged
□ Check eventData contains recipeId and recipeTitle
```

#### 4. Admin Statistics Dashboard
```
□ Login as admin
□ Navigate to /admin/statistik
□ Check statistics cards render
□ Verify chart displays correctly
□ Check tables show data (or fallback data)
□ Test responsive design (mobile, tablet, desktop)
```

### Google Analytics Testing
```
□ Go to https://analytics.google.com/
□ Navigate to Realtime view
□ Visit your website
□ Check if visitor appears in real-time
□ Verify page views tracked
□ Check events are recorded
```

## 🔍 Verification Steps

### Database Verification
```sql
-- Check if table exists
SHOW TABLES LIKE 'analytics_events';

-- Check table structure
DESCRIBE analytics_events;

-- Check if data is being logged
SELECT * FROM analytics_events ORDER BY createdAt DESC LIMIT 10;

-- Check event types
SELECT eventType, COUNT(*) as count 
FROM analytics_events 
GROUP BY eventType;
```

### API Verification
```bash
# Test log endpoint (should work)
curl -X POST http://localhost:3000/v1/analytics/log \
  -H "Content-Type: application/json" \
  -d '{"eventType":"page_view","eventData":{"path":"/test"}}'

# Test statistics endpoint (needs admin token)
curl http://localhost:3000/v1/analytics/statistics?days=30 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Frontend Verification
```javascript
// Open browser console and check:
console.log(window.gtag); // Should be a function
console.log(window.dataLayer); // Should be an array

// Manually track an event
if (window.gtag) {
  window.gtag('event', 'test_event', {
    event_category: 'Test',
    event_label: 'Manual Test'
  });
}
```

## 🚨 Common Issues & Solutions

### Issue 1: Migration Fails
```bash
# Solution: Reset and retry
npx prisma migrate reset
npx prisma migrate dev --name add_analytics_events
npx prisma generate
```

### Issue 2: GTAG Not Loading
```javascript
// Check in browser console:
// 1. Verify environment variable
console.log(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

// 2. Check network tab for gtag.js
// Should see: googletagmanager.com/gtag/js?id=G-XXXXXXXXXX

// 3. Verify script in <head>
// View page source, look for gtag scripts
```

### Issue 3: Statistics Show No Data
```
□ Check if backend is running
□ Verify database connection
□ Check if data exists in analytics_events table
□ Verify admin authentication token
□ Check browser console for API errors
□ Fallback dummy data should show if API fails
```

### Issue 4: TypeScript Errors
```bash
cd frontend
npm run build

# If errors, check:
□ All imports are correct
□ Types are defined properly
□ No missing dependencies
```

## 📊 Success Criteria

### Backend Success
```
✅ Server starts without errors
✅ Database migration successful
✅ /analytics/log endpoint accepts events
✅ /analytics/statistics returns data
✅ Events stored in database
✅ Query aggregations work correctly
```

### Frontend Success
```
✅ App builds without errors
✅ GTAG script loads
✅ Page views tracked automatically
✅ Search events tracked
✅ Recipe view events tracked
✅ Admin dashboard accessible
✅ Statistics display correctly
✅ Charts render properly
✅ Tables show data
```

### Analytics Success
```
✅ Google Analytics receives events
✅ Real-time tracking works
✅ Events appear in GA dashboard
✅ Custom events tracked
✅ Page views recorded
✅ User sessions tracked
```

## 🎯 Performance Checks

```
□ Page load time < 3 seconds
□ Analytics don't block rendering
□ API responses < 500ms
□ Database queries optimized
□ No memory leaks
□ Charts render smoothly
□ Mobile performance good
```

## 🔐 Security Checks

```
□ Admin endpoints protected with JWT
□ SQL injection prevention (Prisma)
□ XSS prevention in React
□ CORS configured properly
□ Environment variables secure
□ No sensitive data in events
□ IP addresses anonymized (optional)
□ HTTPS in production
```

## 📱 Cross-Browser Testing

```
□ Chrome (Desktop & Mobile)
□ Firefox
□ Safari (Desktop & Mobile)
□ Edge
□ Check console for errors in each
□ Verify GTAG loads in all browsers
□ Test admin dashboard in all browsers
```

## 🌐 Production Deployment

### Pre-Production
```
□ All tests passing
□ No console errors
□ Code reviewed
□ Documentation complete
□ Backup database
```

### Production Environment Variables
```bash
# Frontend
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_API_URL=https://api.jamukita.com
NODE_ENV=production

# Backend
DATABASE_URL=mysql://user:pass@prod-host:3306/jamukita
JWT_SECRET=your-production-secret
NODE_ENV=production
PORT=3000
```

### Deploy Steps
```bash
# 1. Backend
cd backend
npm run build (if applicable)
npm start
# or use PM2: pm2 start src/server.js --name jamu-api

# 2. Run migrations on production
npx prisma migrate deploy

# 3. Frontend
cd frontend
npm run build
npm start
# or use PM2: pm2 start npm --name jamu-web -- start

# 4. Verify deployment
curl https://api.jamukita.com/health
curl https://jamukita.com
```

### Post-Deployment
```
□ Check all endpoints working
□ Verify GTAG loading
□ Test admin login
□ Check statistics dashboard
□ Monitor error logs
□ Verify database connections
□ Check analytics in Google Analytics
□ Monitor server resources
```

## 📞 Monitoring & Maintenance

### Daily Checks
```
□ Check error logs
□ Monitor server health
□ Verify analytics data flowing
□ Check database size
```

### Weekly Tasks
```
□ Review analytics trends
□ Check for anomalies
□ Backup database
□ Update dependencies (security)
```

### Monthly Tasks
```
□ Generate analytics report
□ Archive old data (optional)
□ Review and optimize queries
□ Update documentation
```

## ✅ Final Sign-Off

```
Checklist Completed By: _________________
Date: _________________
Deployment Environment: □ Development  □ Staging  □ Production
Status: □ All Checks Passed  □ Issues Found (see notes below)

Notes:
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________
```

---

## 🎉 Congratulations!

If all checkboxes are marked ✅, your GTAG Analytics implementation is complete and ready for production!

**Next Steps:**
1. Monitor real users' data
2. Gather insights from statistics
3. Optimize based on user behavior
4. Plan additional features based on data

**Support Resources:**
- Google Analytics: https://analytics.google.com/
- Documentation: See GTAG_IMPLEMENTATION_GUIDE.md
- Quick Reference: See ANALYTICS_QUICK_REFERENCE.md

**Version:** 1.0.0  
**Last Updated:** December 19, 2025
