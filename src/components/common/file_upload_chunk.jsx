import { useState } from 'react';

import styles from './file_upload_form.module.css';

// Simplified implementation based on
export default function ChunkedUploader({title,name,base_url,onComplete,accept_type}) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
  };
  const uploadFileInChunks = async () => {
    if (!file) return;

    setIsUploading(true);
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const fileId = `${Date.now()}-${file.name}`;

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      
      // Slice file using Blob.slice()
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append('target', name);
      formData.append('filename', fileId);
      formData.append('chunkIndex', chunkIndex.toString());
      formData.append('totalChunks', totalChunks.toString());
      formData.append('fileChunk', chunk);

      await fetch(base_url + 'upload_chunk', {
        method: 'POST',
        body: formData,
      });

      setProgress(Math.round(((chunkIndex + 1) / totalChunks) * 100));
    }
    setIsUploading(false);
    try {
        const response = await fetch(base_url + "unzip?filename=" + fileId + "&target=" + name);
        const data = await response.json();
        console.log("data.files=" + JSON.stringify(data));
        onComplete(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }

  };

  return (
    <div className={styles.upload_form_container}>
      <h3>{title}</h3>
      <table className={styles.upload_form_table}>
        <tbody>
          <tr>
            <td>File to upload</td>
            <td><input type="file" onChange={handleFileChange} accept={accept_type}/></td>
          </tr>
          <tr>
            <td>Upload Progress</td>
            <td><progress value={progress} max="100" width="100%" /> ({progress}%) </td>
          </tr>
          <tr>
            <td colspan="2"><button className={styles.upload_form_button} onClick={uploadFileInChunks} disabled={!file || isUploading}>Upload</button></td>
          </tr>
        </tbody>        
      </table>
    </div>
  );
}