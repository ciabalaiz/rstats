// src/components/SCPChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

// Helper function to generate random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function SCPChart({ logData }) {
  const scpStats = {};

  logData.forEach(log => {
    const scps = log.scps || [];
    const anomaliesWon = log.winner === "Anomalies" && log.points > (log.points2 ?? 0);

    scps.forEach(scp => {
      if (!scpStats[scp]) {
        scpStats[scp] = { wins: 0, total: 0 };
      }
      scpStats[scp].total++;
      if (anomaliesWon) {
        scpStats[scp].wins++;
      }
    });
  });

  const labels = Object.keys(scpStats);
  const winRates = labels.map(scp => {
    const { wins, total } = scpStats[scp];
    return ((wins / total) * 100).toFixed(1);
  });

  // Generate random colors for each SCP
  const backgroundColors = labels.map(() => getRandomColor()); 

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}> {/* Resize chart */}
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "SCP Win Rate (%)",
              data: winRates,
              backgroundColor: backgroundColors,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        }}
      />
    </div>
  );
}

export default SCPChart;
