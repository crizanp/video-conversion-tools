import React from 'react';
import { ChevronRight, Globe, Shield, Zap, Award } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      id: 1,
      icon: <Globe className="h-6 w-6 text-cyan-300" />,
      title: "Universal Compatibility",
      description: "Convert between 100+ video formats including MP4, MKV, AVI, WEBM, MOV, WMV, and FLV with perfect compatibility across all devices."
    },
    {
      id: 2,
      icon: <Shield className="h-6 w-6 text-cyan-300" />,
      title: "Secure Processing",
      description: "Your data privacy is our priority. All uploads are encrypted and automatically deleted from our servers within 24 hours."
    },
    {
      id: 3,
      icon: <Zap className="h-6 w-6 text-cyan-300" />,
      title: "Lightning Fast",
      description: "Advanced algorithms ensure rapid conversions without sacrificing quality. Perfect for professionals and casual users alike."
    },
    {
      id: 4,
      icon: <Award className="h-6 w-6 text-cyan-300" />,
      title: "Premium Quality",
      description: "Choose between lossless conversions or compressed formats depending on your needs, without compromising viewing experience."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-black"id='about'>
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-1/2 w-full bg-gradient-to-l from-blue-800 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Animated circles */}
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Section Header */}
        <div className="text-left mb-16  mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="block text-white">About </span>
            <span className="block mt-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-100">
                FoxBeep Tools
              </span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light mt-6 py-4">
            FoxBeep Tools is a powerful video format conversion platform designed to simplify your media workflow. We serve content creators, video editors, marketers, teachers, and anyone needing quick and reliable video conversions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {features.map((feature) => (
            <div key={feature.id} className="bg-gray-200 bg-opacity-5 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-900 bg-opacity-50 rounded-lg mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-black">{feature.title}</h3>
              </div>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}