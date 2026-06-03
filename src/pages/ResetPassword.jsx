import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();

  // ── original logic unchanged ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirm) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const res = await fetch(
        `https://password-reset-backend-nvll.onrender.com/api/auth/reset-password/${id}/${token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPassword }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        setMessage('Password reset successful!');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage(data.message || 'Reset failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('Something went wrong!');
    }
  };

  const passwordsMatch = confirm && newPassword === confirm;
  const passwordsMismatch = confirm && newPassword !== confirm;

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="brand-logo">
          <div className="logo-mark"></div>
          <span className="brand-name">Vaultly</span>
        </div>
        <div className="left-tagline">
          <h1>Almost <em>there</em>.</h1>
          <p>Choose a strong new password you haven't used before.</p>
        </div>
        <div className="steps-list">
          <div className="step-item">
            <div className="step-num">✓</div>
            <div className="step-text"><p>At least 8 characters</p><span>Longer is always stronger</span></div>
          </div>
          <div className="step-item">
            <div className="step-num">✓</div>
            <div className="step-text"><p>Mix of letters and numbers</p><span>Adds significant entropy</span></div>
          </div>
          <div className="step-item">
            <div className="step-num">✓</div>
            <div className="step-text"><p>At least one special character</p><span>!, @, #, $ — all count</span></div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        {isSuccess ? (
          <div className="success-card">
            <div className="success-icon"></div>
            <h3>Password updated!</h3>
            <p>Your password has been changed successfully. Redirecting you to sign in…</p>
            <button className="btn-primary" onClick={() => navigate('/login')}>
              → Sign in now
            </button>
          </div>
        ) : (
          <div className="form-card">
            <div className="page-header">
              <div className="eyebrow">New credentials</div>
              <h2>Reset your password</h2>
              <p>Choose a strong password you haven't used before.</p>
            </div>

            {message && !isSuccess && (
              <div className="alert alert-error">⚠ {message}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>New password</label>
                <div className="input-wrap">
                  <span className="input-icon"></span>
                  <input
                    type={showPw ? 'text' : 'password'}
                    className="has-eye"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPw(!showPw)}
                    aria-label={showPw ? 'Hide' : 'Show'}>
                    {showPw ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    className="has-eye"
                    placeholder="Repeat your new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}
                    aria-label={showConfirm ? 'Hide' : 'Show'}>
                    {showConfirm ? '🙈' : '👁'}
                  </button>
                </div>
                {passwordsMismatch && (
                  <p style={{ fontSize: 12, color: 'var(--accent)', marginTop: 6 }}>Passwords don't match</p>
                )}
                {passwordsMatch && (
                  <p style={{ fontSize: 12, color: 'var(--success)', marginTop: 6 }}>✓ Passwords match</p>
                )}
              </div>

              <button type="submit" className="btn-primary" disabled={passwordsMismatch}>
                → Save new password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
