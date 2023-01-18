import { LoadingButton } from '@mui/lab';
import { Box, Stack, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Icons from '../../../assets/icons';
import Input from '../../../components/form/Input';
import Icon from '../../../components/ui/Icon';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack spacing={3}>
          <Input
            name="username"
            label="Username"
            autoComplete="off"
          />

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

          <LoadingButton
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            // loading={isSubmitting}
          >
            Sign up
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
};
export default SignUpForm;
