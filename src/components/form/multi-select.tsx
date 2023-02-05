import { FormHelperText, Stack } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

import { PRIMARY_COLOR } from '../../constant';

import type { SelectOption } from '../../types/form';

type Props = {
  label: string;
  name: string;
  options: ReadonlyArray<SelectOption>;
  maxSelectableOption: number;
};

export const MultiSelect = ({ name, label, options, maxSelectableOption }: Props) => {
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
            isMulti
            options={options}
            placeholder={label}
            ref={register(name).ref}
            isOptionDisabled={() => field?.value?.length >= maxSelectableOption}
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
              {errors[name]?.message?.toString()}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
};
