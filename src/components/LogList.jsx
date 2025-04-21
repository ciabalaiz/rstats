import { Card, Text, Badge, Group, Stack } from '@mantine/core';


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
        current = "Foundation"
    } 

    return current
}

function spawnwaveFix(spawnwaves) {
    var newSpawnwave  = []
    spawnwaves.forEach(element => {
        newSpawnwave.push(nameFix(element))
    });
    return newSpawnwave
}

export default function LogList({logData}) {
    
  return (
    <Stack spacing="md">
      {logData.map((log, idx) => {
        const diff = Math.abs(log.points - log.points2);
        var newSpawnwave = spawnwaveFix(log.spawnwaves)
        return (
          <Card key={idx} shadow="sm" radius="md" withBorder>
            <Group position="apart" mb="xs">
              <Group spacing="xs">
                <Badge color="green">{nameFix(log.winner)} ({log.points})</Badge>
                <Text>vs</Text>
                <Badge color="blue">{nameFix(log.winner2)} ({log.points2})</Badge>
              </Group>
              <Badge color="gray" variant="outline">{diff} pt diff</Badge>
            </Group>
            <Text size="sm">
              <strong>Players:</strong> {log.players}<br />
              <strong>SCPs:</strong> {log.scps.join(', ') || '—'}<br />
              <strong>Spawnwaves:</strong> {newSpawnwave.join(', ') || '—'}
            </Text>
            {log.note && (
              <Text size="xs" color="yellow" mt="sm">
                Note: {log.note}
              </Text>
            )}
          </Card>
        );
      })}
    </Stack>
  );
}
