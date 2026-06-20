import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MagicRings from './components/MagicRings';


import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
<div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
  <MagicRings />
  <Navbar />
  <Hero />
</div>

export default App;