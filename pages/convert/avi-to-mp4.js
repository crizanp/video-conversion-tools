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

export default function AviToMp4Page() {
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
  
  const converterId = 'avi-to-mp4';

  // Default fallback hero data
  const defaultHeroData = {
    title: "AVI to MP4",
    description: "Transform your AVI files to MP4 format with our lightning-fast converter. No quality loss, no watermarks.",
    image: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/MKV_to_MP_4_bdd29d1ce7/MKV_to_MP_4_bdd29d1ce7.png",
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
      <ConversionNavbar convertLink="/tools/avi-mp4" />
      
      <FileConverterHero
        title={currentHeroData.title}
        description={currentHeroData.description}
        buttonText="Convert Now"
        link="/tools/avi-mp4"
        image={currentHeroData.image}
        imageAlt={currentHeroData.imageAlt}
      />

      <CompanySection 
        title="Trusted by video professionals"
        description="Join thousands of video editors and marketers who use our AVI to MP4 converter daily."
        backgroundColor="bg-white"
      />

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