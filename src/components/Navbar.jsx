import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../App.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // section links work as anchors on the home page,
  // and as "/#section" from other routes
  const sectionLinks = [
    { name: 'Home', hash: '#home' },
    { name: 'About', hash: '#about' },
    { name: 'Skills', hash: '#skills' },
    { name: 'Education', hash: '#education' },
    { name: 'Projects', hash: '#projects' },
    { name: 'Contact', hash: '#contact' },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu} style={{ textDecoration: 'none' }}>
          <span className="logo-text">VinayPort</span>
        </Link>

        <nav className={`nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            {sectionLinks.map((link, index) => (
              <li key={index} className="nav-item">
                <a
                  href={onHome ? link.hash : `/${link.hash}`}
                  className="nav-link"
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link nav-link-cta" onClick={closeMenu}>
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
