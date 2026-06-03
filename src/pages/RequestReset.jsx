import { useState } from 'react';
import './index.css';

export default function RequestReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const requestReset = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/request-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setMessage(data.message);
    if (res.ok) setIsSuccess(true);
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="brand-logo">
          <div className="logo-mark"></div>
          <span className="brand-name">Vaultly</span>
        </div>
        <div className="left-tagline">
          <h1>Locked <em>out</em>?</h1>
          <p>No worries — we'll send a secure link to your inbox so you can get back in within minutes.</p>
        </div>
        <div className="steps-list">
          <div className="step-item">
            <div className="step-num">1</div>
            <div className="step-text"><p>Enter your email</p><span>The one you registered with</span></div>
          </div>
          <div className="step-item">
            <div className="step-num">2</div>
            <div className="step-text"><p>Check your inbox</p><span>A secure link arrives in seconds</span></div>
          </div>
          <div className="step-item">
            <div className="step-num">3</div>
            <div className="step-text"><p>Set a new password</p><span>Link expires after 15 minutes</span></div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        {isSuccess ? (
          <div className="success-card">
            <div className="success-icon">✉</div>
            <h3>Check your inbox</h3>
            <p>We sent a reset link to <strong>{email}</strong>. It expires in 15 minutes.</p>
            <div className="link-row">
              Didn't get it?{' '}
              <span style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }}
                onClick={() => { setIsSuccess(false); setMessage(''); }}>
                Resend link
              </span>
            </div>
            <div className="link-row" style={{ marginTop: 10 }}>
              <a href="/login">← Back to sign in</a>
            </div>
          </div>
        ) : (
          <div className="form-card">
            <div className="page-header">
              <div className="eyebrow">Account recovery</div>
              <h2>Forgot password?</h2>
              <p>Enter your email and we'll send a secure reset link within seconds.</p>
            </div>

            {message && !isSuccess && (
              <div className="alert alert-error">⚠ {message}</div>
            )}

            <form onSubmit={requestReset}>
              <div className="form-group">
                <label>Email address</label>
                <div className="input-wrap">
                  <span className="input-icon">✉</span>
                  <input type="email" placeholder="jane@company.com" value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
              <button type="submit" className="btn-primary">→ Send reset link</button>
            </form>

            <div className="link-row" style={{ marginTop: 20 }}>
              <a href="/login">← Back to sign in</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
