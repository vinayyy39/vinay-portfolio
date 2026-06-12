import React, { useState } from 'react';
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../App.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'contactMessages'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date()
      });
      
      setSuccess('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
      setTimeout(() => setError(''), 5000);
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      padding: '80px 20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        fontSize: '48px', 
        marginBottom: '50px',
        color: '#1a1a2e'
      }}>
        Get In Touch
      </h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Left Panel - Contact Info */}
        <div style={{
          background: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
          borderRadius: '20px',
          padding: '40px',
          color: 'white',
          flex: '1',
          minWidth: '300px',
          maxWidth: '400px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ 
            fontSize: '32px', 
            marginBottom: '20px',
            color: '#00d9ff'
          }}>
            Let's Connect
          </h2>
          
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.6',
            marginBottom: '30px',
            opacity: '0.9'
          }}>
            I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          
          <div style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '15px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FaEnvelope size={24} />
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '14px', opacity: '0.8' }}>Email</p>
                <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>vinaysharma71984@gmail.com</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '15px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FaLinkedin size={24} />
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '14px', opacity: '0.8' }}>LinkedIn</p>
                <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>linkedin.com/in/vinay-sharma</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '15px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '14px', opacity: '0.8' }}>Location</p>
                <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>Ujjain, India</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Form */}
        <div style={{
          flex: '1',
          minWidth: '300px',
          maxWidth: '500px'
        }}>
          <h3 style={{ 
            fontSize: '24px', 
            marginBottom: '25px',
            color: '#1a1a2e'
          }}>
            Send Me a Message
          </h3>
          
          {success && (
            <div style={{ 
              background: '#4CAF50', 
              color: 'white', 
              padding: '15px', 
              marginBottom: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              {success}
            </div>
          )}
          
          {error && (
            <div style={{ 
              background: '#f44336', 
              color: 'white', 
              padding: '15px', 
              marginBottom: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '20px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
            />
            
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '20px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
            />
            
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '20px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
            />
            
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '20px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'border-color 0.3s'
              }}
            />
            
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;