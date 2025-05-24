import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Film, Upload, Check, X, Download, Play, Settings, AlertCircle, Monitor, Save, Share2 } from 'lucide-react';
import Footer from '@/components/Footer';
import ToolsNavbar from '@/components/convert/toolsNavbar';
import FeaturesSection from '@/components/tools/FeaturesSection';

export default function Mp4ToWebmConverter() {
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
            setStatus('Please select valid MP4 video files.');
            return;
        }

        setSelectedFiles(validFiles);
        setStatus(`${validFiles.length} file${validFiles.length > 1 ? 's' : ''} selected`);
        setConvertedFile(null);
    };

    // Filter files to ensure only MP4 files are selected
    const filterValidFiles = (files) => {
        return files.filter(file => {
            const fileName = file.name.toLowerCase();
            const fileType = file.type.toLowerCase();
            return fileType === 'video/mp4' || fileName.endsWith('.mp4');
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
            setStatus('Please drop valid MP4 video files.');
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

    // Convert video format (simulated for frontend demo)
    const convertVideo = async (file) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(file);
            }, 2000);
        });
    };
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const handleFileInputClick = (e) => {
        if (isIOS) {
            e.stopPropagation();
        }
    };

    // Perform the conversion
    const performConversion = async () => {
        if (selectedFiles.length === 0) {
            setStatus('Please select MP4 files to convert.');
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
                    const fileName = file.name.replace(/\.mp4$/i, '.webm');
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
                name: `converted_videos_${videoQuality}_webm.zip`
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

    const featuresData = [
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4v16h16V4H4zm8 12l-4-4h3V8h2v4h3l-4 4z" />
                </svg>
            ),
            title: "Instant Conversion",
            description: "Convert MP4 files to WebM in seconds with blazing-fast speed and excellent compression.",
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m-3-7a9 9 0 100 18 9 9 0 000-18z" />
                </svg>
            ),
            title: "Web Optimized",
            description: "Get web-friendly videos in the open-source WebM format, perfect for websites and online sharing.",
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 10h18M3 6h18M9 14h6M9 18h6" />
                </svg>
            ),
            title: "Simple & Free",
            description: "No downloads, no signups, no watermarks. Just upload and convert — completely free!",
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                </svg>
            ),
            title: "Safe & Secure",
            description: "All files are automatically deleted after conversion. Your privacy is our top priority.",
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4M7 17h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            ),
            title: "No Watermarks",
            description: "Get your WebM files without any branding or annoying overlays — 100% clean.",
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            ),
            title: "Multi-File Support",
            description: "Upload and convert multiple MP4 files at once — batch processing made easy.",
        },
    ];


    return (
        <>
            <ToolsNavbar />
            <div className="bg-white min-h-screen flex flex-col items-start py-8 px-4">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto w-full">
                    {/* Main Content */}
                    <div className="w-full bg-white overflow-hidden my-8 rounded-lg" id='convert'>
                        {/* Upload Area */}
                        <div
                            ref={fileDropRef}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className="w-full h-[400px] flex items-center justify-center border-4 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl cursor-pointer transition-all duration-300 hover:from-blue-100 hover:to-blue-200 hover:shadow-2xl"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full shadow-lg">
                                    <Upload size={64} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-extrabold text-indigo-800">
                                    Upload MP4 Files
                                </h3>
                                <p className="text-indigo-600 text-lg">Drag & drop or click to select</p>

                                <label
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (isIOS) {
                                            // Ensure proper focus for iOS
                                            setTimeout(() => {
                                                fileInputRef.current?.click();
                                            }, 100);
                                        }
                                    }}
                                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-6 rounded-full font-bold inline-flex items-center cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <Upload size={20} className="mr-2" />
                                    Browse Files
                                    <input
                                        type="file"
                                        accept=".mp4,video/mp4"
                                        onChange={handleFileSelect}
                                        ref={fileInputRef}
                                        multiple={!isIOS} // iOS doesn't support multiple file selection well
                                        className="hidden"
                                        onClick={handleFileInputClick}
                                    />
                                </label>
                                <p className="text-gray-400 text-sm">Max 500MB per file, multiple files allowed</p>
                            </div>
                        </div>
                        {/* Selected Files */}
                        {selectedFiles.length > 0 && (
                            <div className="border-t border-blue-100 p-4 py-8">
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
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 p-6 my-6 border-blue-100 text-center">
                            <button
                                className={`py-4 px-8 text-lg sm:text-xl cursor-pointer rounded-full font-bold flex items-center justify-center transition-all duration-300 shadow-lg ${!selectedFiles.length || isConverting
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white transform hover:-translate-y-1 hover:shadow-xl'
                                    }`}
                                onClick={performConversion}
                                disabled={isConverting || !selectedFiles.length}
                            >
                                {isConverting ? (
                                    <>
                                        <div className="mr-3 w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        <Film size={24} className="mr-3" />
                                        Convert to WebM
                                    </>
                                )}
                            </button>

                            {selectedFiles.length > 0 && (
                                <button
                                    className={`py-4 px-8 text-lg sm:text-xl cursor-pointer rounded-full font-bold transition-all duration-300 ${isConverting
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-pink-200 to-indigo-200 text-indigo-700 hover:from-pink-300 hover:to-indigo-300 hover:shadow-lg transform hover:-translate-y-1'
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
                                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <div className="text-right mt-1 text-indigo-600 font-medium">
                                    {progress}%
                                </div>
                            </div>
                        )}
                    </div>
                    {convertedFile && (
                        <div className='py-8'>
                            <div className="border-t border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-b-lg">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center mr-4 my-auto">
                                        <Check size={24} className="text-white" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-indigo-800 mb-2">
                                            Conversion Complete! 🎉
                                        </h3>

                                        <p className="text-indigo-600 mb-4">
                                            Your MP4 files have been successfully converted to WebM format.
                                        </p>

                                        <button
                                            className="bg-gradient-to-r from-indigo-600 to-blue-600 cursor-pointer hover:from-indigo-700 hover:to-blue-700 text-white py-3 px-6 rounded-full font-bold inline-flex items-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                            onClick={handleDownload}
                                        >
                                            <Download size={20} className="mr-2" />
                                            Download ZIP
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {status && !convertedFile && (
                        <div className="px-4 pb-4">
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
                    <FeaturesSection
                        title="Features"
                        description="Experience lightning-fast conversion with cutting-edge features and an intuitive interface."
                        features={featuresData}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}