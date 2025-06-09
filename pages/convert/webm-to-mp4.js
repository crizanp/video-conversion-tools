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

export default function WebmToMp4Page() {
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
  
  const converterId = 'webm-to-mp4';

  // Default fallback hero data
  const defaultHeroData = {
    title: "WEBM to MP4 Converter",
    description: "Convert your WEBM files to MP4 format with our lightning-fast converter. No quality loss, no watermarks.",
    image: "https://res.cloudinary.com/dg5aeihzx/image/upload/v1748482965/hero-/ihufiif0lfp1cns7bwrp.png",
    imageAlt: "WEBM to MP4 converter illustration"
  };

  // Default fallback ways data
  const defaultWaysData = {
    title: "How to convert WEBM to MP4:",
    description: "Follow these simple steps to convert your WEBM files",
    image: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=768,quality=75,format=auto/How_to_Convert_GIF_to_MP_4_7dc8870b16/How_to_Convert_GIF_to_MP_4_7dc8870b16.png",
    imageAlt: "WEBM to MP4 conversion interface"
  };

  // Static steps data
  const steps = [
    {
      number: 1,
      heading: "Upload your file",
      description: "Upload your WEBM video file. Our converter supports WEBM and all other popular video and audio file formats."
    },
    {
      number: 2,
      heading: "Select your output",
      description: "Select MP4 as your desired output format from the dropdown. You can also choose other supported audio and video formats."
    },
    {
      number: 3,
      heading: "Convert & download",
      description: "Click 'Convert' and export your file! Or use our audio and video editor to edit your tracks. You can cut, split, and rearrange your files quickly and save it in your desired file format."
    }
  ];

  // Static FAQ data
  const faqData = [
    {
      question: "How do I convert WEBM to MP4?",
      answer: "To convert WEBM to MP4, simply upload your WEBM file to our converter, select MP4 as your output format, and click the 'Convert' button. Once the conversion is complete, you can download your newly converted MP4 file directly to your device."
    },
    {
      question: "How do I convert WEBM to MP4 for free?",
      answer: "Our platform offers a free tier that allows you to convert WEBM to MP4 without any charge. Simply upload your file, select MP4 as the target format, and download your converted file. There's no watermark and no quality loss in the free version."
    },
    {
      question: "What program opens WEBM files?",
      answer: "WEBM files can be opened by several popular media players including Google Chrome, Mozilla Firefox, Opera, VLC Media Player, and other modern browsers. Some desktop media players like PotPlayer and MPC-HC also support WEBM playback."
    },
    {
      question: "Why convert WEBM to MP4?",
      answer: "Converting WEBM to MP4 increases compatibility across devices and platforms. While WEBM is great for web use, MP4 is more universally supported, especially on older devices, iOS devices, and various editing software. MP4 also offers better compatibility with social media platforms for uploading."
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
      <ConversionNavbar convertLink="/tools/webm-mp4" />
      
      <FileConverterHero
        title={currentHeroData.title}
        description={currentHeroData.description}
        buttonText="Convert Now"
        link="/tools/webm-mp4"
        image={currentHeroData.image}
        imageAlt={currentHeroData.imageAlt}
      />
      
      <CompanySection 
        title="Trusted by video professionals"
        description="Join thousands of content creators who use our conversion tools daily"
        backgroundColor="bg-white"
      />
      
      <FileFormatsExplanation
        title="Understanding Video File Formats"
        backgroundColor="bg-white"
        sourceFormat={{
          name: "WEBM",
          description1: "WEBM is an open-source video file format primarily designed for web use. It's supported by most modern web browsers including Chrome, Firefox, and Opera. WEBM files typically offer good quality at smaller file sizes, making them ideal for streaming video content online.",
          description2: "The WEBM format was developed by Google and uses VP8 or VP9 video codecs and Vorbis or Opus audio codecs. While it provides excellent compression and is royalty-free, WEBM has limited compatibility outside of web browsers and isn't widely supported on mobile devices or older media players.",
          features: [
            { icon: "Globe", text: "Excellent for web streaming" },
            { icon: "MinusCircle", text: "Limited device compatibility" },
            { icon: "FileText", text: "Efficient compression for smaller file sizes" }
          ]
        }}
        targetFormat={{
          name: "MP4",
          description1: "MP4 is one of the most compatible video file formats. You can upload MP4 files to YouTube, Instagram, TikTok, Twitter, Facebook, and other social media sites. You can also play MP4 files with Windows Media Player, VLC, QuickTime, iPhone, iPad, Android, and almost all media players.",
          description2: "MP4 files are popular because they can be viewed almost anywhere, and even with high-quality video, the file sizes remain relatively small, making them easy to share. MP4 is short for 'MPEG4,' and is a format that normally contains video and audio, but can also be used to store images and subtitles.",
          features: [
            { icon: "CheckCircle", text: "Universal compatibility" },
            { icon: "Upload", text: "Works on all social media platforms" },
            { icon: "FileText", text: "Efficient compression for smaller file sizes" }
          ]
        }}
        buttonText="Convert WEBM to MP4 Now"
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