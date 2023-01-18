import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import type { FC } from 'react';

type TextFieldProps = {
  name: string;
} & MuiTextFieldProps;

const Input: FC<TextFieldProps> = ({ name, ...others }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...others}
          {...field}
          error={!!errors[name]}
          helperText={errors[name] ? errors[name]?.message?.toString() : ''}
        />
      )}
    />
  );
};

export default Input;
