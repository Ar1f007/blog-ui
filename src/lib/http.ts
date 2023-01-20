import axios from 'axios';

import { BASE_URL } from '../constant';

const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default http;
