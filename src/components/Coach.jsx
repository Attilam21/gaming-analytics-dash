import { useState } from 'react';
import { useApp } from '../app/store';

export default function Coach(){
  const { roster, matches } = useApp();
  const [q,setQ] = useState('');
  const [msgs,setMsgs] = useState([{role:'system',content:'Chat Coach eFootball pronta.'}]);

  function ask(){
    const ctx = {
      modulo: roster?.modulo, players: roster?.players?.length ?? 0,
      last: matches[0]?.risultato
    };
    const reply = `Analizzo il contesto: modulo ${ctx.modulo||'n/d'}, giocatori ${ctx.players}, ultimo risultato ${ctx.last||'n/d'}.\nConsiglio rapido: lavora sulle uscite dal basso e raddoppio lato forte.`;
    setMsgs(prev=>[...prev,{role:'user',content:q},{role:'assistant',content:reply}]);
    setQ('');
  }

  return (
    <div style={{display:'grid',gap:12}}>
      <h1 style={{fontSize:24,fontWeight:700}}>Chat del Coach</h1>
      <div style={{display:'grid',gap:8}}>
        <input placeholder="Fai una domanda tattica..." value={q} onChange={e=>setQ(e.target.value)}/>
        <button onClick={ask} style={primary}>Invia</button>
      </div>
      <div style={{padding:12,border:'1px solid #222',borderRadius:12,background:'#121212'}}>
        {msgs.map((m,i)=><p key={i}><b>{m.role==='user'?'Tu':'Coach'}:</b> {m.content}</p>)}
      </div>
    </div>
  );
}
const primary = {padding:'8px 12px',borderRadius:10,background:'#1f6f1f',color:'#fff',border:'none'};
