import { getInternetCredentials } from 'utils';
import api from './api';

const getAccountDetails = (sessionId) => {
  return new Promise((resolve, reject) => {
    api
      .get('account', { params: { session_id: sessionId } })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const fetchWatchList = async (id, page) => {
  const credentials = await getInternetCredentials('tmdb');

  const { password } = credentials;

  if (password !== null) {
    return new Promise((resolve, reject) => {
      api
        .get(`/account/${id}/watchlist/movies`, {
          params: { page, session_id: password }
        })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  return Promise.reject(new Error('fail'));
};

const updateWatchList = async (
  accountId,
  mediaId,
  watchlist,
  mediaType = 'movie'
) => {
  const credentials = await getInternetCredentials('tmdb');

  const { password } = credentials;

  if (password !== null) {
    return new Promise((resolve, reject) => {
      api
        .post(
          `/account/${accountId}/watchlist`,
          { media_type: mediaType, media_id: mediaId, watchlist },
          {
            params: { session_id: password },
            headers: { 'Content-Type': 'application/json' }
          }
        )
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  return Promise.reject(new Error('fail'));
};

export { getAccountDetails, fetchWatchList, updateWatchList };
