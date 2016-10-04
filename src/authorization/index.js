import isEmpty from 'lodash/isEmpty';
import OAuth from 'oauth-1.0a';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Enc_BASE64 from 'crypto-js/enc-base64';

import {setQuery} from '../utils/query';

const AUTH_TYPES = ['basic', 'digest', 'oauth1', 'oauth2'];

export const generateBasicAuth = (username, password, options) => {
  let string = [username, password].join(':');

  if (options.base64) {
    string = options.base64(string);
  } else {
    string = new Buffer(string).toString('base64');
  }

  return {
    request: {
      headers: [{
        name: 'Authorization',
        value: `Basic ${string}`,
      }],
    },
  };
};

const hashFunction = (method, encode) => {
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
      return hash.toString(Enc_BASE64);
    }

    return hash.toString();
  };
};
export const generateOAuth1 = (data, request, options) => {
  const signatureMethod = data.signatureMethod || 'HMAC-SHA1';

  const encode = data && data.hasOwnProperty('encode') ? data.encode : true;
  const oauth = OAuth({
    consumer: {
      key: data.consumerKey,
      secret: data.consumerSecret,
    },
    signature_method: signatureMethod,
    hash_function: hashFunction(signatureMethod, encode),
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
    method: request.method.toUpperCase(),
    data: request.body,
  };
  const authPatch = oauth.authorize(request, token);

  const patch = {
    authorization: {
      oauth1: {
        nonce: authPatch.oauth_nonce,
      },
    },
  };

  if (data.useHeader) {
    // add to the header
    const headerPatch = oauth.toHeader(authPatch);
    patch.request = {
      headers: [{
        name: 'Authorization',
        value: headerPatch.Authorization,
      }],
    };
  } else {
    // add to the query string
    patch.request = {
      url: setQuery(request.url, authPatch),
    };
  }

  return patch;
};

export const generateAuthPatch = (authNode, request, options) => {
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
    case 'oauth1':
      patch = generateOAuth1(details, request, options);
      break;
    default:
      console.log(`${authNode.type} auth not implemented`);
  }

  return patch;
};
