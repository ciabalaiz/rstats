import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, Title, Text } from '@mantine/core'; // Optional: for better styling
import colors  from '../factionColors'

const scpColors = colors.scpColors

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

  const backgroundColors = labels.map((f) => {
    return scpColors[f]
  });

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Chart */}
      <div style={{ flex: 2 }}>
        <Card shadow="sm" padding="lg">
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
        </Card>
      </div>

      <div style={{ flex: 1 }}>
        <Card shadow="sm" padding="lg">
          <Title order={4}>Information</Title>
          <Text>
            This chart displays the win rate of each SCP when Anomalies are the main winner of a round. 
            It calculates the percentage of rounds each SCP appears in that result in an Anomalies victory.
            The win rate is shown as a percentage, with 100% meaning the SCP always won when it appeared.
          </Text>
        </Card>
      </div>
    </div>
  );
}

export default SCPChart;
