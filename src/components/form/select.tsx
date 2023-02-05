import { FormHelperText, Stack } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

import { PRIMARY_COLOR } from '../../constant';

type SelectOption = {
  value: string;
  label: string;
  __isNew__: boolean;
};

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
          <FormHelperText
            sx={{ ml: 1.75 }}
            error={!!errors[name]}
          >
            add a {name}
          </FormHelperText>
        </Stack>
      )}
    />
  );
};
