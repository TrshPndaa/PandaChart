import React from 'react';
import { ChevronRight } from 'lucide-react';

function ContentSection({ section }) {
  return (
    <div className="content-card">
      <h3 className="content-title">{section.title}</h3>
      <p className="content-description">{section.description}</p>
      
      <ul className="content-list">
        {section.items.map((item, index) => (
          <li key={index} className="content-list-item">
            {item}
          </li>
        ))}
      </ul>
      
      <button className="modern-button modern-button-primary content-button">
        <span className="modern-button-text">{section.buttonText}</span>
        <ChevronRight size={18} className="modern-button-icon" />
        <div className="modern-button-shine" />
        <div className="modern-button-glow" />
      </button>
    </div>
  );
}

export default ContentSection;