import { Link, useLocation } from 'react-router-dom';

export default function TopBar(){
  const { pathname } = useLocation();
  const Btn = ({to,label}) => (
    <Link to={to} style={{
      padding:'8px 12px', borderRadius:10, background:'#1b1b1b', 
      color:'#eaeaea', textDecoration:'none', marginRight:8,
      outline: pathname===to ? '2px solid #3b82f6' : 'none'
    }}>{label}</Link>
  );

  return (
    <div style={{
      position:'sticky', top:0, zIndex:20, backdropFilter:'blur(6px)',
      background:'#000000cc', borderBottom:'1px solid #222', padding:12, marginBottom:12
    }}>
      <Btn to="/roster" label="Modifica formazione" />
      <Btn to="/roster" label="Carica formazione" />
      <Btn to="/match"  label="Carica statistiche partita" />
      <Btn to="/ratings" label="Pagelle giocatori" />
      <Btn to="/opponent" label="Formazione avversaria" />
      <Btn to="/coach"  label="Chat del Coach" />
    </div>
  );
}
