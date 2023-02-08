import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { CreatePost } from '../../../../app/slices/posts/types';
import type { CreatePostPayload } from '../../validations/create-post';

import { getCategoriesAction } from '../../../../app/slices/categories/action';

import type { SubmitHandler } from 'react-hook-form/dist/types/form';

import { createPostAction } from '../../../../app/slices/posts/actions';
import {
  FormHeader,
  TextInput,
  FileInput,
  FormProvider,
  DateTimePicker,
  TextEditor,
  Select,
} from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks/store';
import { getFormattedPayload } from '../../helpers';
import { createPostSchema } from '../../validations/create-post';

const options: ReadonlyArray<{ value: string; label: string; __isNew__?: boolean }> = [
  { value: 'Option 1', label: 'Option 1' },
  { value: 'Option 2', label: 'Option 2' },
  { value: 'Option 3', label: 'Option 3' },
];

const Form = () => {
  const category = useAppSelector((s) => s.category.data);
  const dispatch = useAppDispatch();

  const actions = bindActionCreators({ getCategoriesAction, createPostAction }, dispatch);

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

  const savePost = ({ payload, coverImgIncluded }: CreatePost) => {
    actions.createPostAction({
      payload,
      coverImgIncluded,
    });
  };

  const onSubmit: SubmitHandler<CreatePostPayload> = async (data) => {
    const payload = getFormattedPayload(data);

    savePost({
      payload,
      coverImgIncluded: !!data.coverImage,
    });
  };

  useEffect(() => {
    if (!category) {
      actions.getCategoriesAction();
    }
  }, [category, actions]);

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

          <Select
            isMulti
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
