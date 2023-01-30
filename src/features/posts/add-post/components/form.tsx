import { Button, Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

import { FormHeader, TextInput } from '../../../../components';
import Description from '../../../../components/editor/Description';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export type CategoryOption = {
  readonly value: string;
  readonly label: string;
};

export const options: readonly CategoryOption[] = [
  { value: 'js', label: 'Javascript' },
  { value: 'react', label: 'React' },
  { value: 'node', label: 'Node JS' },
];

const Form = () => {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Stack rowGap={3}>
      <FormHeader
        title="Create New Post"
        logo={false}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack rowGap={3}>
            {/* <Button
            variant="contained"
            component="label"
            sx={{
              width: 'fit-content',
              textTransform: 'unset',
            }}
          >
            Upload a cover image
            <input
              type="file"
              accept="image/*"
              hidden
            />
          </Button> */}

            <TextInput
              name="title"
              label="Title"
            />

            <Controller
              name="description"
              control={methods.control}
              render={({ field: { value, onChange } }) => (
                <Description
                  content={value}
                  setContent={onChange}
                />
              )}
            />

            <Controller
              name="published_at"
              control={methods.control}
              defaultValue={null}
              render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                <DateTimePicker
                  label="Publish Date"
                  inputRef={ref}
                  renderInput={(params) => (
                    <TextField
                      placeholder="Select Date"
                      error={!!error}
                      helperText={error?.message}
                      {...params}
                    />
                  )}
                  minDate={dayjs()}
                  value={value}
                  onChange={onChange}
                  onOpen={() => onChange(() => dayjs())}
                />
              )}
            />

            <Controller
              control={methods.control}
              name="category"
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isClearable
                  options={options}
                  placeholder="Category"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: '#FDA214',
                    },
                  })}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      paddingBlock: '8px',
                    }),
                  }}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};
export default Form;
