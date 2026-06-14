import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { EnergyMixPage } from "./EnergyMixPage";
import { MantineProvider } from "@mantine/core";
import { expect, it, vi } from "vitest";

vi.mock("axios");

const mockData = {
  days: [
    {
      date: "2024-01-01",
      gas: 30,
      coal: 10,
      biomass: 5,
      hydro: 5,
      imports: 5,
      nuclear: 10,
      wind: 20,
      solar: 10,
      other: 5,
      cleanEnergyPercentage: 50,
    },
  ],
};

const renderWithProviders = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

it("shows loader initially", () => {
  vi.mocked(axios.get).mockResolvedValueOnce({ data: mockData });
  renderWithProviders(<EnergyMixPage />);
  expect(screen.getByTestId("loader")).toBeVisible();
});

it("renders tab for each day after load", async () => {
  vi.mocked(axios.get).mockResolvedValueOnce({ data: mockData });
  renderWithProviders(<EnergyMixPage />);
  expect(
    await screen.findByText(
      new Date(mockData.days[0].date).toLocaleDateString(),
    ),
  ).toBeInTheDocument();
});

it("renders data cards correctly", async () => {
  vi.mocked(axios.get).mockResolvedValueOnce({ data: mockData });
  const { container } = renderWithProviders(<EnergyMixPage />);

  await waitFor(() => {
    expect(container.querySelector(".mantine-RingProgress-svg")).toBeVisible();
  });

  expect(
    await screen.findByText(
      `${mockData.days[0].cleanEnergyPercentage.toFixed(2)}%`,
    ),
  ).toBeVisible();
});
