import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const data = [
  { label: "Possesso di palla", left: "49%", right: "51%" },
  { label: "Tiri totali", left: "16", right: "8" },
  { label: "Tiri in porta", left: "10", right: "4" },
  { label: "Falli", left: "0", right: "0" },
  { label: "Fuorigioco", left: "0", right: "0" },
  { label: "Calci d'angolo", left: "2", right: "1" },
  { label: "Punizioni", left: "0", right: "0" },
  { label: "Passaggi", left: "110", right: "137" },
  { label: "Passaggi riusciti", left: "81", right: "100" },
  { label: "Cross", left: "0", right: "0" },
  { label: "Passaggi intercettati", left: "29", right: "20" },
  { label: "Contrasti", left: "4", right: "5" },
  { label: "Parate", left: "4", right: "3" }
];

function MatchStats({ onBack }) {
  return (
    <Box sx={{minHeight:"100vh", background:"linear-gradient(135deg,#0f1020 0%, #191936 100%)", px:2, py:4}}>
      <Box sx={{display:'flex', alignItems:'center', mb:3}}>
        <IconButton color="info" onClick={onBack} sx={{mr:2}}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4" color="#FFD600" fontWeight="bold">
          Statistiche partita
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{
        maxWidth:600,
        margin:"0 auto",
        background:"#231f31",
        borderRadius:4,
        boxShadow:5,
        border:"2px solid #FFD600"
      }}>
        <Table>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx} sx={{"&:nth-of-type(even)": {background:"#181727"}}}>
                <TableCell align="center" sx={{color:"#FFF", fontWeight:"bold", fontSize:18}}>{row.left}</TableCell>
                <TableCell align="center" sx={{color:"#F52CED", fontWeight:"bold", fontSize:18}}>{row.label}</TableCell>
                <TableCell align="center" sx={{color:"#FFF", fontWeight:"bold", fontSize:18}}>{row.right}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{textAlign:"center", mt:5}}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{fontSize:"1.1rem", px:4, borderRadius:3, background:'linear-gradient(90deg,#FFD600 40%,#FFA000 100%)', color:"#222", fontWeight:"bold"}}
        >
          Avanti
        </Button>
      </Box>
    </Box>
  );
}

export default MatchStats;

