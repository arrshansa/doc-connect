import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SAMPLE_DOCTORS = [
  { id: 1, name: 'Dr. Sarah Chen', specialty: 'Cardiology', experience: 12, city: 'New York', status: 'available' },
  { id: 2, name: 'Dr. Amir Hassan', specialty: 'Neurology', experience: 8, city: 'Chicago', status: 'available' },
  { id: 3, name: 'Dr. Maria Gonzalez', specialty: 'Pediatrics', experience: 15, city: 'Los Angeles', status: 'busy' },
  { id: 4, name: 'Dr. James Okafor', specialty: 'Emergency Medicine', experience: 6, city: 'Houston', status: 'available' },
  { id: 5, name: 'Dr. Priya Nair', specialty: 'Oncology', experience: 10, city: 'Boston', status: 'available' },
  { id: 6, name: 'Dr. Liu Wei', specialty: 'Orthopedics', experience: 9, city: 'Seattle', status: 'busy' },
]

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function getCompletion(user) {
  const fields = ['hospitalName', 'email', 'hospitalType', 'numberOfBeds', 'city', 'country', 'phone', 'departments', 'description']
  const filled = fields.filter(f => user[f] && String(user[f]).trim() !== '').length
  return Math.round((filled / fields.length) * 100)
}

export default function HospitalDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const completion = getCompletion(user)
  const availableCount = SAMPLE_DOCTORS.filter(d => d.status === 'available').length

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-logo">
          <div className="logo-mark">⚕</div>
          VitaLink
        </div>
        <div className="nav-right">
          <div className="nav-user">
            <div className="nav-avatar teal">{getInitials(user.hospitalName)}</div>
            <span className="nav-name">{user.hospitalName || 'Hospital'}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </nav>

      <div className="dashboard-body">
        {/* Profile Sidebar */}
        <aside>
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar teal">{getInitials(user.hospitalName)}</div>
              <div className="profile-name">{user.hospitalName || '—'}</div>
              <span className="profile-role teal">{user.hospitalType || 'Hospital'}</span>
            </div>

            <div className="profile-body">
              <div className="profile-field">
                <div className="profile-field-label">Email</div>
                <div className="profile-field-value">{user.email}</div>
              </div>
              {user.numberOfBeds && (
                <div className="profile-field">
                  <div className="profile-field-label">Capacity</div>
                  <div className="profile-field-value">{user.numberOfBeds} beds</div>
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
              {user.departments && (
                <div className="profile-field">
                  <div className="profile-field-label">Departments</div>
                  <div className="profile-field-value" style={{ fontSize: 13 }}>{user.departments}</div>
                </div>
              )}
              {user.website && (
                <div className="profile-field">
                  <div className="profile-field-label">Website</div>
                  <div className="profile-field-value" style={{ fontSize: 13 }}>{user.website}</div>
                </div>
              )}
              {user.description && (
                <div className="profile-field">
                  <div className="profile-field-label">About</div>
                  <div className="profile-field-value" style={{ fontSize: 13, color: 'var(--slate-600)', lineHeight: 1.5 }}>
                    {user.description}
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
                <div className="progress-fill teal" style={{ width: `${completion}%` }} />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number teal">0</div>
              <div className="stat-label">Positions Posted</div>
            </div>
            <div className="stat-card">
              <div className="stat-number teal">0</div>
              <div className="stat-label">Applications Received</div>
            </div>
            <div className="stat-card">
              <div className="stat-number teal">{availableCount}</div>
              <div className="stat-label">Doctors Available</div>
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <h3>Available Doctors</h3>
              <span className="badge teal">{SAMPLE_DOCTORS.length} profiles</span>
            </div>
            <div className="listing-list">
              {SAMPLE_DOCTORS.map(d => (
                <div className="listing-item" key={d.id}>
                  <div className="listing-left">
                    <div className="listing-icon teal">👨‍⚕️</div>
                    <div>
                      <div className="listing-name">{d.name}</div>
                      <div className="listing-sub">{d.specialty} · {d.experience} yrs experience</div>
                    </div>
                  </div>
                  <div className="listing-right">
                    <span className={`listing-tag ${d.status === 'available' ? 'available' : 'busy'}`}>
                      {d.status === 'available' ? 'Available' : 'Considering Offers'}
                    </span>
                    <span className="listing-location">📍 {d.city}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="status-bar">
              <div className="status-dot" />
              Doctor profiles managed by VitaLink admin — contact us to initiate a connection
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <h3>Open Positions</h3>
              <span className="badge teal">0</span>
            </div>
            <div className="empty-state">
              No positions posted yet. Contact VitaLink admin to list an open position and get matched with qualified doctors.
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
