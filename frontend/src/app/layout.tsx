"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview, GA_MEASUREMENT_ID } from "@/lib/gtag";
import { Elsie } from "next/font/google";

const elsie = Elsie({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-elsie",
});

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user has consented to cookies
    const consent = typeof window !== "undefined" ? localStorage.getItem("cookie-consent") : null;
    
    if (pathname && consent === "accepted") {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
    }

    // Track page view in internal analytics (always, not dependent on cookie consent)
    const trackInternalPageView = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/v1";
        await fetch(`${API_BASE_URL}/analytics/log`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventType: "page_view",
            eventData: {
              path: pathname,
              title: document.title,
              referrer: document.referrer,
            },
          }),
        });
      } catch (error) {
        // Silently fail - analytics should not break the app
        console.debug("Analytics tracking error:", error);
      }
    };

    trackInternalPageView();
  }, [pathname, searchParams]);

  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={elsie.variable}>
      <head>
        <title>Jamu Kita - Herbal Indonesia</title>
        <meta name="description" content="Sehat dengan jamu alami" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Google Analytics with consent mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Set default consent to 'denied' 
              gtag('consent', 'default', {
                'analytics_storage': 'denied'
              });
              
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
        {/* End Google Analytics */}
      </head>
      <body>
        <AuthProvider>
          <AnalyticsTracker />
          <Navbar />
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
