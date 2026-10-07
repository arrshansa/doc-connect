import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LandingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) navigate(user.type === 'doctor' ? '/doctor/dashboard' : '/hospital/dashboard')
  }, [user, navigate])

  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="logo">
          <div className="logo-mark">⚕</div>
          VitaLink
        </div>
      </nav>

      <main className="landing-main">
        <div className="hero-text">
          <h1>Healthcare Connections,<br /><span>Reimagined</span></h1>
          <p>
            The platform bridging the gap between exceptional doctors and
            forward-thinking hospitals — building stronger healthcare networks
            across every city.
          </p>
        </div>

        <div className="auth-cards">
          <div className="auth-card doctor-card">
            <div className="card-icon">👨‍⚕️</div>
            <h2>I'm a Doctor</h2>
            <p>
              Find the right hospital that matches your expertise, specialty,
              and career goals.
            </p>
            <div className="card-actions">
              <button
                className="btn-primary"
                onClick={() => navigate('/doctor/auth?mode=signup')}
              >
                Sign Up
              </button>
              <button
                className="btn-outline"
                onClick={() => navigate('/doctor/auth?mode=login')}
              >
                Log In
              </button>
            </div>
          </div>

          <div className="auth-card hospital-card">
            <div className="card-icon">🏥</div>
            <h2>I'm a Hospital</h2>
            <p>
              Connect with qualified, vetted doctors to build and expand your
              medical team efficiently.
            </p>
            <div className="card-actions">
              <button
                className="btn-primary teal"
                onClick={() => navigate('/hospital/auth?mode=signup')}
              >
                Sign Up
              </button>
              <button
                className="btn-outline"
                onClick={() => navigate('/hospital/auth?mode=login')}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
