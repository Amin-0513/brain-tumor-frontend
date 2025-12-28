import React from "react";

import { FiUpload } from "react-icons/fi";
import { BiScan } from "react-icons/bi";
import { FaBrain } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";

import "./Section2.css";

const steps = [
  {
    step: "01",
    title: "Upload MRI Scan",
    desc: "Securely upload your brain MRI scan in DICOM, NIfTI, or standard image formats.",
    icon: <FiUpload />,
  },
  {
    step: "02",
    title: "AI Processing",
    desc: "Our deep learning model analyzes the scan, identifying potential tumor regions.",
    icon: <BiScan  />,
  },
  {
    step: "03",
    title: "Detection Analysis",
    desc: "Advanced algorithms evaluate tissue patterns and highlight areas of concern.",
    icon: <FaBrain />,
  },
  {
    step: "04",
    title: "Get Results",
    desc: "Receive detailed analysis reports with confidence scores and visual overlays.",
    icon: <FaCheckSquare />,
  },
];

export default function HowItWorks() {
  return (
    <>
      <section className="how-section">
        <h2>How It Works</h2>
        <p className="how-subtitle">
          Our streamlined process makes brain tumor detection simple, fast,
          and accurate
        </p>

        <div className="how-grid">
          {steps.map((s, i) => (
            <div className="how-card" key={i}>
              <span className="step-badge">{s.step}</span>
              <div className="how-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Experience Advanced AI Detection?</h2>
        <p>
          Join thousands of medical professionals using our platform to detect
          brain tumors with unprecedented accuracy and speed.
        </p>

        <div className="cta-buttons">
          <button className="btn primary">Get Started Now →</button>
          <button className="btn secondary">✉ Contact Sales</button>
        </div>

        <small>
          No credit card required • Free trial available • HIPAA compliant
        </small>
      </section>
    </>
  );
}
