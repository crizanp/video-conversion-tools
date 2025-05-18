import React from 'react';
import Head from 'next/head';
import { Video } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InstantConversionSection from '@/components/InstantVideo';
import FreeServiceSection from '@/components/pricing';
import VideoConversionServices from '@/components/features';
import NewsletterSection from '@/components/NewsLetter';
import FAQSection from '@/components/FAQSection';
import AboutSection from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Head>
        <title>VideoConvert Pro | Fast & Free Video Format Converter</title>
        <meta
          name="description"
          content="Convert video formats easily with our powerful online tool. Free, fast and secure. Convert MP4, WebM, MOV, MKV and more."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
   <Footer/> </div>
  );
}