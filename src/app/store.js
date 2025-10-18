import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(persist((set, get) => ({
  auth: { user: null, role: null },
  roster: { modulo: '4-3-3', players: [], titolari: [], panchina: [] },
  matches: [],
  tasks: [],

  login: (user, role) => set({ auth: { user, role } }),
  logout: () => set({ auth: { user: null, role: null } }),

  setRoster: (roster) => set({ roster }),
  addPlayer: (player) => set({ roster: { ...get().roster, players: [...get().roster.players, player] } }),
  addMatch: (match) => set({ matches: [...get().matches, match] }),
  addTask: (task) => set({ tasks: [...get().tasks, task] }),

  runProfilazione: () => {
    // stub: implementare logica di profilazione in seguito
  },
}), { name: 'efootballlab-store' }))
