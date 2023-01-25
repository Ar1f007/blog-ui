import { Container, Paper, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { createSXCollection } from '../../../utils/mui';

const styles = createSXCollection({
  wrapper: {
    height: '100svh',
    justifyContent: 'center',
  },

  formWrapper: {
    padding: 3,
  },
});

const AuthLayout = () => (
  <Stack sx={styles.wrapper}>
    <Container maxWidth="sm">
      <Paper
        sx={styles.formWrapper}
        elevation={5}
      >
        <Outlet />
      </Paper>
    </Container>
  </Stack>
);
export default AuthLayout;
