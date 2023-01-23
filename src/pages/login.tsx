import { Container, Paper, Stack } from '@mui/material';

import { FormHeader, LoginForm } from '../features/authentication/components';
import { createSXCollection } from '../utils/mui';

const styles = createSXCollection({
  wrapper: {
    height: '100svh',
    justifyContent: 'center',
  },

  formWrapper: {
    padding: 3,
  },
});

const Login = () => (
  <Stack sx={styles.wrapper}>
    <Container maxWidth="sm">
      <Paper
        sx={styles.formWrapper}
        elevation={5}
      >
        <Stack spacing={3}>
          <FormHeader text="Welcome back!" />
          <LoginForm />
        </Stack>
      </Paper>
    </Container>
  </Stack>
);
export default Login;
