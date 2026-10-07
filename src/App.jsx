import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import DoctorAuth from './pages/DoctorAuth'
import HospitalAuth from './pages/HospitalAuth'
import DoctorDashboard from './pages/DoctorDashboard'
import HospitalDashboard from './pages/HospitalDashboard'

function ProtectedRoute({ children, userType }) {
  const { user } = useAuth()
  if (!user || user.type !== userType) {
    return <Navigate to="/" replace />
  }
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/doctor/auth" element={<DoctorAuth />} />
      <Route path="/hospital/auth" element={<HospitalAuth />} />
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute userType="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hospital/dashboard"
        element={
          <ProtectedRoute userType="hospital">
            <HospitalDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}
