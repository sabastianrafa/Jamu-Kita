# 🍪 Cookie Consent Banner - Implementation Guide

## ✅ Implementasi Selesai

Cookie consent banner telah ditambahkan ke website Jamu Kita untuk kepatuhan GDPR dan privasi pengguna.

## 📋 Fitur Cookie Consent

### 1. **Banner UI yang Menarik**
- ✅ Design modern dengan animasi smooth
- ✅ Backdrop semi-transparan
- ✅ Slide-up animation dari bawah
- ✅ Responsive untuk mobile & desktop
- ✅ Icon cookie dan informasi yang jelas

### 2. **Opsi Pengguna**
- ✅ **Terima Semua Cookie** - Mengaktifkan Google Analytics
- ✅ **Tolak** - Menonaktifkan tracking analytics
- ✅ **Tutup (X)** - Menutup banner tanpa memilih
- ✅ Link ke halaman **Kebijakan Privasi**

### 3. **Google Analytics Consent Mode**
- ✅ Default consent: `denied`
- ✅ Update consent saat user terima/tolak
- ✅ Tracking hanya aktif jika user menerima
- ✅ Consent tersimpan di localStorage

### 4. **Halaman Kebijakan Privasi**
- ✅ Penjelasan lengkap tentang cookie
- ✅ Data yang dikumpulkan
- ✅ Tujuan pengumpulan data
- ✅ Hak pengguna
- ✅ Cara mengelola cookie

## 🗂️ File yang Dibuat/Dimodifikasi

### Baru Dibuat
```
✅ frontend/src/components/CookieConsent.tsx    # Cookie banner component
✅ frontend/src/app/privacy/page.tsx            # Privacy policy page
```

### Dimodifikasi
```
✅ frontend/src/app/layout.tsx                  # Added CookieConsent & consent check
✅ frontend/src/lib/gtag.ts                     # Added consent check to tracking
```

## 🎨 Screenshot Banner

```
╔══════════════════════════════════════════════════════════════╗
║  🍪 Kami Menggunakan Cookie                                  ║
║                                                              ║
║  Website Jamu Kita menggunakan cookie untuk meningkatkan    ║
║  pengalaman Anda dan menganalisis penggunaan website.       ║
║  Cookie kami tidak mengumpulkan data pribadi seperti        ║
║  email atau informasi sensitif.                             ║
║                                                              ║
║  Untuk informasi lebih lanjut, lihat Kebijakan Privasi.    ║
║                                                              ║
║  [Tolak]  [Terima Semua Cookie]                         [X] ║
╚══════════════════════════════════════════════════════════════╝
```

## 💻 Cara Kerja

### 1. **First Visit**
```javascript
// User mengunjungi website pertama kali
1. Banner muncul setelah 1 detik (delayed for better UX)
2. Google Analytics default: consent = 'denied'
3. Tracking tidak aktif hingga user membuat pilihan
```

### 2. **User Accepts**
```javascript
// User klik "Terima Semua Cookie"
1. localStorage.setItem('cookie-consent', 'accepted')
2. gtag('consent', 'update', { analytics_storage: 'granted' })
3. Google Analytics mulai tracking
4. Banner ditutup dan tidak muncul lagi
```

### 3. **User Declines**
```javascript
// User klik "Tolak"
1. localStorage.setItem('cookie-consent', 'declined')
2. gtag('consent', 'update', { analytics_storage: 'denied' })
3. Google Analytics tetap tidak aktif
4. Banner ditutup dan tidak muncul lagi
```

### 4. **Returning Visitor**
```javascript
// User yang sudah pernah memilih
1. Check localStorage untuk 'cookie-consent'
2. Jika ada, banner tidak ditampilkan
3. Consent preference diterapkan otomatis
```

## 🔧 Konfigurasi

### Layout.tsx
```typescript
// Consent mode default
gtag('consent', 'default', {
  'analytics_storage': 'denied'  // Denied until user accepts
});

// Check consent before tracking
const consent = localStorage.getItem("cookie-consent");
if (consent === "accepted") {
  pageview(url);
}
```

