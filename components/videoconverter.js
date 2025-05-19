import { useState, useEffect } from 'react';
import { getFFmpeg } from '../lib/ffmpeg';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const qualityPresets = {
  high: { videoBitrate: '5000k', resolution: '1920x1080' },
  medium: { videoBitrate: '2500k', resolution: '1280x720' },
  low: { videoBitrate: '1000k', resolution: '854x480' },
};

export default function VideoConverter() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState('high');
  const [progress, setProgress] = useState(0);
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await getFFmpeg();
      setLoading(false);
    };
    load();
  }, []);

  const handleConvert = async () => {
    const ffmpeg = await getFFmpeg();
    const zip = new JSZip();
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      ffmpeg.FS('writeFile', 'input.mkv', await fetchFile(file));
      
      await ffmpeg.run(
        '-i', 'input.mkv',
        '-c:v', 'libx264',
        '-b:v', qualityPresets[quality].videoBitrate,
        '-s', qualityPresets[quality].resolution,
        '-c:a', 'aac',
        '-b:a', '128k',
        'output.mp4'
      );

      const data = ffmpeg.FS('readFile', 'output.mp4');
      zip.file(file.name.replace('.mkv', '.mp4'), data);
      setProgress(((i + 1) / files.length) * 100);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    setConverted(content);
  };

  if (loading) return <div>Loading FFmpeg...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <input
        type="file"
        multiple
        accept=".mkv"
        onChange={(e) => setFiles([...e.target.files])}
        className="mb-4"
      />
      
      <div className="mb-4">
        <label>Quality:</label>
        <select 
          value={quality} 
          onChange={(e) => setQuality(e.target.value)}
          className="ml-2 p-1 border"
        >
          {Object.keys(qualityPresets).map((q) => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
      </div>

      {files.length > 0 && (
        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Convert {files.length} files
        </button>
      )}

      {progress > 0 && (
        <div className="mt-4">
          <div className="h-2 bg-gray-200">
            <div 
              className="h-full bg-green-500 transition-all" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1 text-sm">{progress.toFixed(1)}% Complete</div>
        </div>
      )}

      {converted && (
        <button
          onClick={() => saveAs(converted, 'converted.zip')}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Download ZIP
        </button>
      )}
    </div>
  );
}