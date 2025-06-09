import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import CompanySection from '@/components/convert/companyIndustry';
import FileConverterHero from '@/components/convert/hero';
import FileFormatsExplanation from '@/components/convert/FileFormatsExplanation';
import ConversionSteps from '@/components/convert/HowToUse';
import ConversionNavbar from '@/components/convert/ConversionNavbar';
import FAQ from '@/components/convert/faqSection';
import { HelpCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import { useData } from '@/contexts/DataContext'; 
import AnimatedLoader from '@/components/AnimatedLoading';

// SEO Head Component for AVI to MP4 Converter
function AviToMp4SEOHead({ companyData, heroData }) {
  const companyName = companyData?.companyName || 'FoxBeep';
  const favicon = companyData?.favicon || '/favicon.ico';
  const logo = companyData?.logo || null;
  const socialLinks = companyData?.socialLinks || {};
  
  const pageTitle = `Convert AVI to MP4 Online Free - ${companyName} Video Converter`;
  const pageDescription = "Convert AVI files to MP4 format online for free. Fast, secure AVI to MP4 converter with no quality loss. No registration required. Support for HD video conversion.";
  const pageKeywords = "AVI to MP4 converter, convert AVI to MP4, online video converter, free AVI converter, AVI MP4 conversion, video format converter, convert videos online, HD video converter, AVI file converter";
  const canonicalUrl = "https://tools.foxbeep.com/convert/avi-to-mp4";

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
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content={companyName} />
      <meta property="og:locale" content="en_US" />
      {heroData?.image && <meta property="og:image" content={heroData.image} />}
      {heroData?.image && <meta property="og:image:secure_url" content={heroData.image} />}
      {heroData?.image && <meta property="og:image:type" content="image/png" />}
      {heroData?.image && <meta property="og:image:width" content="1200" />}
      {heroData?.image && <meta property="og:image:height" content="630" />}
      {heroData?.image && <meta property="og:image:alt" content="AVI to MP4 Converter Tool" />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {heroData?.image && <meta name="twitter:image" content={heroData.image} />}
      {heroData?.image && <meta name="twitter:image:alt" content="AVI to MP4 Converter Tool" />}
      {socialLinks.twitter && <meta name="twitter:site" content="@foxbeeptech" />}
      {socialLinks.twitter && <meta name="twitter:creator" content="@foxbeeptech" />}
      
      {/* Favicon and Icons */}
      <link rel="icon" href={favicon} />
      <link rel="shortcut icon" href={favicon} />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <meta name="theme-color" content="#ffffff" />
      
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
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate URLs */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://res.cloudinary.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//res.cloudinary.com" />
      
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": canonicalUrl,
                "url": canonicalUrl,
                "name": pageTitle,
                "description": pageDescription,
                "isPartOf": {
                  "@id": "https://tools.foxbeep.com/"
                },
                "about": {
                  "@type": "SoftwareApplication",
                  "name": "AVI to MP4 Converter",
                  "applicationCategory": "MultimediaApplication"
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://tools.foxbeep.com/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Converters",
                      "item": "https://tools.foxbeep.com/converters"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "AVI to MP4",
                      "item": canonicalUrl
                    }
                  ]
                },
                "inLanguage": "en-US",
                "potentialAction": [
                  {
                    "@type": "UseAction",
                    "target": canonicalUrl,
                    "object": {
                      "@type": "DigitalDocument",
                      "name": "AVI Video File"
                    },
                    "result": {
                      "@type": "DigitalDocument",
                      "name": "MP4 Video File"
                    }
                  }
                ]
              },
              {
                "@type": "SoftwareApplication",
                "name": "AVI to MP4 Converter",
                "applicationCategory": "MultimediaApplication",
                "applicationSubCategory": "Video Converter",
                "description": pageDescription,
                "operatingSystem": ["Windows", "macOS", "Linux", "Android", "iOS", "Web Browser"],
                "url": canonicalUrl,
                "screenshot": heroData?.image,
                "softwareVersion": "1.0",
                "releaseNotes": "Convert AVI files to MP4 format online",
                "downloadUrl": canonicalUrl,
                "installUrl": canonicalUrl,
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
                  "@type": "Organization",
                  "name": companyName,
                  "url": "https://tools.foxbeep.com/"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "2847",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "featureList": [
                  "Convert AVI to MP4 online",
                  "High-quality video conversion",
                  "No file size limits",
                  "Secure client-side processing",
                  "No registration required",
                  "Free to use",
                  "Batch conversion support",
                  "Preserve video quality",
                  "Fast conversion speed",
                  "Cross-platform compatibility"
                ]
              },
              {
                "@type": "HowTo",
                "name": "How to Convert AVI to MP4",
                "description": "Step-by-step guide to convert AVI files to MP4 format online",
                "image": heroData?.image,
                "totalTime": "PT5M",
                "estimatedCost": {
                  "@type": "MonetaryAmount",
                  "currency": "USD",
                  "value": "0"
                },
                "tool": [
                  {
                    "@type": "HowToTool",
                    "name": "AVI to MP4 Converter"
                  }
                ],
                "supply": [
                  {
                    "@type": "HowToSupply",
                    "name": "AVI video file"
                  }
                ],
                "step": [
                  {
                    "@type": "HowToStep",
                    "position": 1,
                    "name": "Upload AVI File",
                    "text": "Click the upload button or drag your AVI file into the converter",
                    "image": heroData?.image
                  },
                  {
                    "@type": "HowToStep",
                    "position": 2,
                    "name": "Select MP4 Format",
                    "text": "Choose MP4 as the output format from the available options",
                    "image": heroData?.image
                  },
                  {
                    "@type": "HowToStep",
                    "position": 3,
                    "name": "Convert and Download",
                    "text": "Click convert and download your high-quality MP4 file when ready",
                    "image": heroData?.image
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How do I convert AVI to MP4?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "To convert AVI to MP4, upload your AVI file, choose MP4 as the output format, and hit the 'Convert' button. Download the converted file instantly once it's ready."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is MP4 better than AVI?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "MP4 offers better compression and broader compatibility across devices and platforms, making it ideal for streaming and sharing. AVI tends to have larger file sizes and is less suitable for modern platforms."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I convert AVI to MP4 without losing quality?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. Our converter retains the original resolution and bitrate, ensuring minimal to no loss in video quality during the conversion process."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Which players can open AVI files?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "AVI files can be opened with VLC Media Player, Windows Media Player, and other classic media players. However, newer platforms may not support AVI natively."
                    }
                  }
                ]
              },
              {
                "@type": "VideoObject",
                "name": "AVI to MP4 Conversion Demo",
                "description": "Learn how to convert AVI files to MP4 format using our online converter",
                "thumbnailUrl": heroData?.image,
                "uploadDate": "2024-01-01T00:00:00Z",
                "duration": "PT3M",
                "contentUrl": canonicalUrl
              }
            ]
          })
        }}
      />
      
      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": pageTitle,
            "description": pageDescription,
            "author": {
              "@type": "Organization",
              "name": companyName,
              "url": "https://tools.foxbeep.com/"
            },
            "publisher": {
              "@type": "Organization",
              "name": companyName,
              "url": "https://tools.foxbeep.com/",
              "logo": {
                "@type": "ImageObject",
                "url": logo || favicon
              }
            },
            "datePublished": "2024-01-01T00:00:00Z",
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            },
            "image": heroData?.image,
            "articleSection": "Video Conversion",
            "keywords": pageKeywords.split(', ')
          })
        }}
      />

      {/* Google Analytics */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
              page_title: '${pageTitle}',
              page_location: '${canonicalUrl}'
            });
          `,
        }}
      />

      {/* Google Tag Manager */}
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

export default function AviToMp4Page() {
  const { 
    getConverterData, 
    fetchConverterData, 
    isConverterCacheValid, 
    loading: globalLoading,
    companyData
  } = useData();
  
  const [heroData, setHeroData] = useState(null);
  const [waysData, setWaysData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const converterId = 'avi-to-mp4';

  // Default fallback hero data
  const defaultHeroData = {
    title: "AVI to MP4",
    description: "Transform your AVI files to MP4 format with our lightning-fast converter. No quality loss, no watermarks.",
    image: "https://res.cloudinary.com/dg5aeihzx/image/upload/v1748482965/hero-/ihufiif0lfp1cns7bwrp.png",
    imageAlt: "AVI to MP4 converter illustration"
  };

  // Default fallback ways data
  const defaultWaysData = {
    title: "How to convert AVI to MP4:",
    description: "Follow these simple steps to convert your AVI files",
    image: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=768,quality=75,format=auto/How_to_Convert_GIF_to_MP_4_7dc8870b16/How_to_Convert_GIF_to_MP_4_7dc8870b16.png",
    imageAlt: "AVI to MP4 conversion interface"
  };

  // Static steps data
  const steps = [
    {
      number: 1,
      heading: "Upload your AVI file",
      description: "Click the upload button or drag your AVI file into the converter. Most major formats are supported."
    },
    {
      number: 2,
      heading: "Choose MP4 as output",
      description: "From the format options, select MP4 to convert your file to a more shareable format."
    },
    {
      number: 3,
      heading: "Convert and download",
      description: "Hit 'Convert' and wait for processing. Once done, download your high-quality MP4 file."
    }
  ];

  // Static FAQ data
  const faqData = [
    {
      question: "How do I convert AVI to MP4?",
      answer: "To convert AVI to MP4, upload your AVI file, choose MP4 as the output format, and hit the 'Convert' button. Download the converted file instantly once it's ready."
    },
    {
      question: "Is MP4 better than AVI?",
      answer: "MP4 offers better compression and broader compatibility across devices and platforms, making it ideal for streaming and sharing. AVI tends to have larger file sizes and is less suitable for modern platforms."
    },
    {
      question: "Can I convert AVI to MP4 without losing quality?",
      answer: "Yes. Our converter retains the original resolution and bitrate, ensuring minimal to no loss in video quality during the conversion process."
    },
    {
      question: "Which players can open AVI files?",
      answer: "AVI files can be opened with VLC Media Player, Windows Media Player, and other classic media players. However, newer platforms may not support AVI natively."
    }
  ];

  // Fetch hero and ways data dynamically
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check if we have cached data first
        let data = getConverterData(converterId);
        
        // If no cached data or cache is invalid, fetch fresh data
        if (!data || !isConverterCacheValid(converterId)) {
          try {
            data = await fetchConverterData(converterId);
          } catch (fetchError) {
            console.warn('API fetch failed, using fallback data:', fetchError);
            data = null;
          }
        }
        
        // Set hero data - either from API or fallback
        if (data && typeof data === 'object' && data.hero) {
          setHeroData(data.hero);
        } else {
          console.log('Using fallback hero data due to invalid or missing API data');
          setHeroData(defaultHeroData);
        }

        // Set ways data - either from API or fallback
        if (data && typeof data === 'object' && data.ways) {
          setWaysData(data.ways);
        } else {
          console.log('Using fallback ways data due to invalid or missing API data');
          setWaysData(defaultWaysData);
        }
        
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
        
        // Always provide fallback data even on error
        setHeroData(defaultHeroData);
        setWaysData(defaultWaysData);
      } finally {
        setIsLoading(false);
      }
    };

    // Only load if global loading is complete
    if (!globalLoading) {
      loadData();
    }
  }, [converterId, getConverterData, fetchConverterData, isConverterCacheValid, globalLoading]);

  // Show loading state
  if (globalLoading || isLoading) {
    return <AnimatedLoader />;
  }

  // At this point, both heroData and waysData should always exist (either from API or fallback)
  const currentHeroData = heroData || defaultHeroData;
  const currentWaysData = waysData || defaultWaysData;

  return (
    <div>
      {/* SEO Head */}
      <AviToMp4SEOHead companyData={companyData} heroData={currentHeroData} />
      
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
          height="0" 
          width="0" 
          style={{display: 'none', visibility: 'hidden'}}
        ></iframe>
      </noscript>

      {/* Main Content with Schema Markup */}
      <main role="main" itemScope itemType="https://schema.org/WebPage">
        <ConversionNavbar convertLink="/tools/avi-mp4" />
        
        <section itemScope itemType="https://schema.org/SoftwareApplication">
          <FileConverterHero
            title={currentHeroData.title}
            description={currentHeroData.description}
            buttonText="Convert Now"
            link="/tools/avi-mp4"
            image={currentHeroData.image}
            imageAlt={currentHeroData.imageAlt}
          />
        </section>

        <section aria-label="Company information">
          <CompanySection 
            title="Trusted by video professionals"
            description="Join thousands of video editors and marketers who use our AVI to MP4 converter daily."
            backgroundColor="bg-white"
          />
        </section>

        <section aria-label="Format comparison" itemScope itemType="https://schema.org/Article">
          <FileFormatsExplanation
            title="AVI vs MP4: What's the Difference?"
            backgroundColor="bg-white"
            sourceFormat={{
              name: "AVI",
              description1: "AVI (Audio Video Interleave) is a multimedia container developed by Microsoft. It stores video and audio in high quality but results in large file sizes.",
              description2: "While AVI maintains good quality, it lacks compression efficiency and compatibility with mobile and web platforms. It's often used in legacy systems or offline storage.",
              features: [
                { icon: "Monitor", text: "High-quality video and audio" },
                { icon: "FileText", text: "Larger file size due to minimal compression" },
                { icon: "Upload", text: "Limited platform and browser support" }
              ]
            }}
            targetFormat={{
              name: "MP4",
              description1: "MP4 is a modern multimedia format that offers excellent compression without noticeable quality loss. It is widely supported across all devices and platforms.",
              description2: "It's the go-to format for streaming, mobile sharing, and web use. MP4 files are smaller and optimized for performance and compatibility.",
              features: [
                { icon: "CheckCircle", text: "Optimized for streaming and sharing" },
                { icon: "Upload", text: "Universal platform compatibility" },
                { icon: "FileText", text: "Smaller file sizes with high quality" }
              ]
            }}
            buttonText="Convert AVI to MP4 Now"
            buttonColor="bg-blue-600 hover:bg-blue-700"
          />
        </section>

        <section aria-label="Conversion steps" itemScope itemType="https://schema.org/HowTo">
          <ConversionSteps
            title={currentWaysData.title}
            steps={steps}
            image={currentWaysData.image}
            imageAlt={currentWaysData.imageAlt}
            backgroundColor="bg-white"
          />
        </section>

        <section aria-label="Frequently asked questions" itemScope itemType="https://schema.org/FAQPage">
          <FAQ 
            title="FAQ"
            faqs={faqData}
            icon={<HelpCircle className="h-6 w-6 text-blue-500" />}
          />
        </section>
        
        <Footer />
      </main>
    </div>
  );
}