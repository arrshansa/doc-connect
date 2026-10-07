import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SPECIALIZATIONS = [
  'Cardiology', 'Dermatology', 'Emergency Medicine', 'Endocrinology',
  'Gastroenterology', 'General Practice', 'Neurology', 'Obstetrics & Gynecology',
  'Oncology', 'Ophthalmology', 'Orthopedics', 'Pediatrics',
  'Psychiatry', 'Pulmonology', 'Radiology', 'Surgery', 'Urology',
]

export default function DoctorAuth() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { loginWithCredentials, register } = useAuth()

  const [mode, setMode] = useState(params.get('mode') === 'login' ? 'login' : 'signup')
  const [error, setError] = useState('')

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
    specialization: '', licenseNumber: '', yearsExperience: '',
    city: '', country: '', phone: '', bio: '',
  })

  useEffect(() => { setError('') }, [mode])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    const result = loginWithCredentials(loginForm.email, loginForm.password, 'doctor')
    if (result.success) {
      navigate('/doctor/dashboard')
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
    const result = register({ ...signupForm, type: 'doctor' })
    if (result.success) {
      navigate('/doctor/dashboard')
    } else {
      setError(result.error)
    }
  }

  const setLogin = (k, v) => setLoginForm(f => ({ ...f, [k]: v }))
  const setSignup = (k, v) => setSignupForm(f => ({ ...f, [k]: v }))

  return (
    <div className="auth-page">
      <div className="auth-side doctor-side">
        <div className="side-logo" onClick={() => navigate('/')}>
          <div className="logo-mark">⚕</div>
          VitaLink
        </div>
        <div className="side-content">
          <h2>Find Your Perfect Hospital</h2>
          <p>
            Join thousands of doctors who've found their ideal position through
            VitaLink's smart matching system.
          </p>
        </div>
        <div className="side-features">
          <div className="side-feature"><div className="feature-dot" />Smart hospital matching</div>
          <div className="side-feature"><div className="feature-dot" />Verified opportunities</div>
          <div className="side-feature"><div className="feature-dot" />Transparent compensation info</div>
          <div className="side-feature"><div className="feature-dot" />Admin-facilitated connections</div>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => setMode('signup')}
            >
              Create Account
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
              <p>Log in to your doctor account</p>
              <form onSubmit={handleLogin}>
                <div className="field">
                  <label>Email Address</label>
                  <input
                    type="email" required placeholder="you@example.com"
                    value={loginForm.email}
                    onChange={e => setLogin('email', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input
                    type="password" required placeholder="••••••••"
                    value={loginForm.password}
                    onChange={e => setLogin('password', e.target.value)}
                  />
                </div>
                <button type="submit" className="submit-btn blue">Log In →</button>
              </form>
            </>
          ) : (
            <>
              <h1>Join as a Doctor</h1>
              <p>Create your free doctor profile</p>
              <form onSubmit={handleSignup}>
                <div className="section-label">Personal Info</div>
                <div className="form-grid">
                  <div className="field field-full">
                    <label>Full Name</label>
                    <input
                      type="text" required placeholder="Dr. Jane Smith"
                      value={signupForm.fullName}
                      onChange={e => setSignup('fullName', e.target.value)}
                    />
                  </div>
                  <div className="field field-full">
                    <label>Email Address</label>
                    <input
                      type="email" required placeholder="you@example.com"
                      value={signupForm.email}
                      onChange={e => setSignup('email', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <input
                      type="password" required placeholder="Min. 6 characters"
                      value={signupForm.password}
                      onChange={e => setSignup('password', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Confirm Password</label>
                    <input
                      type="password" required placeholder="••••••••"
                      value={signupForm.confirmPassword}
                      onChange={e => setSignup('confirmPassword', e.target.value)}
                    />
                  </div>
                </div>

                <div className="section-label">Professional Info</div>
                <div className="form-grid">
                  <div className="field field-full">
                    <label>Specialization</label>
                    <select
                      required value={signupForm.specialization}
                      onChange={e => setSignup('specialization', e.target.value)}
                    >
                      <option value="">Select specialization</option>
                      {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>License Number</label>
                    <input
                      type="text" required placeholder="ML-2024-XXXX"
                      value={signupForm.licenseNumber}
                      onChange={e => setSignup('licenseNumber', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Years of Experience</label>
                    <input
                      type="number" required min="0" max="60" placeholder="e.g. 8"
                      value={signupForm.yearsExperience}
                      onChange={e => setSignup('yearsExperience', e.target.value)}
                    />
                  </div>
                </div>

                <div className="section-label">Location & Contact</div>
                <div className="form-grid">
                  <div className="field">
                    <label>City</label>
                    <input
                      type="text" required placeholder="New York"
                      value={signupForm.city}
                      onChange={e => setSignup('city', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Country</label>
                    <input
                      type="text" required placeholder="United States"
                      value={signupForm.country}
                      onChange={e => setSignup('country', e.target.value)}
                    />
                  </div>
                  <div className="field field-full">
                    <label>Phone Number</label>
                    <input
                      type="tel" placeholder="+1 (555) 000-0000"
                      value={signupForm.phone}
                      onChange={e => setSignup('phone', e.target.value)}
                    />
                  </div>
                  <div className="field field-full">
                    <label>Bio / About</label>
                    <textarea
                      placeholder="Briefly describe your medical background and expertise..."
                      value={signupForm.bio}
                      onChange={e => setSignup('bio', e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="submit-btn blue">Create Doctor Account →</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
