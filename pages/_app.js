// pages/_app.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdSenseProvider } from '@/hooks/useAdSense';
import { DataProvider, useData } from '../contexts/DataContext';
import '../styles/globals.css';
import AdSenseScript from '@/components/AdSenseScript';

// Enhanced SEO Component with comprehensive optimization
function DynamicSEO() {
  const { getSEOData, companyData } = useData();
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState('');
  
  const seoData = getSEOData();
  const companyName = companyData?.companyName || 'Foxbeep';
  const favicon = companyData?.favicon || '/favicon.ico';
  const logo = companyData?.logo || seoData.ogImage;
  const socialLinks = companyData?.socialLinks || {};

  // Set current URL on client side to avoid hydration issues
  useEffect(() => {
    setCurrentUrl(`${window.location.protocol}//${window.location.host}${router.asPath}`);
  }, [router.asPath]);

  // Generate page-specific schema based on route
  const generatePageSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@graph': []
    };

    // Website Schema
    baseSchema['@graph'].push({
      '@type': 'WebSite',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com'}/#website`,
      'url': process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com',
      'name': companyName,
      'description': companyData?.seo?.description || seoData.description,
      'publisher': {
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com'}/#organization`
      },
      'potentialAction': [{
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com'}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }],
      'inLanguage': 'en-US'
    });

    // Organization Schema
    baseSchema['@graph'].push({
      '@type': 'Organization',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com'}/#organization`,
      'name': companyName,
      'url': process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com',
      'logo': {
        '@type': 'ImageObject',
        'url': logo || favicon,
        'width': 512,
        'height': 512,
        'caption': `${companyName} Logo`
      },
      'description': companyData?.seo?.description || seoData.description,
      'foundingDate': '2024',
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer service',
        'availableLanguage': ['English']
      },
      'sameAs': Object.values(socialLinks).filter(Boolean)
    });

    // WebPage Schema
    baseSchema['@graph'].push({
      '@type': 'WebPage',
      '@id': `${currentUrl}#webpage`,
      'url': currentUrl,
      'name': seoData.title,
      'description': seoData.description,
      'isPartOf': {
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com'}/#website`
      },
      'about': {
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com'}/#organization`
      },
      'datePublished': new Date().toISOString(),
      'dateModified': new Date().toISOString(),
      'breadcrumb': {
        '@id': `${currentUrl}#breadcrumb`
      },
      'inLanguage': 'en-US',
      'potentialAction': [{
        '@type': 'ReadAction',
        'target': [currentUrl]
      }]
    });

    // Breadcrumb Schema
    const breadcrumbItems = generateBreadcrumbs();
    if (breadcrumbItems.length > 0) {
      baseSchema['@graph'].push({
        '@type': 'BreadcrumbList',
        '@id': `${currentUrl}#breadcrumb`,
        'itemListElement': breadcrumbItems
      });
    }

    // Add Software Application schema for homepage
    if (router.pathname === '/') {
      baseSchema['@graph'].push({
        '@type': 'SoftwareApplication',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com'}/#software`,
        'name': `${companyName} Video Converter`,
        'applicationCategory': 'MultimediaApplication',
        'applicationSubCategory': 'Video Converter',
        'description': seoData.description,
        'operatingSystem': ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'Web Browser'],
        'url': process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com',
        'softwareVersion': '2.0',
        'releaseNotes': 'Enhanced video conversion with improved performance',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'reviewCount': '2500',
          'bestRating': '5',
          'worstRating': '1'
        },
        'featureList': [
          'MP4 Video Conversion',
          'MOV to MP4 Converter',
          'AVI Video Converter',
          'MKV File Conversion',
          'WebM Video Converter',
          'Batch Processing',
          'No File Size Limits',
          'Client-Side Processing',
          'No Registration Required',
          'Free Video Converter'
        ]
      });
    }

    return baseSchema;
  };

  // Generate dynamic breadcrumbs based on route
  const generateBreadcrumbs = () => {
    const pathSegments = router.asPath.split('/').filter(segment => segment);
    const breadcrumbs = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com'
      }
    ];

    let currentPath = process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        '@type': 'ListItem',
        'position': index + 2,
        'name': segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        'item': currentPath
      });
    });

    return breadcrumbs;
  };

  // Generate hreflang tags for internationalization
  const generateHreflangTags = () => {
    const languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh'];
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com';
    
    return languages.map(lang => (
      <link 
        key={lang}
        rel="alternate" 
        hrefLang={lang} 
        href={`${baseUrl}${lang === 'en' ? '' : `/${lang}`}${router.asPath}`} 
      />
    ));
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Language and Locale */}
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Enhanced Robots Meta */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow" />
      <meta name="slurp" content="index, follow" />
      <meta name="duckduckbot" content="index, follow" />
      
      {/* Open Graph Enhanced Tags */}
      <meta property="og:type" content={seoData.type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:site_name" content={companyName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={seoData.ogImage} />
      <meta property="og:image:secure_url" content={seoData.ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoData.title} />
      <meta property="og:updated_time" content={new Date().toISOString()} />
      
      {/* Article specific OG tags */}
      {seoData.type === 'article' && (
        <>
          <meta property="article:published_time" content={new Date().toISOString()} />
          <meta property="article:modified_time" content={new Date().toISOString()} />
          <meta property="article:author" content={companyName} />
          <meta property="article:publisher" content={companyName} />
          <meta property="article:section" content="Technology" />
          <meta property="article:tag" content="video converter, online tools, video processing" />
        </>
      )}
      
      {/* Enhanced Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={socialLinks?.twitter || '@foxbeeptech'} />
      <meta name="twitter:creator" content={socialLinks?.twitter || '@foxbeeptech'} />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.ogImage} />
      <meta name="twitter:image:alt" content={seoData.title} />
      <meta name="twitter:domain" content={process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '') || 'tools.foxbeep.com'} />
      
      {/* Enhanced Favicon and Icons */}
      <link rel="icon" href={favicon} />
      <link rel="shortcut icon" href={favicon} />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Performance and Security Headers */}
      <meta httpEquiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Author and Publisher Enhanced */}
      <meta name="author" content={companyName} />
      <meta name="publisher" content={companyName} />
      <meta name="copyright" content={`© ${new Date().getFullYear()} ${companyName}. All rights reserved.`} />
      <meta name="owner" content={companyName} />
      <meta name="designer" content={companyName} />
      
      {/* Technical SEO Enhanced */}
      <meta name="generator" content="Next.js" />
      <meta name="revisit-after" content="3 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="coverage" content="worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={companyName} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoData.canonical || currentUrl} />
      
      {/* Enhanced Alternate URLs and Hreflang */}
      {generateHreflangTags()}
      <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com'} />
      
      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title={`${companyName} RSS Feed`} href="/rss.xml" />
      <link rel="alternate" type="application/atom+xml" title={`${companyName} Atom Feed`} href="/atom.xml" />
      
      {/* Enhanced Preconnect and DNS Prefetch for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      <link rel="preconnect" href="https://unpkg.com" />
      
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="//api.github.com" />
      
      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={seoData.ogImage} as="image" />
      
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePageSchema())
        }}
      />
      
      {/* Additional Schema for FAQ if present */}
      {router.pathname === '/' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              'mainEntity': [
                {
                  '@type': 'Question',
                  'name': 'Is the video converter free to use?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Yes, our video converter is completely free to use with no hidden fees, registration requirements, or usage limits.'
                  }
                },
                {
                  '@type': 'Question',
                  'name': 'What video formats are supported?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'We support all major video formats including MP4, MOV, AVI, MKV, WebM, FLV, WMV, 3GP, M4V, and many more formats for both input and output.'
                  }
                },
                {
                  '@type': 'Question',
                  'name': 'Is my data secure and private?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Absolutely! All video processing happens locally on your device (client-side) so your files never leave your computer or get uploaded to our servers.'
                  }
                },
                {
                  '@type': 'Question',
                  'name': 'Are there any file size limitations?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'No, there are no file size restrictions. You can convert videos of any size as long as your device has sufficient memory and processing power.'
                  }
                }
              ]
            })
          }}
        />
      )}
      
      {/* Google Analytics Enhanced */}
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_title: '${seoData.title}',
                  page_location: '${currentUrl}',
                  send_page_view: true,
                  enhanced_conversions: true,
                  allow_enhanced_conversions: true
                });
              `,
            }}
          />
        </>
      )}
      
      {/* Enhanced Google Tag Manager */}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl+'&gtm_auth=${process.env.NEXT_PUBLIC_GTM_AUTH || ''}&gtm_preview=${process.env.NEXT_PUBLIC_GTM_PREVIEW || ''}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />
      )}
      
      {/* Microsoft Clarity */}
      {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
            `,
          }}
        />
      )}
      
      {/* Hotjar Tracking */}
      {process.env.NEXT_PUBLIC_HOTJAR_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      )}
    </Head>
  );
}

// Enhanced App Component Wrapper with performance monitoring
function AppContent({ Component, pageProps }) {
  const router = useRouter();
  
  // Track page views and performance
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Track page view in GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }
      
      // Track page view in GTM
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'page_view',
          page_path: url,
          page_title: document.title,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

 

  return (
    <>
      <DynamicSEO />
      
      {/* GTM Noscript */}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}&gtm_auth=${process.env.NEXT_PUBLIC_GTM_AUTH || ''}&gtm_preview=${process.env.NEXT_PUBLIC_GTM_PREVIEW || ''}&gtm_cookies_win=x`}
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
      )}
      
      <div className="min-h-screen flex flex-col">
        <main className="flex-1" role="main">
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
