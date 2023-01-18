import type { SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';

export const createSXCollection = <T extends Record<string, SxProps<Theme>>>(styles: T) => styles;
