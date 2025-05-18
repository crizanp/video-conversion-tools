import React from 'react';
import { ArrowRight, Maximize2, Minimize2, Zap, Clock } from 'lucide-react';

export default function InstantConversionSection() {
  return (
    <div className="bg-white py-20" id='features'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-left mb-16">
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="block text-gray-900">Convert Any Sized Video</span>
            <span className="block mt-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-cyan-700 to-blue-600">
                Instantly
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl max-w-lg text-gray-700 font-light py-4">
            No file size limitations. No quality loss. Just blazing fast conversions.
          </p>
        </div>



        {/* Main feature showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative ">
            {/* <div className="absolute w-full h-full bg-gray-50 rounded-3xl transform -rotate-2"></div> */}
            <div className="relative bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
              {/* Size visualization */}
              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                    <Minimize2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Small</span>
                </div>

                <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-200 via-blue-500 to-indigo-600 mx-4"></div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                    <Maximize2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Large</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="font-semibold text-gray-900">Processing Speed</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">10x Faster</div>
                  <p className="text-sm text-gray-600 mt-1">than other converters</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-semibold text-gray-900">Average Time</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">&lt; 60s</div>
                  <p className="text-sm text-gray-600 mt-1">for 1GB video file</p>
                </div>
              </div>

              {/* Size badges */}
              <div className="flex flex-wrap gap-3 mt-8 justify-center">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">4K Videos</span>
                <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">HD Movies</span>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Short Clips</span>
                <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">GoPro Footage</span>
                <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">Streaming Content</span>
              </div>
            </div>
          </div>

          {/* Right side - Steps */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute left-8 inset-y-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-600"></div>

              <div className="space-y-12 relative">
                {/* Step 1 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Your Video</h3>
                  <p className="text-gray-600">Drag & drop any video file, regardless of size or format.</p>
                </div>

                {/* Step 2 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Select Output Format</h3>
                  <p className="text-gray-600">Choose from MP4, WebM, MOV, MKV and other popular formats.</p>
                </div>

                {/* Step 3 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Conversion</h3>
                  <p className="text-gray-600">Our powerful servers process your video in seconds, not minutes.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium shadow-lg shadow-blue-200 transition-all flex items-center justify-center">
                Try Instant Conversion
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}