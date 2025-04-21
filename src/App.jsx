import React, { useEffect, useState } from 'react';
import { Container, Title, Space, Divider, Select, Loader } from '@mantine/core';
import FactionChart from './components/FactionChart.jsx';
import SCPChart from './components/SCPChart.jsx';
import LogList from './components/LogList.jsx';

export default function App() {
  const [logData, setLogData] = useState([]);
  const [selectedLogFile, setSelectedLogFile] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // To handle any errors

  // GitHub API URL to fetch contents of the folder
  const folderUrl = 'https://api.github.com/repos/ciabalaiz/rstats/contents/src/data'; // Adjust to your folder URL

  useEffect(() => {
    console.log("Fetching folder contents...");

    fetch(folderUrl)
      .then(response => {
        console.log('Response Status:', response.status); // Debugging step
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched folder data:', data); // Debugging step
        if (data && Array.isArray(data)) {
          const jsonFiles = data.filter(item => item.name.endsWith('.json'));
          console.log('JSON files:', jsonFiles); // Debugging step

          // Fetch each JSON file and process its data
          Promise.all(
            jsonFiles.map(file =>
              fetch(file.download_url) // Fetch the raw JSON content
                .then(res => res.json())
                .then(fileData => {
                  console.log(`Fetched data for ${file.name}:`, fileData); // Debugging step
                  return fileData;
                })
                .catch(error => console.error('Error fetching JSON file:', error))
            )
          )
          .then(fetchedData => {
            // Assuming each file has a `fileName` property, if not, manually add it
            const formattedData = fetchedData.map((fileData, index) => ({
              fileName: jsonFiles[index].name,
              data: fileData
            }));

            // Set the fetched and formatted JSON data to state
            setLogData(formattedData);
            setLoading(false); // Stop loading when data is fetched

            // Set the default log file as the first one (if available)
            if (formattedData.length > 0) {
              setSelectedLogFile(formattedData[0].fileName);
            }
          });
        } else {
          console.error('No valid JSON files found in the folder:', data); // Debugging step
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching folder contents:', error); // Debugging step
        setError(error.message); // Set error state
        setLoading(false); // Stop loading even if there is an error
      });
  }, []);

  const handleLogFileChange = (value) => {
    setSelectedLogFile(value);
  };

  // Filtered log data based on the selected log file
  const selectedData = selectedLogFile ? logData.find(log => log.fileName === selectedLogFile)?.data : null;

  console.log("Selected Log File:", selectedLogFile);
  console.log("Selected Data:", selectedData);

  return (
    <Container size="lg" py="xl">
      <Title order={1}>📊 SCP Game Stats</Title>
      <Space h="md" />

      {/* Loading or error state */}
      {loading ? (
        <Loader size="xl" />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <Divider label="Select Log File" labelPosition="center" />
          <Select
            data={logData.map(log => ({ value: log.fileName, label: log.fileName }))}
            onChange={handleLogFileChange}
            placeholder="Select a log file"
            value={selectedLogFile}
          />

          <Space h="md" />
          <Divider label="Faction Wins" labelPosition="center" />
          {/* Only render the chart if selectedData exists */}
          {selectedData && <FactionChart logData={selectedData} />}

          <Space h="lg" />
          <Divider label="Anomalies Wins by SCP" labelPosition="center" />
          {/* Only render the chart if selectedData exists */}
          {selectedData && <SCPChart logData={selectedData} />}

          <Space h="lg" />
          <Divider label="Round Log List" labelPosition="center" />
          {/* Only render the log list if selectedData exists */}
          {selectedData && <LogList logData={selectedData} />}
        </>
      )}
    </Container>
  );
}
