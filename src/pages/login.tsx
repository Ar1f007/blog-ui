import { Stack } from '@mui/material';

import { FormHeader } from '../components';
import { LoginForm } from '../features/authentication/components';

const Login = () => (
  <Stack spacing={3}>
    <FormHeader title="Welcome Back!" />
    <LoginForm />
  </Stack>
);
export default Login;
