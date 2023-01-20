import { REGISTER_ENDPOINT } from '../../../constant';
import apiClient from '../../../lib/apiClient';

import type { RegisterPayload } from './types';

const register = (data: RegisterPayload) => apiClient.post(REGISTER_ENDPOINT, data);

const userApi = {
  register,
};

export default userApi;
