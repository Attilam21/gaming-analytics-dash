import { create } from 'zustand';
import { produce } from 'immer';

const KEY = 'efootball-v1';

export const useApp = create((set, get) => ({
  roster: null,
  matches: [],
  opponents: [],
  tasks: [],

  loadFromLocal: () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      set(data);
    } catch {}
  },

  saveToLocal: () => {
    const { roster, matches, opponents, tasks } = get();
    localStorage.setItem(KEY, JSON.stringify({ roster, matches, opponents, tasks }));
  },

  setRoster: (r) => set(produce((s) => { s.roster = r; })),
  addMatch: (m) => set(produce((s) => { s.matches.unshift(m); })),
  addOpponent: (o) => set(produce((s) => { s.opponents.unshift(o); })),
  addTask: (t) => set(produce((s) => { s.tasks.unshift(t); })),
  toggleTask: (id) => set(produce((s) => {
    const t = s.tasks.find(x => x.id === id);
    if (t) t.done = !t.done;
  })),
}));

// Salva ogni volta che cambia qualcosa
useApp.subscribe((state) => {
  const { roster, matches, opponents, tasks } = state;
  localStorage.setItem(KEY, JSON.stringify({ roster, matches, opponents, tasks }));
});
