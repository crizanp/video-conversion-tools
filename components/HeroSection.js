import React from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';

export default function HeroSection() {
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className="block text-white">Transform Your</span>
              <span className="block mt-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-100">
                  Video Formats
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl max-w-lg text-blue-100 font-light">
              Convert between <span className="font-medium">MP4, WebM, MOV, MKV</span> and more with
              blazing-fast speed and uncompromising quality.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-300" />
                <span className="text-blue-100">Blazing Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-300" />
                <span className="text-blue-100">High Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-300" />
                <span className="text-blue-100">100% Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-300" />
                <span className="text-blue-100">Batch Processing</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:translate-y-[-2px] transition-all flex items-center justify-center">
                Start Converting Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all flex items-center justify-center text-black">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right side - Large PNG image */}
          <div className="relative flex justify-center items-center">
            <img
              src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/MKV_to_MP_4_bdd29d1ce7/MKV_to_MP_4_bdd29d1ce7.png"
              alt="Video Formats Illustration"
              className="w-full max-w-md md:max-w-xl lg:max-w-2xl object-contain"
            />
          </div>

        </div>
      </div>
    </div>
  );
}