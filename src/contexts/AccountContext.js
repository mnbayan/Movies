import { getAccountDetails } from 'services';
import { getInternetCredentials } from 'utils';
import createDataContext from './createDataContext';

const SAVE_ACCOUNT_ID = 'SAVE_ACCOUNT_ID';

const reducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case SAVE_ACCOUNT_ID:
      return { ...state, accountId: payload };

    default:
      return state;
  }
};

const fetchAccountDetails = (dispatch) => async () => {
  const credentials = await getInternetCredentials('tmdb');

  if (credentials.password !== null) {
    try {
      getAccountDetails(credentials.password).then((response) => {
        dispatch({ type: SAVE_ACCOUNT_ID, payload: response.id });
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    fetchAccountDetails
  },
  {
    accountId: null
  }
);
