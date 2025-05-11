import React from 'react';
import colors from '../factionColors'
import { Bar } from 'react-chartjs-2';

function getMedianColor(color1, color2) {
  let r1 = parseInt(color1.substring(1, 3), 16);
  let g1 = parseInt(color1.substring(3, 5), 16);
  let b1 = parseInt(color1.substring(5, 7), 16);

  let r2 = parseInt(color2.substring(1, 3), 16);
  let g2 = parseInt(color2.substring(3, 5), 16);
  let b2 = parseInt(color2.substring(5, 7), 16);

  let r = Math.floor((r1 + r2) / 2);
  let g = Math.floor((g1 + g2) / 2);
  let b = Math.floor((b1 + b2) / 2);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function BestSCPCombosChart({ logData }) {
  const comboCounts = {};
  const comboColors = {}

  logData.forEach(log => {
    if (log.winner === "Anomalies" && Array.isArray(log.scps)) {
      const scps = [...new Set(log.scps)]; // Remove duplicates
      for (let i = 0; i < scps.length; i++) {
        for (let j = i + 1; j < scps.length; j++) {
          const pair = [scps[i], scps[j]].sort().join(" + ");
          comboColors[pair] = getMedianColor(colors.scpColors[scps[i]], colors.scpColors[scps[j]])
          comboCounts[pair] = (comboCounts[pair] || 0) + 1;
        }
      }
    }
  });

  const sortedCombos = Object.entries(comboCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10 pairs

  const labels = sortedCombos.map(([combo]) => combo);
  const data = sortedCombos.map(([_, count]) => count);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h3>Top SCP Team Pairings (Anomalies Wins)</h3>
      <Bar
        data={{
          labels,
          datasets: [{
            label: 'Wins with this pair',
            data,
            backgroundColor: Object.keys(comboColors),
          }]
        }}
        options={{
          responsive: true,
          indexAxis: 'y',
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: { beginAtZero: true },
          },
        }}
      />
    </div>
  );
}

export default BestSCPCombosChart;
