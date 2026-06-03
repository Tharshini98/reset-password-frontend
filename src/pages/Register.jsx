import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';

function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://password-reset-backend-nvll.onrender.com/api/auth/register',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      alert(response.data.message);
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const strength = password ? getStrength(password) : 0;

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="brand-logo">
          <div className="logo-mark"></div>
          <span className="brand-name">Vaultly</span>
        </div>
        <div className="left-tagline">
          <h1>Secure access, <em>simplified</em>.</h1>
          <p>Enterprise-grade authentication with a seamless experience your users will love.</p>
        </div>
        <div className="steps-list">
          <div className="step-item">
            <div className="step-num">1</div>
            <div className="step-text"><p>Create your account</p><span>Quick registration, no card needed</span></div>
          </div>
          <div className="step-item">
            <div className="step-num">2</div>
            <div className="step-text"><p>Verify your email</p><span>One-click link sent instantly</span></div>
          </div>
          <div className="step-item">
            <div className="step-num">3</div>
            <div className="step-text"><p>Access your dashboard</p><span>Full control from day one</span></div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="form-card">
          <div className="page-header">
            <div className="eyebrow">Get started</div>
            <h2>Create an account</h2>
            <p>Already have one? <a href="/login">Sign in instead</a></p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full name</label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input type="text" placeholder="Jane Doe" value={name}
                  onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>

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
                <span className="input-icon">🔒</span>
                <input
                  type={showPw ? 'text' : 'password'}
                  className="has-eye"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? '🙈' : '👁'}
                </button>
              </div>
              {password && (
                <>
                  <div className="strength-bar">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`strength-seg ${i <= strength ? `s${strength}` : ''}`} />
                    ))}
                  </div>
                  <span className="strength-label">{strengthLabels[strength]}</span>
                </>
              )}
            </div>

            <button type="submit" className="btn-primary">→ Create account</button>
          </form>

          <p className="terms-note">
            By registering you agree to our <a href="#">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
