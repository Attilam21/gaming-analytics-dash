import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useApp } from './app/store';
import Dashboard from './pages/Dashboard';
import Roster from './pages/Roster';
import Match from './pages/Match';
import Ratings from './pages/Ratings';
import Opponent from './pages/Opponent';
import Coach from './pages/Coach';

function Nav(){
  const linkStyle = {padding:'8px 12px', borderRadius:10, textDecoration:'none', color:'#eaeaea', background:'#1b1b1b', marginRight:8};
  return (
    <nav style={{position:'sticky', top:0, padding:12, background:'#000', borderBottom:'1px solid #222'}}>
      <Link to="/" style={linkStyle}>Dashboard</Link>
      <Link to="/roster" style={linkStyle}>Rosa</Link>
      <Link to="/match" style={linkStyle}>Statistiche partita</Link>
      <Link to="/ratings" style={linkStyle}>Pagelle</Link>
      <Link to="/opponent" style={linkStyle}>Avversario</Link>
      <Link to="/coach" style={linkStyle}>Chat</Link>
    </nav>
  );
}

export default function App(){
  const load = useApp(s=>s.loadFromLocal);
  useEffect(()=>{ load(); }, [load]);

  return (
    <BrowserRouter>
      <div style={{minHeight:'100vh', color:'#eaeaea', background:'#0a0a0a'}}>
        <Nav/>
        <div style={{maxWidth:1000, margin:'0 auto', padding:16}}>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/roster" element={<Roster/>} />
            <Route path="/match" element={<Match/>} />
            <Route path="/ratings" element={<Ratings/>} />
            <Route path="/opponent" element={<Opponent/>} />
            <Route path="/coach" element={<Coach/>} />
            <Route path="*" element={<Navigate to="/" replace/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

