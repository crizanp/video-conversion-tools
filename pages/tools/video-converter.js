import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function VideoConverter() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [convertedFile, setConvertedFile] = useState(null);
  const [conversionMode, setConversionMode] = useState('mp4ToWebm');
  const [videoQuality, setVideoQuality] = useState('high');
  const fileInputRef = useRef(null);
  const fileDropRef = useRef(null);

  const getAcceptedFileTypes = () => {
    switch (conversionMode) {
      case 'mp4ToWebm':
      case 'mp4ToMov':
      case 'mp4ToAvi':
        return '.mp4,video/mp4';
      case 'movToMp4':
        return '.mov,video/quicktime';
      case 'webmToMp4':
        return '.webm,video/webm';
      case 'aviToMp4':
        return '.avi,video/x-msvideo';
      case 'mkvToMp4':
        return '.mkv,video/x-matroska';
      default:
        return '.mp4,.mov,.webm,.avi,.mkv,video/mp4,video/quicktime,video/webm,video/x-msvideo,video/x-matroska';
    }
  };

  const getSourceFormat = () => {
    if (conversionMode.startsWith('mp4')) return 'mp4';
    if (conversionMode.startsWith('mov')) return 'mov';
    if (conversionMode.startsWith('webm')) return 'webm';
    if (conversionMode.startsWith('avi')) return 'avi';
    if (conversionMode.startsWith('mkv')) return 'mkv';
    return '';
  };

  const getTargetFormat = () => {
    if (conversionMode.endsWith('Mp4')) return 'mp4';
    if (conversionMode.endsWith('Mov')) return 'mov';
    if (conversionMode.endsWith('Webm')) return 'webm';
    if (conversionMode.endsWith('Avi')) return 'avi';
    return '';
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);

    const validFiles = filterValidFiles(files);

    if (validFiles.length === 0) {
      setStatus(`Please select valid ${getSourceFormat().toUpperCase()} video files.`);
      return;
    }

    setSelectedFiles(validFiles);
    setStatus(`${validFiles.length} file(s) selected`);
    setConvertedFile(null);
  };

  const filterValidFiles = (files) => {
    const sourceFormat = getSourceFormat();
    return files.filter(file => {
      const fileName = file.name.toLowerCase();
      const fileType = file.type.toLowerCase();

      switch (sourceFormat) {
        case 'mp4':
          return fileType === 'video/mp4' || fileName.endsWith('.mp4');
        case 'mov':
          return fileType === 'video/quicktime' || fileName.endsWith('.mov');
        case 'webm':
          return fileType === 'video/webm' || fileName.endsWith('.webm');
        case 'avi':
          return fileType === 'video/x-msvideo' || fileName.endsWith('.avi');
        case 'mkv':
          return fileType === 'video/x-matroska' || fileName.endsWith('.mkv');
        default:
          return false;
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileDropRef.current) {
      fileDropRef.current.classList.add(styles.dragActive);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileDropRef.current) {
      fileDropRef.current.classList.remove(styles.dragActive);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (fileDropRef.current) {
      fileDropRef.current.classList.remove(styles.dragActive);
    }

    const files = Array.from(e.dataTransfer.files);
    const validFiles = filterValidFiles(files);

    if (validFiles.length === 0) {
      setStatus(`Please drop valid ${getSourceFormat().toUpperCase()} video files.`);
      return;
    }

    setSelectedFiles(validFiles);
    setStatus(`${validFiles.length} file(s) selected`);
    setConvertedFile(null);
  };

  const handleQualityChange = (quality) => {
    setVideoQuality(quality);
  };

  const convertVideo = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(file);
      }, 2000);
    });
  };

  const performConversion = async () => {
    if (selectedFiles.length === 0) {
      setStatus(`Please select ${getSourceFormat().toUpperCase()} files to convert.`);
      return;
    }

    setIsConverting(true);
    setStatus('Preparing to convert...');
    setProgress(0);
    setConvertedFile(null);

    try {
      const zip = new JSZip();
      const totalFiles = selectedFiles.length;
      const targetFormat = getTargetFormat();

      for (let i = 0; i < totalFiles; i++) {
        const file = selectedFiles[i];

        try {
          const convertedFile = await convertVideo(file);

          const fileName = file.name.replace(/\.[^/.]+$/, '') + '.' + targetFormat;
          zip.file(fileName, convertedFile);

          const currentProgress = Math.round(((i + 1) / totalFiles) * 100);
          setProgress(currentProgress);
          setStatus(`Converting file ${i + 1} of ${totalFiles} (${currentProgress}%)...`);
        } catch (error) {
          console.error(`Error converting file ${file.name}:`, error);
        }
      }

      setStatus('Creating ZIP file...');
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      setConvertedFile({
        blob: zipBlob,
        name: `converted_videos_${videoQuality}_${targetFormat}.zip`
      });

      setStatus('Conversion completed! Your file is ready for download.');
    } catch (error) {
      console.error('Error during conversion:', error);
      setStatus(`Error during conversion: ${error.message}`);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedFile) {
      saveAs(convertedFile.blob, convertedFile.name);
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setStatus('');
    setProgress(0);
    setConvertedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleModeChange = (mode) => {
    setConversionMode(mode);
    handleReset();
  };

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
    <div className={styles.converterContainer}>
      <h2 className={styles.header}>Video Format Converter</h2>

      <div className={styles.modeSelector}>
        <button
          className={`${styles.modeButton} ${conversionMode === 'mp4ToWebm' ? styles.activeButton : ''}`}
          onClick={() => handleModeChange('mp4ToWebm')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M10 8v8l6.5-4L10 8M6.5 5H16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6.5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z" />
          </svg>
          MP4 to WebM
        </button>

        <button
          className={`${styles.modeButton} ${conversionMode === 'mp4ToMov' ? styles.activeButton : ''}`}
          onClick={() => handleModeChange('mp4ToMov')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M10 8v8l6.5-4L10 8M6.5 5H16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6.5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z" />
          </svg>
          MP4 to MOV
        </button>

        <button
          className={`${styles.modeButton} ${conversionMode === 'webmToMp4' ? styles.activeButton : ''}`}
          onClick={() => handleModeChange('webmToMp4')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M10 8v8l6.5-4L10 8M6.5 5H16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6.5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z" />
          </svg>
          WebM to MP4
        </button>

        <button
          className={`${styles.modeButton} ${conversionMode === 'movToMp4' ? styles.activeButton : ''}`}
          onClick={() => handleModeChange('movToMp4')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M10 8v8l6.5-4L10 8M6.5 5H16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6.5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z" />
          </svg>
          MOV to MP4
        </button>

        <button
          className={`${styles.modeButton} ${conversionMode === 'mkvToMp4' ? styles.activeButton : ''}`}
          onClick={() => handleModeChange('mkvToMp4')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M10 8v8l6.5-4L10 8M6.5 5H16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6.5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z" />
          </svg>
          MKV to MP4
        </button>
      </div>

      <div>
        <h2 className={styles.converterHeading}>
          Convert {getSourceFormat().toUpperCase()} to {getTargetFormat().toUpperCase()}
        </h2>

        <div
          className={styles.fileInputContainer}
          ref={fileDropRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label className={styles.fileInputLabel}>
            <div className={styles.fileInputIconContainer}>
              <svg viewBox="0 0 24 24" className={styles.fileInputIcon}>
                <path d="M10 8v8l6.5-4L10 8M6.5 5H16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6.5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z" />
              </svg>
            </div>
            <div className={styles.fileInputText}>
              <span className={styles.fileInputPrimary}>
                Drag & drop your {getSourceFormat().toUpperCase()} files here or click to browse
              </span>
              <span className={styles.fileInputSecondary}>
                Supports multiple files up to 500MB each
              </span>
            </div>
            <input
              type="file"
              accept={getAcceptedFileTypes()}
              onChange={handleFileSelect}
              ref={fileInputRef}
              multiple
            />
          </label>

          {selectedFiles.length > 0 && (
            <div className={styles.selectedFiles}>
              <div className={styles.selectedFilesHeading}>
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M10 8v8l6.5-4L10 8M6.5 5H16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6.5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z" />
                </svg>
                Selected Files ({selectedFiles.length})
              </div>
              <ul className={styles.filesList}>
                {selectedFiles.map((file, index) => (
                  <li key={index} className={styles.fileItem}>
                    <div className={styles.fileDetails}>
                      <div className={styles.fileItemIcon}>
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path d="M10 8v8l6.5-4L10 8M6.5 5H16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6.5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z" />
                        </svg>
                      </div>
                      <div className={styles.fileItemInfo}>
                        <span className={styles.fileItemName}>{file.name}</span>
                        <span className={styles.fileItemSize}>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      </div>
                    </div>
                    <button
                      className={styles.removeFileButton}
                      onClick={() => {
                        const newFiles = [...selectedFiles];
                        newFiles.splice(index, 1);
                        setSelectedFiles(newFiles);
                        if (newFiles.length === 0) handleReset();
                      }}
                      disabled={isConverting}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.optionsContainer}>
          <h3 className={styles.optionTitle}>Video Quality</h3>
          <div className={styles.qualityOptionsGrid}>
            {['high', 'medium', 'low'].map(quality => {
              const qualityInfo = getQualityInfo(quality);
              return (
                <div
                  key={quality}
                  className={`${styles.qualityOption} ${videoQuality === quality ? styles.qualityOptionActive : ''}`}
                  onClick={() => !isConverting && handleQualityChange(quality)}
                  title={qualityInfo.tooltip}
                >
                  <div className={styles.qualityRadio}>
                    <div className={styles.qualityRadioOuter}>
                      {videoQuality === quality && <div className={styles.qualityRadioInner}></div>}
                    </div>
                  </div>
                  <div className={styles.qualityDetails}>
                    <div className={styles.qualityLabel}>{qualityInfo.label}</div>
                    <div className={styles.qualitySpecs}>
                      <span className={styles.qualityResolution}>{qualityInfo.resolution}</span>
                      {quality !== 'custom' && (
                        <span className={styles.qualityBitrate}>{qualityInfo.bitrate}</span>
                      )}
                    </div>
                  </div>
                  {quality === 'high' && (
                    <div className={styles.qualityBadge}>Recommended</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button
            className={`${styles.convertButton} ${!selectedFiles.length || isConverting ? styles.buttonDisabled : ''}`}
            onClick={performConversion}
            disabled={isConverting || !selectedFiles.length}
          >
            {isConverting ? (
              <>
                <span className={styles.spinnerIcon}></span>
                Converting...
              </>
            ) : 'Convert Videos'}
          </button>

          {selectedFiles.length > 0 && (
            <button
              className={styles.resetButton}
              onClick={handleReset}
              disabled={isConverting}
            >
              Reset
            </button>
          )}
        </div>

        {isConverting && progress > 0 && (
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            ></div>
            <span className={styles.progressText}>{progress}%</span>
          </div>
        )}

        {convertedFile && (
          <div className={styles.downloadContainer}>
            <svg viewBox="0 0 24 24" className={styles.downloadIcon}>
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            <div className={styles.downloadText}>
              Your converted videos are ready for download!
            </div>
            <button
              className={styles.downloadButton}
              onClick={handleDownload}
            >
              Download ZIP
            </button>
          </div>
        )}

        {status && !convertedFile && (
          <div className={styles.statusMessage}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoConverter;