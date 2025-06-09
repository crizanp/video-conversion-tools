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

export default function Mp4ToMkvPage() {
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
  
  const converterId = 'mp4-to-mkv';

  // Default fallback hero data
  const defaultHeroData = {
    title: "MP4 to MKV",
    description: "Transform your MP4 files to MKV format with our lightning-fast converter. No quality loss, no watermarks.",
    image: "https://res.cloudinary.com/dg5aeihzx/image/upload/v1748482965/hero-/ihufiif0lfp1cns7bwrp.png",
    imageAlt: "MP4 to MKV converter illustration"
  };

  // Default fallback ways data
  const defaultWaysData = {
    title: "How to convert MP4 to MKV:",
    description: "Follow these simple steps to convert your MP4 files",
    image: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=768,quality=75,format=auto/How_to_Convert_GIF_to_MP_4_7dc8870b16/How_to_Convert_GIF_to_MP_4_7dc8870b16.png",
    imageAlt: "MP4 to MKV conversion interface"
  };

  // Static steps data
  const steps = [
    {
      number: 1,
      heading: "Upload your MP4 file",
      description: "Drag and drop or browse to upload your MP4 file. All video and audio formats are supported."
    },
    {
      number: 2,
      heading: "Select MKV as the output",
      description: "From the format list, choose MKV as your output file format."
    },
    {
      number: 3,
      heading: "Convert and download",
      description: "Click the 'Convert' button and wait a few moments for the MKV file to be ready. Then download it instantly."
    }
  ];

  // Static FAQ data
  const faqData = [
    {
      question: "How do I convert MP4 to MKV?",
      answer: "To convert MP4 to MKV, simply upload your MP4 file to our converter, select MKV as your output format, and click the 'Convert' button. Once the conversion is complete, download your MKV file directly to your device."
    },
    {
      question: "Is MKV better than MP4?",
      answer: "MKV supports more features like multiple audio and subtitle tracks, making it ideal for archiving and high-quality playback. MP4, however, is more widely supported and generally has smaller file sizes."
    },
    {
      question: "Can I convert MP4 to MKV without losing quality?",
      answer: "Yes, our converter ensures that there is no loss in quality when converting MP4 to MKV. Your converted video will maintain its original resolution and bitrate."
    },
    {
      question: "What software can play MKV files?",
      answer: "MKV files can be played using VLC Media Player, KMPlayer, PotPlayer, and other open-source media players. Windows and macOS may require additional codecs to support MKV playback."
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
      <ConversionNavbar convertLink="/tools/mp4-mkv" />
      
      <FileConverterHero
        title={currentHeroData.title}
        description={currentHeroData.description}
        buttonText="Convert Now"
        link="/tools/mp4-mkv"
        image={currentHeroData.image}
        imageAlt={currentHeroData.imageAlt}
      />

      <CompanySection 
        title="Trusted by video professionals"
        description="Join thousands of creators who use our platform to convert MP4 files to MKV every day."
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
          name: "MKV",
          description1: "MKV files are great for high-quality storage and support advanced features like multiple subtitles and audio tracks.",
          description2: "MKV is the preferred format for long-term archiving and high-definition video files, though it's less compatible with older or mobile devices.",
          features: [
            { icon: "FileText", text: "Supports multiple subtitles and audio" },
            { icon: "Monitor", text: "Ideal for HD video storage" },
            { icon: "Upload", text: "Limited native support on mobile platforms" }
          ]
        }}
        buttonText="Convert MP4 to MKV Now"
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
      
      <Footer/>
    </div>
  );
}