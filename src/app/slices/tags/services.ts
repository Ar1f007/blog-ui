import { GET_ALL_TAGS } from '../../../constant';
import apiClient from '../../../lib/apiClient';

const getAllTags = () => apiClient(GET_ALL_TAGS);

const categoryApi = {
  getAllTags,
};

export default categoryApi;
