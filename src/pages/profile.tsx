import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import { useGetMyDetailsQuery } from '../app/slices/users/users-api';
import { useAppSelector } from '../hooks/store';
import { createSXCollection } from '../utils';
import { formatTime } from '../utils/dateTime';

const styles = createSXCollection({
  topBG: {
    backgroundColor: '#d1d1d1',
    height: '12vh',
  },
  profileContainer: {
    position: 'relative',
    p: 4,
  },
  photo: {
    width: '120px',
    height: '120px',
    border: '8px solid #d1d1d1',
    position: 'absolute',
    left: '50%',
    top: '-50%',
    transform: 'translate(-50%, -35%)',
  },
  wrapper: {
    position: 'relative',
  },

  mainContainer: {
    // position: 'absolute',
    // left: '50%',
    // top: '-50%',
    // transform: 'translate(-50%, -25%)',
    mt: '-5rem',
    width: '100%',
  },

  container: {
    p: 4,
    minHeight: '18vh',
    backgroundColor: '#f7f7f7',
    borderRadius: 2,
    boxShadow:
      '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  info: {
    borderRadius: 2,
    p: 6,
    boxShadow:
      '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  infoText: {
    color: 'colorGrey.main',
  },
});

export const Profile = () => {
  const user = useAppSelector((s) => s.user.data);
  const { isLoading, data } = useGetMyDetailsQuery(user?.id || '');

  return (
    <Box>
      <Box sx={styles.topBG} />

      <Box sx={styles.wrapper}>
        <Box sx={styles.mainContainer}>
          <Container
            maxWidth="md"
            sx={styles.container}
          >
            <Box sx={styles.profileContainer}>
              <Avatar
                src={data?.user.photo}
                alt={data?.user.firstName}
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
                {data?.user.firstName} {data?.user.lastName}
              </Typography>

              <Typography>{data?.user.bio}</Typography>

              {data?.user && (
                <Typography>
                  Joined {formatTime(data?.user.createdAt)}
                </Typography>
              )}
            </Stack>
          </Container>

          <Container
            maxWidth="sm"
            sx={styles.info}
          >
            <Stack rowGap={2}>
              {/* Basic */}
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={1}
                  textTransform="uppercase"
                >
                  Basic
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography sx={styles.infoText}>
                    <b>Email:</b> {data?.user.email}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                  >
                    Edit Profile
                  </Button>
                </Stack>

                <Stack
                  rowGap={1}
                  mt={1}
                >
                  <Typography sx={styles.infoText}>
                    <b>Website URL: </b>
                    {data?.user.website || 'N/A'}
                  </Typography>

                  <Typography sx={styles.infoText}>
                    <b>Location:</b> {data?.user.address || 'N/A'}
                  </Typography>
                </Stack>
              </Box>

              <Divider />

              {/* Work */}
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={1}
                  textTransform="uppercase"
                >
                  Work
                </Typography>

                <Typography sx={styles.infoText}>
                  <b>Education:</b> {data?.user.education || 'N/A'}
                </Typography>

                <Typography sx={styles.infoText}>
                  <b>Work:</b> {data?.user.work || 'N/A'}
                </Typography>
              </Box>
            </Stack>
            <Divider sx={{ mt: 2 }} />

            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              mt={3}
            >
              <Button
                variant="contained"
                color="error"
                size="small"
              >
                Deactivate Account
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
              >
                Delete Account
              </Button>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};
