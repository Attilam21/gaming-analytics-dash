import { useMemo, useState } from 'react'
import { useAppStore } from '../app/store'

export default function RosterPage() {
  const { roster, addPlayer, toggleTitolare, isTitolare } = useAppStore((s) => ({
    roster: s.roster,
    addPlayer: s.addPlayer,
    toggleTitolare: s.toggleTitolare,
    isTitolare: s.isTitolare,
  }))

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

  const playersSorted = useMemo(() => {
    return [...roster.players].sort((a, b) => a.number - b.number)
  }, [roster.players])

  const titolariSet = useMemo(() => new Set(roster.titolari), [roster.titolari])
  const panchinaSet = useMemo(() => new Set(roster.panchina), [roster.panchina])

  const titolariPlayers = useMemo(
    () => playersSorted.filter((p) => titolariSet.has(p.id)),
    [playersSorted, titolariSet]
  )
  const panchinaPlayers = useMemo(
    () => playersSorted.filter((p) => panchinaSet.has(p.id) && !titolariSet.has(p.id)),
    [playersSorted, panchinaSet, titolariSet]
  )

  const remainingTitolari = (roster.maxTitolari ?? 11) - roster.titolari.length

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
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Rosa</h2>
          <div className="text-sm text-[var(--muted)]">
            Titolari: {roster.titolari.length}/{roster.maxTitolari ?? 11}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">Nome</th>
                <th className="py-2 pr-4">Ruolo</th>
                <th className="py-2 pr-4">Stato</th>
                <th className="py-2 pr-4">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {playersSorted.map((p) => (
                <tr key={p.id} className="border-t border-[#222]">
                  <td className="py-2 pr-4">{p.number}</td>
                  <td className="py-2 pr-4">{p.name}</td>
                  <td className="py-2 pr-4">{p.position}</td>
                  <td className="py-2 pr-4">
                    {isTitolare(p.id) ? (
                      <span className="text-green-400">Titolare</span>
                    ) : (
                      <span className="text-[var(--muted)]">Riserva</span>
                    )}
                  </td>
                  <td className="py-2 pr-4">
                    <button
                      className="button"
                      onClick={() => toggleTitolare(p.id)}
                      disabled={!isTitolare(p.id) && remainingTitolari <= 0}
                      title={!isTitolare(p.id) && remainingTitolari <= 0 ? 'Limite titolari raggiunto' : 'Toggle titolare'}
                    >
                      {isTitolare(p.id) ? 'Rimuovi dai Titolari' : 'Rendi Titolare'}
                    </button>
                  </td>
                </tr>
              ))}
              {roster.players.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-[var(--muted)]">Nessun giocatore inserito</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <h2 className="font-semibold mb-3">Titolari</h2>
          <ul className="divide-y divide-[#222]">
            {titolariPlayers.map((p) => (
              <li key={p.id} className="py-2 flex items-center justify-between">
                <span>#{p.number} {p.name} - {p.position}</span>
                <button className="button" onClick={() => toggleTitolare(p.id)}>Rendi Riserva</button>
              </li>
            ))}
            {titolariPlayers.length === 0 && (
              <li className="py-2 text-[var(--muted)]">Nessun titolare selezionato</li>
            )}
          </ul>
        </div>
        <div className="card p-4">
          <h2 className="font-semibold mb-3">Riserve</h2>
          <ul className="divide-y divide-[#222]">
            {panchinaPlayers.map((p) => (
              <li key={p.id} className="py-2 flex items-center justify-between">
                <span>#{p.number} {p.name} - {p.position}</span>
                <button
                  className="button"
                  onClick={() => toggleTitolare(p.id)}
                  disabled={remainingTitolari <= 0}
                >
                  Rendi Titolare
                </button>
              </li>
            ))}
            {panchinaPlayers.length === 0 && (
              <li className="py-2 text-[var(--muted)]">Nessuna riserva</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
