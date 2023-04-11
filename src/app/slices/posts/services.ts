import { POST_END_POINT, IS_LIKED_POST } from '../../../constant';
import apiClient from '../../../lib/apiClient';

import type { CreatePost, IsLikedQuery, UpdatePost } from './types';

const createPost = ({ payload, coverImgIncluded }: CreatePost) => {
  const url = POST_END_POINT + `${coverImgIncluded ? '' : '/create'}`;

  return apiClient.post(url, payload, {
    headers: {
      'Content-Type': coverImgIncluded
        ? 'multipart/form-data'
        : 'application/json',
    },
  });
};

const updatePost = ({ payload, coverImgIncluded, postId }: UpdatePost) => {
  const url =
    POST_END_POINT +
    `${coverImgIncluded ? `/update/${postId}` : `/update/no-image/${postId}`}`;

  return apiClient.patch(url, payload, {
    headers: {
      'Content-Type': coverImgIncluded
        ? 'multipart/form-data'
        : 'application/json',
    },
  });
};

const fetchPosts = () => apiClient.get(POST_END_POINT);

const fetchSinglePost = (slug: string) =>
  apiClient.get(`${POST_END_POINT}/${slug}`);

const isPostLiked = ({ userId, postId }: IsLikedQuery) =>
  apiClient.get(`${IS_LIKED_POST}/${postId}/${userId}`);

const postApi = {
  createPost,
  fetchPosts,
  fetchSinglePost,
  isPostLiked,
  updatePost,
};

export default postApi;
