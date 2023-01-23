import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Stack } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Icons from '../../../assets/icons';
import Input from '../../../components/form/Input';

import type { LoginInputs } from '../validations/login';

import Icon from '../../../components/ui/Icon';

import type { SubmitHandler } from 'react-hook-form';

import loginSchema from '../validations/login';

const Form = () => {
  const methods = useForm<LoginInputs>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    //
  };

  return (
    <>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <Input
              name="email"
              label="Email"
              fullWidth
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

            <LoadingButton
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              // loading={loading}
            >
              Login
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
    </>
  );
};
export default Form;
