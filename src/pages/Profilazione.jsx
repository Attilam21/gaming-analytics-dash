import { useAppStore } from '../app/store'

export default function ProfilazionePage() {
  const runProfilazione = useAppStore((s) => s.runProfilazione)

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h2 className="font-semibold mb-3">Profilazione Squadra</h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Esegui la profilazione per generare insight sulla Rosa, Titolari e Riserve.
        </p>
        <button className="button" onClick={runProfilazione}>Esegui Profilazione</button>
      </div>
    </div>
  )
}
