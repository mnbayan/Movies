import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 30000
});

api.interceptors.request.use(
  async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.params = { ...config.params, api_key: Config.API_KEY };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
