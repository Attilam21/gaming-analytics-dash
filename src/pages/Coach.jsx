import { useState } from 'react'
import { useAppStore } from '../app/store'

export default function CoachPage() {
  const { tasks, addTask } = useAppStore((s) => ({ tasks: s.tasks, addTask: s.addTask }))
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask({ id: crypto.randomUUID(), title: title.trim(), description: description.trim(), status: 'open' })
    setTitle('')
    setDescription('')
  }

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h2 className="font-semibold mb-3">Aggiungi Task</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-6 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titolo"
            className="sm:col-span-2 bg-transparent border border-[var(--border)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrizione"
            className="sm:col-span-3 bg-transparent border border-[var(--border)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
          <button type="submit" className="button">Aggiungi</button>
        </form>
      </div>

      <div className="card p-4">
        <h2 className="font-semibold mb-3">Task</h2>
        <ul className="divide-y divide-[#222]">
          {tasks.map((t) => (
            <li key={t.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{t.title}</div>
                {t.description && <div className="text-sm text-[var(--muted)]">{t.description}</div>}
              </div>
              <span className="text-xs px-2 py-1 rounded bg-[#1f2937]">{t.status}</span>
            </li>
          ))}
          {tasks.length === 0 && (
            <li className="py-3 text-[var(--muted)]">Nessun task</li>
          )}
        </ul>
      </div>
    </div>
  )
}
