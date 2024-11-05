import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navigation() {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', action: () => {} },
    { label: 'About Us', action: () => {} },
    { label: 'Account', action: () => {} }
  ];

  return (
    <nav className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <div className="nav-left">
          <div className="nav-logo">PandaCharts</div>
          
          <div className={`nav-items ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {navItems.map((item, index) => (
              <button key={index} onClick={item.action} className="nav-item">
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button className="try-now-button" onClick={() => navigate('/Auth')}>
          Try Now!
        </button>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;