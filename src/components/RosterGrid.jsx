import PlayerUploadCard from './PlayerUploadCard';
import RosterGrid from '../components/RosterGrid';
import { useApp } from '../app/store';

export default function RosterGrid({ players=[] }){
  const titolari = players.slice(0,11);
  const riserve  = players.slice(11,23);
  return (
    <div style={{display:'grid',gap:16}}>
      <h2 style={h2}>Titolari (11)</h2>
      <div style={grid}>{titolari.map(p=> <PlayerUploadCard key={p.id} player={p}/>)}</div>
      <h2 style={h2}>Riserve (12)</h2>
      <div style={grid}>{riserve.map(p=> <PlayerUploadCard key={p.id} player={p}/>)}</div>
    </div>
  );
}
const h2 = {fontSize:18,fontWeight:600,marginTop:12};
const grid = {display:'grid',gap:12,gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'};
