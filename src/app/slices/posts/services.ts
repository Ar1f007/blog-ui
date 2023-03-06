import { POST_END_POINT } from '../../../constant';
import apiClient from '../../../lib/apiClient';

import type { CreatePost } from './types';

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

const fetchPosts = () => apiClient.get(POST_END_POINT);

const fetchSinglePost = (slug: string) =>
  apiClient.get(`${POST_END_POINT}/${slug}`);

const postApi = {
  createPost,
  fetchPosts,
  fetchSinglePost,
};

export default postApi;
