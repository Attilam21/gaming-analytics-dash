import { useMemo } from 'react'
import { useAppStore } from '../app/store'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, BarElement } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, BarElement)

export default function DashboardPage() {
  const { auth, roster, matches } = useAppStore((s) => ({ auth: s.auth, roster: s.roster, matches: s.matches }))

  const summary = useMemo(() => {
    const numPlayers = roster.players.length
    const numMatches = matches.length
    const goalsFor = matches.reduce((sum, m) => sum + (m.goalsFor || 0), 0)
    const goalsAgainst = matches.reduce((sum, m) => sum + (m.goalsAgainst || 0), 0)
    const goalDiff = goalsFor - goalsAgainst
    return { numPlayers, numMatches, goalsFor, goalsAgainst, goalDiff }
  }, [roster.players, matches])

  const trendData = useMemo(() => {
    const labels = matches.map((m) => m.date)
    return {
      labels,
      datasets: [
        {
          label: 'Gol Fatti',
          data: matches.map((m) => m.goalsFor || 0),
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34,197,94,0.2)'
        },
        {
          label: 'Gol Subiti',
          data: matches.map((m) => m.goalsAgainst || 0),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,0.2)'
        },
      ],
    }
  }, [matches])

  const rosterByPosition = useMemo(() => {
    const counts = matches.length // dummy to keep deps simple
    void counts
    const groups = { P: 0, D: 0, C: 0, A: 0 }
    for (const p of roster.players) {
      if (p.position?.startsWith('P')) groups.P++
      else if (p.position?.startsWith('D')) groups.D++
      else if (p.position?.startsWith('C')) groups.C++
      else groups.A++
    }
    return {
      labels: ['Portieri', 'Difensori', 'Centrocampisti', 'Attaccanti'],
      datasets: [{
        label: 'Conteggio',
        data: [groups.P, groups.D, groups.C, groups.A],
        backgroundColor: ['#38bdf8', '#22c55e', '#f59e0b', '#ef4444']
      }]
    }
  }, [roster.players])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Benvenuto, {auth.user}</h1>
          <p className="text-[var(--muted)] text-sm">Ruolo: {auth.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card p-4">
          <div className="text-sm text-[var(--muted)]">Giocatori</div>
          <div className="text-2xl font-semibold">{summary.numPlayers}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-[var(--muted)]">Partite</div>
          <div className="text-2xl font-semibold">{summary.numMatches}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-[var(--muted)]">Gol Fatti</div>
          <div className="text-2xl font-semibold">{summary.goalsFor}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-[var(--muted)]">Gol Subiti</div>
          <div className="text-2xl font-semibold">{summary.goalsAgainst}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-[var(--muted)]">Differenza Reti</div>
          <div className="text-2xl font-semibold">{summary.goalDiff}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Andamento Gol</h2>
          </div>
          <Line
            data={trendData}
            options={{
              responsive: true,
              plugins: {
                legend: { labels: { color: '#e5e7eb' } },
              },
              scales: {
                x: { ticks: { color: '#9ca3af' }, grid: { color: '#222' } },
                y: { ticks: { color: '#9ca3af' }, grid: { color: '#222' } },
              },
            }}
          />
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Rosa per Ruolo</h2>
          </div>
          <Bar
            data={rosterByPosition}
            options={{
              responsive: true,
              plugins: { legend: { labels: { color: '#e5e7eb' } } },
              scales: {
                x: { ticks: { color: '#9ca3af' }, grid: { color: '#222' } },
                y: { ticks: { color: '#9ca3af' }, grid: { color: '#222' } },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
