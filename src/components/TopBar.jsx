import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '../app/store'

export default function TopBar() {
  const { auth, logout } = useAppStore((s) => ({ auth: s.auth, logout: s.logout }))
  const location = useLocation()

  if (!auth.user) return null

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md hover:bg-[#1a1a1a] ${location.pathname === to ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}
    >
      {children}
    </Link>
  )

  return (
    <div className="border-b border-[#222] sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur">
      <div className="container flex items-center justify-between h-14">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-[var(--accent)]">eFootballLab</span>
          <span className="text-xs text-[var(--muted)]">{auth.role}</span>
        </div>
        <nav className="flex items-center gap-1">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/roster">Rosa</NavLink>
          <NavLink to="/match">Partita</NavLink>
          <NavLink to="/ratings">Pagelle</NavLink>
          <NavLink to="/opponent">Avversario</NavLink>
          <NavLink to="/coach">Coach</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <button className="button" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  )
}
