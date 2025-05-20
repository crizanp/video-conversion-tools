import React from 'react';
import CompanySection from '@/components/convert/companyIndustry';
import FileConverterHero from '@/components/convert/hero';
import FileFormatsExplanation from '@/components/convert/FileFormatsExplanation';
import ConversionSteps from '@/components/convert/HowToUse';
import ConversionNavbar from '@/components/convert/ConversionNavbar';
import FAQ from '@/components/convert/faqSection';
import { HelpCircle } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Mp4ToMkvPage() {
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

  return (
    <div>
      <ConversionNavbar/>
      <FileConverterHero
              title="MKV to MP4"
              description="Transform your MKV files to MP4 format with our lightning-fast converter. No quality loss, no watermarks."
              buttonText="Convert Now"
              link="/tools/mp4-mkv"
              image="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/MKV_to_MP_4_bdd29d1ce7/MKV_to_MP_4_bdd29d1ce7.png"
              imageAlt="MKV to MP4 converter illustration"
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
          description2: "It’s a universal standard for video sharing, offering decent quality at relatively small file sizes, making it ideal for streaming and downloading.",
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
        title="How to convert MP4 to MKV:"
        steps={[
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
        ]}
        image="https://cdn-site-assets.veed.io/cdn-cgi/image/width=768,quality=75,format=auto/How_to_Convert_GIF_to_MP_4_7dc8870b16/How_to_Convert_GIF_to_MP_4_7dc8870b16.png"
        imageAlt="MP4 to MKV conversion interface"
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
