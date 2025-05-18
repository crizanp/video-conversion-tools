import { FileText, Upload, Monitor, CheckCircle, ArrowRight } from 'lucide-react';

export default function FileFormatsExplanation({
  title = "Understanding Video File Formats",
  backgroundColor = "bg-gray-50",
  sourceFormat = {
    name: "MKV",
    description1: "MKV contains video, audio, and text files. You can upload MKV files to Facebook and YouTube, but not to mobile-based social media platforms like Instagram. It is compatible with VLC media player.",
    description2: "The Matroska Video or MKV supports an unlimited number of video, audio, and subtitle tracks. It is free to use and is best for independent creators. MKV files are not compatible with Mac and must be converted before they can be played on Apple's QuickTime Player.",
    features: [
      { icon: "FileText", text: "Supports multiple audio and subtitle tracks" },
      { icon: "Upload", text: "Limited platform compatibility" },
      { icon: "Monitor", text: "Best for high-quality video storage" }
    ]
  },
  targetFormat = {
    name: "MP4",
    description1: "MP4 is one of the most compatible video file formats. You can upload MP4 files to YouTube, Instagram, TikTok, Twitter, Facebook, and other social media sites. You can also play MP4 files with Windows Media Player, VLC, QuickTime, iPhone, iPad, Android, and almost all media players.",
    description2: "MP4 files are popular because they can be viewed almost anywhere, and even with high-quality video, the file sizes remain relatively small, making them easy to share. MP4 is short for 'MPEG4,' and is a format that normally contains video and audio, but can also be used to store images and subtitles.",
    features: [
      { icon: "CheckCircle", text: "Universal compatibility" },
      { icon: "Upload", text: "Works on all social media platforms" },
      { icon: "FileText", text: "Efficient compression for smaller file sizes" }
    ]
  },
  buttonText = "Convert MKV to MP4 Now",
  buttonColor = "bg-blue-600 hover:bg-blue-700"
}) {
  // Map of icon names to icon components
  const iconMap = {
    FileText: <FileText size={20} />,
    Upload: <Upload size={20} />,
    Monitor: <Monitor size={20} />,
    CheckCircle: <CheckCircle size={20} />
  };
  
  return (
    <div className={`${backgroundColor} py-16`} id='formats'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Source Format Card */}
          <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden">
            <div className="px-8 py-6">
              <h3 className="text-2xl font-bold mb-4">{sourceFormat.name}</h3>
              
              <p className="text-gray-700 mb-4">
                {sourceFormat.description1}
              </p>
              
              <p className="text-gray-700">
                {sourceFormat.description2}
              </p>
              
              <div className="mt-6 space-y-3">
                {sourceFormat.features.map((feature, index) => (
                  <Feature 
                    key={index} 
                    icon={iconMap[feature.icon] || iconMap.FileText} 
                    text={feature.text} 
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Target Format Card */}
          <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden">
            <div className="px-8 py-6">
              <h3 className="text-2xl font-bold mb-4">{targetFormat.name}</h3>
              
              <p className="text-gray-700 mb-4">
                {targetFormat.description1}
              </p>
              
              <p className="text-gray-700">
                {targetFormat.description2}
              </p>
              
              <div className="mt-6 space-y-3">
                {targetFormat.features.map((feature, index) => (
                  <Feature 
                    key={index} 
                    icon={iconMap[feature.icon] || iconMap.FileText} 
                    text={feature.text} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="text-center mt-12">
          <button className={`px-6 py-3 ${buttonColor} text-white font-medium rounded-lg inline-flex items-center gap-2 transition-colors`}>
            {buttonText}
            <ArrowRight size={16} />
          </button>
        </div> */}
      </div>
    </div>
  );
}

// Helper component for features
function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-blue-600">
        {icon}
      </div>
      <span className="text-gray-700">{text}</span>
    </div>
  );
}