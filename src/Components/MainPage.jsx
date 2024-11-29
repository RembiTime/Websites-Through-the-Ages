import { AppShell, Burger, Center, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import GameScreen from './GameScreen';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

function MainPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const [pickingGamemode, setPickingGamemode] = useState(true);
  const [titleText, setTitleText] = useState("Pick a mode!");

  useEffect(() => { // Change the title back when the game restarts
    if (pickingGamemode) {
      setTitleText("Pick a mode!")
    }
  }, [pickingGamemode])

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: !opened },
      }}
    >
      <AppShell.Header fz={24}>
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

      <AppShell.Navbar p="md">
        <Navbar setPickingGamemode={setPickingGamemode} toggle={toggle}/>
      </AppShell.Navbar>

      <AppShell.Main>
        <GameScreen pickingGamemode={pickingGamemode} setPickingGamemode={setPickingGamemode} titleText={titleText} setTitleText={setTitleText}/>
      </AppShell.Main>
    </AppShell>
  );
}

export default MainPage;