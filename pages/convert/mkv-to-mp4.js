import React from 'react';
import CompanySection from '@/components/convert/companyIndustry';
import FileConverterHero from '@/components/convert/hero';
import FileFormatsExplanation from '@/components/convert/FileFormatsExplanation';
import ConversionSteps from '@/components/convert/HowToUse';
import ConversionNavbar from '@/components/convert/ConversionNavbar';
import FAQ from '@/components/convert/faqSection';
import { HelpCircle } from 'lucide-react';
import Footer from '@/components/Footer';

export default function MkvToMp4Page() {
  // FAQ data that will be passed as props
  const faqData = [
    {
      question: "How do I convert MP4 to MKV?",
      answer: "To convert MP4 to MKV, simply upload your MP4 file to our converter, select MKV as your output format, and click the 'Convert' button. Once the conversion is complete, you can download your newly converted MKV file directly to your device."
    },
    {
      question: "How do I convert MP4 to MKV for free?",
      answer: "Our platform offers a free tier that allows you to convert MP4 to MKV without any charge. Simply upload your file, select MKV as the target format, and download your converted file. There's no watermark and no quality loss in the free version."
    },
    {
      question: "What program opens MKV files?",
      answer: "MKV files can be opened by several popular media players including VLC Media Player, MPC-HC (Media Player Classic - Home Cinema), PotPlayer, KMPlayer, and SMPlayer. For Windows 10 users, the built-in Movies & TV app can also open MKV files."
    },
    {
      question: "What is the fastest way to convert MKV to MP4?",
      answer: "The fastest way to convert MKV to MP4 is using our online converter which uses high-speed servers to process your files quickly. For large files, you can also use our desktop application which processes files locally on your computer for even faster conversion speeds."
    }
  ];

  return (
    <div>
      <ConversionNavbar/>
      <FileConverterHero
        title="MKV to MP4"
        description="Transform your MKV files to MP4 format with our lightning-fast converter. No quality loss, no watermarks."
        buttonText="Convert Now"
        link="/tools/mkv-mp4"
        image="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/MKV_to_MP_4_bdd29d1ce7/MKV_to_MP_4_bdd29d1ce7.png"
        imageAlt="MKV to MP4 converter illustration"
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
          name: "MKV",
          description1: "MKV contains video, audio, and text files. You can upload MKV files to Facebook and YouTube, but not to mobile-based social media platforms like Instagram. It is compatible with VLC media player.",
          description2: "The Matroska Video or MKV supports an unlimited number of video, audio, and subtitle tracks. It is free to use and is best for independent creators. MKV files are not compatible with Mac and must be converted before they can be played on Apple's QuickTime Player.",
          features: [
            { icon: "FileText", text: "Supports multiple audio and subtitle tracks" },
            { icon: "Upload", text: "Limited platform compatibility" },
            { icon: "Monitor", text: "Best for high-quality video storage" }
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
        buttonText="Convert MKV to MP4 Now"
        buttonColor="bg-blue-600 hover:bg-blue-700"
      />
      
      <ConversionSteps
        title="How to convert MKV to MP4:"
        steps={[
          {
            number: 1,
            heading: "Upload your file",
            description: "Upload your audio or video file. VEED supports WAV and all other popular video and audio file formats."
          },
          {
            number: 2,
            heading: "Select your output",
            description: "Select your desired output format from the dropdown. You can choose from our supported audio and video formats."
          },
          {
            number: 3,
            heading: "Convert & download",
            description: "Click 'Convert' and export your file! Or use our audio and video editor to edit your tracks. You can cut, split, and rearrange your files quickly and save it in your desired file format."
          }
        ]}
        image="https://cdn-site-assets.veed.io/cdn-cgi/image/width=768,quality=75,format=auto/How_to_Convert_GIF_to_MP_4_7dc8870b16/How_to_Convert_GIF_to_MP_4_7dc8870b16.png"
        imageAlt="MKV to MP4 conversion interface"
        backgroundColor="bg-white"
      />
      
      {/* Add the FAQ section with props */}
      <FAQ 
        title="FAQ" 
        faqs={faqData}
        icon={<HelpCircle className="h-6 w-6 text-blue-500" />}
      />
      <Footer/>
    </div>
  );
}