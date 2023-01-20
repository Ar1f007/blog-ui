import type { RegisterInfo } from './types';

import { REGISTER_ENDPOINT } from '@/constant';
import http from '@/lib/http';

const register = (data: RegisterInfo) => http.post(REGISTER_ENDPOINT, data);

const userApi = {
  register,
};

export default userApi;
