import React from 'react';
import { Doughnut } from 'react-chartjs-2';
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
        scpStats[scp] = 0
      }
      if (anomaliesWon) {
        scpStats[scp]++;
      }
    });
  });

  const labels = Object.keys(scpStats)
  const data = labels.map(f => scpStats[f])
  const backgroundColors = labels.map((f, i) => {
    return scpColors[f]
  });

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
        <Card shadow="sm" padding="lg">
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
        </Card>
      </div>

      <div style={{ flex: 1 }}>
        <Card shadow="sm" padding="lg">
          <Title order={4}>Information</Title>
          <Text>
            This chart displays each win by the "Anomalies" team (scps) and it registers the SCP that win the most in this occasions.
            This essentially shows each win of each SCP in every round. However, since the selection of each SCP is random in each game,
            some SCP might be picked less so watch out for that. If you want to know the winrate of each scp you can check the winrate graph above.
          </Text>
        </Card>
      </div>
    </div>
  );
}

export default SCPChart;
