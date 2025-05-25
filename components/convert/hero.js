import Link from 'next/link';
import { UploadCloud } from 'lucide-react';

export default function FileConverterHero({
  title,
  description,
  buttonText = "Convert MKV File",
  image = "/api/placeholder/500/350",
  imageAlt = "File converter illustration",
  link = "/convert" 
}) {
  const words = title.trim().split(" ");
const lastWord = words.pop();
const remainingTitle = words.join(" ");
  return (
    
    <div className="bg-white py-14 md:py-24" id='features'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
             <span className="block text-gray-900">{remainingTitle}</span>
<span className="block mt-1">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-cyan-700 to-blue-600">
    {lastWord}
  </span>
</span>

            </h1>

            <p className="text-xl md:text-2xl max-w-lg text-gray-700 font-light py-4">
              {description}
            </p>

            <Link href={link}>
              <button className="mt-4 px-6 py-3 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg flex items-center gap-2 transition-colors">
                {buttonText}
                <UploadCloud size={16} />
              </button>
            </Link>
          </div>

          <div className="relative flex justify-center items-center">
            <img
              src={image}
              alt={imageAlt}
              className="w-full max-w-md md:max-w-xl lg:max-w-2xl object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
