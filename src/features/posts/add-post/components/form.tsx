import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormHelperText, Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import JoditEditor from 'jodit-react';
import Dropzone from 'react-dropzone';
import { useForm, FormProvider, Controller } from 'react-hook-form';

import type { CreatePostPayload } from '../../validations/create-post';

import CreatableSelect from 'react-select/creatable';

import type { SubmitHandler } from 'react-hook-form/dist/types/form';

import { FormHeader, TextInput } from '../../../../components';
import { config } from '../../../../components/editor/Description';
import { FileInput } from '../../../../components/form/file-input';
import { createSXCollection } from '../../../../utils/mui';
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

const styles = createSXCollection({
  dropzoneContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    transition: 'border 0.24s ease-in-out',
    '&:active, &:hover': {
      borderColor: 'primary.main',
    },
  },
});

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

  console.log(methods.formState.errors);
  return (
    <Stack rowGap={3}>
      <FormHeader
        title="Create New Post"
        logo={false}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack rowGap={3}>
            <FileInput name="coverImage" />
            <p>{methods.formState.errors.coverImage?.message?.toString()}</p>
            {/* <Box sx={styles.dropzoneContainer}>
              <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </Box> */}

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
                {...methods.register('coverImage')}
              />
            </Button> */}
            {/* <Controller
              name="coverImage"
              control={methods.control}
              render={({ field }) => (
                // <Box sx={styles.dropzoneContainer}>
                <Dropzone 
                  onChange=
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
                // </Box>
              )}
            /> */}

            <TextInput
              name="title"
              placeholder="Title"
              // label="Title"
            />

            {/* <Controller
              name="description"
              control={methods.control}
              render={({ field: { value, onChange }, formState }) => (
                <Stack>
                  <Description
                    content={value}
                    setContent={onChange}
                  />
                  <FormHelperText
                    sx={{ ml: 1.75 }}
                    error={!!formState.errors.description}
                  >
                    {formState.errors.description?.message}
                  </FormHelperText>
                </Stack>
              )}
            /> */}

            <Controller
              name="description"
              control={methods.control}
              render={({ field }) => (
                <Stack>
                  <JoditEditor
                    config={config}
                    {...field}
                    ref={methods.register('description').ref}
                  />
                  <FormHelperText
                    sx={{ ml: 1.75 }}
                    error={!!methods.formState.errors.description}
                  >
                    {methods.formState.errors?.description?.message}
                  </FormHelperText>
                </Stack>
              )}
            />

            <Controller
              name="published_at"
              control={methods.control}
              render={({ field }) => (
                <DateTimePicker
                  label="Publish Date"
                  renderInput={(params) => (
                    <TextField
                      placeholder="Select Date"
                      ref={methods.register('published_at').ref}
                      error={!!methods.formState.errors.published_at}
                      helperText={
                        <span style={{ color: 'red' }}>{methods.formState.errors.published_at?.message}</span>
                      }
                      {...params}
                    />
                  )}
                  minDate={dayjs()}
                  {...field}
                />
              )}
            />

            <Controller
              control={methods.control}
              name="category"
              render={({ field, formState }) => (
                <Stack>
                  <CreatableSelect
                    {...field}
                    isClearable
                    options={options}
                    placeholder="Category"
                    ref={methods.register('category').ref}
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
                    error={!!formState.errors.category}
                  >
                    {formState.errors?.category && <>Please add a category</>}
                  </FormHelperText>
                </Stack>
              )}
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
        </form>
      </FormProvider>
    </Stack>
  );
};
export default Form;
