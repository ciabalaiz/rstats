import React from 'react';
import { Card, Text, Button, Title, Stack } from '@mantine/core';

const LogFileSelector = ({ files, onSelect }) => {
  return (
    <Stack spacing="md">
      {files.map((file, index) => (
        <Card key={file.name} shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={5}>{file.name}</Title>
          <Text size="sm" color="dimmed" mb="sm">
            {file.description || `This is a log file with ${file.name}.`} {/* Optional descriptions */}
          </Text>
          <Button variant="light" onClick={() => onSelect(file.name)}>
            View Log
          </Button>
        </Card>
      ))}
    </Stack>
  );
};

export default LogFileSelector;
