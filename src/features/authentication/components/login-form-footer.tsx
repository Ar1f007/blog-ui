import { Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import paths from '../../../routes/paths';

const LoginFormFooter = () => (
  <Stack
    direction="row"
    justifyContent="space-between"
  >
    <Link
      to={paths.forgotPassword}
      className="link-text"
    >
      Forgot Password?
    </Link>
    <Box sx={{ fontSize: '1.4rem' }}>
      Don&apos;t have account?{' '}
      <Link
        to={paths.signUp}
        className="link-text"
      >
        Create Account
      </Link>
    </Box>
  </Stack>
);
export default LoginFormFooter;
