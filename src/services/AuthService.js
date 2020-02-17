import { saveInternetCredentials } from 'utils';
import api from './api';

const createRequestToken = () => {
  return new Promise((resolve, reject) => {
    api
      .get('/authentication/token/new')
      .then((response) => {
        resolve(response.data.request_token);
      })
      .catch((error) => reject(error));
  });
};

const validateWithLogin = (username, password, requestToken) => {
  return new Promise((resolve, reject) => {
    api
      .post('/authentication/token/validate_with_login', {
        username,
        password,
        request_token: requestToken
      })
      .then((response) => resolve(response.data.success))
      .catch((error) => reject(error));
  });
};

const createSession = (requestToken) => {
  return new Promise((resolve, reject) => {
    api
      .post('/authentication/session/new', {
        request_token: requestToken
      })
      .then((response) => {
        const { session_id } = response.data;
        saveInternetCredentials('tmdb', 'session_id', session_id);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

const login = async (username, password) => {
  const requestToken = await createRequestToken();

  if (requestToken !== null) {
    const validated = await validateWithLogin(username, password, requestToken);

    if (validated) {
      return createSession(requestToken);
    }

    return new Promise((resolve) => resolve(false));
  }

  return new Promise((resolve) => resolve(false));
};

export { login };
