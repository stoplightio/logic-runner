import test from 'ava';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import * as Authorization from '.';

test('generateBasicAuth > set correct authorization header', (t) => {
  const result = Authorization.generateBasicAuth({
    username: 'foo',
    password: 'bar',
  });
  const expected = {
    headers: {
      Authorization: 'Basic Zm9vOmJhcg==',
    },
  };
  t.deepEqual(result, expected);
});

test('generateBasicAuth > set correct authorization header for learning:learning', (t) => {
  const result = Authorization.generateBasicAuth({
    username: 'learning',
    password: 'learning',
  });
  const expected = {
    headers: {
      Authorization: 'Basic bGVhcm5pbmc6bGVhcm5pbmc=',
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
const oauth2Data = () => {
  return {
    oauth: {
      type: 'oauth2',
      access_token: 't123',
      useHeader: false,
    },
    request: {
      method: 'get',
      url: 'http://example.com',
      body: {},
    },
  };
};
test('generateOAuth1 > set correct query string', (t) => {
  const data = oauthData();
  const result = Authorization.generateOAuth1(data.oauth, data.request);
  const url = result.url;
  t.regex(url, /oauth_consumer_key=ck123/);
  t.regex(url, /oauth_nonce=/);
  t.regex(url, /oauth_signature_method=HMAC-SHA1/);
  t.regex(url, /oauth_timestamp=/);
  t.regex(url, /oauth_version=1.0/);
  t.regex(url, /oauth_token=t123/);
  t.regex(url, /oauth_signature=/);
});
test('generateOAuth1 > support useHeader option, set correct header', (t) => {
  const data = oauthData();
  const odata = Object.assign({}, data.oauth, {useHeader: true});
  const result = Authorization.generateOAuth1(odata, data.request);
  const header = result.headers.Authorization;
  t.regex(header, /oauth_consumer_key="ck123"/);
  t.regex(header, /oauth_nonce=/);
  t.regex(header, /oauth_signature_method="HMAC-SHA1"/);
  t.regex(header, /oauth_timestamp=/);
  t.regex(header, /oauth_version="1.0"/);
  t.regex(header, /oauth_token="t123"/);
  t.regex(header, /oauth_signature=/);
});
test('generateOAuth1 > support useHeader option, do not overwrite existing header', (t) => {
  const data = oauthData();
  const odata = Object.assign({}, data.oauth, {useHeader: true});
  const orequest = Object.assign({}, data.request, {
    headers: {
      Authorization: '',
    },
  });
  const result = Authorization.generateOAuth1(odata, orequest);
  t.true(!result.headers);
});
test('generateOAuth1 > do not overwrite existing query string params', (t) => {
  const data = oauthData();
  const orequest = Object.assign({}, data.request, {
    url: 'http://example.com?oauth_consumer_key=myExistingParam&oauth_token=myToken',
  });
  const result = Authorization.generateOAuth1(data.oauth, orequest);
  const url = result.url;
  t.regex(url, /oauth_consumer_key=myExistingParam/);
  t.regex(url, /oauth_nonce=/);
  t.regex(url, /oauth_signature_method=HMAC-SHA1/);
  t.regex(url, /oauth_timestamp=/);
  t.regex(url, /oauth_version=1.0/);
  t.regex(url, /oauth_token=myToken/);
  t.regex(url, /oauth_signature=/);
});

test('generateOAuth2 > set correct query string', (t) => {
  const data = oauth2Data();
  const result = Authorization.generateOAuth2(data.oauth, data.request);
  const url = result.url;
  t.regex(url, /access_token=t123/);
});
test('generateOAuth2 > support useHeader option, set correct header', (t) => {
  const data = oauth2Data();
  const odata = Object.assign({}, data.oauth, {useHeader: true});
  const result = Authorization.generateOAuth2(odata, data.request);
  const header = result.headers.Authorization;
  t.regex(header, /Bearer t123/);
});
test('generateOAuth2 > support useHeader option, do not overwrite existing header', (t) => {
  const data = oauth2Data();
  const odata = Object.assign({}, data.oauth, {useHeader: true});
  const orequest = Object.assign({}, data.request, {
    headers: {
      Authorization: '',
    },
  });
  const result = Authorization.generateOAuth2(odata, orequest);
  t.true(!result.headers);
});
test('generateOAuth2 > do not overwrite existing query string params', (t) => {
  const data = oauth2Data();
  const orequest = Object.assign({}, data.request, {
    url: 'http://example.com?access_token=myToken',
  });
  const result = Authorization.generateOAuth2(data.oauth, orequest);
  const url = result.url;
  t.regex(url, /access_token=myToken/);
});

test('generateAuthPatch:basicAuth > set authorization header', (t) => {
  const authNode = {
    type: 'basic',
    username: 'foo',
    password: 'bar'
  };
  const request = {
    headers: {},
  };
  const result = Authorization.generateAuthPatch(authNode, request);
  t.pass(result.headers.hasOwnProperty('Authorization'));
});

test('generateAuthPatch:basicAuth > do not overwrite existing authorization header', (t) => {
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
test('generateAws > set correct header', (t) => {
  const data = awsData();
  const result = Authorization.generateAws(data.aws, data.request, {
    signAws: signAwsMock,
  });
  t.true(result.headers.Authorization ? true : false);
});
test('generateAws > preserves existing headers', (t) => {
  const data = awsData();
  data.request.headers = {
    foo: 'bar',
  };
  const result = Authorization.generateAws(data.aws, data.request, {
    signAws: signAwsMock,
  });
  t.true(result.headers.foo === 'bar');
  // t.true(size(result.headers) === 6);

  // should not patch now, since we already have Authorization defined
  const result2 = Authorization.generateAws(data.aws, result, {
    signAws: signAwsMock,
  });
  t.true(isEmpty(result2));
});

