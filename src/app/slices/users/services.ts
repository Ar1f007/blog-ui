import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../../../constant';
import apiClient from '../../../lib/apiClient';

import type { RegisterPayload } from './types';
import type { LoginInputs } from '../../../features/authentication/validations/login';

const register = (data: RegisterPayload) => apiClient.post(REGISTER_ENDPOINT, data);

const login = (data: LoginInputs) => apiClient.post(LOGIN_ENDPOINT, data);

const userApi = {
  register,
  login,
};

export default userApi;
