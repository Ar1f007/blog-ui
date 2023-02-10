import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { LoginFields } from '../../../app/slices/users/types';
import type { LoginInputs } from '../validations/login';

import { loginUserAction } from '../../../app/slices/users/action';

import type { SubmitHandler } from 'react-hook-form';

import { clearError } from '../../../app/slices/users/slice';
import Icons from '../../../assets/icons';
import Input from '../../../components/form/Input';
import Icon from '../../../components/ui/Icon';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { attachValidationErrors } from '../../../utils';
import loginSchema from '../validations/login';

import LoginFormFooter from './login-form-footer';

// --------------------------------------------------------------------

const Form = () => {
  const methods = useForm<LoginInputs>({
    mode: 'onTouched',
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { data: userData, loading, error } = useAppSelector((s) => s.user);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    await dispatch(loginUserAction(data));
  };

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message);

      dispatch(clearError());
      return;
    }

    if (error?.errors) {
      attachValidationErrors<LoginInputs>(
        error.errors as { fieldName: LoginFields; message: string }[],
        methods,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (userData) {
      methods.reset();
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <Input
              name="emailOrUsername"
              label="Email or Username"
              fullWidth
              autoComplete="off"
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
                      <Icon
                        icon={
                          showPassword ? (
                            <Icons.Visibility />
                          ) : (
                            <Icons.VisibilityOff />
                          )
                        }
                      />
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
              loading={loading}
            >
              Login
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
      <LoginFormFooter />
    </>
  );
};
export default Form;
