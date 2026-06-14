import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AppShell, Group, Button, Text } from "@mantine/core";

const navLinks = [
  { label: "Miks energetyczny", to: "/" },
  { label: "Optymalne okno ładowania", to: "/charging-window" },
];

export default function Layout() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header px="xl">
        <Group h="100%" justify="space-between">
          <Text fw={600} size="xl">
            Emission test task
          </Text>

          <Group gap="xs" visibleFrom="sm">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "filled" : "subtle"}
                    color="lime"
                    c="dark"
                    size="sm"
                  >
                    {link.label}
                  </Button>
                )}
              </NavLink>
            ))}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
