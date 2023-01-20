import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, IconButton, InputAdornment, Typography } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import type { SignUpInputs } from '../validations/sign-up';

import { registerUserAction } from '../../../app/slices/users/action';
import Icons from '../../../assets/icons';

import type { SubmitHandler } from 'react-hook-form';

import Input from '../../../components/form/Input';
import Icon from '../../../components/ui/Icon';
import { useAppDispatch } from '../../../hooks/store';
import paths from '../../../routes/paths';
import signUpSchema from '../validations/sign-up';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();

  const methods = useForm<SignUpInputs>({
    mode: 'onTouched',
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      dispatch(registerUserAction(data));
    } catch (err) {
      /* empty */
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
          >
            <Input
              name="firstName"
              label="First name"
              fullWidth
            />
            <Input
              name="lastName"
              label="Last name"
              fullWidth
            />
          </Stack>

          <Input
            name="username"
            label="Username"
          />

          <Input
            name="email"
            label="Email"
          />

          <Input
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    <Icon icon={showPassword ? <Icons.Visibility /> : <Icons.VisibilityOff />} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Input
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle password visibility"
                  >
                    <Icon icon={showConfirmPassword ? <Icons.Visibility /> : <Icons.VisibilityOff />} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography
              variant="body2"
              component="span"
            >
              Already have an account?&nbsp;
              <Box
                component={Link}
                to={paths.login}
                sx={{ color: 'primary.main', fontWeight: 500 }}
              >
                Login
              </Box>
            </Typography>
          </Stack>

          <LoadingButton
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            // loading={isSubmitting}
          >
            Create Account
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
};
export default SignUpForm;
