import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useMemo, useState } from 'react';

import { useAppSelector } from '../hooks/store';

import { getDesignTokens } from './palette';

import type { PaletteMode } from '@mui/material';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ThemeProvider: FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const isDarkMode = useAppSelector((s) => s.theme.darkMode);

  useMemo(() => {
    if (isDarkMode) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [isDarkMode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
