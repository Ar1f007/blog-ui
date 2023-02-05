import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormHelperText, Stack } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { useForm, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

import type { CreatePostPayload } from '../../validations/create-post';
import type { SubmitHandler } from 'react-hook-form/dist/types/form';

import {
  FormHeader,
  TextInput,
  FileInput,
  FormProvider,
  DateTimePicker,
  TextEditor,
  Select,
} from '../../../../components';
import { createPostSchema } from '../../validations/create-post';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export type CategoryOption = {
  value: string;
  label: string;
  __isNew__?: boolean;
};

const options: ReadonlyArray<{ value: string; label: string; __isNew__: boolean }> = [
  { value: 'Option 1', label: 'Option 1', __isNew__: false },
  { value: 'Option 2', label: 'Option 2', __isNew__: false },
  { value: 'Option 3', label: 'Option 3', __isNew__: false },
];

const Form = () => {
  const methods = useForm<CreatePostPayload>({
    mode: 'onTouched',
    defaultValues: {
      title: '',
      category: undefined,
      description: '',
      published_at: dayjs(),
      tags: undefined,
      coverImage: undefined,
    },
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit: SubmitHandler<CreatePostPayload> = (data) => {
    console.log(data);
  };

  return (
    <Stack rowGap={3}>
      <FormHeader
        title="Create New Post"
        logo={false}
      />
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack rowGap={3}>
          <Stack>
            <FileInput name="coverImage" />
            <FormHelperText
              sx={{ ml: 1.75 }}
              error={!!methods.formState.errors.coverImage}
            >
              {methods.formState.errors.coverImage?.message?.toString()}
            </FormHelperText>
          </Stack>

          <TextInput
            name="title"
            placeholder="Title"
          />

          <TextEditor name="description" />

          <DateTimePicker
            name="published_at"
            minDate
          />

          <Select
            name="category"
            label="Category"
            options={options}
          />

          <Controller
            control={methods.control}
            name="tags"
            render={({ field, formState }) => (
              <Stack>
                <CreatableSelect
                  {...field}
                  isClearable
                  isMulti
                  options={options}
                  placeholder="Tag (choose upto 3 tags)"
                  ref={methods.register('tags').ref}
                  isOptionDisabled={() => field?.value?.length >= 3}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: '#FDA214',
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
                  error={!!formState.errors.tags}
                >
                  {formState.errors?.tags && <>Please add tags(up to 3)</>}
                </FormHelperText>
              </Stack>
            )}
          />

          <Button
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};
export default Form;
