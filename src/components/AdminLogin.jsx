import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { FaLock, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import '../admin.css';

const AdminLogin = ({ onLogin }) => {
  // No pre-filled credentials — never put passwords in code!
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // Notify parent that login succeeded
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-icon"><FaLock /></div>
        <h2 className="admin-login-title">Admin Login</h2>
        <p className="admin-login-subtitle">Sign in to manage your portfolio</p>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="admin-login-field">
            <FaEnvelope className="admin-login-field-icon" />
            <input
              type="email"
              className="admin-input admin-login-input"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-login-field">
            <FaLock className="admin-login-field-icon" />
            <input
              type="password"
              className="admin-input admin-login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary admin-login-btn"
            disabled={loading}
          >
            <FaSignInAlt style={{ marginRight: 8 }} />
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
