import React from 'react';
import '../App.css';

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-summary">
            <p className="about-text">
              Hi, I'm Vinay Sharma — a passionate <strong>Java Full Stack Developer</strong> and
              Computer Science undergraduate at Mahakal Institute of Technology, Ujjain. I love
              turning ideas into real, working web applications. On the front end, I craft
              responsive, animated interfaces with <strong>React.js, JavaScript ES6+, HTML5 and
              CSS3</strong>; on the back end, I build solid server-side logic with{' '}
              <strong>Java, JSP &amp; Servlets, JDBC and MySQL</strong> following MVC architecture.
            </p>
            <p className="about-text">
              I've built and deployed live projects — including a real-time Weather App and a
              task manager — and integrated <strong>Firebase Authentication and Cloud
              Firestore</strong> to power dynamic, database-driven features like the admin
              dashboard running behind this very portfolio. I'm comfortable across the full
              workflow: Git &amp; GitHub for version control, Postman for API testing, and
              deploying on Netlify and Render.
            </p>
            <p className="about-text">
              🔹 What drives me:<br />
              Writing clean, readable code and constantly learning new technologies<br />
              Building real projects, not just tutorials — shipping things people can actually use<br />
              Solving problems end-to-end, from database design to polished UI<br />
              Growing into a professional developer ready for real-world challenges
            </p>
            <p className="about-text">
              I'm currently looking for <strong>internship and entry-level opportunities</strong>{' '}
              where I can contribute, learn from experienced developers, and build impactful
              products. Let's connect and create something great together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
