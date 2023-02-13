import { Container, Grid } from '@mui/material';
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
