
import React from 'react';
import { Card, Title, Text } from '@mantine/core'; 
import { Doughnut } from 'react-chartjs-2';


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
  const backgroundColors = labels.map(() => getRandomColor()); 

  return (
<div
  style={{
    display: 'flex',
    alignItems: 'flex-start',
    gap: '3rem',
    padding: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }}
>
  <div style={{ flex: '1 1 250px', maxWidth: '400px' }}>
    <Card shadow="sm" padding="lg">
      <Title order={4}>Information</Title>
      <Text>
        This chart shows how many times each faction (Foundation, Anomalies, Counter) has won a round. 
        You can switch datasets at the top of the page to see how stats change over time.
      </Text>
    </Card>
  </div>

  <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
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
</div>
  );
}

export default FactionChart;