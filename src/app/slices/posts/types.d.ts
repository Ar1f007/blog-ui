import type { CreatePostPayload } from '../../../features/posts/validations/create-post';

type CreatePostWithoutImage = Record<string, string | object | []>;

export type CreatePost = {
  payload: CreatePostWithoutImage | FormData;
  coverImgIncluded: boolean;
};
