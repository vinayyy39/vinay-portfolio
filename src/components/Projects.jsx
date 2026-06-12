import React, { useState, useEffect } from 'react';
import {
  FaExternalLinkAlt, FaCloudSun, FaTasks, FaRocket, FaGithub,
  FaCode, FaReact, FaJava, FaTools, FaDatabase
} from 'react-icons/fa';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import '../project.css';

const ICONS = {
  rocket: <FaRocket />,
  cloud: <FaCloudSun />,
  tasks: <FaTasks />,
  code: <FaCode />,
  react: <FaReact />,
  java: <FaJava />,
  tools: <FaTools />,
  database: <FaDatabase />,
};

// fallback shown if Firestore is empty / unreachable
const FALLBACK_PROJECTS = [
  {
    icon: 'cloud',
    title: 'Weather App',
    description: 'A responsive weather application that allows users to check real-time weather conditions of any city. Features include current temperature, humidity, wind speed, weather forecasts, and dynamic icons based on weather conditions. Built with a clean and user-friendly interface for seamless user experience.',
    tech: ['React', 'API', 'CSS'],
    liveLink: 'https://vinay-weatherapp.netlify.app',
    sourceLink: 'https://github.com/vinayy876/weather-app'
  },
  {
    icon: 'tasks',
    title: 'Todo App',
    description: 'A simple and interactive TODO application that helps users manage their daily tasks efficiently. Users can add, edit, delete, and mark tasks as complete. Tasks are saved locally, ensuring persistence even after refreshing the page. The app is designed with a clean and intuitive user interface for easy task management.',
    tech: ['React', 'LocalStorage', 'CSS'],
    liveLink: 'https://peppy-gaufre-c03c83.netlify.app',
    sourceLink: 'https://github.com/vinayy876/MangerApp'
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(null); // null = loading

  useEffect(() => {
    // No orderBy in the query — orderBy('createdAt') silently hides docs
    // missing that field. Sort client-side instead (newest first).
    const unsub = onSnapshot(
      collection(db, 'projects'),
      (snap) => {
        const data = snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
        setProjects(data.length ? data : FALLBACK_PROJECTS);
      },
      (err) => {
        console.error('Projects listener error:', err);
        setProjects(FALLBACK_PROJECTS);
      }
    );
    return unsub;
  }, []);

  const list = projects ?? FALLBACK_PROJECTS;

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {list.map((project, index) => (
            <article key={project.id || index} className="project-card">
              <div className="project-header">
                <div className="project-icon-wrapper">
                  {ICONS[project.icon] || <FaRocket />}
                </div>
                <h3 className="project-title">{project.title}</h3>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {(project.tech || []).map((t, i) => (
                  <span key={i} className="tech-badge">{t}</span>
                ))}
              </div>
              <div className="project-links">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-live btn-primary"
                    aria-label={`View live project: ${project.title}`}
                  >
                    <FaRocket className="btn-icon" />
                    Live Project
                  </a>
                )}
                {project.sourceLink && (
                  <a
                    href={project.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-source"
                    aria-label={`View source code for ${project.title}`}
                  >
                    <FaGithub className="btn-icon" />
                    Source Code
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
