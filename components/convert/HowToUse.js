import React from 'react';

export default function ConversionSteps({
  title = "How to convert MKV to MP4:",
  steps = [
    {
      number: 1,
      heading: "Upload your file",
      description: "Upload your audio or video file. VEED supports WAV and all other popular video and audio file formats."
    },
    {
      number: 2,
      heading: "Select your output",
      description: "Select your desired output format from the dropdown. You can choose from our supported audio and video formats."
    },
    {
      number: 3,
      heading: "Convert & download",
      description: "Click 'Convert' and export your file! Or use our audio and video editor to edit your tracks. You can cut, split, and rearrange your files quickly and save it in your desired file format."
    }
  ],
  image = "/api/placeholder/500/600",
  imageAlt = "Conversion process screenshot",
  backgroundColor = "bg-cream-50"
}) {
  return (
    <div className={`${backgroundColor} py-16`} id='steps'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side - Steps */}
          <div className="md:w-1/2 pr-0 md:pr-12 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl  mb-10">{title}</h2>
            
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="flex">
                  <div className="mr-5 flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.heading}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="md:w-1/2">
            <img 
              src={image} 
              alt={imageAlt} 
              className="rounded-lg shadow-lg w-full" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}