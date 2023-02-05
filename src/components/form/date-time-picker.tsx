import { TextField } from '@mui/material';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import type { FC } from 'react';

type DateTimePickerProps = {
  name: string;
  minDate?: boolean;
};

export const DateTimePicker: FC<DateTimePickerProps> = ({ name, ...others }) => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <MuiDateTimePicker
          {...field}
          {...others}
          inputRef={field.ref}
          label="Select Date"
          renderInput={(params) => (
            <TextField
              placeholder={name}
              ref={register(name).ref}
              error={!!errors[name]}
              helperText={errors[name] ? errors[name]?.message?.toString() : ''}
              {...params}
            />
          )}
          minDate={others.minDate ? dayjs() : null}
        />
      )}
    />
  );
};
