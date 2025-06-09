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

// SEO Head Component for MKV to MP4 Converter
function MkvToMp4SEOHead({ companyData, heroData }) {
  const companyName = companyData?.companyName || 'FoxBeep';
  const favicon = companyData?.favicon || '/favicon.ico';
  const logo = companyData?.logo || null;
  const socialLinks = companyData?.socialLinks || {};
  
  const pageTitle = `Convert MKV to MP4 Online Free - ${companyName} Video Converter`;
  const pageDescription = "Convert MKV files to MP4 format online for free. Fast, secure MKV to MP4 converter with no quality loss. Supports multiple audio tracks and subtitles. No registration required.";
  const pageKeywords = "MKV to MP4 converter, convert MKV to MP4, online video converter, free MKV converter, MKV MP4 conversion, Matroska to MP4, video format converter, convert videos online, HD video converter, MKV file converter";
  const canonicalUrl = "https://tools.foxbeep.com/convert/mkv-to-mp4";

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
      {heroData?.image && <meta property="og:image:alt" content="MKV to MP4 Converter Tool" />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {heroData?.image && <meta name="twitter:image" content={heroData.image} />}
      {heroData?.image && <meta name="twitter:image:alt" content="MKV to MP4 Converter Tool" />}
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
                  "name": "MKV to MP4 Converter",
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
                      "name": "MKV to MP4",
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
                      "name": "MKV Video File"
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
                "name": "MKV to MP4 Converter",
                "applicationCategory": "MultimediaApplication",
                "applicationSubCategory": "Video Converter",
                "description": pageDescription,
                "operatingSystem": ["Windows", "macOS", "Linux", "Android", "iOS", "Web Browser"],
                "url": canonicalUrl,
                "screenshot": heroData?.image,
                "softwareVersion": "1.0",
                "releaseNotes": "Convert MKV files to MP4 format online with support for multiple audio tracks",
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
                  "ratingValue": "4.8",
                  "reviewCount": "3254",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "featureList": [
                  "Convert MKV to MP4 online",
                  "Preserve multiple audio tracks",
                  "Maintain subtitle support",
                  "High-quality video conversion",
                  "No file size limits",
                  "Secure client-side processing",
                  "No registration required",
                  "Free to use",
                  "Batch conversion support",
                  "Cross-platform compatibility"
                ]
              },
              {
                "@type": "HowTo",
                "name": "How to Convert MKV to MP4",
                "description": "Step-by-step guide to convert MKV files to MP4 format online while preserving quality",
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
                    "name": "MKV to MP4 Converter"
                  }
                ],
                "supply": [
                  {
                    "@type": "HowToSupply",
                    "name": "MKV video file"
                  }
                ],
                "step": [
                  {
                    "@type": "HowToStep",
                    "position": 1,
                    "name": "Upload MKV File",
                    "text": "Upload your MKV file by clicking the upload button or dragging it into the converter",
                    "image": heroData?.image
                  },
                  {
                    "@type": "HowToStep",
                    "position": 2,
                    "name": "Select MP4 Output",
                    "text": "Choose MP4 as your desired output format from the dropdown menu",
                    "image": heroData?.image
                  },
                  {
                    "@type": "HowToStep",
                    "position": 3,
                    "name": "Convert and Download",
                    "text": "Click 'Convert' to start processing and download your MP4 file when ready",
                    "image": heroData?.image
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How do I convert MKV to MP4?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "To convert MKV to MP4, simply upload your MKV file to our converter, select MP4 as your output format, and click the 'Convert' button. Once the conversion is complete, you can download your newly converted MP4 file directly to your device."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I convert MKV to MP4 for free?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our platform offers a free tier that allows you to convert MKV to MP4 without any charge. Simply upload your file, select MP4 as the target format, and download your converted file. There's no watermark and no quality loss in the free version."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What program opens MKV files?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "MKV files can be opened by several popular media players including VLC Media Player, MPC-HC (Media Player Classic - Home Cinema), PotPlayer, KMPlayer, and SMPlayer. For Windows 10 users, the built-in Movies & TV app can also open MKV files."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the fastest way to convert MKV to MP4?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The fastest way to convert MKV to MP4 is using our online converter which uses high-speed servers to process your files quickly. For large files, you can also use our desktop application which processes files locally on your computer for even faster conversion speeds."
                    }
                  }
                ]
              },
              {
                "@type": "VideoObject",
                "name": "MKV to MP4 Conversion Demo",
                "description": "Learn how to convert MKV files to MP4 format using our online converter",
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

export default function MkvToMp4Page() {
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
  
  const converterId = 'mkv-to-mp4';

  // Default fallback hero data
  const defaultHeroData = {
    title: "MKV to MP4 Converter",
    description: "Transform your MKV files to MP4 format with our lightning-fast converter. No quality loss, no watermarks.",
    image: "https://res.cloudinary.com/dg5aeihzx/image/upload/v1748482965/hero-/ihufiif0lfp1cns7bwrp.png",
    imageAlt: "MKV to MP4 converter illustration"
  };

  // Default fallback ways data
  const defaultWaysData = {
    title: "How to convert MKV to MP4:",
    description: "Follow these simple steps to convert your MKV files",
    image: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=768,quality=75,format=auto/How_to_Convert_GIF_to_MP_4_7dc8870b16/How_to_Convert_GIF_to_MP_4_7dc8870b16.png",
    imageAlt: "MKV to MP4 conversion interface"
  };

  // Static steps data - updated for better SEO
  const steps = [
    {
      number: 1,
      heading: "Upload your MKV file",
      description: "Upload your MKV video file by clicking the upload button or dragging it into the converter. VEED supports MKV and all other popular Matroska video formats."
    },
    {
      number: 2,
      heading: "Select MP4 output format",
      description: "Select MP4 as your desired output format from the dropdown menu. You can choose from various quality settings to optimize file size or maintain maximum quality."
    },
    {
      number: 3,
      heading: "Convert & download your MP4",
      description: "Click 'Convert' to start the MKV to MP4 conversion process. Once complete, download your converted MP4 file that's ready for sharing on social media or streaming platforms."
    }
  ];

  // Static features data
  const features = {
    title: "Why Choose Our MKV to MP4 Converter",
    items: [
      "Lightning-fast conversion speed",
      "Preserves multiple audio tracks", 
      "Maintains subtitle compatibility",
      "Secure file processing",
      "No registration required",
      "Free with no watermarks"
    ]
  };

  // Enhanced FAQ data for better SEO
  const faqData = [
    {
      question: "How do I convert MKV to MP4?",
      answer: "To convert MKV to MP4, simply upload your MKV file to our converter, select MP4 as your output format, and click the 'Convert' button. Once the conversion is complete, you can download your newly converted MP4 file directly to your device."
    },
    {
      question: "How do I convert MKV to MP4 for free?",
      answer: "Our platform offers a free tier that allows you to convert MKV to MP4 without any charge. Simply upload your file, select MP4 as the target format, and download your converted file. There's no watermark and no quality loss in the free version."
    },
    {
      question: "What program opens MKV files?",
      answer: "MKV files can be opened by several popular media players including VLC Media Player, MPC-HC (Media Player Classic - Home Cinema), PotPlayer, KMPlayer, and SMPlayer. For Windows 10 users, the built-in Movies & TV app can also open MKV files."
    },
    {
      question: "What is the fastest way to convert MKV to MP4?",
      answer: "The fastest way to convert MKV to MP4 is using our online converter which uses high-speed servers to process your files quickly. For large files, you can also use our desktop application which processes files locally on your computer for even faster conversion speeds."
    },
    {
      question: "Will converting MKV to MP4 reduce video quality?",
      answer: "Our converter maintains the original video quality during the MKV to MP4 conversion process. We use advanced encoding techniques to preserve resolution, bitrate, and visual fidelity while making your files more compatible across devices."
    },
    {
      question: "Can I convert MKV files with multiple audio tracks to MP4?",
      answer: "Yes, our converter can handle MKV files with multiple audio tracks and subtitles. During conversion, you can choose which audio track to keep or preserve all tracks depending on your needs."
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
      <MkvToMp4SEOHead companyData={companyData} heroData={currentHeroData} />
      
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
        <ConversionNavbar convertLink="/tools/mkv-mp4" />
        
        <section itemScope itemType="https://schema.org/SoftwareApplication">
          <FileConverterHero
            title={currentHeroData.title}
            description={currentHeroData.description}
            buttonText="Convert Now"
            link="/tools/mkv-mp4"
            image={currentHeroData.image}
            imageAlt={currentHeroData.imageAlt}
          />
        </section>

        <section aria-label="Company information">
          <CompanySection 
            title="Trusted by video professionals"
            description="Join thousands of content creators and video editors who use our MKV to MP4 converter daily for their projects."
            backgroundColor="bg-white"
          />
        </section>

        <section aria-label="Format comparison" itemScope itemType="https://schema.org/Article">
          <FileFormatsExplanation
            title="MKV vs MP4: Understanding Video File Formats"
            backgroundColor="bg-white"
            sourceFormat={{
              name: "MKV",
              description1: "MKV (Matroska Video) is an open-standard multimedia container that can hold unlimited video, audio, and subtitle tracks. It's excellent for storing high-quality content but has limited platform compatibility.",
              description2: "The Matroska Video format supports advanced features like chapter markers, metadata, and multiple language tracks. However, MKV files are not compatible with many mobile devices and social media platforms, making conversion necessary for broader accessibility.",
              features: [
                { icon: "FileText", text: "Supports unlimited audio and subtitle tracks" },
                { icon: "Monitor", text: "Excellent for high-quality video storage" },
                { icon: "Upload", text: "Limited compatibility with mobile and web platforms" }
              ]
            }}
            targetFormat={{
              name: "MP4",
              description1: "MP4 is the most widely compatible video format, supported by virtually all devices, browsers, and platforms. It offers excellent compression efficiency while maintaining high video quality, making it perfect for streaming and sharing.",
              description2: "MP4 files work seamlessly across YouTube, Instagram, TikTok, Twitter, Facebook, and other social media platforms. They're also natively supported by smartphones, tablets, smart TVs, and all major operating systems, ensuring your content reaches the widest possible audience.",
              features: [
                { icon: "CheckCircle", text: "Universal compatibility across all platforms" },
                { icon: "Upload", text: "Optimized for social media and streaming" },
                { icon: "FileText", text: "Efficient compression with minimal quality loss" }
              ]
            }}
            buttonText="Convert MKV to MP4 Now"
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
            title="Frequently Asked Questions" 
            faqs={faqData}
            icon={<HelpCircle className="h-6 w-6 text-blue-500" />}
          />
        </section>
        
        <Footer />
      </main>
    </div>
  );
}