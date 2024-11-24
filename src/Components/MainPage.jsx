import { AppShell, Burger, Center, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import GameScreen from './GameScreen';

function MainPage() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: !opened },
      }}
    >
      <AppShell.Header>
        <Center p="10px">
            <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            />
            <Space w="xs"/>
            Websites Through the Ages
        </Center>
      </AppShell.Header>

      <AppShell.Navbar p="md">TODO</AppShell.Navbar>

      <AppShell.Main>
        <GameScreen />
      </AppShell.Main>
    </AppShell>
  );
}

export default MainPage;