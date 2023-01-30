import { Container, Paper, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

const PostLayout = () => (
  <Stack
    sx={{
      minHeight: '100svh',
      justifyContent: 'center',
    }}
  >
    <Container maxWidth="sm">
      <Paper
        elevation={5}
        sx={{ p: 3 }}
      >
        <Outlet />
      </Paper>
    </Container>
  </Stack>
);
export default PostLayout;
