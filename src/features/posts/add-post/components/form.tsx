import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getCategoriesAction } from '../../../../app/slices/categories';
import {
  createPostAction,
  clearCurrentPostData,
} from '../../../../app/slices/posts';
import { getAllTagActions } from '../../../../app/slices/tags/action';
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
import { attachValidationErrors } from '../../../../utils';
import { getFormattedPayload } from '../../helpers';
import { createPostSchema } from '../../validations/create-post';

import type { CreatePost } from '../../../../app/slices/posts/types';
import type { CreatePostPayload } from '../../validations/create-post';
import type { SubmitHandler } from 'react-hook-form/dist/types/form';

// --------------------------------------------------------------------------------------------
const Form = () => {
  const {
    data: category,
    loading: fetchingCategory,
    error: errorFetchingCategory,
  } = useAppSelector((s) => s.category);

  const {
    data: tag,
    status: fetchingTag,
    error: errorFetchingTag,
  } = useAppSelector((s) => s.tag);

  const {
    currentPost: postCreatedSuccessfully,
    loading: creatingPost,
    error,
  } = useAppSelector((s) => s.post);

  const navigate = useNavigate();

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

    if (!tag.length) {
      actions.getAllTagActions();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message, {
        toastId: 'error',
      });
    }

    if (error?.errors) {
      attachValidationErrors<CreatePostPayload>(error.errors, methods);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (postCreatedSuccessfully) {
      methods.reset();
      actions.clearCurrentPostData();
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postCreatedSuccessfully]);

  if (errorFetchingCategory || errorFetchingTag) {
    toast.error('Could not load category/tag list. Please try re-loading', {
      toastId: 'toast1',
    });
  }

  // if (fetchingCategory === 'pending' || fetchingTag === 'pending') {
  //   return <p>Loading...</p>;
  // }

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
            options={tag}
            maxSelectableOption={3}
          />

          <LoadingButton
            variant="contained"
            type="submit"
            loading={creatingPost}
          >
            Create
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default Form;
