import { Container, Grid, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '../features/dashboard/sidebar';

export const Dashboard = () => (
  <Container sx={{ py: 5 }}>
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        xs={12}
        lg={3}
      >
        <Typography
          variant="h5"
          mb={2}
          component="h2"
          fontWeight="bold"
        >
          Dashboard
        </Typography>
        <Sidebar />
      </Grid>

      <Grid
        item
        xs={12}
        lg={9}
      >
        <Outlet />
      </Grid>
    </Grid>
  </Container>
);
