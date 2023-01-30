import { Stack, Box, Typography } from '@mui/material';

import { createSXCollection } from '../../utils/mui';
import Logo from '../ui/Logo';

import type { FormHeaderProps } from '../../types/form';
import type { FC } from 'react';

const styles = createSXCollection({
  formHeader: {
    alignItems: 'center',
  },
  logoWrapper: {
    width: '20rem',
    marginInline: 'auto',
  },
});

export const FormHeader: FC<FormHeaderProps> = ({ title, logo = true }) => (
  <Stack sx={styles.formHeader}>
    {logo && (
      <Box sx={styles.logoWrapper}>
        <Logo />
      </Box>
    )}

    {title && (
      <Typography
        variant="h5"
        component="h1"
        fontWeight="500"
      >
        {title}
      </Typography>
    )}
  </Stack>
);
