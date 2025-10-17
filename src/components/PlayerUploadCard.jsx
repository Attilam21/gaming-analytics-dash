import { useRef } from 'react';
import { useApp } from '../app/store';

export default function PlayerUploadCard({ player }){
  const { roster, setRoster } = useApp();
  const inputs = [useRef(), useRef(), useRef()];
  const images = player.images || [];

  async function onPick(e, idx){
    const file = e.target.files?.[0]; if(!file) return;
    const b64 = await toBase64(file);
    const r = structuredClone(roster);
    const p = r.players.find(p=>p.id===player.id);
    if(!p.images) p.images = [];
    p.images[idx] = b64; // salva nello slot 0..2
    setRoster(r);
  }

  function remove(idx){
    const r = structuredClone(roster);
    const p = r.players.find(p=>p.id===player.id);
    if(!p?.images) return;
    p.images[idx] = undefined;
    setRoster(r);
  }

  const filled = images.filter(Boolean).length;
  const ok = filled === 3;

  return (
    <div style={card}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
        <div><b>{player.nome}</b> • {player.ruoloNaturale} • OVR {player.ovr}</div>
        <div style={{fontSize:12,opacity:.8}}>{filled}/3 foto {ok ? '✅' : '⚠️'}</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
        {['Profilo','Abilità','Booster'].map((label,i)=>(
          <div key={i} style={slot}>
            {images[i] ? (
              <div style={{position:'relative',width:'100%'}}>
                <img src={images[i]} alt={label} style={{width:'100%',height:120,objectFit:'cover',borderRadius:8}}/>
                <button onClick={()=>remove(i)} style={delBtn}>✕</button>
              </div>
            ) : (
              <button onClick={()=>inputs[i].current.click()} style={pickBtn}>Carica {label}</button>
            )}
            <input ref={inputs[i]} type="file" accept="image/*" style={{display:'none'}} onChange={(e)=>onPick(e,i)} />
          </div>
        ))}
      </div>
      {!ok && <p style={{marginTop:6,color:'#fbbf24',fontSize:12}}>Carica tutte e 3 le immagini per consigli completi.</p>}
    </div>
  );
}
const card = {padding:12,border:'1px solid #222',borderRadius:12,background:'#121212'};
const slot = {background:'#0f0f0f',border:'1px dashed #333',borderRadius:8,display:'grid',placeItems:'center',height:120};
const pickBtn = {padding:'6px 10px',borderRadius:8,background:'#1b1b1b',color:'#eaeaea',border:'1px solid #333'};
const delBtn = {position:'absolute',top:6,right:6,background:'#000',border:'1px solid #333',borderRadius:8,color:'#eaeaea',padding:'2px 6px'};
function toBase64(file){ return new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(file); }); }
