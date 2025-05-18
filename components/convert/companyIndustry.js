import React from 'react';
import { 
  Film, 
  Video, 
  PlayCircle, 
  Youtube, 
  Camera, 
  Tv
} from 'lucide-react';

export default function CompanySection({
  title = "Trusted by video professionals",
  description = "Join thousands of content creators who use our conversion tools daily",
  backgroundColor = "bg-white"
}) {
  // Define video-related companies with Lucide icons instead of logos
  const companies = [
    { name: "StreamMax", icon: <Film size={28} />, color: "text-red-500" },
    { name: "VideoLab", icon: <Video size={28} />, color: "text-blue-500" },
    { name: "MediaPro", icon: <PlayCircle size={28} />, color: "text-green-500" },
    { name: "ViewCast", icon: <Youtube size={28} />, color: "text-red-600" },
    { name: "CineTech", icon: <Camera size={28} />, color: "text-purple-500" },
    { name: "ScreenFlow", icon: <Tv size={28} />, color: "text-indigo-500" }
  ];

  return (
    <section className={`pb-12 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
        {/* Company icons */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {companies.map((company, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center ${company.color} hover:bg-gray-200 transition-all`}>
                {company.icon}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}