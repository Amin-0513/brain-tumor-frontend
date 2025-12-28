import React, { useState } from 'react';
import './Analysis.css';

const Analysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [xaiImage, setXaiImage] = useState(null);
  const [report, setReport] = useState(null);
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setXaiImage(null); // Reset XAI image when a new file is selected
      setReport(null); // Reset report when a new file is selected
    }
  };

  // API Call to process the image
  const handleStartRecognition = async () => {
    if (!selectedImage) return alert("Please upload an image first!");

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1]; // Remove header

      try {
        const response = await fetch('http://localhost:8000/upload-image', { // Update with your FastAPI URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image_base64: base64String })
        });
        const data = await response.json();

        // Update attendance log (optional)
        setAttendanceLog([data, ...attendanceLog]);

        // Display XAI image
        if (data.xai_imagebase64) {
          setXaiImage(`data:image/png;base64,${data.xai_imagebase64}`);
        }

        // Display report
        if (data.report) {
          setReport(data.report);
        }

      } catch (error) {
        console.error("Recognition error:", error);
        alert("Error processing image.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
    <div>
      <div className="dashboard-container">
        {/* Left Column: Upload & Analysis */}
        <div className="card recognition-card">
          <h3><i className="camera-icon"></i> NeuroXAI Detection System</h3>
          <p className="subtitle">An Intelligent Explainable AI-Powered Detection Platform</p>

          <div className="image-viewport">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="display-img" />
            ) : (
              <div className="placeholder-content">
                <div className="camera-placeholder-icon">📷</div>
                <p>Upload an image to begin analysis</p>
              </div>
            )}
          </div>

          <input 
            type="file" 
            id="file-upload" 
            onChange={handleImageChange} 
            hidden 
          />
          <label htmlFor="file-upload" className="upload-btn">
            {selectedImage ? "Change Image" : "Upload Image"}
          </label>

          <button 
            className="recognition-btn" 
            onClick={handleStartRecognition}
            disabled={loading}
          >
            {loading ? "Processing..." : "▶ Start Analysis"}
          </button>
        </div>

        {/* Right Column: XAI Image */}
        <div className="card log-card">
          <h3><i className="clock-icon"></i> Explainable AI View</h3>
          <p className="subtitle">Real-time Explainable AI-Powered Detection Platform</p>

          <div className="log-content">
            {xaiImage ? (
              <img src={xaiImage} alt="XAI Explanation" className="xai-display-img"  width={600} height={300}/>
            ) : (
              <div className="empty-log">
                <div className="user-icon">🧠</div>
                <p>No XAI analysis yet</p>
                <p className="small">Start scanning to view explanations</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='report'>
        <h1>Report</h1>
        <p>{report}</p>
      </div>
    </div>
  );
};

export default Analysis;
