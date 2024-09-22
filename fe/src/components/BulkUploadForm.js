import React, { useState } from 'react';
import axios from 'axios';

const BulkUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://sufilatestbe.vercel.app/v2/products/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={handleFileChange} required />
      <button type="submit">Upload Products</button>
    </form>
  );
};

export default BulkUploadForm;
