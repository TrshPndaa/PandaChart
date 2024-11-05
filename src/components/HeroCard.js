import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';

function HeroCard() {
  const [activeContent, setActiveContent] = useState(null);

  const handleClose = () => {
    const dropdown = document.querySelector('.hero-dropdown');
    dropdown.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => setActiveContent(null), 280);
  };

  return (
    <div className="hero-card">
      <h1 className="hero-title">PandaCharts</h1>
      <div className="hero-content-layout">
        <div className="hero-buttons-container">
          <button 
            className="hero-button"
            onClick={() => setActiveContent(activeContent === 'about' ? null : 'about')}
          >
            <span>About Us</span>
            <ChevronRight size={18} />
          </button>

          <button 
            className="hero-button"
            onClick={() => setActiveContent(activeContent === 'benefits' ? null : 'benefits')}
          >
            <span>Our Benefits</span>
            <ChevronRight size={18} />
          </button>
        </div>
        
        <div className="hero-dropdown-container">
          {activeContent === 'benefits' && (
            <div className="hero-dropdown">
              <button 
                onClick={handleClose}
                className="hero-dropdown-close"
              >
                <X size={16} />
              </button>
              <div className="hero-dropdown-content">
                <h4 className="hero-dropdown-heading">Key Benefits:</h4>
                <ul className="hero-dropdown-list">
                  <li>Instant Timeline Clarity: Create professional Gantt charts in minutes</li>
                  <li>Team Alignment: Real-time updates keep everyone synchronized</li>
                  <li>Flexible Planning: Easily adjust timelines and dependencies</li>
                  <li>Resource Optimization: Visual resource allocation prevents bottlenecks</li>
                </ul>
                <p className="hero-dropdown-text">
                  Whether you're managing complex projects or simple tasks, PandaCharts helps you deliver on time, every time. Join thousands of successful teams who've simplified their project visualization.
                </p>
              </div>
            </div>
          )}

          {activeContent === 'about' && (
            <div className="hero-dropdown">
              <button 
                onClick={handleClose}
                className="hero-dropdown-close"
              >
                <X size={16} />
              </button>
              <p className="hero-dropdown-text">
                PandaCharts combines powerful visualization tools with seamless collaboration features to help teams of all sizes track progress effortlessly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroCard;