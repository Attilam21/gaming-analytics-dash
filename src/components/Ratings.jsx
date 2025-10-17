import { useEffect, useState } from 'react';
import { useApp } from '../app/store';

export default function Ratings(){
  const { roster, addTask } = useApp();
  const [votes, setVotes] = useState({}); // {playerId: 6.5}

  useEffect(()=>{ if(!roster) alert('Prima carica la Rosa.'); }, [roster]);

  function save(){
    // qui potresti calcolare media/suggerimenti -> creo un task d’esempio
    addTask({ id:crypto.randomUUID(), titolo:'Migliora coperture centrocampo (media CC < 6.2)', priorita:'media', done:false });
    alert('Pagelle salvate (task coach creato).');
  }

  if(!roster) return <p>Carica prima la Rosa.</p>;

  return (
    <div style={{display:'grid',gap:12}}>
      <h1 style={{fontSize:24,fontWeight:700}}>Pagelle giocatori</h1>
      <ul style={{display:'grid',gap:8,gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'}}>
        {roster.players.map(p=>(
          <li key={p.id} style={{padding:12,border:'1px solid #222',borderRadius:12,background:'#121212'}}>
            {p.nome} ({p.ruoloNaturale}) — OVR {p.ovr}
            <div style={{marginTop:6}}>
              <input type="number" step="0.1" min="4" max="10"
                placeholder="Voto"
                value={votes[p.id] ?? ''}
                onChange={e=>setVotes({...votes, [p.id]: +e.target.value})}/>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={save} style={primary}>Salva pagelle</button>
    </div>
  );
}
const primary = {padding:'8px 12px',borderRadius:10,background:'#1f6f1f',color:'#fff',border:'none'};
