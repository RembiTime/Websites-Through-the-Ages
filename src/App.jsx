// import { useState } from 'react'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.css'
import MainPage from './Components/MainPage';

function App() {

  return (
    <MantineProvider defaultColorScheme="dark">
      <MainPage />
    </MantineProvider>
  )
}

export default App
