import { getInternetCredentials } from 'utils';
import api from './api';

const fetchMovies = (page) => {
  return new Promise((resolve, reject) => {
    api
      .get('/trending/movie/day', { params: { page } })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const fetchDetails = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/movie/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const fetchReviews = (id, page) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/movie/${id}/reviews`, { params: { page } })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getAccountStates = async (id) => {
  const credentials = await getInternetCredentials('tmdb');

  const { password } = credentials;

  if (password !== null) {
    return new Promise((resolve, reject) => {
      api
        .get(`/movie/${id}/account_states`, {
          params: { session_id: password }
        })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  return Promise.reject(new Error('fail'));
};

const getDetails = (id) => {
  return new Promise((resolve, reject) => {
    Promise.all([fetchDetails(id), getAccountStates(id)])
      .then(([details, accountStates]) =>
        resolve({ ...details, ...accountStates })
      )
      .catch((error) => reject(error));
  });
};

export {
  fetchMovies,
  fetchDetails,
  fetchReviews,
  getAccountStates,
  getDetails
};
