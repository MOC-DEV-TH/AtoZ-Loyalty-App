import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: 'http://wp.myanmaronlinecreations.com/api',
    imageApiUrl : 'http://wp.myanmaronlinecreations.com',
    authorization : 'token'
  },
  staging: {
    apiUrl: 'http://wp.myanmaronlinecreations.com/api',
    imageApiUrl : 'http://wp.myanmaronlinecreations.com',
    authorization : 'token'
  },
  prod: {
    apiUrl: 'https://loyalty.atozmyanmar.com/api',
    imageApiUrl : 'https://loyalty.atozmyanmar.com',
    authorization : 'Authorization'
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  console.log("EnvVar",__DEV__)
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;