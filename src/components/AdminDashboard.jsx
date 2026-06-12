import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, serverTimestamp
} from 'firebase/firestore';
import '../admin.css';

/* ============================================================
   ADMIN DASHBOARD — manage Projects, Skills & Messages
   ============================================================ */

const EMPTY_PROJECT = {
  title: '', description: '', tech: '', liveLink: '', sourceLink: '', icon: 'rocket'
};

const EMPTY_CATEGORY = {
  title: '', icon: 'tools', skills: [{ name: '', level: 80 }]
};

const ICON_OPTIONS = [
  { value: 'rocket', label: '🚀 Rocket' },
  { value: 'cloud', label: '🌤️ Cloud/Weather' },
  { value: 'tasks', label: '📝 Tasks/Todo' },
  { value: 'code', label: '💻 Code' },
  { value: 'react', label: '⚛️ React' },
  { value: 'java', label: '☕ Java' },
  { value: 'tools', label: '🛠️ Tools' },
  { value: 'database', label: '🗄️ Database' },
];

const AdminDashboard = () => {
  const [tab, setTab] = useState('projects');

  /* ---------- live data ---------- */
  const [projects, setProjects] = useState([]);
  const [skillCats, setSkillCats] = useState([]);
  const [messages, setMessages] = useState([]);

  /* ---------- form state ---------- */
  const [projectForm, setProjectForm] = useState(EMPTY_PROJECT);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [categoryForm, setCategoryForm] = useState(EMPTY_CATEGORY);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [status, setStatus] = useState('');

  /* ---------- realtime listeners ---------- */
  useEffect(() => {
    // Plain collection listeners + client-side sorting.
    // (orderBy in the query silently hides docs missing the sorted field)
    const unsubProjects = onSnapshot(collection(db, 'projects'), snap =>
      setProjects(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))
      )
    );
    const unsubSkills = onSnapshot(collection(db, 'skills'), snap =>
      setSkillCats(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      )
    );
    const unsubMessages = onSnapshot(collection(db, 'contactMessages'), snap =>
      setMessages(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.timestamp?.seconds ?? 0) - (a.timestamp?.seconds ?? 0))
      )
    );
    return () => { unsubProjects(); unsubSkills(); unsubMessages(); };
  }, []);

  const flash = (msg) => {
    setStatus(msg);
    setTimeout(() => setStatus(''), 3000);
  };

  /* ============ PROJECTS CRUD ============ */
  const saveProject = async (e) => {
    e.preventDefault();
    const data = {
      title: projectForm.title.trim(),
      description: projectForm.description.trim(),
      tech: projectForm.tech.split(',').map(t => t.trim()).filter(Boolean),
      liveLink: projectForm.liveLink.trim(),
      sourceLink: projectForm.sourceLink.trim(),
      icon: projectForm.icon,
    };
    try {
      if (editingProjectId) {
        await updateDoc(doc(db, 'projects', editingProjectId), data);
        flash('✅ Project updated');
      } else {
        await addDoc(collection(db, 'projects'), { ...data, createdAt: serverTimestamp() });
        flash('✅ Project added');
      }
      setProjectForm(EMPTY_PROJECT);
      setEditingProjectId(null);
    } catch (err) {
      console.error(err);
      flash('❌ Error: ' + err.message);
    }
  };

  const editProject = (p) => {
    setEditingProjectId(p.id);
    setProjectForm({
      title: p.title, description: p.description,
      tech: (p.tech || []).join(', '),
      liveLink: p.liveLink || '', sourceLink: p.sourceLink || '',
      icon: p.icon || 'rocket'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeProject = async (id) => {
    if (window.confirm('Delete this project?')) {
      await deleteDoc(doc(db, 'projects', id));
      flash('🗑️ Project deleted');
    }
  };

  /* ============ SKILLS CRUD ============ */
  const saveCategory = async (e) => {
    e.preventDefault();
    const data = {
      title: categoryForm.title.trim(),
      icon: categoryForm.icon,
      skills: categoryForm.skills
        .filter(s => s.name.trim())
        .map(s => ({ name: s.name.trim(), level: Number(s.level) || 0 })),
      order: categoryForm.order ?? skillCats.length,
    };
    try {
      if (editingCategoryId) {
        await updateDoc(doc(db, 'skills', editingCategoryId), data);
        flash('✅ Category updated');
      } else {
        await addDoc(collection(db, 'skills'), data);
        flash('✅ Category added');
      }
      setCategoryForm(EMPTY_CATEGORY);
      setEditingCategoryId(null);
    } catch (err) {
      console.error(err);
      flash('❌ Error: ' + err.message);
    }
  };

  const editCategory = (c) => {
    setEditingCategoryId(c.id);
    setCategoryForm({
      title: c.title, icon: c.icon || 'tools',
      skills: c.skills?.length ? c.skills : [{ name: '', level: 80 }],
      order: c.order ?? 0
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeCategory = async (id) => {
    if (window.confirm('Delete this skill category?')) {
      await deleteDoc(doc(db, 'skills', id));
      flash('🗑️ Category deleted');
    }
  };

  const updateSkillRow = (i, field, value) => {
    const skills = [...categoryForm.skills];
    skills[i] = { ...skills[i], [field]: value };
    setCategoryForm({ ...categoryForm, skills });
  };

  /* ============ MESSAGES ============ */
  const removeMessage = async (id) => {
    if (window.confirm('Delete this message?')) {
      await deleteDoc(doc(db, 'contactMessages', id));
      flash('🗑️ Message deleted');
    }
  };

  /* ============ SEED DEFAULTS ============ */
  const seedDefaults = async () => {
    if (!window.confirm(
      'Add the default projects & skills (Frontend / Backend / Tools) to Firestore?\n' +
      'Existing items are kept — delete duplicates afterwards if needed.'
    )) return;
    // skip items that already exist (by title)
    const existingProjectTitles = projects.map(p => p.title?.toLowerCase());
    const existingSkillTitles = skillCats.map(c => c.title?.toLowerCase());
    const defaultProjects = [
      {
        title: 'Weather App', icon: 'cloud',
        description: 'A responsive weather application that provides real-time weather updates for any city using a weather API.',
        tech: ['React', 'API', 'CSS'],
        liveLink: 'https://vinay-weatherapp.netlify.app',
        sourceLink: 'https://github.com/vinayy876/weather-app',
      },
      {
        title: 'Todo App', icon: 'tasks',
        description: 'A simple and efficient task manager app to add, update, and delete daily tasks with a clean UI.',
        tech: ['React', 'LocalStorage', 'CSS'],
        liveLink: 'https://peppy-gaufre-c03c83.netlify.app',
        sourceLink: 'https://github.com/vinayy876/MangerApp',
      },
    ];
    const defaultSkills = [
      { title: 'Frontend', icon: 'react', order: 0, skills: [
        { name: 'HTML5', level: 90 }, { name: 'CSS3', level: 85 },
        { name: 'JavaScript ES6+', level: 85 }, { name: 'React.js', level: 80 }] },
      { title: 'Backend', icon: 'java', order: 1, skills: [
        { name: 'Java SE/EE', level: 85 }, { name: 'JSP & Servlets', level: 80 },
        { name: 'JDBC', level: 80 }, { name: 'MySQL', level: 75 }] },
      { title: 'Tools', icon: 'tools', order: 2, skills: [
        { name: 'VS Code', level: 90 }, { name: 'Eclipse', level: 85 },
        { name: 'Postman', level: 80 }, { name: 'Git & GitHub', level: 75 }] },
    ];
    for (const p of defaultProjects) {
      await addDoc(collection(db, 'projects'), { ...p, createdAt: serverTimestamp() });
    }
    for (const s of defaultSkills) {
      await addDoc(collection(db, 'skills'), s);
    }
    flash('✅ Default data loaded into Firestore');
  };

  /* ============================================================ */
  return (
    <div className="admin">
      <div className="admin-container">

        {/* Header */}
        <div className="admin-header">
          <h1 className="admin-title">⚡ Admin Dashboard</h1>
          <div className="admin-header-actions">
            {projects.length === 0 && skillCats.length === 0 && (
              <button className="admin-btn admin-btn-ghost" onClick={seedDefaults}>
                Load Default Data
              </button>
            )}
            <button className="admin-btn admin-btn-danger" onClick={() => signOut(auth)}>
              Logout
            </button>
          </div>
        </div>

        {status && <div className="admin-status">{status}</div>}

        {/* Tabs */}
        <div className="admin-tabs">
          <button className={`admin-tab ${tab === 'projects' ? 'active' : ''}`} onClick={() => setTab('projects')}>
            Projects ({projects.length})
          </button>
          <button className={`admin-tab ${tab === 'skills' ? 'active' : ''}`} onClick={() => setTab('skills')}>
            Skills ({skillCats.length})
          </button>
          <button className={`admin-tab ${tab === 'messages' ? 'active' : ''}`} onClick={() => setTab('messages')}>
            Messages ({messages.length})
          </button>
        </div>

        {/* ============ PROJECTS TAB ============ */}
        {tab === 'projects' && (
          <>
            <form className="admin-card" onSubmit={saveProject}>
              <h2 className="admin-card-title">
                {editingProjectId ? '✏️ Edit Project' : '➕ Add New Project'}
              </h2>
              <div className="admin-grid-2">
                <input className="admin-input" placeholder="Project Title" required
                  value={projectForm.title}
                  onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} />
                <select className="admin-input" value={projectForm.icon}
                  onChange={e => setProjectForm({ ...projectForm, icon: e.target.value })}>
                  {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <textarea className="admin-input" rows="3" placeholder="Description" required
                value={projectForm.description}
                onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} />
              <input className="admin-input" placeholder="Tech (comma separated: React, CSS, API)" required
                value={projectForm.tech}
                onChange={e => setProjectForm({ ...projectForm, tech: e.target.value })} />
              <div className="admin-grid-2">
                <input className="admin-input" type="url" placeholder="Live Link (https://...)"
                  value={projectForm.liveLink}
                  onChange={e => setProjectForm({ ...projectForm, liveLink: e.target.value })} />
                <input className="admin-input" type="url" placeholder="Source Code Link (https://...)"
                  value={projectForm.sourceLink}
                  onChange={e => setProjectForm({ ...projectForm, sourceLink: e.target.value })} />
              </div>
              <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editingProjectId ? 'Update Project' : 'Add Project'}
                </button>
                {editingProjectId && (
                  <button type="button" className="admin-btn admin-btn-ghost"
                    onClick={() => { setEditingProjectId(null); setProjectForm(EMPTY_PROJECT); }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="admin-list">
              {projects.map(p => (
                <div key={p.id} className="admin-item">
                  <div className="admin-item-body">
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="admin-chips">
                      {(p.tech || []).map((t, i) => <span key={i} className="admin-chip">{t}</span>)}
                    </div>
                  </div>
                  <div className="admin-item-actions">
                    <button className="admin-btn admin-btn-small" onClick={() => editProject(p)}>Edit</button>
                    <button className="admin-btn admin-btn-small admin-btn-danger" onClick={() => removeProject(p.id)}>Delete</button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p className="admin-empty">No projects in Firestore yet. Add one above or load defaults.</p>}
            </div>
          </>
        )}

        {/* ============ SKILLS TAB ============ */}
        {tab === 'skills' && (
          <>
            <form className="admin-card" onSubmit={saveCategory}>
              <h2 className="admin-card-title">
                {editingCategoryId ? '✏️ Edit Category' : '➕ Add Skill Category'}
              </h2>
              <div className="admin-grid-2">
                <input className="admin-input" placeholder="Category Title (e.g. Frontend)" required
                  value={categoryForm.title}
                  onChange={e => setCategoryForm({ ...categoryForm, title: e.target.value })} />
                <select className="admin-input" value={categoryForm.icon}
                  onChange={e => setCategoryForm({ ...categoryForm, icon: e.target.value })}>
                  {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {categoryForm.skills.map((s, i) => (
                <div className="admin-skill-row" key={i}>
                  <input className="admin-input" placeholder="Skill name"
                    value={s.name}
                    onChange={e => updateSkillRow(i, 'name', e.target.value)} />
                  <input className="admin-input admin-input-level" type="number" min="0" max="100"
                    value={s.level}
                    onChange={e => updateSkillRow(i, 'level', e.target.value)} />
                  <button type="button" className="admin-btn admin-btn-small admin-btn-danger"
                    onClick={() => setCategoryForm({
                      ...categoryForm,
                      skills: categoryForm.skills.filter((_, idx) => idx !== i)
                    })}>✕</button>
                </div>
              ))}
              <button type="button" className="admin-btn admin-btn-ghost"
                onClick={() => setCategoryForm({
                  ...categoryForm,
                  skills: [...categoryForm.skills, { name: '', level: 80 }]
                })}>
                + Add Skill Row
              </button>

              <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editingCategoryId ? 'Update Category' : 'Add Category'}
                </button>
                {editingCategoryId && (
                  <button type="button" className="admin-btn admin-btn-ghost"
                    onClick={() => { setEditingCategoryId(null); setCategoryForm(EMPTY_CATEGORY); }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="admin-list">
              {skillCats.map(c => (
                <div key={c.id} className="admin-item">
                  <div className="admin-item-body">
                    <h3>{c.title}</h3>
                    <div className="admin-chips">
                      {(c.skills || []).map((s, i) => (
                        <span key={i} className="admin-chip">{s.name} · {s.level}%</span>
                      ))}
                    </div>
                  </div>
                  <div className="admin-item-actions">
                    <button className="admin-btn admin-btn-small" onClick={() => editCategory(c)}>Edit</button>
                    <button className="admin-btn admin-btn-small admin-btn-danger" onClick={() => removeCategory(c.id)}>Delete</button>
                  </div>
                </div>
              ))}
              {skillCats.length === 0 && <p className="admin-empty">No skill categories yet. Add one above or load defaults.</p>}
            </div>
          </>
        )}

        {/* ============ MESSAGES TAB ============ */}
        {tab === 'messages' && (
          <div className="admin-list">
            {messages.map(m => (
              <div key={m.id} className="admin-item">
                <div className="admin-item-body">
                  <h3>{m.subject || '(no subject)'}</h3>
                  <p className="admin-msg-meta">
                    From: <strong>{m.name}</strong> · {m.email}
                    {m.timestamp?.toDate && ` · ${m.timestamp.toDate().toLocaleString()}`}
                  </p>
                  <p>{m.message}</p>
                </div>
                <div className="admin-item-actions">
                  <a className="admin-btn admin-btn-small" href={`mailto:${m.email}`}>Reply</a>
                  <button className="admin-btn admin-btn-small admin-btn-danger" onClick={() => removeMessage(m.id)}>Delete</button>
                </div>
              </div>
            ))}
            {messages.length === 0 && <p className="admin-empty">No messages yet.</p>}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
