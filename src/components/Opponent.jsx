import { useState } from 'react';
import { useApp } from '../app/store';

export default function Opponent(){
  const addOpponent = useApp(s=>s.addOpponent);
  const [modulo,setModulo] = useState('4-3-3');
  const [note,setNote] = useState('');
  function save(){
    addOpponent({ id:crypto.randomUUID(), modulo, slots:[], contromisure: note? [note] : [] });
    alert('Formazione avversaria salvata.');
  }
  return (
    <div style={{display:'grid',gap:12}}>
      <h1 style={{fontSize:24,fontWeight:700}}>Formazione avversaria</h1>
      <label>Modulo
        <select value={modulo} onChange={e=>setModulo(e.target.value)}>
          {['4-3-3','4-2-3-1','3-5-2','5-3-2'].map(m=><option key={m}>{m}</option>)}
        </select>
      </label>
      <label>Contromisure rapide
        <input placeholder="Es. raddoppio su ED, uscita CDC in pressione" value={note} onChange={e=>setNote(e.target.value)}/>
      </label>
      <button onClick={save} style={primary}>Salva</button>
    </div>
  );
}
const primary = {padding:'8px 12px',borderRadius:10,background:'#1f6f1f',color:'#fff',border:'none'};
