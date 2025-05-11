import React, { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Space,
  Divider,
  Loader,
  Card,
  ActionIcon,
  Button,
  Group,
  Text,
  SimpleGrid,
} from '@mantine/core';

import FactionChart from './components/FactionChart.jsx';
import SCPChart from './components/SCPChart.jsx';
import SCPAmount from './components/SCPAmout.jsx'
import SCPTeams from './components/SCPTeams.jsx'
import LogList from './components/LogList.jsx';
import SpawnwavesChart from './components/SpawnwavesChart.jsx'
import GHicon from './components/GithubIcon.jsx'
import logDesc from './logDescription.js' 

const logFileDescriptions = logDesc

function upgradeFileName(name ) {
  const number = name.match(/\d+/); 
  const result = (number ? parseInt(number[0]) : null) || 1;

  return "Update " + result.toString()
}

export default function App() {
  const [logData, setLogData] = useState([]);
  const [selectedLogFile, setSelectedLogFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const folderUrl = 'https://api.github.com/repos/ciabalaiz/rstats/contents/src/data';

  useEffect(() => {
    fetch(folderUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const jsonFiles = data.filter(item => item.name.endsWith('.json'));
        return Promise.all(
          jsonFiles.map(file =>
            fetch(file.download_url)
              .then(res => res.json())
              .then(fileData => ({
                fileName: file.name,
                data: fileData,
              }))
              .catch(error => {
                console.error('Error fetching JSON file:', error);
                return null;
              })
          )
        );
      })
      .then(fetchedData => {
        const validData = fetchedData.filter(file => file !== null);
        setLogData(validData);
        setLoading(false);
        if (validData.length > 0) {
          setSelectedLogFile(validData[0].fileName);
        }
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const fullData = logData.flatMap(log => log.data)

  const handleLogFileChange = (value) => {
    setSelectedLogFile(value);
  };

  const selectedData = selectedLogFile
    ? logData.find(log => log.fileName === selectedLogFile)?.data
    : null;

  return (
    <Container size="lg" py="xl">
      <Title order={1}>rStats</Title>
      <GHicon></GHicon>
      <Space h="md" />

      {loading ? (
        <Loader size="xl" />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <Divider label="Choose a Log File" labelPosition="center" my="md" />

          {/* Horizontal scroll container */}
          <div style={{ overflowX: 'auto', padding: '1rem 0' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {logData.map((log) => (
                <Card
                  key={log.fileName}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{
                    width: 280,           // fixed width
                    height: 360,          // fixed height
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column', // stack content vertically
                  }}
                >
                 {/* Filename */}
                  <Group position="apart" mb="xs">
                    <Text weight={500} size="lg" lineClamp={1}>
                      {upgradeFileName(log.fileName)}
                    </Text>
                  </Group>

                  {/* Description: scroll if too long */}
                  <Text
                    size="sm"
                    color="dimmed"
                    style={{
                      flex: 1,               // fill remaining vertical space
                      overflowY: 'auto',     // scroll if content exceeds
                      whiteSpace: 'pre-wrap' // preserve newlines
                    }}
                  >
                    {logFileDescriptions[log.fileName] || 'No description available.'}
                  </Text>

                  {/* Select Button */}
                  <Button
                    variant={log.fileName === selectedLogFile ? 'filled' : 'light'}
                    color="blue"
                    fullWidth
                    mt="md"
                    onClick={() => handleLogFileChange(log.fileName)}
                  >
                    {log.fileName === selectedLogFile ? 'Selected' : 'Select Data'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>


          {selectedData && (
            <>
              <Divider label="Faction Wins" labelPosition="center" />
              <FactionChart logData={selectedData} />

              <Space h="lg" />
              <Divider label="Anomalies Winrate" labelPosition="center" />
              <SCPChart logData={selectedData} />

              <Space h="lg" />
              <Divider label="Spawnrate Statistics" labelPosition="center" />
              <SpawnwavesChart logData={selectedData} />

              <Space h="lg" />
              <Divider label="Anomalies Wins Statistics" labelPosition="center" />
              <SCPAmount logData={fullData} />
              
              <Space h="lg" />
              <Divider label="SCPs Team-Ups" labelPosition="center" />
              <SCPTeams logData={fullData} />

              <Space h="lg" />
              <Divider label="Round Log List" labelPosition="center" />
              <LogList logData={selectedData} />

            </>
          )}
        </>
      )}
    </Container>
  );
}
