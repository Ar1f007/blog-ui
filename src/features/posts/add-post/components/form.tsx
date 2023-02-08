import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/material';
import { bindActionCreators } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';

import type { CreatePost } from '../../../../app/slices/posts/types';

import { useForm } from 'react-hook-form';

import type { CreatePostPayload } from '../../validations/create-post';
import type { Dayjs } from 'dayjs';
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
import { createPostSchema } from '../../validations/create-post';

dayjs.extend(utc);
dayjs.extend(relativeTime);

type Tags = {
  ids: string[];
  newTagNames: string[];
};

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

  const getUtcDate = (date: Dayjs) => dayjs.utc(date).format();

  const getCategory = (category: CreatePostPayload['category']) => ({
    [category.__isNew__ ? 'newCategoryName' : 'categoryId']: category.value,
  });

  const getTags = (tags: CreatePostPayload['tags']) => {
    const result: Tags = tags.reduce(
      (acc, tag) => {
        if (tag.__isNew__) {
          acc.newTagNames.push(tag.value);
        } else {
          acc.ids.push(tag.value);
        }

        return acc;
      },
      { ids: [], newTagNames: [] } as Tags,
    );

    return result;
  };

  const transformData = (data: CreatePostPayload) => {
    let payload: Record<string, string | [] | object> = {};

    payload = {
      ...data,

      published_at: getUtcDate(data.published_at),

      category: getCategory(data.category),

      tags: getTags(data.tags),
    };

    return payload;
  };

  const savePost = ({ payload, coverImgIncluded }: CreatePost) => {
    actions.createPostAction({
      payload,
      coverImgIncluded,
    });
  };

  const onSubmit: SubmitHandler<CreatePostPayload> = async (data) => {
    if (!data.coverImage) {
      delete data.coverImage;
      const payload = transformData(data);

      savePost({
        payload,
        coverImgIncluded: false,
      });

      return;
    }

    const fd = new FormData();

    fd.append('title', data.title);
    fd.append('description', data.description);
    fd.append('published_at', getUtcDate(data.published_at));
    fd.append('category', JSON.stringify(getCategory(data.category)));
    fd.append('tags', JSON.stringify(getTags(data.tags)));
    fd.append('coverImage', data.coverImage[0]);

    savePost({
      payload: fd,
      coverImgIncluded: true,
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
