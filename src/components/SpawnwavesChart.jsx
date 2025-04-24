import React from 'react';
import { Card, Title, Text } from '@mantine/core';
import { Doughnut } from 'react-chartjs-2';
import factionHues  from '../factionColors'

const fHues = factionHues.factionHues

function nameFix(name) {
    name = name.toLowerCase()
    var current = "";

    if (name == "ntf" || name == "mtf" || name == "tacrep" || name == "foundation") {
        current = "Foundation";
    } else if (name == "sh" || name == "serpenthand" || name == "anomalies") {
        current = "Anomalies"
    } else  if (name == "ci" || name == "chaosinsurency" || name == "counter") {
        current = "Counter"
    } else {
        current = "GOC"
    } 

    return current
}

const getFactionColor = (faction, avgMargin) => {
  const hue = fHues[faction] || 0;
  const lightness = Math.max(30, Math.min(70, 70 - avgMargin * 3));
  return `hsl(${hue}, 70%, ${lightness}%)`;
};

function FactionChart({ logData }) {
  const factionStats = {
    Foundation: 0,
    Anomalies: 0,
    Counter: 0,
    GOC : 0,
  };

  if (logData && Array.isArray(logData)) {
    logData.forEach(log => {
      const { spawnwaves } = log;

      spawnwaves.map(f => {
        factionStats[nameFix(f)]++
      })
    });
  }

  const labels = Object.keys(factionStats);
  const data = labels.map(f => factionStats[f]);
  const backgroundColors = labels.map(f => {
    return getFactionColor(f, 50);
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
            This chart is a simple rapresentation of the various spawnwaves that occur during a round.
            It's a simple way to see what are the factions that we see the most while playing.
            In the fututre we will also add a way to find out when certain spawnwaves occur with more detail, even if the process 
            in game is slightly randomized.
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
