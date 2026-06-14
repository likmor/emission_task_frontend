import Layout from "@/components/Layout";
import { Routes, Route } from "react-router-dom";
import { ChargingWindowPage } from "../pages/ChargingWindowPage";
import { EnergyMixPage } from "@/pages/EnergyMixPage";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<EnergyMixPage />} />
      <Route path="/charging-window" element={<ChargingWindowPage />} />
    </Route>
  </Routes>
);
