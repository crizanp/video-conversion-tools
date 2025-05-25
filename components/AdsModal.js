import React, { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';

const AdModal = ({ isOpen, onClose, onAdComplete }) => {
    const [countdown, setCountdown] = useState(5);
    const [canSkip, setCanSkip] = useState(false);

    // Sample advertisement data with active flag and learn more links
    const ads = [
        {
            id: 1,
            active: true,
            type: 'video',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            title: 'Premium Video Converter Pro',
            description: 'Upgrade to Pro for faster conversions!',
            learnMoreLink: 'https://foxbeep.com'
        },
        {
            id: 2,
            active: true,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
            title: 'CloudStorage Pro',
            description: 'Save your converted files in the cloud securely!',
            learnMoreLink: 'https://foxbeep.com'
        },
        {
            id: 3,
            active: false,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
            title: 'Video Editor Suite',
            description: 'Edit your videos like a pro with our advanced tools!',
            learnMoreLink: 'https://foxbeep.com'
        },
        {
            id: 4,
            active: true,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
            title: 'Media Backup Solutions',
            description: 'Never lose your precious files again with our backup service!',
            learnMoreLink: 'https://foxbeep.com'
        }
    ];

    // Filter only active ads and select one randomly
    const [currentAd] = useState(() => {
        const activeAds = ads.filter(ad => ad.active);
        return activeAds.length > 0 ? activeAds[Math.floor(Math.random() * activeAds.length)] : null;
    });

    useEffect(() => {
        if (!isOpen) {
            setCountdown(5);
            setCanSkip(false);
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    setCanSkip(true);
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen]);

    const handleSkip = () => {
        if (canSkip) {
            onAdComplete();
            onClose();
        }
    };

    const handleClose = () => {
        onClose();
    };

    const handleLearnMore = () => {
        if (currentAd && currentAd.learnMoreLink) {
            window.open(currentAd.learnMoreLink, '_blank');
        }
    };

    // If no active ads or modal is not open, don't render
    if (!isOpen || !currentAd) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-xs sm:max-w-lg lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center p-3 sm:p-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <div className="flex items-center space-x-2">
                        <Play size={16} className="sm:w-5 sm:h-5" />
                        <span className="font-semibold text-sm sm:text-base">Advertisement</span>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                        <X size={16} className="sm:w-5 sm:h-5" />
                    </button>
                </div>

                {/* Ad Content */}
                <div className="relative">
                    {currentAd.type === 'video' ? (
                        <video
                            className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src={currentAd.src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div
                            className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${currentAd.src})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                        </div>
                    )}

                    {/* Countdown overlay */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                        {countdown > 0 ? (
                            <div className="bg-black bg-opacity-70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                {countdown}s
                            </div>
                        ) : (
                            <button
                                onClick={handleSkip}
                                className="cursor-pointer bg-black bg-opacity-70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover:bg-opacity-90 transition"
                            >
                                Skip Ads
                            </button>
                        )}
                    </div>

                </div>

                {/* Ad Info */}
                <div className="p-4 sm:p-6 flex justify-between items-center flex-col sm:flex-row">
                    {/* Left Side: Title and Description */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                            {currentAd.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base sm:mb-0">
                            {currentAd.description}
                        </p>
                    </div>

                    {/* Right Side: Learn More Button */}
                    <div className="mt-4 sm:mt-0">
                        <button
                            onClick={handleLearnMore}
                            className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg text-sm sm:text-base"
                        >
                            Learn More
                        </button>
                    </div>
                </div>


                {/* Progress Bar */}
                <div className="h-1 bg-gray-200">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-linear"
                        style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default AdModal;