import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Users, Star,
  Clock, MoreVertical, LayoutGrid, 
  List, Filter, ChevronRight,
  Calendar, Bell, Settings
} from 'lucide-react';
import { InteractiveBubbles } from './InteractiveBubbles';
import Modal from './Modal';
import GanttChartCreator from './GanttChartCreator';
import './Dashboard.css';

const Dashboard = () => {
  const [viewType, setViewType] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data.projects);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) throw new Error('Failed to create project');
      
      await fetchProjects();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateProject = async (projectId, projectData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) throw new Error('Failed to update project');
      
      await fetchProjects();
      setIsModalOpen(false);
      setSelectedProject(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete project');
      
      await fetchProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'starred') return matchesSearch && project.starred;
    return matchesSearch && project.status === activeFilter;
  });

  const ProjectCard = ({ project }) => (
    <div className="project-card">
      <div className="project-header">
        <div className="project-title-group">
          <h3 className="project-title">{project.name}</h3>
          {project.starred && <Star className="star-icon" size={18} />}
        </div>
        <div className="project-actions">
          <button 
            className="edit-button"
            onClick={() => {
              setSelectedProject(project);
              setIsModalOpen(true);
            }}
          >
            <Settings size={18} />
          </button>
          <button 
            className="delete-button"
            onClick={() => handleDeleteProject(project.id)}
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <div className="progress-info">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
      </div>

      <div className="project-footer">
        <div className="status-group">
          <div className="team-size">
            <Users size={16} />
            <span>{project.teamSize}</span>
          </div>
          <span className={`status-badge ${project.status}`}>
            {project.status}
          </span>
        </div>
        <div className="due-date">
          <Clock size={16} />
          <span>{formatDate(project.dueDate)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <InteractiveBubbles />
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1>My Gantt Charts</h1>
            <p>Manage and organize your project timelines</p>
          </div>
        </header>

        <div className="controls-section">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="view-controls">
            <div className="view-buttons">
              <button 
                className={`view-button ${viewType === 'grid' ? 'active' : ''}`}
                onClick={() => setViewType('grid')}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                className={`view-button ${viewType === 'list' ? 'active' : ''}`}
                onClick={() => setViewType('list')}
              >
                <List size={20} />
              </button>
            </div>
            
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Projects</option>
              <option value="in-progress">In Progress</option>
              <option value="planning">Planning</option>
              <option value="completed">Completed</option>
              <option value="starred">Starred</option>
            </select>

            <button 
              className="new-chart-button"
              onClick={() => {
                setSelectedProject(null);
                setIsModalOpen(true);
              }}
            >
              <Plus size={18} />
              <span>New Gantt Chart</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            <section className="quick-access">
              <h2>Quick Access</h2>
              <div className={`projects-grid ${viewType}`}>
                {filteredProjects.filter(p => p.starred).map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            <section className="all-projects">
              <h2>All Projects</h2>
              <div className={`projects-grid ${viewType}`}>
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          </>
        )}

        <Modal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}>
          <GanttChartCreator
            existingProject={selectedProject}
            onSave={selectedProject ? 
              (data) => handleUpdateProject(selectedProject.id, data) : 
              handleCreateProject
            }
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedProject(null);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;