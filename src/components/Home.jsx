import React from 'react';
import { Link } from 'react-router-dom';
import MagicRings from './MagicRings';



const Home = () => {
  return (
    <section style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'cente  r',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '50px 20px',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
          Hi, I'm Vinay
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
          Full Stack Developer | Creating Amazing Web Experiences
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link
            to="/projects"
            style={{
              padding: '15px 40px',
              background: 'white',
              color: '#667eea',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            style={{
              padding: '15px 40px',
              background: 'transparent',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              border: '2px solid white'
            }}>
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;