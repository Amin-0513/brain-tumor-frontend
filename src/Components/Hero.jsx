import React from "react";
import "./HeroSection.css";
import brainImg from "../assets/images/cx.jpg"; // replace with your image path

export default function HeroSection() {
  return (
    <div className="hero-container">
      <div className="hero-left">
        <div className="badge">AI-Powered Medical Detection</div>

        <h1 className="hero-title">
          Advanced Brain <br /> Tumor <br />
          <span className="highlight">Detection System</span>
        </h1>

        <p className="hero-text">
          Harness the power of artificial intelligence to detect brain tumors
          with unprecedented accuracy. Our advanced deep learning model analyzes
          MRI scans in seconds.
        </p>

        <div className="hero-buttons">
          <button className="upload-btns">Upload MRI Scan</button>
          <button className="learn-btn">Learn More</button>
        </div>

        <div className="hero-stats">
          <div>
            <h3>98.5%</h3>
            <p>Accuracy</p>
          </div>
          <div>
            <h3>&lt;2s</h3>
            <p>Analysis Time</p>
          </div>
          <div>
            <h3>50K+</h3>
            <p>Scans Processed</p>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="floating-tag top-tag">Real-time Analysis</div>
        <div className="image-wrapper">
          <img src={brainImg} alt="Brain Scan" className="hero-image" />
        </div>
        <div className="floating-tag bottom-tag">HIPAA Compliant</div>
      </div>
    </div>
  );
}
