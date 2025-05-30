// components/HeroSection.js
import React from 'react';
import { ArrowRight, Play, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Link from 'next/link';

export default function HeroSection() {
  const { heroData, loading, error, refetch, isOnline } = useData();

  // Show loading state only when we don't have any data


  // Show error state only when we don't have any data to display
  if (error && !heroData) {
    return (
      <div className="relative overflow-hidden bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <p className="text-red-400 mb-4">Unable to load content</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { hero } = heroData || {};

  return (
    <div className="relative overflow-hidden bg-black">


      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-1/2 w-full bg-gradient-to-r from-blue-800 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            {/* Heading */}
            {(() => {
              const fullTitle = hero?.title || "Welcome to Our Platform";
              const words = fullTitle.trim().split(" ");
              const mainTitle = words.slice(0, -2).join(" ");
              const highlight = words.slice(-2).join(" ");

              return (
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                  <span className="block text-white">{mainTitle}</span>
                  <span className="block mt-1">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-100">
                      {highlight}
                    </span>
                  </span>
                </h1>
              );
            })()}

            {/* Description */}
            <p className="text-xl md:text-2xl max-w-lg text-blue-100 font-light">
              {hero?.description || "Discover incredible features and join thousands of satisfied users."}
            </p>

            {/* Features list */}
            {hero?.features && hero.features.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {hero.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-cyan-300" />
                    <span className="text-blue-100">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="#services" className=''>
                <button className="cursor-pointer px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:translate-y-[-2px] transition-all flex items-center justify-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>

              <button className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all flex items-center justify-center text-black">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right side - Dynamic image */}
          <div className="relative flex justify-center items-center">
            {hero?.image ? (
              <img
                src={hero.image}
                alt={hero.imageAlt || "Hero image"}
                className="w-full max-w-md md:max-w-xl lg:max-w-2xl object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}