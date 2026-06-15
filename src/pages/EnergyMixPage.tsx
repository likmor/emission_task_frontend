import type { DailyMix, EnergyMixResponse } from "@/types";
import { PieChart } from "@mantine/charts";
import {
  Card,
  Container,
  RingProgress,
  SimpleGrid,
  Stack,
  Tabs,
  Title,
  Text,
  Loader,
  Center,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const chartData = (day: DailyMix) => {
  return [
    { name: "gas", value: day.gas, color: "tomato" },
    { name: "coal", value: day.coal, color: "gray" },
    { name: "biomass", value: day.biomass, color: "lime" },
    { name: "hydro", value: day.hydro, color: "blue" },
    { name: "imports", value: day.imports, color: "violet" },
    { name: "nuclear", value: day.nuclear, color: "yellow" },
    { name: "wind", value: day.wind, color: "teal" },
    { name: "solar", value: day.solar, color: "orange" },
    { name: "other", value: day.other, color: "brown" },
  ].filter((fuel) => fuel.value > 0);
};

export const EnergyMixPage = () => {
  const [data, setData] = useState<EnergyMixResponse | null>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<EnergyMixResponse>(
        `${API_URL}/api/energy-mix`,
      );
      if (response.data) {
        setData(response.data);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <Center py={"lg"}>
        <Loader color="lime" data-testid="loader" />
      </Center>
    );
  }
  return (
    <Container size="lg" py="xl">
      <Stack gap="lg" w="100%">
        <Title order={1}>Miks energetyczny Wielkiej Brytanii</Title>

        <Tabs defaultValue={data?.days[0]?.date}>
          <Tabs.List>
            {data?.days.map((day) => (
              <Tabs.Tab key={day.date} value={day.date}>
                {new Date(day.date).toLocaleDateString()}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {data?.days.map((day) => {
            return (
              <Tabs.Panel key={day.date} value={day.date} pt="md">
                <SimpleGrid cols={{ base: 1, md: 2 }}>
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{ overflow: "visible", position: "relative" }}
                  >
                    <Title order={3} mb="md">
                      Źródła energii
                    </Title>
                    <PieChart
                      w="100%"
                      h={300}
                      size={250}
                      data={chartData(day)}
                      withLabels
                      labelsPosition="outside"
                      labelsType="name"
                      withTooltip
                      tooltipDataSource="segment"
                      valueFormatter={(value) => {
                        const total =
                          day.gas +
                          day.coal +
                          day.biomass +
                          day.hydro +
                          day.imports +
                          day.nuclear +
                          day.wind +
                          day.solar +
                          day.other;
                        return `${((value / total) * 100).toFixed(2)}%`;
                      }}
                    />
                  </Card>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Stack align="center">
                      <Title order={3}>Czysta energia</Title>

                      <RingProgress
                        size={300}
                        thickness={30}
                        sections={[
                          {
                            value: day.cleanEnergyPercentage,
                            color: "green",
                          },
                        ]}
                        label={
                          <Text fw={700} ta="center">
                            {day.cleanEnergyPercentage.toFixed(2)}%
                          </Text>
                        }
                      />
                      <Text c="dimmed">
                        biomass + nuclear + hydro + wind + solar
                      </Text>
                    </Stack>
                  </Card>
                </SimpleGrid>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </Stack>
    </Container>
  );
};
