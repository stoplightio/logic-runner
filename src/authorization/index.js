import isEmpty from 'lodash/isEmpty';

const AUTH_TYPES = ['basic', 'digest', 'oauth1', 'oauth2'];

export const generateBasicAuth = (username, password, options) => {
  const string = [username, password].join(':');

  return {
    headers: {
      Authorization: new Buffer(string).toString('base64'),
    },
  };
};

export const generateAuth = (authNode, options) => {
  let patch = {};

  if (!authNode || AUTH_TYPES.indexOf(authNode.type) < 0) {
    return patch;
  }

  const details = authNode[authNode.type];
  if (isEmpty(details)) {
    return patch;
  }

  switch (authNode.type) {
    case 'basic':
      patch = generateBasicAuth(details.username, details.password, options);
      break;
    default:
      console.log(`${authNode.type} auth not implemented`);
  }

  return patch;
};
