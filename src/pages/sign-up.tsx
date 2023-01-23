import { Container, Paper, Stack } from '@mui/material';

import { FormHeader, SignUpForm } from '../features/authentication/components';
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

export const SignUp = () => (
  <Stack sx={styles.wrapper}>
    <Container maxWidth="sm">
      <Paper
        sx={styles.formWrapper}
        elevation={5}
      >
        <Stack spacing={3}>
          <FormHeader text="Hello there, Welcome!" />
          <SignUpForm />
        </Stack>
      </Paper>
    </Container>
  </Stack>
);
