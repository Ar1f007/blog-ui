import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormHelperText, Stack } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { useForm } from 'react-hook-form';

import type { CreatePostPayload } from '../../validations/create-post';

import {
  FormHeader,
  TextInput,
  FileInput,
  FormProvider,
  DateTimePicker,
  TextEditor,
  Select,
  MultiSelect,
} from '../../../../components';

import type { SubmitHandler } from 'react-hook-form/dist/types/form';

import { createPostSchema } from '../../validations/create-post';

dayjs.extend(utc);
dayjs.extend(relativeTime);

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
          <FileInput name="coverImage" />

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

          <MultiSelect
            name="tags"
            label="Add tags (choose up to 3)"
            options={options}
            maxSelectableOption={3}
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
