import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { AppRouter } from "./router/AppRouter";
import "./App.css";

export default function App() {
  return (
      <MantineProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
      </MantineProvider>
  );
}
