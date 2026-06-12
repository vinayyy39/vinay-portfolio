import React from 'react';
import { FaGraduationCap, FaSchool } from 'react-icons/fa';
import '../App.css';

const Education = () => {
  const educationData = [
    {
      icon: <FaGraduationCap />,
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      institution: 'Mahakal Institute of Technology',
      location: 'Ujjain, M.P.',
      year: '2023 - 2027 (Expected)',
      grade: 'CGPA: 6.87/10',
      current: true
    },
    {
      icon: <FaSchool />,
      degree: 'Senior Secondary (12th)',
      institution: 'Government Model School',
      location: 'Ujjain, M.P.',
      year: '2023',
      grade: '65%',
      current: false
    },
    {
      icon: <FaSchool />,
      degree: 'Higher Secondary (10th)',
      institution: 'Active English School',
      location: 'Ujjain, M.P.',
      year: '2021',
      grade: '80%',
      current: false
    }
  ];

  return (
    <section id="education" className="section education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-timeline"> 
          {educationData.map((edu, index) => (
            <div 
              key={index}  
              className={`timeline-item ${edu.current ? 'current' : ''}`}
            >
              <div className="timeline-icon">
                {edu.icon}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-degree">{edu.degree}</h3>
                  {edu.current && <span className="current-badge">Current</span>}
                </div>
                <h4 className="timeline-institution">{edu.institution}</h4>
                <p className="timeline-location">{edu.location}</p>
                <div className="timeline-meta">
                  <span className="timeline-year">{edu.year}</span>
                  <span className="timeline-grade">{edu.grade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;