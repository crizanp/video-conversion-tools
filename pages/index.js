import React from 'react';
import Head from 'next/head';
import { Video, Play } from 'lucide-react';
import { DataProvider } from '@/contexts/DataContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InstantConversionSection from '@/components/InstantVideo';
import FreeServiceSection from '@/components/pricing';
import VideoConversionServices from '@/components/features';
import NewsletterSection from '@/components/NewsLetter';
import FAQSection from '@/components/FAQSection';
import AboutSection from '@/components/About';
import Footer from '@/components/Footer';

function SEOHead({ companyData }) {
  const seoData = companyData?.seo || {};
  const companyName = companyData?.companyName || 'VideoConvert Pro';
  const favicon = companyData?.favicon || '/favicon.ico';
  const logo = companyData?.logo || null;
  const socialLinks = companyData?.socialLinks || {};
  
  const pageTitle =  `${companyName} | Fast & Free Video Format Converter Online`;
  const pageDescription = seoData.description || 'Convert video formats easily with our powerful online tool. Free, fast and secure. Convert MP4, WebM, MOV, MKV and more. No registration required.';
  const pageKeywords = seoData.keywords || 'video converter, online video converter, free video converter, MP4 converter, video format converter, convert video online, video to MP4, MOV converter, AVI converter, MKV converter, WebM converter';

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Language and Locale */}
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Robots and Indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tools.foxbeep.com/" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content={companyName} />
      <meta property="og:locale" content="en_US" />
      {logo && <meta property="og:image" content={logo} />}
      {logo && <meta property="og:image:secure_url" content={logo} />}
      {logo && <meta property="og:image:type" content="image/png" />}
      {logo && <meta property="og:image:width" content="1200" />}
      {logo && <meta property="og:image:height" content="630" />}
      {logo && <meta property="og:image:alt" content={`${companyName} Logo`} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://tools.foxbeep.com/" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {logo && <meta name="twitter:image" content={logo} />}
      {logo && <meta name="twitter:image:alt" content={`${companyName} Logo`} />}
      {socialLinks.twitter && <meta name="twitter:site" content="@foxbeeptech" />}
      {socialLinks.twitter && <meta name="twitter:creator" content="@foxbeeptech" />}
      
      {/* Additional Social Media */}
      {socialLinks.facebook && <meta property="fb:admins" content="foxbeeptech" />}
      {socialLinks.facebook && <meta property="fb:app_id" content="your-facebook-app-id" />}
      
      {/* Favicon and Icons */}
      <link rel="icon" href={favicon} />
      <link rel="shortcut icon" href={favicon} />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png"  href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Performance and Caching */}
      <meta httpEquiv="cache-control" content="public, max-age=31536000" />
      <meta httpEquiv="expires" content="31536000" />
      
      {/* Author and Publisher */}
      <meta name="author" content={companyName} />
      <meta name="publisher" content={companyName} />
      <meta name="copyright" content={`© ${new Date().getFullYear()} ${companyName}. All rights reserved.`} />
      
      {/* Technical SEO */}
      <meta name="generator" content="Next.js" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="coverage" content="worldwide" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://tools.foxbeep.com/" />
      
      {/* Alternate URLs for different languages/regions */}
      <link rel="alternate" hrefLang="en" href="https://tools.foxbeep.com/" />
      <link rel="alternate" hrefLang="x-default" href="https://tools.foxbeep.com/" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://res.cloudinary.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.youtube.com" />
      <link rel="dns-prefetch" href="//res.cloudinary.com" />
      
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://tools.foxbeep.com/",
                "url": "https://tools.foxbeep.com/",
                "name": companyName,
                "description": pageDescription,
                "publisher": {
                  "@id": "https://tools.foxbeep.com/"
                },
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://tools.foxbeep.com"
                    },
                    "query-input": "required name=search_term_string"
                  }
                ]
              },
              {
                "@type": "Organization",
                "@id": "https://tools.foxbeep.com",
                "name": companyName,
                "url": "https://tools.foxbeep.com/",
                "logo": {
                  "@type": "ImageObject",
                  "url": logo || favicon,
                  "width": 512,
                  "height": 512
                },
                "description": pageDescription,
                "foundingDate": "2024",
                "sameAs": Object.values(socialLinks).filter(Boolean)
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://tools.foxbeep.com/",
                "name": companyName,
                "applicationCategory": "MultimediaApplication",
                "applicationSubCategory": "Video Converter",
                "description": pageDescription,
                "operatingSystem": ["Windows", "macOS", "Linux", "Android", "iOS", "Web Browser"],
                "url": "https://tools.foxbeep.com/",
                "screenshot": logo,
                "softwareVersion": "1.0",
                "releaseNotes": "Fast and secure online video converter",
                "downloadUrl": "https://tools.foxbeep.com/",
                "installUrl": "https://tools.foxbeep.com/",
                "permissions": "No special permissions required",
                "storageRequirements": "No storage required - runs in browser",
                "memoryRequirements": "Minimal memory usage",
                "processorRequirements": "Any modern processor",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "validFrom": new Date().toISOString().split('T')[0]
                },
                "publisher": {
                  "@id": "https://tools.foxbeep.com/"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "1247",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "featureList": [
                  "Convert MP4 to other formats",
                  "Convert MOV files",
                  "Convert AVI videos",
                  "Convert MKV files",
                  "Convert WebM videos",
                  "Batch video conversion",
                  "No file size limits",
                  "Secure client-side processing",
                  "No registration required",
                  "Free to use"
                ]
              },
              {
                "@type": "WebPage",
                "@id": "https://tools.foxbeep.com/",
                "url": "https://tools.foxbeep.com/",
                "name": pageTitle,
                "isPartOf": {
                  "@id": "https://tools.foxbeep.com/"
                },
                "about": {
                  "@id": "https://tools.foxbeep.com/"
                },
                "description": pageDescription,
                "breadcrumb": {
                  "@id": "https://tools.foxbeep.com/"
                },
                "inLanguage": "en-US",
                "potentialAction": [
                  {
                    "@type": "ReadAction",
                    "target": ["https://tools.foxbeep.com/"]
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://tools.foxbeep.com/",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://tools.foxbeep.com/"
                  }
                ]
              },
              {
                "@type": "VideoObject",
                "name": "FoxBeep Video Converter Demo",
                "description": "See how easy it is to convert videos with our online tool",
                "thumbnailUrl": "https://img.youtube.com/vi/g6G6tbZMyKc/maxresdefault.jpg",
                "uploadDate": "2024-01-01T00:00:00Z",
                "duration": "PT2M30S",
                "embedUrl": "https://www.youtube.com/embed/g6G6tbZMyKc",
                "contentUrl": "https://www.youtube.com/watch?v=g6G6tbZMyKc",
                "publisher": {
                  "@id": "https://tools.foxbeep.com/"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Is the video converter free to use?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, our video converter is completely free to use with no hidden fees or registration requirements."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What video formats are supported?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We support all major video formats including MP4, MOV, AVI, MKV, WebM, FLV, and many more."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is my data secure?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, all video processing happens on your device (client-side) so your files never leave your computer."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      
      {/* Additional Schema for Local Business (if applicable) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": companyName,
            "description": pageDescription,
            "url": "https://tools.foxbeep.com/",
            "telephone": "+1-XXX-XXX-XXXX",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday", 
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            },
            "sameAs": Object.values(socialLinks).filter(Boolean)
          })
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `,
        }}
      />

      {/* Google Tag Manager (replace with your GTM ID) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `,
        }}
      />
    </Head>
  );
}

function DemoBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center text-center">
          <p className="text-sm md:text-base font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            This is demo version. 
            <a 
              href="https://foxbeep-tech.gitbook.io/video-converter-pro-documentation" 
              className="ml-1 underline hover:text-orange-200 transition-colors duration-200"
              rel="noopener noreferrer"
              target="_blank"
              title="Read FoxBeep Video Converter Documentation"
            >
              Read documentation
            </a>
            , 
            <a 
              href="#" 
              className="ml-1 underline hover:text-orange-200 transition-colors duration-200"
              rel="noopener noreferrer"
              title="View case studies and success stories"
            >
              read case studies
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function WatchDemoSection() {
  return (
    <section className="py-5 px-4 bg-white" itemScope itemType="https://schema.org/VideoObject">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" itemProp="name">
            See Our Video Converter in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" itemProp="description">
            Watch how easy it is to convert your videos with our powerful online tool. 
            Fast, secure, and completely free to use.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-3xl blur-xl"></div>

          <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/g6G6tbZMyKc?autoplay=1&loop=1&playlist=g6G6tbZMyKc&mute=1&rel=0&modestbranding=1&showinfo=0&controls=1"
                title="FoxBeep Video Converter Demo - How to Convert Videos Online Free"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                itemProp="embedUrl"
              ></iframe>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200" itemScope itemType="https://schema.org/Thing">
              <div className="text-blue-600 text-2xl font-bold mb-2" itemProp="name">Fast</div>
              <p className="text-gray-600" itemProp="description">Instant Video Conversion</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200" itemScope itemType="https://schema.org/Thing">
              <div className="text-purple-600 text-2xl font-bold mb-2" itemProp="name">Secure</div>
              <p className="text-gray-600" itemProp="description">Relax! Everything on the client side</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200" itemScope itemType="https://schema.org/Thing">
              <div className="text-green-600 text-2xl font-bold mb-2" itemProp="name">Easy</div>
              <p className="text-gray-600" itemProp="description">No login and extra headache</p>
            </div>
          </div>
        </div>

        {/* Hidden structured data */}
        <div style={{ display: 'none' }}>
          <span itemProp="uploadDate">2024-01-01</span>
          <span itemProp="duration">PT2M30S</span>
          <span itemProp="thumbnailUrl">https://img.youtube.com/vi/g6G6tbZMyKc/maxresdefault.jpg</span>
        </div>
      </div>
    </section>
  );
}

