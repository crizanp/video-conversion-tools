import React, { useEffect, useState } from 'react';
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

export default function Mp4ToWebmPage() {
  const {
    getConverterData,
    fetchConverterData,
    isConverterCacheValid,
    loading: globalLoading
  } = useData();

  const [heroData, setHeroData] = useState(null);
  const [waysData, setWaysData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const converterId = 'mp4-to-webm';

  // Default fallback hero data
  const defaultHeroData = {
    title: "MP4 to WebM Converter",
    description: "Convert your MP4 files to WebM format with our fast, reliable converter. Optimized for web use with no quality compromise.",
    image: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/MKV_to_MP_4_bdd29d1ce7/MKV_to_MP_4_bdd29d1ce7.png",
    imageAlt: "MP4 to WebM converter illustration"
  };

  // Default fallback ways data
  const defaultWaysData = {
    title: "How to convert MP4 to WebM:",
    description: "Follow these simple steps to convert your MP4 files",
    image: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=768,quality=75,format=auto/How_to_Convert_GIF_to_MP_4_7dc8870b16/How_to_Convert_GIF_to_MP_4_7dc8870b16.png",
    imageAlt: "MP4 to WebM conversion interface"
  };

  // Static steps data
  const steps = [
    {
      number: 1,
      heading: "Upload your MP4 file",
      description: "Drag and drop or browse to upload your MP4 file. Our converter supports files of all sizes and quality levels."
    },
    {
      number: 2,
      heading: "Select WebM as the output",
      description: "Choose WebM from the format list as your desired output format."
    },
    {
      number: 3,
      heading: "Convert and download",
      description: "Click the 'Convert' button and wait for the process to complete. Download your WebM file instantly once it's ready."
    }
  ];

  // Static FAQ data
  const faqData = [
    {
      question: "How do I convert MP4 to WebM?",
      answer: "To convert MP4 to WebM, upload your MP4 file to our converter, select WebM as your output format, and click the 'Convert' button. Once the conversion is complete, download your WebM file directly to your device."
    },
    {
      question: "What advantages does WebM offer over MP4?",
      answer: "WebM is an open-source format that offers excellent compression efficiency while maintaining good quality. It's optimized for web use, resulting in smaller file sizes that are ideal for websites and online streaming."
    },
    {
      question: "Will I lose quality when converting MP4 to WebM?",
      answer: "Our converter maintains the highest possible quality during conversion. However, WebM uses different codecs than MP4, so some minor quality differences may occur depending on your settings. For most web uses, these differences are imperceptible."
    },
    {
      question: "Which browsers support WebM playback?",
      answer: "WebM is supported by most modern browsers including Chrome, Firefox, Opera, and Edge. Safari has limited support for WebM video with VP8 codec but may require additional settings for VP9 playback."
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
      <ConversionNavbar convertLink="/tools/mp4-webm" />

      <FileConverterHero
        title={currentHeroData.title}
        description={currentHeroData.description}
        buttonText="Convert Now"
        link="/tools/mp4-webm"
        image={currentHeroData.image}
        imageAlt={currentHeroData.imageAlt}
      />

      <CompanySection
        title="Trusted by web developers and content creators"
        description="Join thousands of professionals who use our platform to convert MP4 files to WebM for optimized web performance."
        backgroundColor="bg-white"
      />

      <FileFormatsExplanation
        title="Know Your Formats"
        backgroundColor="bg-white"
        sourceFormat={{
          name: "MP4",
          description1: "MP4 is widely supported and used across almost all platforms, including social media and mobile devices.",
          description2: "It's a universal standard for video sharing, offering decent quality at relatively small file sizes, making it ideal for streaming and downloading.",
          features: [
            { icon: "CheckCircle", text: "Highly compatible" },
            { icon: "Upload", text: "Supports streaming and social platforms" },
            { icon: "FileText", text: "Efficient compression" }
          ]
        }}
        targetFormat={{
          name: "WebM",
          description1: "WebM is an open-source format specifically designed for web video, offering excellent compression efficiency.",
          description2: "It's ideal for websites and web applications, providing smaller file sizes than MP4 while maintaining good quality, resulting in faster page loading times.",
          features: [
            { icon: "Globe", text: "Optimized for web use" },
            { icon: "FileText", text: "Smaller file sizes" },
            { icon: "Code", text: "Open-source format with excellent browser support" }
          ]
        }}
        buttonText="Convert MP4 to WebM Now"
        buttonColor="bg-blue-600 hover:bg-blue-700"
      />

      <ConversionSteps
        title={currentWaysData.title}
        steps={steps}
        image={currentWaysData.image}
        imageAlt={currentWaysData.imageAlt}
        backgroundColor="bg-white"
      />

      <FAQ
        title="FAQ"
        faqs={faqData}
        icon={<HelpCircle className="h-6 w-6 text-blue-500" />}
      />

      <Footer />
    </div>
  );
}