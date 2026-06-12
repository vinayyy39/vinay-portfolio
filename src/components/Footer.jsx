import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaHeart } from 'react-icons/fa';
import '../App.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Vinay Sharma</h3>
            <p className="footer-text">
              Java Full Stack Developer passionate about creating 
              innovative web solutions.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <div className="footer-social">
              <a 
                href="https://www.linkedin.com/in/vinay-sharma-35b683359/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedin />
              </a>
              <a 
                href="mailto:vinaysharma71984@gmail.com" 
                className="social-icon"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Vinay Sharma. Made with <FaHeart className="heart-icon" /> and React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;