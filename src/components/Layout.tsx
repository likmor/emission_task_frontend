import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AppShell, Group, Button, Text, Drawer, Stack, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const navLinks = [
  { label: "Miks energetyczny", to: "/" },
  { label: "Optymalne okno ładowania", to: "/charging-window" },
];

export default function Layout() {
  const [opened, { toggle, close }] = useDisclosure(false);
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
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
        </Group>
      </AppShell.Header>
      <Drawer opened={opened} onClose={close} title="Menu" hiddenFrom="sm">
        <Stack>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={close}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "filled" : "subtle"}
                  color="lime"
                  c="dark"
                  fullWidth
                >
                  {link.label}
                </Button>
              )}
            </NavLink>
          ))}
        </Stack>
      </Drawer>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
