import React from 'react';
import Head from 'next/head';
import { Video } from 'lucide-react';
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

// SEO Head component that uses server-side data
function SEOHead({ companyData }) {
  const seoData = companyData?.seo || {};
  const companyName = companyData?.companyName || 'VideoConvert Pro';
  const favicon = companyData?.favicon || '/favicon.ico';
  const logo = companyData?.logo || null;
  
  const pageTitle = seoData.title || `${companyName} | Fast & Free Video Format Converter`;
  const pageDescription = seoData.description || 'Convert video formats easily with our powerful online tool. Free, fast and secure. Convert MP4, WebM, MOV, MKV and more.';
  const pageKeywords = seoData.keywords || 'video converter, online video converter, free video converter, MP4 converter, video format converter';

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content={pageDescription}
      />
      <meta
        name="keywords"
        content={pageKeywords}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={companyName} />
      {logo && <meta property="og:image" content={logo} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {logo && <meta name="twitter:image" content={logo} />}
      
      {/* Favicon */}
      <link rel="icon" href={favicon} />
      <link rel="shortcut icon" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={companyName} />
      <meta name="generator" content="Next.js" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL - adjust based on your domain */}
      <link rel="canonical" href="https://yourdomain.com/" />
      
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": companyName,
            "applicationCategory": "MultimediaApplication",
            "description": pageDescription,
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "publisher": {
              "@type": "Organization",
              "name": companyName,
              "logo": logo || favicon
            }
          })
        }}
      />
    </Head>
  );
}

// Main page content that uses DataContext
function PageContent() {
  return (
    <>
      <Navbar />
      
      <section id="home">
        <HeroSection />
      </section>
      
      <section id="features">
        <InstantConversionSection />
      </section>
      
      <section id="services">
        <VideoConversionServices />
      </section>
      
      <section id="pricing">
        <FreeServiceSection />
      </section>
      
      <section id="about">
        <AboutSection />
      </section>
      
      <FAQSection />
      
      <NewsletterSection />
      
      <Footer />
    </>
  );
}

// Main Home component
export default function Home({ ssrCompanyData }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* SEO Head uses server-side data */}
      <SEOHead companyData={ssrCompanyData} />
      
      {/* Page content uses DataContext for client-side functionality */}
      <DataProvider initialCompanyData={ssrCompanyData}>
        <PageContent />
      </DataProvider>
    </div>
  );
}

// Server-side data fetching for SEO
export async function getStaticProps() {
  let companyData = null;

  try {
    // Fetch only company data for SEO (lightweight)
    const companyResponse = await fetch('https://setting-panel.vercel.app/api/admin/company/details');
    if (companyResponse.ok) {
      const companyResult = await companyResponse.json();
      if (companyResult.success && companyResult.data) {
        companyData = companyResult.data;
      }
    }
  } catch (error) {
    console.error('Error fetching company data for SEO:', error);
  }

  // Provide fallback data if API call fails
  if (!companyData) {
    companyData = {
      companyName: "Foxbeep",
      logo: "https://res.cloudinary.com/dg5aeihzx/image/upload/v1748238626/hero-/chqkbkwmhdx2v1yq8wuk.png",
      blackLogo: "https://res.cloudinary.com/dg5aeihzx/image/upload/v1748164260/hero-/afqnaagbegm6dhxzkcqd.jpg",
      favicon: "/favicon.ico",
      seo: {
        title: "the powerful video conversion tools - foxbeep",
        description: "Convert videos with ease using FoxBeep Tech – your powerful solution for fast, high-quality video format conversions. Simple, efficient, and versatile",
        keywords: "video converter, video conversion tool, FoxBeep Tech, convert videos online, fast video converter, HD video conversion, format converter, MP4 converter, video to MP4, video editing tools, online video converter, high-quality video conversion"
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
    // Revalidate every 5 minutes (300 seconds)
    revalidate: 300,
  };
}