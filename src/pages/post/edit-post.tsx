import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { Post } from '../../app/slices/posts/types';
import type { CreatePostPayload } from '../../features/posts/validations/create-post';

import { getCategoriesAction } from '../../app/slices/categories';
import { clearCurrentPostData, createPostAction } from '../../app/slices/posts';
import { getAllTagActions } from '../../app/slices/tags/action';
import {
  FileInput,
  FormHeader,
  FormProvider,
  Select,
  TextEditor,
  TextInput,
} from '../../components';
import { createPostSchema } from '../../features/posts/validations/create-post';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

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
        value: post.category.slug,
        label: post.category.name,
        __isNew__: false,
      },
      tags: post.tags.map((tag) => ({
        value: tag.slug,
        label: tag.name,
        __isNew__: false,
      })),
    },
    resolver: zodResolver(createPostSchema),
  });

  useEffect(() => {
    if (!category.length) {
      actions.getCategoriesAction();
    }

    if (!tag.length) {
      actions.getAllTagActions();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit() {
    //
  }

  if (errorFetchingCategory || errorFetchingTag) {
    toast.error('Could not load category/tag list. Please try re-loading', {
      toastId: 'toast1',
    });
  }

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
          <FileInput name="coverImage" />

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
