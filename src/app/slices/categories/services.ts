import { GET_ALL_CATEGORIES } from '../../../constant';
import apiClient from '../../../lib/apiClient';

const getCategories = () => apiClient(GET_ALL_CATEGORIES);

const categoryApi = {
  getCategories,
};

export default categoryApi;