### CookieConsent.tsx
```typescript
// Accept handler
const handleAccept = () => {
  localStorage.setItem("cookie-consent", "accepted");
  localStorage.setItem("cookie-consent-date", new Date().toISOString());
  
  // Enable analytics
  window.gtag("consent", "update", {
    analytics_storage: "granted",
  });
};

// Decline handler
const handleDecline = () => {
  localStorage.setItem("cookie-consent", "declined");
  
  // Disable analytics
  window.gtag("consent", "update", {
    analytics_storage: "denied",
  });
};
```

### gtag.ts
```typescript
// Check consent before every tracking call
const hasConsent = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie-consent') === 'accepted';
};

export const pageview = (url: string) => {
  if (hasConsent()) {
    // Track page view
  }
};
```

## 📱 Responsive Design

### Desktop
- Banner di bottom dengan full width
- Buttons horizontal
- Close button di pojok kanan

### Mobile
- Banner tetap di bottom
- Buttons stacked vertical
- Touch-friendly spacing
- Readable font sizes

## 🎨 Styling

### Colors
- **Primary**: `#B6771D` (Brand brown/gold)
- **Background**: White with shadow
- **Border**: 4px top border in brand color
- **Backdrop**: Black with 30% opacity
- **Buttons**: 
  - Accept: `#B6771D` (brand color)
  - Decline: Gray (`#F3F4F6`)

### Animations
```css
/* Slide up from bottom */
translate-y-full → translate-y-0

/* Backdrop fade in */
opacity-0 → opacity-30

/* Duration: 300ms */
transition-all duration-300
```

## 🔒 Privacy & Compliance

### GDPR Compliance
✅ **Consent before tracking** - Analytics tidak aktif tanpa consent
✅ **Clear information** - User tahu apa yang dikumpulkan
✅ **Easy opt-out** - Tombol "Tolak" tersedia
✅ **Granular control** - User bisa memilih
✅ **Privacy policy** - Link ke kebijakan lengkap
✅ **Revocable consent** - User bisa ubah pilihan

### Data Protection
- ❌ **No personal data** in cookies
- ✅ **Anonymous sessions** only
- ✅ **IP anonymization** (optional)
- ✅ **Secure storage** (localStorage)
- ✅ **No third-party** cookies (except GA)

## 🧪 Testing

### Manual Test
```bash
# 1. Clear localStorage
localStorage.clear()

# 2. Refresh page
# 3. Banner should appear after 1 second

# 4. Click "Terima"
# 5. Check localStorage
localStorage.getItem('cookie-consent') // Should be 'accepted'

# 6. Refresh page
# 7. Banner should NOT appear

# 8. Clear localStorage again
# 9. Click "Tolak"
# 10. Check localStorage
localStorage.getItem('cookie-consent') // Should be 'declined'

# 11. Check Network tab
# GA requests should NOT be sent
```

### Browser Console Test
```javascript
// Check consent status
console.log(localStorage.getItem('cookie-consent'));

// Check GTAG loaded
console.log(typeof window.gtag); // Should be 'function'

// Check dataLayer
console.log(window.dataLayer); // Should be array

// Manually grant consent
if (window.gtag) {
  window.gtag('consent', 'update', {
    analytics_storage: 'granted'
  });
}
```

## 📄 Privacy Policy

Halaman `/privacy` berisi:

1. **Penggunaan Cookie**
   - Jenis cookie (esensial, analytics, preferensi)
   - Tujuan penggunaan

2. **Data yang Dikumpulkan**
   - Page views, searches, device info
   - Apa yang TIDAK dikumpulkan (email, password, dll)

3. **Tujuan Pengumpulan**
   - Improve UX, analytics, optimization

4. **Google Analytics**
   - Penjelasan GA dan opt-out

5. **Hak Pengguna**
   - Tolak, hapus, akses data

6. **Cara Mengelola Cookie**
   - Browser settings, banner controls

7. **Keamanan & Update**
   - Security measures, policy updates

8. **Kontak**
   - Email untuk pertanyaan privasi

## 🔄 User Flow Diagram

