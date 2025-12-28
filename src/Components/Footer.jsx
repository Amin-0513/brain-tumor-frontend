import React from "react";
import "./Footer.css";
import { LuBrain } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col brand">
          <div className="logo">
            <span className="logo-icon"><LuBrain style={{color:"white"}} /></span>
            <span className="logo-text">NeuroDetect AI</span>
          </div>
          <p>
            Advanced AI-powered brain tumor detection system for medical
            professionals.
          </p>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li>Features</li>
            <li>How It Works</li>
            <li>Pricing</li>
            <li>API Access</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Research</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="contact">
            <li><CiMail /> support@neurodetect.ai</li>
            <li><FaPhone style={{color:"red"}}/> +1 (555) 123-4567</li>
            <li><CiLocationOn/> San Francisco, CA 94102</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024 NeuroDetect AI. All rights reserved.</span>
        <div className="legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">HIPAA Compliance</a>
        </div>
      </div>
    </footer>
  );
}
