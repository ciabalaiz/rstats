// src/components/FactionChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import logs from '../data/log.json';

export default function FactionChart() {
  // count wins per faction
  const counts = logs.reduce((acc, { winner }) => {
    acc[winner] = (acc[winner] || 0) + 1;
    return acc;
  }, {});

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
            text: 'Faction Win Distribution'
          }
        }
      }}
    />
  );
}
