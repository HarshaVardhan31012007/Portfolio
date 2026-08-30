import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });


  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <div className="app-wrapper">
        {/* Shared Layout: Navbar persists across route changes */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Main Content Area with Route Definitions */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            {/* 404 Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Shared Layout: Footer persists across route changes */}
        <Footer />

        {/* Scroll Back To Top Floating Action */}
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
