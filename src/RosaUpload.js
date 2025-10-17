import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Avatar } from '@mui/material';

const TITOLARI = 11;
const PANCHINARI = 12;

function RosaUpload() {
  const [mostraRosa, setMostraRosa] = useState(false);
  const [mostraStats, setMostraStats] = useState(false);
  const [giocatori, setGiocatori] = useState(Array(TITOLARI + PANCHINARI).fill(null));
  const [statistiche, setStatistiche] = useState([]);

  const handleImageUpload = (index, files) => {
    setGiocatori(prev => {
      const nuovo = [...prev];
      nuovo[index] = {
        ...nuovo[index],
        images: files
      };
      return nuovo;
    });
  };

  const handleStatsUpload = (files) => {
    setStatistiche(files);
  };

  return (
    <Box sx={{background: "linear-gradient(135deg,#1a2331 0%, #244458 100%)", minHeight: '100vh', p: 4}}>
      <Typography variant="h4" color="#FFD600" mb={4} fontWeight="bold">
        Gaming Analytics Dash
      </Typography>
      {!mostraRosa && !mostraStats && (
        <Box sx={{display:'flex', gap:3, mt:5}}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{fontSize: '1.2rem', py:2, px:4, borderRadius:3, background: 'linear-gradient(90deg,#FFD600 0%,#FFA000 60%)', color:'#232a3e'}}
            onClick={()=>setMostraRosa(true)}
          >
            Carica Rosa Giocatori
          </Button>
          <Button
            variant="contained"
            color="info"
            size="large"
            sx={{fontSize: '1.2rem', py:2, px:4, borderRadius:3, background: 'linear-gradient(90deg,#33E2FF 0%,#2979FF 60%)', color:'#232a3e'}}
            onClick={()=>setMostraStats(true)}
          >
            Carica Statistiche Partita
          </Button>
        </Box>
      )}
      {mostraRosa && (
        <>
          <Typography variant="h5" color="#FFD600" mt={2} mb={3} fontWeight="bold">
            Profilazione Rosa (11 titolari + 12 panchinari)
          </Typography>
          <Grid container spacing={2}>
            {giocatori.map((giocatore, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card sx={{borderRadius: 3, bgcolor: "#232a3e", boxShadow: 3, p:2}}>
                  <CardContent>
                    <Box sx={{display:'flex', alignItems:'center', gap:2, mb:2}}>
                      <Avatar
                        sx={{ width: 48, height: 48, bgcolor:'#FFD600' }}
                        src={giocatore?.images && giocatore.images[0] ? URL.createObjectURL(giocatore.images[0]) : undefined}
                      >
                        {idx < TITOLARI ? 'T' : 'P'}
                      </Avatar>
                      <Typography variant="subtitle1" color="#FFD600" fontWeight="bold">
                        {idx < TITOLARI ? `Titolare #${idx+1}` : `Panchinaro #${idx-TITOLARI+1}`}
                      </Typography>
                    </Box>
                    <Button variant="contained" color="info" component="label" size="small" sx={{mb:1}}>
                      Carica foto
                      <input type="file" multiple accept="image/*" hidden onChange={e => handleImageUpload(idx, e.target.files)} />
                    </Button>
                    <Typography variant="body2" color="#ccc">
                      Carica almeno 3 foto per la profilazione
                    </Typography>
                    <Box sx={{mt:2, display:'flex', gap:1}}>
                      {giocatore && giocatore.images &&
                        [...giocatore.images].map((img, i) =>
                          <Avatar key={i} src={URL.createObjectURL(img)} sx={{width:32, height:32, border:"2px solid #FFD600"}} />
                        )
                      }
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {mostraStats && (
        <Box sx={{mt:5}}>
          <Typography variant="h5" color="#33E2FF" mb={3} fontWeight="bold">
            Carica Statistiche Partita
          </Typography>
          <Button variant="contained" color="info" component="label" size="large" sx={{mb:2, borderRadius:2}}>
            Scegli file
            <input type="file" multiple accept="image/*" hidden onChange={e => handleStatsUpload(e.target.files)} />
          </Button>
          <Typography variant="body2" color="#ddd">
            Carica qui la/le foto delle statistiche (come WhatsApp, tabella partita, ecc).
          </Typography>
          <Box sx={{mt:2, display:'flex', flexWrap:'wrap', gap:2}}>
            {statistiche && [...statistiche].map((img, i) =>
              <Avatar key={i} src={URL.createObjectURL(img)} sx={{width:80, height:80, border:"3px solid #33E2FF"}} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default RosaUpload;

