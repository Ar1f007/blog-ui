import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import type { Post } from '../../app/slices/posts/types';

import { toast } from 'react-toastify';

import type { CreatePostPayload } from '../../features/posts/validations/create-post';
import type { SubmitHandler } from 'react-hook-form';

import { getCategoriesAction } from '../../app/slices/categories';
import { clearCurrentPostData, createPostAction } from '../../app/slices/posts';
import { getAllTagActions } from '../../app/slices/tags/action';
import {
  DateTimePicker,
  FileInput,
  FormHeader,
  FormProvider,
  Select,
  TextEditor,
  TextInput,
} from '../../components';
import { getFormattedPayload } from '../../features/posts/helpers';
import { createPostSchema } from '../../features/posts/validations/create-post';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import dayjs from '../../lib/dayjs';

export const EditPost = () => {
  const { state } = useLocation();
  const post = state.post as Post;

  const { data: category, error: errorFetchingCategory } = useAppSelector(
    (s) => s.category,
  );

  const { data: tag, error: errorFetchingTag } = useAppSelector((s) => s.tag);

  const dispatch = useAppDispatch();

  const actions = bindActionCreators(
    {
      getCategoriesAction,
      getAllTagActions,
      createPostAction,
      clearCurrentPostData,
    },
    dispatch,
  );

  const methods = useForm<CreatePostPayload>({
    mode: 'onTouched',
    defaultValues: {
      title: post.title,
      description: post.description,
      category: {
        value: post.category._id,
        label: post.category.name,
        __isNew__: false,
      },
      tags: post.tags.map((tag) => ({
        value: tag._id,
        label: tag.name,
        __isNew__: false,
      })),
      coverImage: undefined,
      published_at: dayjs(new Date(post.published_at)),
    },
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit: SubmitHandler<CreatePostPayload> = (data) => {
    // const payload = getFormattedPayload(data);
    // if (data.coverImage) {
    // }
  };

  if (errorFetchingCategory || errorFetchingTag) {
    toast.error('Could not load category/tag list. Please try re-loading', {
      toastId: 'toast1',
    });
  }

  const newImage = methods.getValues('coverImage');

  useEffect(() => {
    if (!category.length) {
      actions.getCategoriesAction();
    }

    if (!tag.length) {
      actions.getAllTagActions();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.post) return null;

  return (
    <Stack rowGap={3}>
      <FormHeader
        title="Edit Post"
        logo={false}
      />

      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack rowGap={3}>
          {!newImage && (
            <Box
              component="img"
              src={post.coverImage}
              alt={post.title}
            />
          )}

          <FileInput name="coverImage" />

          <Box sx={{ display: 'none' }}>
            <DateTimePicker name="published_at" />
          </Box>

          <TextInput
            name="title"
            placeholder="Title"
          />

          <TextEditor name="description" />

          <Select
            name="category"
            label="Category"
            options={category}
          />

          <Select
            isMulti
            name="tags"
            label="Add tags (choose up to 3)"
            options={tag}
            maxSelectableOption={3}
          />

          <LoadingButton
            variant="contained"
            type="submit"
            // loading={creatingPost}
          >
            Update
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
};
