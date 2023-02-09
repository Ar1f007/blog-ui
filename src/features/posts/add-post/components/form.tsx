import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { CreatePost } from '../../../../app/slices/posts/types';

import { toast } from 'react-toastify';

import type { CreatePostPayload } from '../../validations/create-post';
import type { SubmitHandler } from 'react-hook-form/dist/types/form';

import { getCategoriesAction } from '../../../../app/slices/categories/action';
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

const options: ReadonlyArray<{ value: string; label: string; __isNew__?: boolean; slug?: string }> = [
  { value: 'Option 1', label: 'Option 1' },
  { value: 'Option 2', label: 'Option 2' },
  { value: 'Option 3', label: 'Option 3' },
];

const Form = () => {
  const { data: category, loading: fetchingCategory, error: errorFetchingCategory } = useAppSelector((s) => s.category);
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
    if (!category.length) {
      actions.getCategoriesAction();
    }
  }, [actions, category]);

  if (errorFetchingCategory) {
    toast.error('Could not get categories. Try loading again.');
  }

  if (fetchingCategory) {
    return <p>Loading...</p>;
  }

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
            options={category}
          />

          <Select
            isMulti
            name="tags"
            label="Add tags (choose up to 3)"
            options={options}
            maxSelectableOption={3}
          />

          <LoadingButton
            variant="contained"
            type="submit"
            loading={methods.formState.isSubmitting}
          >
            Create
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default Form;
