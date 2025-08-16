import React, { useState } from "react";
import axios from "axios";
import "./style.css"; // فایل CSS را به پروژه اضافه کنید

function App() {
  const [file, setFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setVideoURL("");
    
    // شبیه‌سازی فرآیند پردازش بدون ارتباط با سرور
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // شبیه‌سازی URL ویدیوی خروجی
    const mockOutputURL = "https://www.w3schools.com/html/mov_bbb.mp4";
    setVideoURL(mockOutputURL);
    
    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Gaze Tracking App</h1>
        <p className="subtitle">Upload a video to analyze a person's gaze.</p>

        <div 
          className={`drop-area ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {file ? (
            <p className="file-name">Selected: {file.name}</p>
          ) : (
            <>
              <p>Drag & Drop your video here</p>
              <p className="or">or</p>
              <label htmlFor="file-upload" className="custom-file-upload">
                Choose File
              </label>
              <input id="file-upload" type="file" onChange={handleFileChange} accept="video/*" />
            </>
          )}
        </div>

        <button onClick={handleUpload} disabled={!file || loading} className="process-btn">
          {loading ? "Processing..." : "Process Video"}
        </button>
      </div>
      
      {videoURL && (
        <div className="video-container">
          <h2>Processed Video</h2>
          <video src={videoURL} controls />
        </div>
      )}
    </div>
  );
}

export default App;