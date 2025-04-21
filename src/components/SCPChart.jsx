// src/components/SCPChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import logs from '../data/log.json';

export default function SCPChart() {
  // count only when Anomalies won with more points
  const counts = {};
  logs.forEach(({ winner, points, points2, scps = [] }) => {
    if (winner === 'Anomalies' && points > points2) {
      scps.forEach(scp => {
        counts[scp] = (counts[scp] || 0) + 1;
      });
    }
  });

  const labels = Object.keys(counts);
  const data = {
    labels,
    datasets: [{
      data: labels.map(l => counts[l]),
      backgroundColor: [
        '#4caf50','#f44336','#2196f3','#ff9800','#b540d9','#7fe4f1'
      ],
      borderColor: '#1e1e1e',
      borderWidth: 2
    }]
  };

  return (
    <Pie
      data={data}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Anomalies Wins by SCP (count)'
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.raw} wins`
            }
          }
        }
      }}
    />
  );
}
