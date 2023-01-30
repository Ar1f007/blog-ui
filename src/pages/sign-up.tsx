import { Stack } from '@mui/material';

import { FormHeader } from '../components';
import { SignUpForm } from '../features/authentication/components';

export const SignUp = () => (
  <Stack spacing={3}>
    <FormHeader title="Hello there, Welcome!" />
    <SignUpForm />
  </Stack>
);
