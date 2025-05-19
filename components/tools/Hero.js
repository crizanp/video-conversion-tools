import React from "react";

const HeroSection = ({ title, highlightText, description, imageSrc }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center py-14">
      {/* Left side - Content */}
      <div className="md:w-1/2 text-left">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
          <span className="block text-gray-900">{title}</span>
          <span className="block mt-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-cyan-700 to-blue-600">
              {highlightText}
            </span>
          </span>
        </h1>
        {/* Description */}
        <p className="text-xl md:text-2xl max-w-lg text-gray-700 font-light py-4">
          {description}
        </p>
      </div>

      {/* Right side - Image */}
      <div className="relative flex justify-center items-center my-12">
        <img
          src={imageSrc}
          alt="Video Formats Illustration"
          className="w-full max-w-md md:max-w-xl lg:max-w-2xl object-contain"
        />
      </div>
    </div>
  );
};

export default HeroSection;
