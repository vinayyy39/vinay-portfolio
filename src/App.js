import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

// Import all components
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MagicRings from './components/MagicRings';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a14',
        color: '#9aa0b5',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <Router>
      <div className="App">
        {/* Premium Glass Navbar */}
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="header-container">
            <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
              <span className="logo-text">VinayPort</span>
            </Link>

            <nav className={`nav ${isMobileMenuOpen ? 'active' : ''}`}>
              <ul className="nav-list">
                {navLinks.map((link, index) => (
                  <li key={index} className="nav-item">
                    <a
                      href={link.href}
                      className="nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li className="nav-item">
                  <Link
                    to="/admin"
                    className="nav-link nav-link-cta"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {isAdmin ? 'Dashboard' : 'Admin'}
                  </Link>
                </li>
              </ul>
            </nav>

            <button
              className="mobile-menu-btn"
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          {/* Portfolio Page */}
          <Route path="/" element={
            <>
              <MagicRings />  
              <div id="home"><Hero /></div>
              <div id="about"><About /></div>
              <div id="skills"><Skills /></div>
              <div id="education"><Education /></div>
              <div id="projects"><Projects /></div>
              <div id="contact"><Contact /></div>
              <Footer />
            </>
          } />

          {/* Admin Page */}
          <Route path="/admin" element={
            isAdmin ? <AdminDashboard /> : <AdminLogin onLogin={() => setIsAdmin(true)} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
