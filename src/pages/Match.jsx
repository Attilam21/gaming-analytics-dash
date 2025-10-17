import { useState } from 'react';
import { useApp } from '../app/store';

export default function Match(){
  const addMatch = useApp(s=>s.addMatch);
  const [form,setForm] = useState({
    dataISO: new Date().toISOString(),
    risultato: '0-0',
    nostre:{ possesso:50, tiri:0, tiriInPorta:0, passAccuracy:80, gol:0 },
    loro:{ gol:0 },
    scorers: [],
    timeline: []
  });
  const [event, setEvent] = useState({ min:0, tipo:'Occasione', player:'', note:'' });
  const [scorer, setScorer] = useState('');

  function save(){
    addMatch({ id: crypto.randomUUID(), ...form });
    alert('✅ Partita salvata! Torna in Dashboard per vederla.');
  }

  return (
    <div style={{display:'grid',gap:12}}>
      <h1 style={{fontSize:24,fontWeight:700}}>Carica statistiche partita</h1>

      <label>Risultato
        <input value={form.risultato} onChange={e=>setForm({...form, risultato:e.target.value})}/>
      </label>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        <Field label="Possesso %" value={form.nostre.possesso} onChange={v=>setForm({...form, nostre:{...form.nostre, possesso:+v}})} />
        <Field label="Tiri in porta" value={form.nostre.tiriInPorta} onChange={v=>setForm({...form, nostre:{...form.nostre, tiriInPorta:+v}})} />
        <Field label="Tiri totali" value={form.nostre.tiri} onChange={v=>setForm({...form, nostre:{...form.nostre, tiri:+v}})} />
        <Field label="Passaggi %" value={form.nostre.passAccuracy} onChange={v=>setForm({...form, nostre:{...form.nostre, passAccuracy:+v}})} />
        <Field label="Gol (noi)" value={form.nostre.gol} onChange={v=>setForm({...form, nostre:{...form.nostre, gol:+v}})} />
        <Field label="Gol (loro)" value={form.loro.gol} onChange={v=>setForm({...form, loro:{...form.loro, gol:+v}})} />
      </div>

      <div style={card}>
        <b>Marcatori</b>
        <div style={{display:'flex',gap:8,marginTop:6}}>
          <input placeholder="Es. Osimhen 34'" value={scorer} onChange={e=>setScorer(e.target.value)}/>
          <button onClick={()=>{
            if(!scorer) return;
            setForm({...form, scorers:[...form.scorers, scorer]});
            setScorer('');
          }}>
            ➕ Aggiungi
          </button>
        </div>
        <ul>{form.scorers.map((s,i)=><li key={i}>{s}</li>)}</ul>
      </div>

      <div style={card}>
        <b>Timeline</b>
        <div style={{display:'flex',gap:8,marginTop:6,flexWrap:'wrap'}}>
          <input type="number" placeholder="Min" value={event.min} onChange={e=>setEvent({...event, min:+e.target.value})}/>
          <select value={event.tipo} onChange={e=>setEvent({...event, tipo:e.target.value})}>
            {['Occasione','Gol','Ammonizione','Espulsione','Parata'].map(t=><option key={t}>{t}</option>)}
          </select>
          <input placeholder="Giocatore" value={event.player} onChange={e=>setEvent({...event, player:e.target.value})}/>
          <input placeholder="Note" value={event.note} onChange={e=>setEvent({...event, note:e.target.value})}/>
          <button onClick={()=>{
            setForm({...form, timeline:[...form.timeline, event]});
            setEvent({min:0,tipo:'Occasione',player:'',note:''});
          }}>
            ➕ Aggiungi evento
          </button>
        </div>
        <ul>{form.timeline.map((e,i)=><li key={i}>{e.min}' — {e.tipo}{e.player?` (${e.player})`:''} {e.note}</li>)}</ul>
      </div>

      <button onClick={save} style={primary}>💾 Salva partita</button>
    </div>
  );
}

function Field({label,value,onChange}){
  return (
    <label>{label}
      <input value={value} onChange={e=>onChange(e.target.value)}/>
    </label>
  );
}

const card = {padding:12,border:'1px solid #222',borderRadius:12,background:'#121212'};
const primary = {padding:'8px 12px',borderRadius:10,background:'#1f6f1f',color:'#fff',border:'none'};
