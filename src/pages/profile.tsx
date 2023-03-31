import { Avatar, Box, Stack, Typography } from '@mui/material';

import { useAppSelector } from '../hooks/store';
import { createSXCollection } from '../utils';

const styles = createSXCollection({
  topBG: {
    backgroundColor: '#d1d1d1',
    height: '10vh',
  },
  profileContainer: {
    p: 4,
    position: 'relative',
  },
  photo: {
    width: '120px',
    height: '120px',
    border: '8px solid #d1d1d1',
    position: 'absolute',
    left: '50%',
    top: '-50%',
    transform: 'translate(-50%, -25%)',
  },
});

export const Profile = () => {
  const user = useAppSelector((s) => s.user.data);

  return (
    <Box>
      <Box sx={styles.topBG} />
      <Box>
        <Box sx={styles.profileContainer}>
          <Avatar
            src={user?.photo}
            alt={user?.firstName}
            sx={styles.photo}
          />
        </Box>
        <Stack
          rowGap={2}
          alignItems="center"
          mt={2}
        >
          <Typography
            variant="h6"
            component="h2"
            textTransform="capitalize"
            fontWeight={600}
          >
            {user?.firstName} {user?.lastName}
          </Typography>

          <Typography>s</Typography>
        </Stack>
      </Box>
    </Box>
  );
};
