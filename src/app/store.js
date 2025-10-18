import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set, get) => ({
      auth: { user: null, role: null },
      roster: {
        modulo: '4-3-3',
        players: [],
        titolari: [], // array di playerId
        panchina: [], // array di playerId
        maxTitolari: 11,
      },
      matches: [],
      tasks: [],

      login: (user, role) => set({ auth: { user, role } }),
      logout: () => set({ auth: { user: null, role: null } }),

      setRoster: (roster) => set({ roster }),
      addPlayer: (player) => {
        const current = get().roster
        const nextPlayers = [...current.players, player]
        // Nuovi giocatori iniziano come riserve (panchina)
        const nextPanchina = current.panchina.includes(player.id)
          ? current.panchina
          : [...current.panchina, player.id]
        set({ roster: { ...current, players: nextPlayers, panchina: nextPanchina } })
      },
      addMatch: (match) => set({ matches: [...get().matches, match] }),
      addTask: (task) => set({ tasks: [...get().tasks, task] }),

      toggleTitolare: (playerId) => {
        const current = get().roster
        const isTitolare = current.titolari.includes(playerId)
        if (isTitolare) {
          // Sposta in panchina
          const nextTitolari = current.titolari.filter((id) => id !== playerId)
          const nextPanchina = current.panchina.includes(playerId)
            ? current.panchina
            : [...current.panchina, playerId]
          set({ roster: { ...current, titolari: nextTitolari, panchina: nextPanchina } })
          return true
        }

        // Se non è titolare, prova a promuoverlo se c'è spazio
        if (current.titolari.length >= (current.maxTitolari ?? 11)) {
          return false
        }

        const nextTitolari = [...current.titolari, playerId]
        const nextPanchina = current.panchina.filter((id) => id !== playerId)
        set({ roster: { ...current, titolari: nextTitolari, panchina: nextPanchina } })
        return true
      },

      isTitolare: (playerId) => get().roster.titolari.includes(playerId),

      runProfilazione: () => {
        // stub: implementare logica di profilazione in seguito
      },
    }),
    { name: 'efootballlab-store' }
  )
)
