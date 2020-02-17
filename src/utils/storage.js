import * as Keychain from 'react-native-keychain';

const saveInternetCredentials = (server, key, value) =>
  Keychain.setInternetCredentials(server, key, value);

const getInternetCredentials = async (server) => {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getInternetCredentials(server);
    if (credentials) {
      return credentials;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const removeInternetCredentials = (server) =>
  Keychain.resetInternetCredentials(server);

export {
  saveInternetCredentials,
  getInternetCredentials,
  removeInternetCredentials
};
