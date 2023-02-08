import { CREATE_POST } from '../../../constant';
import apiClient from '../../../lib/apiClient';

import type { CreatePost } from './types';

const createPost = ({ payload, coverImgIncluded }: CreatePost) => {
  const url = CREATE_POST + `${!coverImgIncluded ? '/create' : ''}`;

  return apiClient.post(url, payload, {
    headers: { 'Content-Type': coverImgIncluded ? 'multipart/form-data' : 'application/json' },
  });
};

const postApi = {
  createPost,
};

export default postApi;
