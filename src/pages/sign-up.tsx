import { Stack } from '@mui/material';

import { FormHeader, SignUpForm } from '../features/authentication/components';

export const SignUp = () => (
  <Stack spacing={3}>
    <FormHeader text="Hello there, Welcome!" />
    <SignUpForm />
  </Stack>
);
