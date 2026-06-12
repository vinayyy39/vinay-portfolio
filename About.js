// src/components/About.js
import React from 'react';
import useFirestore from '../hooks/useFirestore';

const About = () => {
  const { data: education, loading } = useFirestore('education');

  return (
    <section id="about" style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5rem' }}>About Me</h2>
      
      <div style={{ 
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        marginBottom: '50px'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#667eea' }}>
          Who Am I?
        </h3>
        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#555' }}>
          I'm a passionate developer with expertise in modern web technologies. 
          I love creating beautiful, functional, and user-friendly applications.
          {/* Add your bio here or fetch from Firebase */}
        </p>
      </div>

      <h3 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>Education</h3>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading education...</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {education.map((edu) => (
            <div 
              key={edu.id}
              style={{
                background: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                borderLeft: '5px solid #667eea'
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>{edu.degree}</h4>
              <p style={{ margin: '5px 0', color: '#667eea', fontWeight: 'bold' }}>{edu.institution}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>{edu.year}</p>
              {edu.description && (
                <p style={{ margin: '15px 0 0 0', color: '#555', lineHeight: '1.6' }}>
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default About;