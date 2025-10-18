import { useState } from 'react'
import { useAppStore } from '../app/store'

export default function RosterPage() {
  const { roster, addPlayer } = useAppStore((s) => ({ roster: s.roster, addPlayer: s.addPlayer }))

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [position, setPosition] = useState('P')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!name.trim() || !number) return
    addPlayer({ id: crypto.randomUUID(), name: name.trim(), number: Number(number), position, skills: [] })
    setName('')
    setNumber('')
    setPosition('P')
  }

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h2 className="font-semibold mb-3">Aggiungi Giocatore</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            className="bg-transparent border border-[var(--border)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Numero"
            className="bg-transparent border border-[var(--border)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="bg-transparent border border-[var(--border)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)]"
          >
            <option value="P">P - Portiere</option>
            <option value="D">D - Difensore</option>
            <option value="C">C - Centrocampista</option>
            <option value="A">A - Attaccante</option>
          </select>
          <button type="submit" className="button">Aggiungi</button>
        </form>
      </div>

      <div className="card p-4">
        <h2 className="font-semibold mb-3">Rosa</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">Nome</th>
                <th className="py-2 pr-4">Ruolo</th>
              </tr>
            </thead>
            <tbody>
              {roster.players.map((p) => (
                <tr key={p.id} className="border-t border-[#222]">
                  <td className="py-2 pr-4">{p.number}</td>
                  <td className="py-2 pr-4">{p.name}</td>
                  <td className="py-2 pr-4">{p.position}</td>
                </tr>
              ))}
              {roster.players.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-[var(--muted)]">Nessun giocatore inserito</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