function PageContent() {
  return (
    <main role="main">
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
          height="0" 
          width="0" 
          style={{display: 'none', visibility: 'hidden'}}
        ></iframe>
      </noscript>
      
      {/* <DemoBanner /> */}
      
      <Navbar />
      
      <section id="home" aria-label="Homepage hero section">
        <HeroSection />
      </section>
      
      <section id="demo" aria-label="Video demonstration">
        <WatchDemoSection />
      </section>
      
      <section id="features" aria-label="Instant conversion features">
        <InstantConversionSection />
      </section>
      
      <section id="services" aria-label="Video conversion services">
        <VideoConversionServices />
      </section>
      
      <section id="pricing" aria-label="Pricing information">
        <FreeServiceSection />
      </section>
      
      <section id="about" aria-label="About us">
        <AboutSection />
      </section>
      
      <section aria-label="Frequently asked questions">
        <FAQSection />
      </section>
      
      <section aria-label="Newsletter signup">
        <NewsletterSection />
      </section>
      
      <Footer />
    </main>
  );
}

export default function Home({ ssrCompanyData }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <SEOHead companyData={ssrCompanyData} />
      
      <DataProvider initialCompanyData={ssrCompanyData}>
        <PageContent />
      </DataProvider>
    </div>
  );
}

export async function getStaticProps() {
  let companyData = null;

  try {
    const companyResponse = await fetch('https://demo-video-tools-admin.vercel.app/api/admin/company/details');
    if (companyResponse.ok) {
      const companyResult = await companyResponse.json();
      if (companyResult.success && companyResult.data) {
        companyData = companyResult.data;
      }
    }
  } catch (error) {
    console.error('Error fetching company data for SEO:', error);
  }

  if (!companyData) {
    companyData = {
      companyName: "Foxbeep",
      logo: "https://res.cloudinary.com/dg5aeihzx/image/upload/v1748238626/hero-/chqkbkwmhdx2v1yq8wuk.png",
      blackLogo: "https://res.cloudinary.com/dg5aeihzx/image/upload/v1748164260/hero-/afqnaagbegm6dhxzkcqd.jpg",
      favicon: "/favicon.ico",
      seo: {
        title: "Free Online Video Converter - Convert MP4, MOV, AVI | FoxBeep",
        description: "Convert videos with ease using FoxBeep Tech – your powerful solution for fast, high-quality video format conversions. Convert MP4, MOV, AVI, MKV, WebM online for free. No registration required.",
        keywords: "video converter, online video converter, free video converter, MP4 converter, video format converter, convert video online, video to MP4, MOV converter, AVI converter, MKV converter, WebM converter, video conversion tool, FoxBeep Tech, convert videos online, fast video converter, HD video conversion, format converter, video editing tools, high-quality video conversion, batch video converter, secure video converter"
      },
      socialLinks: {
        facebook: "https://facebook.com/foxbeeptech",
        instagram: "https://instagram.com/foxbeeptech", 
        twitter: "https://x.com/foxbeeptech",
        linkedin: "https://linkedin.com/in/foxbeeptech"
      }
    };
  }

  return {
    props: {
      ssrCompanyData: companyData,
    },
    revalidate: 300, // Revalidate every 5 minutes for better SEO freshness
  };
}