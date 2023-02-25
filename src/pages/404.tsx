import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import img from '../assets/images/404.svg';
import paths from '../routes/paths';

export const Error_404 = () => (
  <Container maxWidth="sm">
    <Box
      p={3}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack rowGap={3}>
        <Box
          component="img"
          src={img}
          alt="404 - page not found"
          sx={{
            display: 'block',
            maxWidth: '600px',
            width: '100%',
          }}
        />

        <Typography
          variant="h6"
          textAlign="center"
        >
          Sorry the page you are looking for is not available!
        </Typography>

        <Stack alignItems="center">
          <Button
            component={Link}
            to={paths.home}
            variant="outlined"
            sx={{
              width: 'fit-content',
            }}
          >
            Go Back Home
          </Button>
        </Stack>
      </Stack>
    </Box>
  </Container>
);
