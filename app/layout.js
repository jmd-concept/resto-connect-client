import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import HomeContextProvider from "@/context/useHomeContext";
import ThemeProvider from "@/context/useThemeProvider";
import ThemeToggle from "@/component/ui/ThemeToggle";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  //metadataBase: new URL('https://jmdgrouprdc.com'),

  title: "JMD RestoConnect",
  description: "Connecter les restaurants à l\'expérience digital moderne",
  keywords: [""],

  authors: [{
    name: 'JMD Group',
    url: 'https://jmdgrouprdc.com'
  }],

  creator: 'JMD Group',
  publisher: 'JMD Group',
  category: 'business',

  openGraph: {
    title: 'JMD RestoConnect',
    description: 'Connecter les restaurants à l\'expérience digital moderne',
    type: 'website',
    locale: 'fr_FR',
    url: '#',
    siteName: 'JMD RestoConnect',
    images: [{
      url: 'https://jmdgrouprdc.com/logos/jmd-group-pale.jpeg',
      width: 1200,
      height: 630,
      alt: 'JMD RestoConnect - Siège social Kinshasa, RDC'
    },
    {
      url: 'https://jmdgrouprdc.com/logos/jmd-group-pale.jpeg', // Optionnel : une image carrée pour certains affichages
      width: 600,
      height: 600,
      alt: 'Logo JMD Group',
    },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'JMD RestoConnect',
    description: 'Connecter les restaurants à l\'expérience digital moderne',
    images: ['https://jmdgrouprdc.com/logos/jmd-group-pale.jpeg'],
  },

  alternates: {
    canonical: 'https://jmdgrouprdc.com/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico', rel: 'icon' },
      { url: '/favicon-16x16.png', rel: "icon", sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', rel: "icon", sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },

  other: {
    'script:ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "JMD RestoConnect",
      "url": "#",
      "logo": "https://jmdgrouprdc.com/logos/jmd-group-pale.jpeg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kinshasa",
        "addressCountry": "CD"
      }
    })
  }
};

export default function RootLayout({ children }) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* {isProd && (
          <>
            <Script
              src="#"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-L0VNPP269D');
              `}
            </Script>
          </>
        )} */}

        <div>
          <HomeContextProvider>
            <ThemeProvider>

              <main>
                <div className="flex md:hidden"><ThemeToggle /></div>

                {children}
              </main>

            </ThemeProvider>
          </HomeContextProvider>
        </div>
      </body>
    </html>
  );
}
