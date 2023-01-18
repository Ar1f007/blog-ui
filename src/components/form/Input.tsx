import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import type { TextFieldProps } from '@mui/material';
import type { FC } from 'react';

type InputProps = {
  name: string;
} & TextFieldProps;

const Input: FC<InputProps> = ({ name, ...others }) => {
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
