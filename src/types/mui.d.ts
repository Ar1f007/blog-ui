import type { SxProps } from '@mui/material';
import type { PaletteColorOptions, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    colorDark?: PaletteColorOptions;
    colorGrey?: PaletteColorOptions;
  }
}

export type Styles = SxProps<Theme>;
