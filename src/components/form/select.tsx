import { FormHelperText, Stack } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

import { PRIMARY_COLOR } from '../../constant';

import type { SelectOption } from '../../types/form';

type Props = {
  label: string;
  name: string;
  options: ReadonlyArray<SelectOption>;
};

export const Select = ({ name, label, options }: Props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Stack>
          <CreatableSelect
            {...field}
            isClearable
            options={options}
            placeholder={label}
            ref={register(name).ref}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: PRIMARY_COLOR,
              },
            })}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                paddingBlock: '8px',
              }),
            }}
          />
          {hasError && (
            <FormHelperText
              sx={{ ml: 1.75 }}
              error={hasError}
            >
              Add/create a {name}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
};
