import { useState } from 'react'
import { useAppStore } from '../app/store'

export default function MatchPage() {
  const { matches, addMatch } = useAppStore((s) => ({ matches: s.matches, addMatch: s.addMatch }))

  const [date, setDate] = useState('')
  const [opponent, setOpponent] = useState('')
  const [goalsFor, setGoalsFor] = useState('')
  const [goalsAgainst, setGoalsAgainst] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!date || !opponent.trim()) return
    addMatch({ id: crypto.randomUUID(), date, opponent: opponent.trim(), goalsFor: Number(goalsFor || 0), goalsAgainst: Number(goalsAgainst || 0) })
    setDate('')
    setOpponent('')
    setGoalsFor('')
    setGoalsAgainst('')
  }

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h2 className="font-semibold mb-3">Registra Partita</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-6 gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent border border-[var(--border)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
          <input
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            placeholder="Avversario"
            className="bg-transparent border border-[var(--border)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
          <input
            type="number"
            min="0"
            value={goalsFor}
            onChange={(e) => setGoalsFor(e.target.value)}
            placeholder="Gol Fatti"
            className="bg-transparent border border-[var(--border)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
          <input
            type="number"
            min="0"
            value={goalsAgainst}
            onChange={(e) => setGoalsAgainst(e.target.value)}
            placeholder="Gol Subiti"
            className="bg-transparent border border-[var(--border)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
          <button type="submit" className="button">Aggiungi</button>
        </form>
      </div>

      <div className="card p-4">
        <h2 className="font-semibold mb-3">Storico Partite</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="py-2 pr-4">Data</th>
                <th className="py-2 pr-4">Avversario</th>
                <th className="py-2 pr-4">Risultato</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => (
                <tr key={m.id} className="border-t border-[#222]">
                  <td className="py-2 pr-4">{m.date}</td>
                  <td className="py-2 pr-4">{m.opponent}</td>
                  <td className="py-2 pr-4">{m.goalsFor}-{m.goalsAgainst}</td>
                </tr>
              ))}
              {matches.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-[var(--muted)]">Nessuna partita registrata</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
