import React from 'react';
import { Container, Title, Space, Divider } from '@mantine/core';
import FactionChart from './components/FactionChart.jsx';
import SCPChart from './components/SCPChart.jsx';
import LogList from './components/LogList.jsx';

export default function App() {
  return (
    <Container size="lg" py="xl">
      <Title order={1}>📊 rStats</Title>
      <Space h="md" />

      <Divider label="📊 Faction Wins" labelPosition="center" />
      <FactionChart />

      <Space h="lg" />
      <Divider label="📊 SCP Winrate" labelPosition="center" />
      <SCPChart />

      <Space h="lg" />
      <Divider label="Round Logs" labelPosition="center" />
      <LogList />
    </Container>
  );
}
