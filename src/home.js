import React from 'react';
import Navigation from './components/Navigation';
import GanttChart from './components/GanttChart';
import HeroCard from './components/HeroCard';
import ContentSection from './components/ContentSection';
import { InteractiveBubbles } from './components/InteractiveBubbles';
import './home.css';

function Home() {
  const contentSections = [
    {
      title: 'Master PandaCharts',
      description: "New to Gantt charts? We've got you covered. Our tutorial section includes:",
      items: [
        'Quick-start guides',
        'Video walkthroughs',
        'Best practice tips',
        'Feature deep-dives'
      ],
      buttonText: 'Explore Tutorials'
    },
    {
      title: 'Create Your Workspace',
      description: 'Transform your project management journey with a dedicated workspace for your team. Get started in minutes with:',
      items: [
        'Unlimited Gantt charts',
        'Team collaboration tools',
        'Real-time updates',
        'Custom project templates'
      ],
      buttonText: 'Create Workspace'
    },
    {
      title: 'Start Your Journey',
      description: 'Perfect for freelancers and individual project managers. Get immediate access to:',
      items: [
        'Personal dashboard',
        'Project tracking tools',
        'Export capabilities',
        'Priority support'
      ],
      buttonText: 'Join Today'
    }
  ];

  return (
    <div className="min-h-screen">
      <InteractiveBubbles />
      <Navigation />

      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">      
            <GanttChart />
            <HeroCard />
          </div>
        </div>
      </div>

      <div className="content-grid">
        {contentSections.map((section, index) => (
          <ContentSection key={index} section={section} />
        ))}
      </div>
    </div>
  );
}

export default Home;