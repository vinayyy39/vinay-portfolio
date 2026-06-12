import React, { useState, useEffect } from 'react';
import { FaReact, FaJava, FaTools, FaCode, FaDatabase, FaRocket, FaCloudSun, FaTasks } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import '../App.css';

const ICONS = {
  react: <FaReact />,
  java: <FaJava />,
  tools: <FaTools />,
  code: <FaCode />,
  database: <FaDatabase />,
  rocket: <FaRocket />,
  cloud: <FaCloudSun />,
  tasks: <FaTasks />,
};

// fallback shown if Firestore is empty / unreachable
const FALLBACK_CATEGORIES = [
  {
    icon: 'react',
    title: 'Frontend',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'JavaScript ES6+', level: 85 },
      { name: 'React.js', level: 80 }
    ]
  },
  {
    icon: 'java',
    title: 'Backend',
    skills: [
      { name: 'Java SE/EE', level: 85 },
      { name: 'Spring Boot', level: 80 },
      { name: 'Hibernate', level: 75 },
      { name: 'MVC Architecture', level: 80 },
      { name: 'JSP & Servlets', level: 80 },
      { name: 'JDBC', level: 80 },
      { name: 'MySQL', level: 75 },
    ]
  },
  {
    icon: 'tools',
    title: 'Tools',
    skills: [
      { name: 'VS Code', level: 90 },
      { name: 'Eclipse', level: 85 },
      { name: 'Postman', level: 80 },
      { name: 'Git & GitHub', level: 75 }
    ]
  }
];

const Skills = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    // No orderBy in the query — orderBy('order') silently hides docs
    // that are missing the 'order' field. We sort client-side instead.
    const unsub = onSnapshot(
      collection(db, 'skills'),
      (snap) => {
        const data = snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setCategories(data.length ? data : FALLBACK_CATEGORIES);
      },
      (err) => {
        console.error('Skills listener error:', err);
        setCategories(FALLBACK_CATEGORIES);
      }
    );
    return unsub;
  }, []);

  const list = categories ?? FALLBACK_CATEGORIES;

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {list.map((category, index) => (
            <div key={category.id || index} className="skill-category">
              <div className="skill-category-header">
                <div className="skill-category-icon">
                  {ICONS[category.icon] || <FaTools />}
                </div>
                <h3 className="skill-category-title">{category.title}</h3>
              </div>
              <div className="skill-list">
                {(category.skills || []).map((skill, i) => (
                  <div key={i} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ '--level': `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
