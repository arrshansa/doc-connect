import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SAMPLE_HOSPITALS = [
  { id: 1, name: 'Metro General Hospital', city: 'New York', type: 'General Hospital', beds: 820, open: 'Cardiologist', status: 'open' },
  { id: 2, name: 'Sunrise Medical Center', city: 'Los Angeles', type: 'Teaching Hospital', beds: 1200, open: 'Neurologist', status: 'open' },
  { id: 3, name: 'Lakeside Children\'s', city: 'Chicago', type: 'Children\'s Hospital', beds: 350, open: 'Pediatrician', status: 'open' },
  { id: 4, name: 'Harbor Trauma Center', city: 'Miami', type: 'Trauma Center', beds: 650, open: 'Emergency Medicine', status: 'open' },
  { id: 5, name: 'Valley Orthopedics', city: 'Phoenix', type: 'Specialty Hospital', beds: 200, open: 'Orthopedic Surgeon', status: 'open' },
]

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function getCompletion(user) {
  const fields = ['fullName', 'email', 'specialization', 'licenseNumber', 'yearsExperience', 'city', 'country', 'phone', 'bio']
  const filled = fields.filter(f => user[f] && String(user[f]).trim() !== '').length
  return Math.round((filled / fields.length) * 100)
}

export default function DoctorDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const completion = getCompletion(user)

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-logo">
          <div className="logo-mark">⚕</div>
          VitaLink
        </div>
        <div className="nav-right">
          <div className="nav-user">
            <div className="nav-avatar blue">{getInitials(user.fullName)}</div>
            <span className="nav-name">{user.fullName || 'Doctor'}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </nav>

      <div className="dashboard-body">
        {/* Profile Sidebar */}
        <aside>
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar blue">{getInitials(user.fullName)}</div>
              <div className="profile-name">{user.fullName || '—'}</div>
              <span className="profile-role blue">{user.specialization || 'Doctor'}</span>
            </div>

            <div className="profile-body">
              <div className="profile-field">
                <div className="profile-field-label">Email</div>
                <div className="profile-field-value">{user.email}</div>
              </div>
              {user.licenseNumber && (
                <div className="profile-field">
                  <div className="profile-field-label">License</div>
                  <div className="profile-field-value">{user.licenseNumber}</div>
                </div>
              )}
              {user.yearsExperience && (
                <div className="profile-field">
                  <div className="profile-field-label">Experience</div>
                  <div className="profile-field-value">{user.yearsExperience} years</div>
                </div>
              )}
              {user.city && (
                <div className="profile-field">
                  <div className="profile-field-label">Location</div>
                  <div className="profile-field-value">{user.city}{user.country ? `, ${user.country}` : ''}</div>
                </div>
              )}
              {user.phone && (
                <div className="profile-field">
                  <div className="profile-field-label">Phone</div>
                  <div className="profile-field-value">{user.phone}</div>
                </div>
              )}
              {user.bio && (
                <div className="profile-field">
                  <div className="profile-field-label">About</div>
                  <div className="profile-field-value" style={{ fontSize: 13, color: 'var(--slate-600)', lineHeight: 1.5 }}>
                    {user.bio}
                  </div>
                </div>
              )}
            </div>

            <div className="profile-completion">
              <div className="completion-header">
                <span className="completion-label">Profile Completion</span>
                <span className="completion-pct">{completion}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill blue" style={{ width: `${completion}%` }} />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number blue">0</div>
              <div className="stat-label">Applications Sent</div>
            </div>
            <div className="stat-card">
              <div className="stat-number blue">0</div>
              <div className="stat-label">Interviews Scheduled</div>
            </div>
            <div className="stat-card">
              <div className="stat-number blue">{SAMPLE_HOSPITALS.length}</div>
              <div className="stat-label">Open Positions</div>
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <h3>Available Hospital Positions</h3>
              <span className="badge blue">{SAMPLE_HOSPITALS.length} open</span>
            </div>
            <div className="listing-list">
              {SAMPLE_HOSPITALS.map(h => (
                <div className="listing-item" key={h.id}>
                  <div className="listing-left">
                    <div className="listing-icon blue">🏥</div>
                    <div>
                      <div className="listing-name">{h.name}</div>
                      <div className="listing-sub">{h.type} · {h.beds} beds · Looking for: <strong>{h.open}</strong></div>
                    </div>
                  </div>
                  <div className="listing-right">
                    <span className="listing-tag open">Hiring</span>
                    <span className="listing-location">📍 {h.city}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="status-bar">
              <div className="status-dot" />
              Positions updated by the VitaLink admin team
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <h3>My Applications</h3>
              <span className="badge blue">0</span>
            </div>
            <div className="empty-state">
              No applications yet. Browse open positions above and connect through the platform.
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
