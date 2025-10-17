import { useState } from 'react';
import { useApp } from '../app/store';

export default function Roster(){
  const setRoster = useApp(s=>s.setRoster);
  const roster = useApp(s=>s.roster);
  const [players, setPlayers] = useState(roster?.players ?? []);
  const [modulo, setModulo] = useState(roster?.modulo ?? '4-2-3-1');

  function addPlayer(){
    const nome = prompt('Nome giocatore?'); 
    if(!nome) return;
    const nuovo = {
      id: crypto.randomUUID(),
      nome,
      ruoloNaturale: 'CF',
      ovr: 80,
      build: 'Standard',
      skill: ['Finalizzazione'],
      piede: 'Dx'
    };
    setPlayers(prev=>[...prev, nuovo]);
  }

  function save(){
    const r = {
      modulo,
      titolari: [],
      panchina: [],
      players,
      updatedAt: new Date().toISOString()
    };
    setRoster(r);
    alert('Rosa salvata!');
  }

  return (
    <div style={{display:'grid', gap:16}}>
      <h1 style={{fontSize:24, fontWeight:600}}>Rosa • Inserimento rapido</h1>

      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <label>Modulo</label>
        <select value={modulo} onChange={e=>setModulo(e.target.value)}>
          {['4-2-3-1','4-3-3','3-5-2','5-3-2'].map(m=><option key={m}>{m}</option>)}
        </select>
        <button onClick={addPlayer}>Aggiungi giocatore</button>
        <button onClick={save} style={{background:'#1f6f1f', color:'#fff', border:'none', padding:'6px 10px', borderRadius:8}}>
          Salva Rosa
        </button>
      </div>

      <ul style={{display:'grid', gap:8, gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))'}}>
        {players.map(p=>(
          <li key={p.id} style={{padding:12, borderRadius:12, background:'#121212'}}>
            {p.nome} • {p.ruoloNaturale} • OVR {p.ovr} • {p.build}
          </li>
        ))}
      </ul>
    </div>
  );
}
