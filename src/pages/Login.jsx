import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) navigate('/dashboard');
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="brand-logo">
          <div className="logo-mark"></div>
          <span className="brand-name">Vaultly</span>
        </div>
        <div className="left-tagline">
          <h1>Welcome <em>back</em>.</h1>
          <p>Sign in to pick up right where you left off. Your data is safe and waiting.</p>
        </div>
        <div className="steps-list">
          <div className="step-item">
            <div className="step-num">✓</div>
            <div className="step-text"><p>256-bit encryption</p><span>All data encrypted at rest and in transit</span></div>
          </div>
          <div className="step-item">
            <div className="step-num">✓</div>
            <div className="step-text"><p>Secure session tokens</p><span>JWT-based, expiring automatically</span></div>
          </div>
          <div className="step-item">
            <div className="step-num">✓</div>
            <div className="step-text"><p>Activity monitoring</p><span>Every login tracked for your safety</span></div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="form-card">
          <div className="page-header">
            <div className="eyebrow">Welcome back</div>
            <h2>Sign in</h2>
            <p>Don't have an account? <a href="/">Register free</a></p>
          </div>

          <form onSubmit={loginUser}>
            <div className="form-group">
              <label>Email address</label>
              <div className="input-wrap">
                <span className="input-icon">✉</span>
                <input type="email" placeholder="jane@company.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <span className="input-icon"></span>
                <input
                  type={showPw ? 'text' : 'password'}
                  className="has-eye"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <div className="forgot-link">
              <a href="/request-reset">Forgot password?</a>
            </div>

            <button type="submit" className="btn-primary">→ Sign in</button>
          </form>

          <div className="divider">or</div>
          <div className="link-row">New to Vaultly? <a href="/">Create an account</a></div>
        </div>
      </div>
    </div>
  );
}
