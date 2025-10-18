import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../app/store'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAppStore((s) => s.login)

  const [username, setUsername] = useState('')
  const [role, setRole] = useState('coach')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Inserisci un nome utente')
      return
    }
    setError('')
    login(username.trim(), role)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="card w-full max-w-md p-6">
        <h1 className="text-xl font-semibold mb-1">Accedi</h1>
        <p className="text-sm text-[var(--muted)] mb-6">Inserisci utente e ruolo per continuare</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nome utente</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border border-[var(--border)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)]"
              placeholder="es. mister-rossi"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Ruolo</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-transparent border border-[var(--border)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)]"
            >
              <option value="coach">Coach</option>
              <option value="player">Giocatore</option>
            </select>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button type="submit" className="button w-full">Entra</button>
        </form>
      </div>
    </div>
  )
}
