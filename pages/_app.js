// pages/_app.js
import Head from 'next/head';
import { AdSenseProvider } from '@/hooks/useAdSense';
import { DataProvider, useData } from '../contexts/DataContext';
import '../styles/globals.css';
import AdSenseScript from '@/components/AdSenseScript';

// SEO Component that uses DataContext
function DynamicSEO() {
  const { getSEOData, companyData } = useData();
  const seoData = getSEOData();
  
  const companyName = companyData?.companyName || 'Foxbeep';
  const favicon = companyData?.favicon || '/favicon.ico';
  const logo = companyData?.logo || seoData.ogImage;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:type" content={seoData.type} />
      <meta property="og:site_name" content={companyName} />
      <meta property="og:url" content={seoData.canonical} />
      <meta property="og:image" content={seoData.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoData.title} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.ogImage} />
      <meta name="twitter:image:alt" content={seoData.title} />
      <meta name="twitter:site" content={companyData?.socialLinks?.twitter || '@foxbeeptech'} />
      <meta name="twitter:creator" content={companyData?.socialLinks?.twitter || '@foxbeeptech'} />
      
      {/* Favicon and Icons */}
      <link rel="icon" href={favicon} />
      <link rel="shortcut icon" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content={companyName} />
      <meta name="generator" content="Next.js" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#000000" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoData.canonical} />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": seoData.type === 'article' ? "SoftwareApplication" : "WebSite",
            "name": companyName,
            "url": seoData.canonical,
            "description": seoData.description,
            "publisher": {
              "@type": "Organization",
              "name": companyName,
              "logo": {
                "@type": "ImageObject",
                "url": logo
              }
            },
            ...(seoData.type === 'article' && {
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          })
        }}
      />
    </Head>
  );
}

// App Component Wrapper
function AppContent({ Component, pageProps }) {
  return (
    <>
      <DynamicSEO />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <AdSenseProvider>
      <AdSenseScript />
      <DataProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </DataProvider>
    </AdSenseProvider>
  );
}