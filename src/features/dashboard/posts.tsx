import { Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import paths from '../../routes/paths';

import Stats from './stats';

export const PostStats = () => {
  const url = useLocation();

  const currentPath = url.pathname;
  const showStats =
    currentPath === `${paths.dashboard.index}` ? <Stats /> : null;

  return (
    <>
      <Stack rowGap={3}>
        <Typography variant="h4">Dashboard</Typography>
        {showStats}
      </Stack>
    </>
  );
};
