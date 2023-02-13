import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => (
  <Container sx={{ py: 5 }}>
    <Outlet />
  </Container>
);
