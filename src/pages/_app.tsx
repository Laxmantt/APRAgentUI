import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '@/store';
import { GlobalStyle } from '@/styles/global';
import { lightTheme, darkTheme } from '@/styles/theme';
import { useEffect, useState, createContext, useContext } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ChatProvider } from '@/contexts/ChatContext';
import { appConfig } from '@/config/appConfig';

// Initialize MSW
if (typeof window !== 'undefined' && appConfig.api.useMocks) {
  const { worker } = require('@/mock-services/browser');
  worker.start();
}

// Simple Theme Context
export const ThemeToggleContext = createContext({
  toggleTheme: () => { },
  mode: 'light',
});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <Provider store={store}>
      <ThemeToggleContext.Provider value={{ toggleTheme, mode }}>
        <ThemeProvider theme={(mode === 'light' ? lightTheme : darkTheme) as any}>
          <ChatProvider>
            <GlobalStyle />
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </ChatProvider>
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </Provider>
  );
}
