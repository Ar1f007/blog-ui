import { FormHelperText, Stack } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

import { PRIMARY_COLOR } from '../../constant';

import type { SelectOption } from '../../types/form';

type Props = {
  label: string;
  name: string;
  options: ReadonlyArray<SelectOption>;
  isMulti?: boolean;
  maxSelectableOption?: number;
};

export const Select = ({ name, label, options, isMulti = false, maxSelectableOption = 3 }: Props) => {
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
            isMulti={isMulti}
            isOptionDisabled={() => field?.value?.length >= maxSelectableOption}
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
              {isMulti ? errors[name]?.message?.toString() : `Add/create a ${name}`}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
};
