import { Container, Paper, Stack } from '@mui/material';

import FormHeader from '../features/authentication/components/FormHeader';
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
      <Paper sx={styles.formWrapper}>
        <FormHeader text="Hello there, Welcome!" />
      </Paper>
    </Container>
  </Stack>
);
