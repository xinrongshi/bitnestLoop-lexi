"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TransactionProvider } from './context/TransactionContext';
import { InviteContextProvider } from './context/InviteContext';
import dynamic from 'next/dynamic';
import createEmotionCache from './createEmotionCache';
import { CacheProvider } from '@emotion/react';
import i18n from '../i18n';

const Footer = dynamic(() => import("./components/Footer"), { ssr: false });
const AppBar = dynamic(() => import("./components/AppBar"), { ssr: false });
const inter = Inter({ subsets: ["latin"] });

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F0B90B',
    },
    secondary: {
      main: '#1E88E5',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

const RootLayout = ({ children, emotionCache = clientSideEmotionCache }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CacheProvider value={emotionCache}>
          <InviteContextProvider>
            <TransactionProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar />
                {children}
                <Footer />
              </ThemeProvider>
            </TransactionProvider>
          </InviteContextProvider>
        </CacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