```
┌─────────────────┐
│  User visits    │
│  website        │
└────────┬────────┘
         │
         v
┌─────────────────┐
│  Check          │
│  localStorage   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    v         v
   Yes       No
    │         │
    │         v
    │    ┌─────────────┐
    │    │ Show Banner │
    │    │ after 1s    │
    │    └─────┬───────┘
    │          │
    │     ┌────┴────┐
    │     │         │
    │     v         v
    │  Accept    Decline
    │     │         │
    │     v         v
    │  ┌────────┐ ┌────────┐
    │  │ Enable │ │Disable │
    │  │   GA   │ │   GA   │
    │  └───┬────┘ └───┬────┘
    │      │          │
    v      v          v
┌──────────────────────┐
│  Apply preference    │
│  Close banner        │
└──────────────────────┘
```

## 🚀 Production Checklist

### Pre-Deploy
- [x] Cookie banner component created
- [x] Privacy policy page created
- [x] Consent mode implemented
- [x] LocalStorage handling working
- [x] Responsive design tested
- [x] GDPR compliant
- [x] No console errors

### Deploy
- [ ] Test on production domain
- [ ] Verify GA consent mode working
- [ ] Check privacy policy accessible
- [ ] Test on multiple devices
- [ ] Test on multiple browsers
- [ ] Monitor for errors

### Post-Deploy
- [ ] Monitor user acceptance rate
- [ ] Check GA data collection
- [ ] Review user feedback
- [ ] Update privacy policy if needed

## 🐛 Troubleshooting

### Banner tidak muncul
```javascript
// 1. Check localStorage
localStorage.getItem('cookie-consent')

// 2. Clear and test
localStorage.removeItem('cookie-consent')
location.reload()

// 3. Check component imported
// In layout.tsx: import CookieConsent from "@/components/CookieConsent";
```

### Analytics masih tracking setelah decline
```javascript
// Check consent mode
window.gtag('get', GA_MEASUREMENT_ID, 'consent_storage');

// Verify localStorage
localStorage.getItem('cookie-consent') // Should be 'declined'

// Check GTAG calls have consent check
// In gtag.ts: hasConsent() should return false
```

### Banner muncul terus
```javascript
// localStorage mungkin tidak tersimpan
// Check browser privacy settings
// Pastikan tidak di incognito mode atau cookies disabled
```

## 📊 Analytics Tracking

### With Consent
```
✅ Page views tracked
✅ Search events logged
✅ Recipe views recorded
✅ User interactions tracked
✅ Statistics updated
```

### Without Consent
```
❌ GA tracking disabled
❌ No page views sent
❌ No events logged to GA
✅ Backend analytics still work (privacy-friendly)
✅ Statistics from backend only
```

## 🎯 Best Practices

1. **Clear Communication** ✅
   - Explain what cookies do
   - Be transparent about data

2. **Easy Opt-out** ✅
   - "Decline" button visible
   - No dark patterns

3. **Granular Control** ✅
   - Can accept or decline
   - Can change later

4. **Respect Choice** ✅
   - Honor user's decision
   - Don't show banner repeatedly

5. **Privacy by Default** ✅
   - Tracking off by default
   - Require explicit consent

## 📚 Resources

- [GDPR Compliance Guide](https://gdpr.eu/cookies/)
- [Google Consent Mode](https://support.google.com/analytics/answer/9976101)
- [Cookie Law Explained](https://www.cookielaw.org/the-cookie-law/)

## ✅ Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Cookie Banner | ✅ Complete | Modern UI, animated |
| Consent Mode | ✅ Complete | GA consent mode v2 |
| Privacy Policy | ✅ Complete | Comprehensive page |
| LocalStorage | ✅ Complete | Persistent consent |
| GDPR Compliant | ✅ Yes | Consent before tracking |
| Responsive | ✅ Yes | Mobile & desktop |
| Tested | ✅ Yes | Manual testing done |

---

**Version:** 1.0.0  
**Last Updated:** December 19, 2025  
**Status:** 🚀 Production Ready

**Cookie Consent Implementation** - Complete with GDPR Compliance ✅
