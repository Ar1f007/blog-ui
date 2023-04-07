import dayjs from '../../../lib/dayjs';

import type { CreatePostWithoutImage } from '../../../app/slices/posts/types';
import type { CreatePostPayload } from '../validations/create-post';
import type { Dayjs } from 'dayjs';

type Tags = {
  ids: string[];
  newTagNames: string[];
};

export type CategoryOptions = {
  value: string;
  label: string;
  __isNew__?: boolean;
};

const getUTCDate = (date: Dayjs) => dayjs.utc(date).format();

const getFormattedCategoryValue = (
  category: CreatePostPayload['category'],
) => ({
  [category.__isNew__ ? 'newCategoryName' : 'categoryId']: category.value,
});

const getFormattedTagsValue = (tags: CreatePostPayload['tags']) => {
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

const formatPayload = (data: CreatePostPayload) => {
  let payload: Record<string, string | [] | object> = {};

  payload = {
    ...data,

    published_at: getUTCDate(data.published_at),

    category: getFormattedCategoryValue(data.category),

    tags: getFormattedTagsValue(data.tags),
  };

  return payload;
};

const getTransformedFormData = (data: CreatePostPayload) => {
  const fd = new FormData();

  fd.append('title', data.title);
  fd.append('description', data.description);
  fd.append('published_at', getUTCDate(data.published_at));
  fd.append(
    'category',
    JSON.stringify(getFormattedCategoryValue(data.category)),
  );
  fd.append('tags', JSON.stringify(getFormattedTagsValue(data.tags)));
  fd.append('coverImage', data.coverImage[0]);

  return fd;
};

export const getFormattedPayload = (data: CreatePostPayload) => {
  let payload: CreatePostWithoutImage | FormData;

  if (data.coverImage) {
    payload = getTransformedFormData(data);

    return payload;
  }

  delete data.coverImage;

  payload = formatPayload(data);

  return payload;
};
