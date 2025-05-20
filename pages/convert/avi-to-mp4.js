import React from 'react';
import CompanySection from '@/components/convert/companyIndustry';
import FileConverterHero from '@/components/convert/hero';
import FileFormatsExplanation from '@/components/convert/FileFormatsExplanation';
import ConversionSteps from '@/components/convert/HowToUse';
import ConversionNavbar from '@/components/convert/ConversionNavbar';
import FAQ from '@/components/convert/faqSection';
import { HelpCircle } from 'lucide-react';
import Footer from '@/components/Footer';

export default function AviToMp4Page() {
  const faqData = [
    {
      question: "How do I convert AVI to MP4?",
      answer: "To convert AVI to MP4, upload your AVI file, choose MP4 as the output format, and hit the 'Convert' button. Download the converted file instantly once it’s ready."
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

  return (
    <div>
      <ConversionNavbar />
     <FileConverterHero
             title="AVI to MP4"
             description="Transform your AVI files to MP4 format with our lightning-fast converter. No quality loss, no watermarks."
             buttonText="Convert Now"
             link="/tools/avi-mp4"
             image="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/MKV_to_MP_4_bdd29d1ce7/MKV_to_MP_4_bdd29d1ce7.png"
             imageAlt="AVI to MP4 converter illustration"
           />

      <CompanySection 
        title="Trusted by video professionals"
        description="Join thousands of video editors and marketers who use our AVI to MP4 converter daily."
        backgroundColor="bg-white"
      />

      <FileFormatsExplanation
        title="AVI vs MP4: What’s the Difference?"
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
          description2: "It’s the go-to format for streaming, mobile sharing, and web use. MP4 files are smaller and optimized for performance and compatibility.",
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
        title="How to convert AVI to MP4:"
        steps={[
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
        ]}
        image="https://cdn-site-assets.veed.io/cdn-cgi/image/width=768,quality=75,format=auto/How_to_Convert_GIF_to_MP_4_7dc8870b16/How_to_Convert_GIF_to_MP_4_7dc8870b16.png"
        imageAlt="AVI to MP4 conversion interface"
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
