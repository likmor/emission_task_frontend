import type { ChargingWindowResponseDto } from "@/types";
import {
  Button,
  Card,
  Container,
  Group,
  Loader,
  NumberInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const ChargingWindowPage = () => {
  const [hours, setHours] = useState<number>(2);
  const [data, setData] = useState<ChargingWindowResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateWindow = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post<ChargingWindowResponseDto>(
        `${API_URL}/api/energy-mix/calculate-window`,
        {hours},
      );

      setData(response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Title order={1}>Optymalne okno ładowania</Title>

        <Card withBorder shadow="sm">
          <Stack>
            <NumberInput
              label="Czas ładowania"
              description="Podaj długość okna ładowania w godzinach"
              min={1}
              max={6}
              value={hours}
              onChange={(value) => setHours(Number(value))}
            />

            <Button onClick={calculateWindow} loading={isLoading}>
              Oblicz
            </Button>
          </Stack>
        </Card>

        {isLoading && (
          <Group justify="center">
            <Loader color="lime" />
          </Group>
        )}

        {!isLoading && data && (
          <Card withBorder shadow="sm">
            <Stack gap="md">
              <Title order={3}>Najlepsze okno ładowania</Title>

              <Group justify="space-between">
                <Text fw={500}>Start</Text>
                <Text>{new Date(data.startTime).toLocaleString()}</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Koniec</Text>
                <Text>{new Date(data.endTime).toLocaleString()}</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Udział czystej energii</Text>
                <Text c="lime" fw={700}>
                  {data.cleanEnergyPercentage.toFixed(2)}%
                </Text>
              </Group>
            </Stack>
          </Card>
        )}
      </Stack>
    </Container>
  );
};
