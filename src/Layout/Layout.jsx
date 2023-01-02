import React from 'react';
import './css/style.css'
import Header from '../components/MainPage/components/Header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#444a57',
      light: '#5e697f',
      dark: '#282c34',
      contrastText: '#eceff1'
    },
  }
})

export function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Outlet />
    </ThemeProvider>
  )
}
