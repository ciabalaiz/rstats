import React from 'react';
import { Card, Title, Text } from '@mantine/core';
import { Doughnut } from 'react-chartjs-2';
import factionHues  from '../factionColors'

const fHues = factionHues.factionHues

// Get color based on margin (avg diff)
const getFactionColor = (faction, avgMargin) => {
  const hue = fHues[faction] || 0;
  const lightness = Math.max(30, Math.min(70, 70 - avgMargin * 3)); // clamp between 30% and 70%
  return `hsl(${hue}, 70%, ${lightness}%)`;
};

function FactionChart({ logData }) {
  const factionStats = {
    Foundation: { count: 0, margins: [] },
    Anomalies: { count: 0, margins: [] },
    Counter: { count: 0, margins: [] },
    GOC : { count: 0, margins: [] },
  };

  if (logData && Array.isArray(logData)) {
    logData.forEach(log => {
      const { winner, points, points2 } = log;
      if (winner && factionStats[winner]) {
        factionStats[winner].count++;
        if (typeof points === 'number' && typeof points2 === 'number') {
          factionStats[winner].margins.push(Math.abs(points - points2));
        }
      }
    });
  }

  const labels = Object.keys(factionStats);
  const data = labels.map(f => factionStats[f].count);
  const backgroundColors = labels.map(f => {
    const margins = factionStats[f].margins;
    const avgMargin = margins.length ? margins.reduce((a, b) => a + b, 0) / margins.length : 10;
    return getFactionColor(f, avgMargin);
  });

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
            A really quick way of checking the various statistic of each faction in the game. 
            The color brightness reflects how dominant their victories were — darker colors indicate large margins, lighter ones mean closer wins.
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
