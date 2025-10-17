export default function Timeline({ events=[] }){
  if(!events.length) return <p style={{opacity:.7}}>Nessun evento registrato.</p>;
  return (
    <ul style={{listStyle:'none', padding:0, margin:0}}>
      {events.map((e,i)=>(
        <li key={i} style={{display:'flex', gap:12, padding:'6px 0', borderBottom:'1px solid #222'}}>
          <span style={{width:50, color:'#9aa3af'}}>{e.min}'</span>
          <span style={{flex:1}}>
            <b>{e.tipo}</b>{e.player ? ` — ${e.player}`:''}
          </span>
          <span style={{color:'#9aa3af'}}>{e.note||''}</span>
        </li>
      ))}
    </ul>
  );
}
