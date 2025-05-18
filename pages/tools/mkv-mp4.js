import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Film, Upload, Check, X, Download, Play, Settings, AlertCircle, Monitor, Save, Share2 } from 'lucide-react';
import FileConverterHero from '@/components/convert/hero';
import Footer from '@/components/Footer';
import ConversionNavbar from '@/components/convert/ConversionNavbar';

export default function MkvToMp4Converter() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isConverting, setIsConverting] = useState(false);
    const [status, setStatus] = useState('');
    const [progress, setProgress] = useState(0);
    const [convertedFile, setConvertedFile] = useState(null);
    const [videoQuality, setVideoQuality] = useState('high');
    const fileInputRef = useRef(null);
    const fileDropRef = useRef(null);

    // Handle file selection
    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = filterValidFiles(files);

        if (validFiles.length === 0) {
            setStatus('Please select valid MKV video files.');
            return;
        }

        setSelectedFiles(validFiles);
        setStatus(`${validFiles.length} file${validFiles.length > 1 ? 's' : ''} selected`);
        setConvertedFile(null);
    };

    // Filter files to ensure only MKV files are selected
    const filterValidFiles = (files) => {
        return files.filter(file => {
            const fileName = file.name.toLowerCase();
            const fileType = file.type.toLowerCase();
            return fileType === 'video/x-matroska' || fileName.endsWith('.mkv');
        });
    };

    // Handle drag events
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileDropRef.current) {
            fileDropRef.current.classList.add('bg-gray-50');
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileDropRef.current) {
            fileDropRef.current.classList.remove('bg-gray-50');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (fileDropRef.current) {
            fileDropRef.current.classList.remove('bg-gray-50');
        }

        const files = Array.from(e.dataTransfer.files);
        const validFiles = filterValidFiles(files);

        if (validFiles.length === 0) {
            setStatus('Please drop valid MKV video files.');
            return;
        }

        setSelectedFiles(validFiles);
        setStatus(`${validFiles.length} file${validFiles.length > 1 ? 's' : ''} selected`);
        setConvertedFile(null);
    };

    // Handle video quality change
    const handleQualityChange = (quality) => {
        setVideoQuality(quality);
    };
    const qualityConfigs = {
        high: {
            label: 'High',
            resolution: '1080p',
            bitrate: '8 Mbps',
            tooltip: 'Best quality, larger file size',
            compressionFactor: 1.0,
            colorDepth: '10-bit',
            audioQuality: '320 kbps',
            gradientClasses: 'from-blue-500 to-indigo-500',
            borderClasses: 'border-blue-500',
            processingTime: 1.5
        },
        medium: {
            label: 'Medium',
            resolution: '720p',
            bitrate: '4 Mbps',
            tooltip: 'Good balance of quality and size',
            compressionFactor: 1.6,
            colorDepth: '8-bit',
            audioQuality: '192 kbps',
            gradientClasses: 'from-blue-500 to-cyan-500',
            borderClasses: 'border-blue-500',
            processingTime: 1.0
        },
        low: {
            label: 'Low',
            resolution: '480p',
            bitrate: '1.5 Mbps',
            tooltip: 'Smaller file size, reduced quality',
            compressionFactor: 2.3,
            colorDepth: '8-bit',
            audioQuality: '128 kbps',
            gradientClasses: 'from-teal-500 to-green-500',
            borderClasses: 'border-teal-500',
            processingTime: 0.7
        }
    };
    // Convert video format (simulated for frontend demo)
    const convertVideo = async (file) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(file);
            }, 2000);
        });
    };

    // Perform the conversion
    const performConversion = async () => {
        if (selectedFiles.length === 0) {
            setStatus('Please select MKV files to convert.');
            return;
        }

        setIsConverting(true);
        setStatus('Preparing to convert...');
        setProgress(0);
        setConvertedFile(null);

        try {
            const zip = new JSZip();
            const totalFiles = selectedFiles.length;

            for (let i = 0; i < totalFiles; i++) {
                const file = selectedFiles[i];

                try {
                    const convertedFile = await convertVideo(file);

                    // Add the "converted" file to the ZIP
                    const fileName = file.name.replace(/\.mkv$/i, '.mp4');
                    zip.file(fileName, convertedFile);

                    // Update progress
                    const currentProgress = Math.round(((i + 1) / totalFiles) * 100);
                    setProgress(currentProgress);
                    setStatus(`Converting file ${i + 1} of ${totalFiles} (${currentProgress}%)...`);
                } catch (error) {
                    console.error(`Error converting file ${file.name}:`, error);
                }
            }

            // Generate the ZIP file
            setStatus('Creating ZIP file...');
            const zipBlob = await zip.generateAsync({ type: 'blob' });

            // Store the blob for later download
            setConvertedFile({
                blob: zipBlob,
                name: `converted_videos_${videoQuality}_mp4.zip`
            });

            setStatus('Conversion completed! Your file is ready for download.');
        } catch (error) {
            console.error('Error during conversion:', error);
            setStatus(`Error during conversion: ${error.message}`);
        } finally {
            setIsConverting(false);
        }
    };

    // Handle file download
    const handleDownload = () => {
        if (convertedFile) {
            saveAs(convertedFile.blob, convertedFile.name);
        }
    };

    // Reset the form
    const handleReset = () => {
        setSelectedFiles([]);
        setStatus('');
        setProgress(0);
        setConvertedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Get the quality info for tooltips and display
    const getQualityInfo = (quality) => {
        switch (quality) {
            case 'high':
                return { label: 'High', resolution: '1080p', bitrate: '8 Mbps', tooltip: 'Best quality, larger file size' };
            case 'medium':
                return { label: 'Medium', resolution: '720p', bitrate: '5 Mbps', tooltip: 'Good balance of quality and size' };
            case 'low':
                return { label: 'Low', resolution: '480p', bitrate: '2 Mbps', tooltip: 'Smaller file size, reduced quality' };
            default:
                return { label: 'Custom', resolution: '', bitrate: '', tooltip: '' };
        }
    };

    return (
        <>
            <ConversionNavbar />
            <div className="bg-white min-h-screen flex flex-col items-start py-8 px-4">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto w-full">
                    {/* Main Header */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Left side - Content */}
                        <div className="md:w-1/2 text-left">
                            {/* Heading */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                                <span className="block text-gray-900">MKV to MP4
                                </span>
                                <span className="block mt-1">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-cyan-700 to-blue-600">
                                        Instantly
                                    </span>
                                </span>
                            </h1>
                            {/* Description */}
                            <p className="text-xl md:text-2xl max-w-lg text-gray-700 font-light py-4">
                                Convert MKV files to MP4 for smoother playback and sharing. Fast, free, and high-quality conversion with no watermarks.
                            </p>
                        </div>
                        {/* Right side - Image */}
                        <div className="relative flex justify-center items-center my-12">
                            <img
                                src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/MKV_to_MP_4_bdd29d1ce7/MKV_to_MP_4_bdd29d1ce7.png"
                                alt="Video Formats Illustration"
                                className="w-full max-w-md md:max-w-xl lg:max-w-2xl object-contain"
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full bg-white overflow-hidden mb-8 rounded-lg ">
                        {/* Upload Area */}
                        <div
                            ref={fileDropRef}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className="w-full h-[400px] flex items-center justify-center border-4 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl  cursor-pointer transition-all duration-300 hover:from-blue-100 hover:to-blue-200 hover:shadow-2xl"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full shadow-lg">
                                    <Upload size={64} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-extrabold text-indigo-800">
                                    Upload MKV Files
                                </h3>
                                <p className="text-indigo-600 text-lg">Drag & drop or click to select</p>

                                <label
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-6 rounded-full font-bold inline-flex items-center cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <Upload size={20} className="mr-2" />
                                    Browse Files
                                    <input
                                        type="file"
                                        accept=".mkv,video/x-matroska"
                                        onChange={handleFileSelect}
                                        ref={fileInputRef}
                                        multiple
                                        className="hidden"
                                    />
                                </label>

                                <p className="text-gray-400 text-sm">Max 500MB per file, multiple files allowed</p>
                            </div>
                        </div>


                        {/* Selected Files */}
                        {selectedFiles.length > 0 && (
                            <div className="border-t border-blue-100 p-4">
                                <div className="flex items-center mb-3">
                                    <div className="p-1 bg-gradient-to-r from-gray-500 to-gray-500 rounded-full mr-2">
                                        <Film size={18} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Selected Files ({selectedFiles.length})
                                    </h3>
                                </div>

                                <div className="max-h-48 overflow-y-auto pr-1">
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between py-3 px-4 mb-2 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100">
                                            <div className="flex items-center">
                                                <div className="p-1 bg-gray-500 rounded-full mr-3">
                                                    <Play size={14} className="text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{file.name}</p>
                                                    <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                            <button
                                                className="text-pink-500 cursor-pointer hover:text-pink-700 p-2 transition-colors duration-200 hover:bg-pink-50 rounded-full"
                                                onClick={() => {
                                                    const newFiles = [...selectedFiles];
                                                    newFiles.splice(index, 1);
                                                    setSelectedFiles(newFiles);
                                                    if (newFiles.length === 0) handleReset();
                                                }}
                                                disabled={isConverting}
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quality Options */}
                        {/* Quality Options */}
                        <div className="border-t border-blue-100 p-4">
                            <div className="flex items-center mb-3">
                                <div className="p-1 bg-blue-500 rounded-full mr-2">
                                    <Settings size={18} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">Video Quality</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.keys(qualityConfigs).map(quality => {
                                    const qualityInfo = getQualityInfo(quality);
                                    return (
                                        <div
                                            key={quality}
                                            className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${videoQuality === quality
                                                ? 'border-indigo-300 bg-gradient-to-r from-indigo-50 to-blue-50 shadow-md'
                                                : 'border-gray-200 hover:border-indigo-200'
                                                }`}
                                            onClick={() => !isConverting && handleQualityChange(quality)}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${videoQuality === quality ? qualityInfo.borderClasses : 'border-gray-400'}`}>
                                                    {videoQuality === quality && <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${qualityInfo.gradientClasses}`}></div>}
                                                </div>
                                                <span className="ml-2 font-bold text-indigo-800">{qualityInfo.label}</span>
                                                {quality === 'high' && (
                                                    <span className="ml-auto text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-medium">
                                                        Recommended
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-3 text-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="text-black">Resolution:</div>
                                                    <div className="font-medium text-indigo-800">{qualityInfo.resolution}</div>
                                                    <div className="text-black">Bitrate:</div>
                                                    <div className="font-medium text-indigo-800">{qualityInfo.bitrate}</div>
                                                    <div className="text-black">Audio:</div>
                                                    <div className="font-medium text-indigo-800">{qualityInfo.audioQuality}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 p-4 border-t border-blue-100">
                            <button
                                className={`py-3 px-6 rounded-full text-base font-bold flex items-center justify-center transition-all duration-300 shadow-md ${!selectedFiles.length || isConverting
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transform hover:-translate-y-1 hover:shadow-lg'
                                    }`}
                                onClick={performConversion}
                                disabled={isConverting || !selectedFiles.length}
                            >
                                {isConverting ? (
                                    <>
                                        <div className="mr-2 w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        <Film size={20} className="mr-2" />
                                        Convert to MP4
                                    </>
                                )}
                            </button>

                            {selectedFiles.length > 0 && (
                                <button
                                    className={`py-3 px-6 rounded-full font-bold transition-all duration-300 ${isConverting
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-pink-100 to-indigo-100 text-indigo-700 hover:from-pink-200 hover:to-indigo-200 hover:shadow-md transform hover:-translate-y-1'
                                        }`}
                                    onClick={handleReset}
                                    disabled={isConverting}
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        {/* Progress Bar */}
                        {isConverting && progress > 0 && (
                            <div className="px-4 pb-4">
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-blue-500 h-full rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <div className="text-right mt-1 text-indigo-600 font-medium">
                                    {progress}%
                                </div>
                            </div>
                        )}

                        {/* Download Area */}


                        {/* Status Message */}

                    </div>

                    {convertedFile && (
                        <div className='py-8'>
                            <div className="border-t border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-b-lg">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center mr-4 my-auto">
                                        <Check size={24} className="text-white" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-indigo-800 mb-2">
                                            Conversion Complete! 🎉
                                        </h3>

                                        <p className="text-indigo-600 mb-4">
                                            Your MKV files have been successfully converted to MP4 format.
                                        </p>

                                        <button
                                            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 px-6 rounded-full font-bold inline-flex items-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                            onClick={handleDownload}
                                        >
                                            <Download size={20} className="mr-2" />
                                            Download ZIP
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )} {status && !convertedFile && (
                        <div className="border-t border-blue-100 px-4 pb-4">
                            <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700">
                                {isConverting ? (
                                    <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                                ) : (
                                    <AlertCircle size={18} className="mr-3 text-indigo-600" />
                                )}
                                {status}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <Footer />
        </>
    );
}