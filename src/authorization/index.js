import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import OAuth from 'oauth-1.0a';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import EncBASE64 from 'crypto-js/enc-base64';

import Base64 from '../utils/base64';
import { setQuery } from '../utils/query';
import { safeStringify } from '../utils/json';

const AUTH_TYPES = ['basic', 'digest', 'oauth1', 'oauth2', 'aws'];

export const generateBasicAuth = (username, password, options) => {
  options = options || {};

  let string = [username, password].join(':');
  string = Base64.encode(string); // Need to use custom base64 for golang vm.
  return {
    headers: {
      Authorization: `Basic ${string}`,
    },
  };
};

const hashFunction = (method, encode, options) => {
  options = options || {};

  return (base_string, key) => {
    let hash;

    switch (method) {
      case 'HMAC-SHA1':
        hash = HmacSHA1(base_string, key);
        break;
      case 'HMAC-SHA256':
        hash = HmacSHA256(base_string, key);
        break;
      default:
        return key;
    }

    if (encode) {
      return hash.toString(EncBASE64);
    }

    return hash.toString();
  };
};
export const generateOAuth1 = (data, request, options) => {
  options = options || {};

  let patch = {};
  if (data.useHeader && has(request, 'headers.Authorization')) {
    return patch;
  }

  const signatureMethod = data.signatureMethod || 'HMAC-SHA1';

  const encode = data.encode;
  const oauth = OAuth({
    consumer: {
      key: data.consumerKey,
      secret: data.consumerSecret,
    },
    signature_method: signatureMethod,
    hash_function: hashFunction(signatureMethod, encode, options),
    version: data.version || '1.0',
    nonce_length: data.nonceLength || 32,
    parameter_seperator: data.parameterSeperator || ', ',
  });

  let token = null;
  if (data.token) {
    token = {
      key: data.token,
      secret: data.tokenSecret,
    };
  }

  const requestToAuthorize = {
    url: request.url,
    method: (request.method || 'get').toUpperCase(),
    data: request.body,
  };
  const authPatch = oauth.authorize(requestToAuthorize, token);
  patch.authorization = {
    oauth1: {
      nonce: authPatch.oauth_nonce,
    },
  };

  if (data.useHeader) {
    // add to the header
    const headerPatch = oauth.toHeader(authPatch);
    patch = {
      headers: {
        Authorization: headerPatch.Authorization,
      },
    };
  } else {
    // add to the query string
    patch = {
      url: setQuery(request.url, authPatch, { preserve: true }),
    };
  }

  return patch;
};

export const generateAws = (data, request, options) => {
  options = options || {};

  let patch = {};

  if (!options.signAws) {
    console.warn('authorization/generateAws signAws function not supplied!');
    return patch;
  }

  if (has(request, 'headers.Authorization')) {
    return patch;
  }

  const requestToAuthorize = {
    ...request,
    method: (request.method || 'get').toUpperCase(),
    body: safeStringify(request.body) || '',
    service: data.service,
    region: data.region,
  };

  const newRequest = options.signAws(requestToAuthorize, {
    secretAccessKey: data.secretKey,
    accessKeyId: data.accessKey,
    sessionToken: data.sessionToken,
  });

  // add to the header
  patch = {
    headers: newRequest.headers,
  };

  return patch;
};

export const generateAuthPatch = (authNode, request, options) => {
  options = options || {};
  let patch = {};

  if (!authNode || AUTH_TYPES.indexOf(authNode.type) < 0) {
    return patch;
  }

  const details = authNode;
  if (isEmpty(details)) {
    return patch;
  }

  switch (authNode.type) {
    case 'basic':
      if (!has(request, 'headers.Authorization')) {
        patch = generateBasicAuth(details.username, details.password, options);
      }

      break;
    case 'oauth1':
      patch = generateOAuth1(details, request, options);
      break;
    case 'aws':
      patch = generateAws(details, request, options);
      break;
    default:
      console.log(`${authNode.type} auth not implemented`);
  }

  return patch;
};
