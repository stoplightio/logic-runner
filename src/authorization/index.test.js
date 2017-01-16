import test from 'ava';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
import get from 'lodash/get';
import * as Authorization from '.';

test('authorization > generateBasicAuth > set correct authorization header', (t) => {
  const result = Authorization.generateBasicAuth('foo', 'bar');
  const expected = {
    request: {
      headers: {
        Authorization: 'Basic Zm9vOmJhcg==',
      },
    },
  };
  t.deepEqual(result, expected);
});

const oauthData = () => {
  return {
    oauth: {
      consumerKey: 'ck123',
      consumerSecret: 'cs123',
      token: 't123',
      tokenSecret: 'ts123',
      encode: false,
      useHeader: false,
    },
    request: {
      method: 'get',
      url: 'http://example.com',
      body: {},
    },
  };
};
test('authorization > generateOAuth1 > set correct query string', (t) => {
  const data = oauthData();
  const result = Authorization.generateOAuth1(data.oauth, data.request);
  const url = result.request.url;
  t.regex(url, /oauth_consumer_key=ck123/);
  t.regex(url, /oauth_nonce=/);
  t.regex(url, /oauth_signature_method=HMAC-SHA1/);
  t.regex(url, /oauth_timestamp=/);
  t.regex(url, /oauth_version=1.0/);
  t.regex(url, /oauth_token=t123/);
  t.regex(url, /oauth_signature=/);
});
test('authorization > generateOAuth1 > support useHeader option, set correct header', (t) => {
  const data = oauthData();
  const odata = Object.assign({}, data.oauth, {useHeader: true});
  const result = Authorization.generateOAuth1(odata, data.request);
  const header = result.request.headers.Authorization;
  t.regex(header, /oauth_consumer_key="ck123"/);
  t.regex(header, /oauth_nonce=/);
  t.regex(header, /oauth_signature_method="HMAC-SHA1"/);
  t.regex(header, /oauth_timestamp=/);
  t.regex(header, /oauth_version="1.0"/);
  t.regex(header, /oauth_token="t123"/);
  t.regex(header, /oauth_signature=/);
});
test('authorization > generateOAuth1 > support useHeader option, do not overwrite existing header', (t) => {
  const data = oauthData();
  const odata = Object.assign({}, data.oauth, {useHeader: true});
  const orequest = Object.assign({}, data.request, {
    headers: {
      Authorization: '',
    },
  });
  const result = Authorization.generateOAuth1(odata, orequest);
  t.true(!result.request);
});
test('authorization > generateOAuth1 > do not overwrite existing query string params', (t) => {
  const data = oauthData();
  const orequest = Object.assign({}, data.request, {
    url: 'http://example.com?oauth_consumer_key=myExistingParam&oauth_token=myToken',
  });
  const result = Authorization.generateOAuth1(data.oauth, orequest);
  const url = result.request.url;
  t.regex(url, /oauth_consumer_key=myExistingParam/);
  t.regex(url, /oauth_nonce=/);
  t.regex(url, /oauth_signature_method=HMAC-SHA1/);
  t.regex(url, /oauth_timestamp=/);
  t.regex(url, /oauth_version=1.0/);
  t.regex(url, /oauth_token=myToken/);
  t.regex(url, /oauth_signature=/);
});

test('authorization > generateAuthPatch:basicAuth > set authorization header', (t) => {
  const authNode = {
    type: 'basic',
    username: 'foo',
    password: 'bar'
  };
  const request = {
    headers: {},
  };
  const result = Authorization.generateAuthPatch(authNode, request);
  t.pass(result.request.headers.hasOwnProperty('Authorization'));
});

test('authorization > generateAuthPatch:basicAuth > do not overwrite existing authorization header', (t) => {
  const authNode = {
    type: 'basic',
    username: 'foo',
    password: 'bar'
  };
  const request = {
    headers: {
      Authorization: '123',
    },
  };
  const result = Authorization.generateAuthPatch(authNode, request);
  const expected = {};
  t.deepEqual(result, expected);
});

const awsData = () => {
  return {
    aws: {
      region: 'us-east-1',
      service: 'sqs',
      accessKey: '123',
      secretKey: '123',
    },
    request: {
      method: 'get',
      url: 'http://example.com/foo',
      body: {},
    },
  };
};
const signAwsMock = (requestToAuthorize, options) => {
  const headers = get(requestToAuthorize, 'headers') || {};
  return Object.assign({}, headers, {
    Authorization: '123',
  });
};
test('authorization > generateAws > set correct header', (t) => {
  const data = awsData();
  const result = Authorization.generateAws(data.aws, data.request, {
    signAws: signAwsMock,
  });
  t.true(result.request.headers.Authorization ? true : false);
});
test('authorization > generateAws > preserves existing headers', (t) => {
  const data = awsData();
  data.request.headers = {
    foo: 'bar',
  };
  const result = Authorization.generateAws(data.aws, data.request, {
    signAws: signAwsMock,
  });
  t.true(result.request.headers.foo === 'bar');
  // t.true(size(result.request.headers) === 6);

  // should not patch now, since we already have Authorization defined
  const result2 = Authorization.generateAws(data.aws, result.request, {
    signAws: signAwsMock,
  });
  t.true(isEmpty(result2));
});

