import type { PaletteMode, PaletteOptions, ThemeOptions } from '@mui/material';

const common: ThemeOptions = {
  typography: {
    htmlFontSize: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#fff',
        },
      },
    },
  },
};

const lightPalette: PaletteOptions = {
  background: {
    default: '#EFF1F5',
  },

  primary: {
    main: '#FDA214',
  },
};

const darkPalette: PaletteOptions = {
  background: {
    default: '#0E141B',
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  ...common,
  palette: {
    mode,
    ...(mode === 'light' ? lightPalette : darkPalette),
  },
});
