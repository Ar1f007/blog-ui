import { Stack } from '@mui/material';

import { FormHeader, LoginForm } from '../features/authentication/components';

const Login = () => (
  <Stack spacing={3}>
    <FormHeader text="Welcome back!" />
    <LoginForm />
  </Stack>
);
export default Login;
