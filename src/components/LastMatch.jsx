import TopBar from '../components/TopBar';
import LastMatch from '../components/LastMatch';
import Trends from '../components/Trends';           // ⬅️ AGGIUNTO
import { useApp } from '../app/store';

export default function Dashboard(){
  const { roster, matches, tasks } = useApp();

  return (
    <div style={{display:'grid', gap:16}}>
      <TopBar />
      <h1 style={{fontSize:28, fontWeight:700}}>Dashboard eFootball</h1>

      <LastMatch />

      <Trends matches={matches} />                    {/* ⬅️ AGGIUNTO */}

      <div style={{display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))'}}>
        <div style={card}>
          <h2 style={h2}>Rosa</h2>
          <p>{roster ? `${roster.modulo} — ${roster.players.length} giocatori` : 'Nessuna rosa caricata'}</p>
        </div>
        <div style={card}>
          <h2 style={h2}>Partite salvate</h2>
          <p>{matches.length}</p>
        </div>
        <div style={card}>
          <h2 style={h2}>Compiti del Coach</h2>
          <ul style={{margin:'8px 0 0 18px'}}>
            {tasks.slice(0,5).map(t=> <li key={t.id}>{t.titolo}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
const card = {padding:16, borderRadius:12, background:'#121212', border:'1px solid #222'};
const h2 = {marginBottom:8, fontSize:16, fontWeight:600};
