# GTAG Implementation Guide

## Setup Instructions

### 1. Frontend Setup

#### Install Dependencies
No additional dependencies needed - already using recharts for charts.

#### Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Google Analytics Measurement ID:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### 2. Backend Setup

#### Run Database Migration
```bash
cd backend
npx prisma migrate dev --name add_analytics_events
npx prisma generate
```

#### Start Backend Server
```bash
npm run dev
```

### 3. Get Google Analytics ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for "Jamu Kita"
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Update the `.env.local` file with your Measurement ID

### 4. Features Implemented

#### Frontend Analytics
- **Page View Tracking**: Automatic tracking on all pages
- **Search Tracking**: Tracks search queries and results
- **Recipe View Tracking**: Tracks when users view recipes
- **Category View Tracking**: Ready to track category browsing
- **Favorite Actions**: Ready to track add/remove favorites
- **Comment Actions**: Ready to track comments and ratings

#### Backend Analytics
- **Analytics Events Model**: Stores all analytics events in database
- **Visitor Statistics API**: Aggregates visitor data
- **Most Searched Categories**: Tracks popular categories
- **Most Searched Recipes**: Tracks popular recipes
- **Admin Dashboard**: View comprehensive statistics

#### Admin Statistics Page
- Total visitors (30 days)
- Average daily visitors
- Highest/lowest daily visitors
- Daily visitor chart
- Top searched categories
- Top searched recipes
- All data updates in real-time

### 5. API Endpoints

#### Log Analytics Event (Public)
```
POST /v1/analytics/log
Body: {
  "eventType": "page_view|search|recipe_view|category_view",
  "eventData": { ... }
}
```

#### Get Statistics (Admin Only)
```
GET /v1/analytics/statistics?days=30
Headers: {
  "Authorization": "Bearer <admin_token>"
}
```

### 6. Testing

1. Start both frontend and backend
2. Browse the website, search, view recipes
3. Login as admin
4. Navigate to `/admin/statistik`
5. View real-time statistics

### 7. Data Flow

```
User Action → GTAG (Google Analytics) → Frontend Tracking
                                       ↓
                            Backend API (/analytics/log)
                                       ↓
                            Database (analytics_events)
                                       ↓
                            Admin Dashboard (/admin/statistik)
```

### 8. Privacy & GDPR Compliance

- Consider adding cookie consent banner
- Add privacy policy explaining data collection
- Allow users to opt-out of tracking
- Anonymize IP addresses in GTAG config

### 9. Advanced Tracking (Optional)

To track more events, use the `useAnalytics` hook:

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

const { trackEvent } = useAnalytics();

// Track custom event
await trackEvent('button_click', {
  buttonName: 'download_recipe',
  recipeId: '123',
});
```

### 10. Monitoring

- Check Google Analytics dashboard for real-time data
- Monitor backend logs for analytics errors
- Review admin statistics page for trends

## Troubleshooting

### Statistics not showing?
1. Check if backend is running
2. Verify database migration was successful
3. Check browser console for errors
4. Verify admin authentication token

### Google Analytics not tracking?
1. Verify NEXT_PUBLIC_GA_MEASUREMENT_ID is set correctly
2. Check browser network tab for gtag.js loading
3. Use Google Analytics DebugView for real-time debugging
4. Check if ad blockers are interfering

### Database errors?
1. Run `npx prisma migrate reset` to reset database
2. Run `npx prisma migrate dev` to apply migrations
3. Check MySQL connection in .env file
