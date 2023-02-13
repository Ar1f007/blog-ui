import { Paper, Stack, Typography } from '@mui/material';

import { createSXCollection } from '../../utils';

import type { StatCardProps } from '../../types';

const styles = createSXCollection({
  paper: {
    p: 3,
  },
  total: {
    fontSize: '3rem',
    fontWeight: 'bold',
  },
});

export const StatCard = ({ title, total }: StatCardProps) => (
  <Paper sx={styles.paper}>
    <Stack>
      <Typography
        component="strong"
        sx={styles.total}
      >
        {total}
      </Typography>
      <Typography>{title}</Typography>
    </Stack>
  </Paper>
);
