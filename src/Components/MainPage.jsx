import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import GameScreen from './GameScreen';
import Navbar from './Navbar';
import Header from './Header'
import { useState, useEffect } from 'react';
import { useSpringValue } from '@react-spring/web'

function MainPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const [pickingGamemode, setPickingGamemode] = useState(true);
  const [titleText, setTitleText] = useState("Pick a mode!");
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [pointsAdded, setPointsAdded] = useState(0);
  const [openPointsPopover, setOpenPointsPopover] = useState(false);
  const [newsType, setNewsType] = useState("goodNews"); // can be 'goodNews' or 'badNews'
  const pointsAnimator = useSpringValue(0, {
    config: {
      mass: 1,
      friction: 15,
      tension: 40,
    },
    onChange: (val) => setPoints(Math.round(val))
  })


  useEffect(() => { // Change the title back when the game restarts
    if (pickingGamemode) {
      setTitleText("Pick a mode!");
    }
  }, [pickingGamemode])

  useEffect(() => { // Gets streak and points from cache on page load
    pointsAnimator.start(parseInt(localStorage.getItem("points") ?? 0));
    setStreak(parseInt(localStorage.getItem("streak") ?? 0));
  }, [])

  function updatePoints(newValue) {
    setPointsAdded(newValue - points);
    setNewsType("goodNews");
    setOpenPointsPopover(true);
    localStorage.setItem("points", newValue);
    setTimeout(() => setOpenPointsPopover(false), 2500)
    pointsAnimator.start(newValue);
  }

  function updateStreak(newValue) {
    setStreak(newValue);
    localStorage.setItem("streak", newValue);
  }

  function notifyStreakReset() {
    setNewsType("badNews");
    setOpenPointsPopover(true);
    setTimeout(() => setOpenPointsPopover(false), 2500)
  }

  function resetPoints() {
    pointsAnimator.start(0);
    localStorage.setItem("points", 0);
    updateStreak(0);
  }

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: !opened },
      }}
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} points={points} streak={streak} openPopover={openPointsPopover} setOpenPopover={setOpenPointsPopover} pointsAdded={pointsAdded} newsType={newsType} setPickingGamemode={setPickingGamemode}/>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar setPickingGamemode={setPickingGamemode} toggle={toggle} resetPoints={resetPoints}/>
      </AppShell.Navbar>

      <AppShell.Main>
        <GameScreen pickingGamemode={pickingGamemode} setPickingGamemode={setPickingGamemode} titleText={titleText} setTitleText={setTitleText} points={points} updatePoints={updatePoints} notifyStreakReset={notifyStreakReset} streak={streak} setStreak={updateStreak}/>
      </AppShell.Main>
    </AppShell>
  );
}

export default MainPage;