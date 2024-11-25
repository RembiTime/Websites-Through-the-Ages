import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import MainPage from './Components/MainPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <MainPage />
    </MantineProvider>
  </StrictMode>,
)
