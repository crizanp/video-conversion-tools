import React, { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import { useData } from '../contexts/DataContext'; // Adjust import path as needed

const AdModal = ({ isOpen, onClose, onAdComplete }) => {
    const { adsData, fetchAdsData, getRandomActiveAd, isAdsCacheValid } = useData();
    const [countdown, setCountdown] = useState(5);
    const [canSkip, setCanSkip] = useState(false);
    const [currentAd, setCurrentAd] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch ads if needed when modal opens
    useEffect(() => {
        if (isOpen) {
            const loadAds = async () => {
                try {
                    setLoading(true);
                    setError(null);
                    
                    // Check if we need to fetch fresh ads data
                    if (!adsData || !isAdsCacheValid()) {
                        await fetchAdsData(true); // Force refresh if cache is invalid
                    }
                    
                    // Get a random active ad from the context
                    const randomAd = getRandomActiveAd();
                    
                    if (randomAd) {
                        setCurrentAd(randomAd);
                        // Set countdown based on ad's skipDelay or default to 5
                        const skipDelay = randomAd.skipDelay || 5;
                        setCountdown(skipDelay);
                    } else {
                        setError('No active ads available');
                    }
                } catch (err) {
                    console.error('Error loading ads:', err);
                    setError('Failed to load ads');
                } finally {
                    setLoading(false);
                }
            };
            
            loadAds();
        }
    }, [isOpen, adsData, fetchAdsData, getRandomActiveAd, isAdsCacheValid]);

    // Handle countdown timer
    useEffect(() => {
        if (!isOpen || !currentAd) {
            setCanSkip(false);
            return;
        }

        const initialCountdown = currentAd.skipDelay || 5;
        setCountdown(initialCountdown);

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
    }, [isOpen, currentAd]);

    // Reset modal state when closed
    useEffect(() => {
        if (!isOpen) {
            setCurrentAd(null);
            setCountdown(5);
            setCanSkip(false);
            setError(null);
            setLoading(false);
        }
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
            
            // Track click if enabled
            if (currentAd.trackClicks) {
                // You can implement click tracking here
                console.log('Ad clicked:', currentAd._id);
            }
        }
    };

    // Track impression when ad is shown
    useEffect(() => {
        if (currentAd && currentAd.trackImpressions) {
            // You can implement impression tracking here
            console.log('Ad impression:', currentAd._id);
        }
    }, [currentAd]);

    // Don't render if modal is not open
    if (!isOpen) return null;

    // Loading state
    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-xs sm:max-w-lg lg:max-w-2xl p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading advertisement...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-xs sm:max-w-lg lg:max-w-2xl p-8 text-center">
                    <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={handleClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    // No ad available
    if (!currentAd) {
        return null;
    }

    const initialCountdown = currentAd.skipDelay || 5;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-xs sm:max-w-lg lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center p-3 sm:p-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <div className="flex items-center space-x-2">
                        <Play size={16} className="sm:w-5 sm:h-5" />
                        <span className="font-semibold text-sm sm:text-base">Advertisement</span>
                        {currentAd.campaignName && (
                            <span className="text-xs opacity-75">- {currentAd.campaignName}</span>
                        )}
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
                            <div className="absolute inset-0  bg-opacity-30"></div>
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
                            {currentAd.buttonText || 'Learn More'}
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-gray-200">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-linear"
                        style={{ width: `${((initialCountdown - countdown) / initialCountdown) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default AdModal;