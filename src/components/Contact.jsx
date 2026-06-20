import React, { useState } from 'react';
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { db } from '../firebase'; // Make sure path is correct
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Contact.css'; // Import the CSS file we discussed

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Data Firebase me bhejne ka logic
      await addDoc(collection(db, 'contactMessages'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp() // Server time use karna better hai
      });
      
      setStatus({ type: 'success', msg: 'Message sent successfully! I will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error("Error sending message: ", err);
      setStatus({ type: 'error', msg: 'Failed to send message. Please check your internet or Firebase rules.' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: '', msg: '' }), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Yeh wo Heading hai jo tu dhoond raha tha */}
      <h2 className="contact-title">Get In Touch</h2>
      
      <div className="contact-container">
        {/* Left Panel - Info */}
        <div className="contact-left-panel">
          <h2 className="contact-left-title">Let's Connect</h2>
          
          <p className="contact-left-desc">
            I'm always interested in hearing about new projects and opportunities. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          
          <div className="contact-info-list">
            {[
              { icon: <FaEnvelope />, label: 'Email', value: 'vinaysharma71984@gmail.com' },
              { icon: <FaLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/vinay-sharma' },
              { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Ujjain, India' }
            ].map((item, index) => (
              <div key={index} className="contact-info-item">
                <div className="contact-icon-box">
                  {React.cloneElement(item.icon, { size: 20, color: 'white' })}
                </div>
                <div>
                  <p className="contact-info-label">{item.label}</p>
                  <p className="contact-info-value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Panel - Form */}
        <div className="contact-right-panel">
          <h3 className="contact-form-title">Send Me a Message</h3>
          
          {status.msg && (
            <div className={status.type === 'success' ? 'contact-success' : 'contact-error'}>
              {status.msg}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <input 
              type="text" name="name" placeholder="Your Name" 
              value={formData.name} onChange={handleChange} required 
              className="contact-input" 
            />
            <input 
              type="email" name="email" placeholder="Your Email" 
              value={formData.email} onChange={handleChange} required 
              className="contact-input" 
            />
           
            <textarea 
              name="message" placeholder="Your Message" 
              value={formData.message} onChange={handleChange} required rows="5" 
              className="contact-input" 
            />
            
            <button type="submit" disabled={loading} className="contact-button">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;