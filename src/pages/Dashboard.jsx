import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Trends({ matches=[] }){
  if (!matches.length) {
    return (
      <div style={{padding:16, borderRadius:12, background:'#121212', border:'1px solid #222'}}>
        <h2 style={{marginBottom:8, fontSize:16, fontWeight:600}}>Trend ultime 5 partite</h2>
        <p style={{opacity:.75}}>Nessuna partita salvata.</p>
      </div>
    );
  }

  const last = matches.slice(0,5).reverse(); // ultime 5
  const labels   = last.map(m => new Date(m.dataISO).toLocaleDateString());
  const poss     = last.map(m => m.nostre?.possesso ?? 0);
  const tiriPorta= last.map(m => m.nostre?.tiriInPorta ?? 0);
  const passPerc = last.map(m => m.nostre?.passAccuracy ?? 0);

  const data = {
    labels,
    datasets: [
      { label: 'Possesso %', data: poss },
      { label: 'Tiri in porta', data: tiriPorta },
      { label: 'Passaggi %', data: passPerc },
    ],
  };
  const options = { responsive:true, plugins:{ legend:{ position:'bottom' } }, scales:{ y:{ beginAtZero:true } } };

  return (
    <div style={{padding:16, borderRadius:12, background:'#121212', border:'1px solid #222'}}>
      <h2 style={{marginBottom:8, fontSize:16, fontWeight:600}}>Trend ultime 5 partite</h2>
      <Line data={data} options={options}/>
    </div>
  );
}
