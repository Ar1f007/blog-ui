import type { PaletteMode, PaletteOptions } from '@mui/material';

const common = {
  typography: {
    htmlFontSize: 10,
  },
};

const lightPalette: PaletteOptions = {
  background: {
    default: '#EFF1F5',
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
