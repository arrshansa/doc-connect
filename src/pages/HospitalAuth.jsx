import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const HOSPITAL_TYPES = [
  'General Hospital', 'Teaching Hospital', 'Specialty Hospital',
  'Children\'s Hospital', 'Rehabilitation Center', 'Psychiatric Hospital',
  'Trauma Center', 'Community Hospital', 'Private Clinic',
]

export default function HospitalAuth() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { loginWithCredentials, register } = useAuth()

  const [mode, setMode] = useState(params.get('mode') === 'login' ? 'login' : 'signup')
  const [error, setError] = useState('')

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({
    hospitalName: '', email: '', password: '', confirmPassword: '',
    hospitalType: '', numberOfBeds: '', city: '', country: '', phone: '',
    departments: '', description: '', website: '',
  })

  useEffect(() => { setError('') }, [mode])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    const result = loginWithCredentials(loginForm.email, loginForm.password, 'hospital')
    if (result.success) {
      navigate('/hospital/dashboard')
    } else {
      setError(result.error)
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    setError('')
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (signupForm.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    const result = register({ ...signupForm, type: 'hospital' })
    if (result.success) {
      navigate('/hospital/dashboard')
    } else {
      setError(result.error)
    }
  }

  const setLogin = (k, v) => setLoginForm(f => ({ ...f, [k]: v }))
  const setSignup = (k, v) => setSignupForm(f => ({ ...f, [k]: v }))

  return (
    <div className="auth-page">
      <div className="auth-side hospital-side">
        <div className="side-logo" onClick={() => navigate('/')}>
          <div className="logo-mark">⚕</div>
          VitaLink
        </div>
        <div className="side-content">
          <h2>Build Your Medical Team</h2>
          <p>
            Connect with qualified, experienced doctors ready to join your
            hospital's growing team.
          </p>
        </div>
        <div className="side-features">
          <div className="side-feature"><div className="feature-dot" />Browse verified doctor profiles</div>
          <div className="side-feature"><div className="feature-dot" />Post open positions</div>
          <div className="side-feature"><div className="feature-dot" />Streamlined hiring process</div>
          <div className="side-feature"><div className="feature-dot" />Admin-facilitated matching</div>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => setMode('signup')}
            >
              Register Hospital
            </button>
            <button
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => setMode('login')}
            >
              Log In
            </button>
          </div>

          {error && <div className="error-msg">{error}</div>}

          {mode === 'login' ? (
            <>
              <h1>Welcome back</h1>
              <p>Log in to your hospital account</p>
              <form onSubmit={handleLogin}>
                <div className="field teal">
                  <label>Email Address</label>
                  <input
                    type="email" required placeholder="admin@hospital.com"
                    value={loginForm.email}
                    onChange={e => setLogin('email', e.target.value)}
                  />
                </div>
                <div className="field teal">
                  <label>Password</label>
                  <input
                    type="password" required placeholder="••••••••"
                    value={loginForm.password}
                    onChange={e => setLogin('password', e.target.value)}
                  />
                </div>
                <button type="submit" className="submit-btn teal-btn">Log In →</button>
              </form>
            </>
          ) : (
            <>
              <h1>Register Your Hospital</h1>
              <p>Create a free hospital account to find doctors</p>
              <form onSubmit={handleSignup}>
                <div className="section-label">Hospital Info</div>
                <div className="form-grid">
                  <div className="field field-full teal">
                    <label>Hospital Name</label>
                    <input
                      type="text" required placeholder="City General Hospital"
                      value={signupForm.hospitalName}
                      onChange={e => setSignup('hospitalName', e.target.value)}
                    />
                  </div>
                  <div className="field field-full teal">
                    <label>Hospital Type</label>
                    <select
                      required value={signupForm.hospitalType}
                      onChange={e => setSignup('hospitalType', e.target.value)}
                    >
                      <option value="">Select type</option>
                      {HOSPITAL_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="field teal">
                    <label>Number of Beds</label>
                    <input
                      type="number" required min="1" placeholder="e.g. 500"
                      value={signupForm.numberOfBeds}
                      onChange={e => setSignup('numberOfBeds', e.target.value)}
                    />
                  </div>
                  <div className="field teal">
                    <label>Phone Number</label>
                    <input
                      type="tel" placeholder="+1 (555) 000-0000"
                      value={signupForm.phone}
                      onChange={e => setSignup('phone', e.target.value)}
                    />
                  </div>
                  <div className="field field-full teal">
                    <label>Departments / Specialties</label>
                    <input
                      type="text" required placeholder="Cardiology, Neurology, Pediatrics..."
                      value={signupForm.departments}
                      onChange={e => setSignup('departments', e.target.value)}
                    />
                  </div>
                </div>

                <div className="section-label">Account Credentials</div>
                <div className="form-grid">
                  <div className="field field-full teal">
                    <label>Admin Email Address</label>
                    <input
                      type="email" required placeholder="admin@hospital.com"
                      value={signupForm.email}
                      onChange={e => setSignup('email', e.target.value)}
                    />
                  </div>
                  <div className="field teal">
                    <label>Password</label>
                    <input
                      type="password" required placeholder="Min. 6 characters"
                      value={signupForm.password}
                      onChange={e => setSignup('password', e.target.value)}
                    />
                  </div>
                  <div className="field teal">
                    <label>Confirm Password</label>
                    <input
                      type="password" required placeholder="••••••••"
                      value={signupForm.confirmPassword}
                      onChange={e => setSignup('confirmPassword', e.target.value)}
                    />
                  </div>
                </div>

                <div className="section-label">Location & Details</div>
                <div className="form-grid">
                  <div className="field teal">
                    <label>City</label>
                    <input
                      type="text" required placeholder="Chicago"
                      value={signupForm.city}
                      onChange={e => setSignup('city', e.target.value)}
                    />
                  </div>
                  <div className="field teal">
                    <label>Country</label>
                    <input
                      type="text" required placeholder="United States"
                      value={signupForm.country}
                      onChange={e => setSignup('country', e.target.value)}
                    />
                  </div>
                  <div className="field field-full teal">
                    <label>Website (optional)</label>
                    <input
                      type="url" placeholder="https://www.hospital.com"
                      value={signupForm.website}
                      onChange={e => setSignup('website', e.target.value)}
                    />
                  </div>
                  <div className="field field-full teal">
                    <label>About the Hospital</label>
                    <textarea
                      placeholder="Brief description of your hospital, mission, and the types of doctors you're looking for..."
                      value={signupForm.description}
                      onChange={e => setSignup('description', e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="submit-btn teal-btn">Register Hospital →</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
