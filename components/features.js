import React from 'react';
import { Film, FileVideo, Video, ArrowRight, ExternalLink, Play } from 'lucide-react';

export default function VideoConversionServices() {
    // Video conversion service data
    const conversionServices = [
        {
            id: 'mp4-to-mkv',
            title: 'MP4 to MKV',
            description: 'Convert your MP4 videos to MKV format with perfect quality retention',
            icon: <Film className="h-8 w-8" />,
            from: 'MP4',
            to: 'MKV',
            popular: true,
            benefits: ['Lossless conversion', 'Preserve subtitles', 'Maintain chapters']
        },
        {
            id: 'mkv-to-mp4',
            title: 'MKV to MP4',
            description: 'Transform MKV files to widely compatible MP4 format',
            icon: <FileVideo className="h-8 w-8" />,
            from: 'MKV',
            to: 'MP4',
            popular: true,
            benefits: ['Maximum compatibility', 'Preserve quality', 'Reduce file size']
        },
        {
            id: 'avi-to-mp4',
            title: 'AVI to MP4',
            description: 'Convert older AVI files into modern MP4 format',
            icon: <Video className="h-8 w-8" />,
            from: 'AVI',
            to: 'MP4',
            popular: false,
            benefits: ['Better compatibility', 'Smaller file size', 'Maintain quality']
        },
        {
            id: 'webm-to-mp4',
            title: 'WEBM to MP4',
            description: 'Convert web-optimized WEBM videos to universal MP4 format',
            icon: <Play className="h-8 w-8" />,
            from: 'WEBM',
            to: 'MP4',
            popular: false,
            benefits: ['Universal playback', 'Preserve quality', 'Easier editing']
        },
        {
            id: 'mov-to-mp4',
            title: 'MOV to MP4',
            description: 'Convert Apple QuickTime MOV files to standard MP4 format',
            icon: <FileVideo className="h-8 w-8" />,
            from: 'MOV',
            to: 'MP4',
            popular: true,
            benefits: ['Windows compatibility', 'Android compatibility', 'Web optimization']
        },
        {
            id: 'mp4-to-webm',
            title: 'MP4 to WEBM',
            description: 'Convert MP4 videos to web-optimized WEBM format',
            icon: <Video className="h-8 w-8" />,
            from: 'MP4',
            to: 'WEBM',
            popular: false,
            benefits: ['Smaller size', 'Web optimization', 'HTML5 compatibility']
        }
    ];

    return (
        <div className="relative overflow-hidden bg-black py-24" id='services'>
            {/* Decorative background elements matching hero section */}
            <div className="absolute inset-0">
                <div className="absolute inset-y-0 left-1/2 w-full bg-gradient-to-l from-blue-800 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                    {/* Animated circles */}
                    <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-left mb-16">
                    {/* Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                        <span className="block text-white">Video Conversion</span>
                        <span className="block mt-1">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-100">
                                Services
                            </span>
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-2xl max-w-lg text-blue-100 font-light py-4">
                        Professional-grade tools for all your video conversion needs

                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {conversionServices.map((service) => (
                        <a
                            href={`/convert/${service.id}`}
                            key={service.id}
                            className="block relative bg-opacity-5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white border-opacity-10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-opacity-10 hover:border-opacity-20 group"
                        >
                            {/* Popular tag */}
                            {service.popular && (
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg shadow-blue-500/30">
                                    Popular
                                </div>
                            )}

                            <div className="p-8">
                                {/* Icon */}
                                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 bg-opacity-20 text-cyan-300 flex items-center justify-center border border-blue-400 border-opacity-30 shadow-lg shadow-blue-500/20">
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>

                                {/* From/To visual */}
                                <div className="flex items-center mb-4 mt-5">
                                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-3 py-2  font-mono font-bold border border-white border-opacity-20 text-black">
                                        {service.from}
                                    </div>
                                    <div className="mx-2 text-cyan-300">
                                        <ArrowRight className="h-5 w-5" />
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-opacity-30 rounded-lg px-3 py-2 text-blue-100 font-mono font-bold border border-blue-400 border-opacity-30">
                                        {service.to}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-blue-100 font-light mb-6">{service.description}</p>

                                {/* Benefits */}
                                <ul className="space-y-2 mb-6">
                                    {service.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="flex-shrink-0 h-5 w-5 text-cyan-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-sm ml-2 text-blue-100 font-light">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <div className="mt-8 flex items-center justify-between text-blue-100 font-medium border-t border-white border-opacity-10 pt-4">
                                    <span>Start Converting</span>
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-30 transition-all shadow-lg shadow-blue-500/20">
                                        <ExternalLink className="h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>


            </div>
        </div>
    );
}