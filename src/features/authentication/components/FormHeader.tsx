import { Stack, Box, Typography } from '@mui/material';

import Logo from '../../../components/ui/Logo';
import { createSXCollection } from '../../../utils/mui';

import type { FormHeaderProps } from '../types';
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

const FormHeader: FC<FormHeaderProps> = ({ text }) => (
  <Stack sx={styles.formHeader}>
    <Box sx={styles.logoWrapper}>
      <Logo />
    </Box>

    {text && (
      <Typography
        variant="h5"
        component="h1"
      >
        {text}
      </Typography>
    )}
  </Stack>
);

export default FormHeader;
