import './App.css'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAppStore } from './app/store'
import TopBar from './components/TopBar'
import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'
import RosterPage from './pages/Roster'
import MatchPage from './pages/Match'
import RatingsPage from './pages/Ratings'
import OpponentPage from './pages/Opponent'
import ProfilazionePage from './pages/Profilazione'
import CoachPage from './pages/Coach'

function App() {
  const auth = useAppStore((s) => s.auth)

  const RequireAuth = () => {
    return auth.user ? <Outlet /> : <Navigate to="/login" replace />
  }

  const RedirectRoot = () => {
    if (!auth.user) return <Navigate to="/login" replace />
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="container py-6">
        <Routes>
          <Route path="/" element={<RedirectRoot />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/roster" element={<RosterPage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/ratings" element={<RatingsPage />} />
            <Route path="/opponent" element={<OpponentPage />} />
            <Route path="/coach" element={<CoachPage />} />
            <Route path="/profilazione" element={<ProfilazionePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
