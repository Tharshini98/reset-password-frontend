import { useNavigate } from 'react-router-dom';
import './index.css';

export default function Dashboard() {
  const navigate = useNavigate();

 
  const logout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      
      <div className="topbar">
        <div className="topbar-left">
          <div className="logo-mark"></div>
          <span className="topbar-wordmark">Vaultly</span>
        </div>
        <div className="topbar-right">
          <div className="avatar">JD</div>
          <span className="topbar-name">Jane Doe</span>
          <button className="btn-logout" onClick={logout}>Sign out</button>
        </div>
      </div>

      <div className="dash-body">
        <div className="dash-heading">
          <h1>Welcome to your dashboard </h1>
          <p>You have successfully logged in.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon red"></div>
            <div className="stat-val">24</div>
            <div className="stat-lbl">Logins this month</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">💻</div>
            <div className="stat-val">3</div>
            <div className="stat-lbl">Active devices</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"></div>
            <div className="stat-val">0</div>
            <div className="stat-lbl">Suspicious logins</div>
          </div>
        </div>

        {/* Activity */}
        <div className="panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="panel-title" style={{ margin: 0 }}>Recent activity</span>
            <span className="tag-ok">✓ All clear</span>
          </div>

          {[
            { dot: 'green', title: 'Login successful',  meta: 'Chrome · Chennai, IN', time: 'Just now' },
            { dot: 'blue',  title: 'Password changed',  meta: 'Via reset link',       time: '2h ago'   },
            { dot: 'red',   title: 'Reset email sent',  meta: 'Requested by user',    time: '2h ago'   },
            { dot: 'green', title: 'Login successful',  meta: 'Safari · Chennai, IN', time: 'Yesterday'},
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 0',
              borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: item.dot === 'green' ? 'var(--success)'
                          : item.dot === 'red'   ? 'var(--accent)'
                          : '#0f3460',
              }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: 'var(--brand)', fontWeight: 500, marginBottom: 2 }}>{item.title}</p>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{item.meta}</span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.time}</span>
            </div>
          ))}
        </div>

        <div className="panel">
          <p className="panel-title">Quick actions</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/request-reset" style={{
              padding: '10px 18px', border: '1.5px solid var(--border)',
              borderRadius: 8, fontSize: 13, color: 'var(--brand)',
              textDecoration: 'none', fontWeight: 500,
            }}>
               Change password
            </a>
            <button onClick={logout} style={{
              padding: '10px 18px', border: '1.5px solid var(--border)',
              borderRadius: 8, fontSize: 13, color: 'var(--muted)',
              background: 'none', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            }}>
              → Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
