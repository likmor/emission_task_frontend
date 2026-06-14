import { act, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { ChargingWindowPage } from "./ChargingWindowPage";
import { MantineProvider } from "@mantine/core";
import { expect, it, vi } from "vitest";

vi.mock("axios");

const mockData = {
  startTime: "2024-01-01T11:00:00Z",
  endTime: "2024-01-01T13:00:00Z",
  cleanEnergyPercentage: 62.55,
};

const renderWithProviders = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>);

it("shows loader after request", async () => {
  vi.mocked(axios.post).mockResolvedValueOnce({ data: mockData });
  renderWithProviders(<ChargingWindowPage />);

  const button = screen.getByText("Oblicz");
  expect(button).toBeVisible();
  act(() => {
    button.click();
  });

  await waitFor(() => {
    expect(screen.getByTestId("loader")).toBeVisible();
  });
});

it("correctly render result card", async () => {
  vi.mocked(axios.post).mockResolvedValueOnce({ data: mockData });
  renderWithProviders(<ChargingWindowPage />);
  act(() => {
    screen.getByText("Oblicz").click();
  });

  await waitFor(() => {
    expect(screen.getByText("Najlepsze okno ładowania")).toBeVisible();
    expect(
      screen.getByText(new Date(mockData.startTime).toLocaleString()),
    ).toBeVisible();
    expect(
      screen.getByText(new Date(mockData.endTime).toLocaleString()),
    ).toBeVisible();
    expect(
      screen.getByText(`${mockData.cleanEnergyPercentage.toFixed(2)}%`),
    ).toBeVisible();
  });
});
