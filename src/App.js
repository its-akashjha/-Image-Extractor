import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const App = () => {
  const [images, setImages] = useState([]);
  const [tables, setTables] = useState([]);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImages(response.data.images);
      setTables(response.data.tables);
    } catch (err) {
      console.error(err);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop a PDF file here, or click to select a file</p>
      </div>
      <div>
        <h2>Images</h2>
        <ul>
          {images.map((image, index) => (
            <li key={index}>{image}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Tables</h2>
        <ul>
          {tables.map((table, index) => (
            <li key={index}>{table}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
