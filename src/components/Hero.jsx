import React from 'react';
import { FaLinkedin, FaEnvelope, FaDownload, FaGithub, FaCloud, FaServer } from 'react-icons/fa';
import '../App.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hello🙋‍♂️<br />
            I'm <span className="highlight">VINAY SHARMA</span>
          </h1>
          <h2 className="hero-subtitle">Java Full Stack Developer</h2>
          <p className="hero-description">
           motivated and detail-oriented software
              developer pursuing my <strong>B.Tech in Computer Science</strong>. With a strong
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
            <a
              href="https://github.com/vinayy876"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub Profile">
              <FaGithub />
            </a>
            <a
              href="https://app.netlify.com/teams/vinayy876/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Netlify Projects">
              <FaCloud />
            </a>
            <a
              href="https://dashboard.render.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Render Projects">
              <FaServer />
            </a>
            <a
              href="https://www.linkedin.com/in/vinay-sharma-35b683359/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn Profile">
              <FaLinkedin />
            </a>
            <a
              href="mailto:vinaysharma71984@gmail.com"
              className="social-link"
              aria-label="Email Me">
              <FaEnvelope />
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-wrapper">
            <img
              src="https://i.postimg.cc/sXbVL1Ds/IMG-20260324-160457.jpg"
              alt="Vinay Sharma - Java Full Stack Developer"
              className="profile-img" />
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
