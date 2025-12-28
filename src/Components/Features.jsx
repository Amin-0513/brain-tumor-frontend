import React from "react";
import "./Features.css";
import { GiBrain } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { BiScan } from "react-icons/bi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { LuSquareMousePointer } from "react-icons/lu";


const features = [
  {
    title: "Deep Learning AI",
    description:
      "Advanced convolutional neural networks trained on thousands of MRI scans for accurate tumor detection.",
    icon: <GiBrain style={{color:"black"}} />,
  },
  {
    title: "Precise Detection",
    description:
      "Identifies tumors with 98.5% accuracy, highlighting suspicious regions with confidence scores.",
    icon: <LuSquareMousePointer />,
  },
  {
    title: "Instant Analysis",
    description:
      "Get results in under 2 seconds. Fast processing without compromising accuracy.",
    icon: <IoMdTime />,
  },
  {
    title: "Secure & Private",
    description:
      "HIPAA compliant with end-to-end encryption. Your medical data stays completely private.",
    icon: <RiSecurePaymentFill />,
  },
  {
    title: "Multiple Scan Types",
    description:
      "Supports various MRI sequences including T1, T2, FLAIR, and contrast-enhanced imaging.",
    icon: <BiScan  />,
  },
  {
    title: "Detailed Reports",
    description:
      "Comprehensive analysis reports with visualizations and recommendations for medical professionals.",
    icon: <TbReport style={{color:"black"}}/>,
  },
];

export default function Features() {
  return (
    <section className="features-section">
      <h1>
        Cutting-Edge AI Technology for <span>Medical Professionals</span>
      </h1>
      <p className="subtitles">
        Our AI-powered platform combines state-of-the-art machine learning
        with medical expertise to deliver reliable, fast, and accurate brain
        tumor detection.
      </p>

      <div className="features-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


