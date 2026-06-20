import React from 'react';
import { FaLinkedin, FaEnvelope, FaDownload, FaGithub, FaCloud, FaServer } from 'react-icons/fa';
import '../App.css';
import MagicRings from './MagicRings'; // Make sure path is correct

const Hero = () => {
  return (
    // Add position: relative so the absolute rings stay inside this section
    <section id="home" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* 1. ADD MAGIC RINGS HERE */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0, // Behind content
        pointerEvents: 'none' // Lets you click buttons on top
      }}>
        <MagicRings 
          color="#A855F7" 
          colorTwo="#6366F1" 
          opacity={0.6} // Adjust visibility
          blur={2}
          speed={0.8}
        />
      </div>

      {/* 2. WRAP CONTENT IN A DIV WITH HIGHER Z-INDEX */}
      <div className="hero-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          <h1 className="hero-title">
            Hello‍♂️<br />
            I'm <span className="highlight">VINAY SHARMA</span>
          </h1>
          <h2 className="hero-subtitle">Java Full Stack Developer</h2>
          <p className="hero-description">
           Motivated and Detail-oriented Software
              Developer Pursuing My <strong>B.Tech in Computer Science</strong>. With a strong
              passion for <strong>software development and UI/UX design</strong>, I enjoy
              transforming ideas into practical, user-friendly digital solutions.
          </p>
          <div className="hero-buttons">
            <a href="/VinayResume.pdf" download className="btn btn-primary">
              <FaDownload className="btn-icon" /> Download Resume
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
          </div>
          <div className="hero-social">
            <a href="https://github.com/vinayy876" target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub /></a>
            <a href="https://app.netlify.com/teams/vinayy876/projects" target="_blank" rel="noopener noreferrer" className="social-link"><FaCloud /></a>
            <a href="https://dashboard.render.com/" target="_blank" rel="noopener noreferrer" className="social-link"><FaServer /></a>
            <a href="https://www.linkedin.com/in/vinay-sharma-35b683359/" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin /></a>
            <a href="mailto:vinaysharma71984@gmail.com" className="social-link"><FaEnvelope /></a>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-wrapper">
            <img src="https://i.postimg.cc/sXbVL1Ds/IMG-20260324-160457.jpg" alt="Vinay Sharma" className="profile-img" />
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;