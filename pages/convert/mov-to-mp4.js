import React from 'react';
import CompanySection from '@/components/convert/companyIndustry';
import FileConverterHero from '@/components/convert/hero';
import FileFormatsExplanation from '@/components/convert/FileFormatsExplanation';
import ConversionSteps from '@/components/convert/HowToUse';
import ConversionNavbar from '@/components/convert/ConversionNavbar';
import FAQ from '@/components/convert/faqSection';
import { HelpCircle } from 'lucide-react';
import Footer from '@/components/Footer';

export default function MovToMp4Page() {
  // FAQ data that will be passed as props
  const faqData = [
    {
      question: "How do I convert MOV to MP4?",
      answer: "To convert MOV to MP4, simply upload your MOV file to our converter, select MP4 as your output format, and click the 'Convert' button. Once the conversion is complete, you can download your newly converted MP4 file directly to your device."
    },
    {
      question: "How do I convert MOV to MP4 for free?",
      answer: "Our platform offers a free tier that allows you to convert MOV to MP4 without any charge. Simply upload your file, select MP4 as the target format, and download your converted file. There's no watermark and no quality loss in the free version."
    },
    {
      question: "What program opens MOV files?",
      answer: "MOV files can be opened by several popular media players including Apple QuickTime Player, VLC Media Player, Windows Media Player (with QuickTime components installed), and many modern video editing software like Adobe Premiere Pro, Final Cut Pro, and iMovie."
    },
    {
      question: "Why convert MOV to MP4?",
      answer: "Converting MOV to MP4 increases compatibility across devices and platforms. While MOV is excellent for Apple devices and professional video editing, MP4 is more universally supported, especially on Windows computers, Android devices, and various media players. MP4 also offers better compatibility with social media platforms for uploading and typically results in smaller file sizes."
    },
    {
      question: "Will I lose quality when converting MOV to MP4?",
      answer: "With our converter, quality loss is minimal to none when converting from MOV to MP4. Both formats support high-quality video, and our conversion process maintains the original resolution and visual fidelity while potentially reducing file size through more efficient compression."
    }
  ];

  return (
    <div>
      <ConversionNavbar/>
      <FileConverterHero
        title="MOV to MP4"
        description="Convert your MOV files to MP4 format with our lightning-fast converter. No quality loss, no watermarks."
        buttonText="Convert Now"
        link="/tools/mov-mp4"
        image="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/MKV_to_MP_4_bdd29d1ce7/MKV_to_MP_4_bdd29d1ce7.png"
        imageAlt="MOV to MP4 converter illustration"
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
          name: "MOV",
          description1: "MOV is a video file format developed by Apple for its QuickTime multimedia framework. It's commonly used in video editing and by Apple devices. MOV files can contain high-quality video and audio, making them popular among video professionals and content creators.",
          description2: "The MOV format uses various codecs including H.264, ProRes, and Animation. While it provides excellent quality and is ideal for editing, MOV files tend to be larger than other formats and may have compatibility issues with some non-Apple devices and platforms.",
          features: [
            { icon: "Film", text: "High-quality video preservation" },
            { icon: "Edit", text: "Excellent for video editing" },
            { icon: "Apple", text: "Native to Apple devices and QuickTime" }
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
        buttonText="Convert MOV to MP4 Now"
        buttonColor="bg-blue-600 hover:bg-blue-700"
      />
      
      <ConversionSteps
        title="How to convert MOV to MP4:"
        steps={[
          {
            number: 1,
            heading: "Upload your file",
            description: "Upload your MOV video file. Our converter supports MOV and all other popular video and audio file formats."
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
        ]}
        image="https://cdn-site-assets.veed.io/cdn-cgi/image/width=768,quality=75,format=auto/How_to_Convert_GIF_to_MP_4_7dc8870b16/How_to_Convert_GIF_to_MP_4_7dc8870b16.png"
        imageAlt="MOV to MP4 conversion interface"
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