// src/components/FactionChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

// Helper function to generate random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function FactionChart({logData}) {
  const factionStats = {
    Foundation: 0,
    Anomalies: 0,
    Counter: 0,
  };

  if (logData && Array.isArray(logData)) {
    
    logData.forEach(log => {
    if (log.winner && factionStats.hasOwnProperty(log.winner)) {
      factionStats[log.winner]++;
    }
  });
} else {
    console.error("Invalid data:", logData);
}


  const labels = Object.keys(factionStats);
  const data = Object.values(factionStats);
  const backgroundColors = labels.map(() => getRandomColor()); // Random colors for each faction

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}> {/* Resize chart */}
      <Doughnut
        data={{
          labels,
          datasets: [
            {
              data,
              backgroundColor: backgroundColors,
            },
          ],
        }}
      />
    </div>
  );
}

export default FactionChart;