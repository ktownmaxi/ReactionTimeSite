import { useState, useEffect } from 'react';
import axios from 'axios';

function DataManager() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [previewData, setPreviewData] = useState([]);

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('https://dev.adc-mbdevelopment.me/upload', formData);
    loadFiles();
  };

  const loadFiles = async () => {
    const res = await axios.get('https://dev.adc-mbdevelopment.me/files');
    setFiles(res.data);
  };

  const previewFile = async (filename) => {
    const res = await axios.get(`https://dev.adc-mbdevelopment.me/preview/${filename}`);
    setPreviewData(res.data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Reaktiondaten Datenmanager</h1>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={uploadFile} className="bg-blue-500 text-white p-2 m-2">
        Upload
      </button>

      <h2 className="mt-4 font-semibold">Uploaded Files</h2>
      <button
        onClick={() => {
          window.open('https://dev.adc-mbdevelopment.me/download_all', '_blank');
        }}
        className="bg-purple-600 text-white p-2 m-2"
      >
        Download All
      </button>

      <ul>
        {files.map((fname) => (
          <li key={fname}>
            {fname}{' '}
            <button
              onClick={() => {
                window.open(`https://dev.adc-mbdevelopment.me/download/${fname}`, '_blank');
              }}
              className="text-green-600 underline"
            >
              Download
            </button>
          
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataManager;
