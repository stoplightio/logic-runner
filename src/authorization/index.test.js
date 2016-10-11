import test from 'ava';
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
    basic: {
      username: 'foo',
      password: 'bar',
    },
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
    basic: {
      username: 'foo',
      password: 'bar',
    },
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

// test('authorization > runAssertions > handles undefined assertions', (t) => {
//   const result = Assertions.runAssertions();
//   t.deepEqual(result, []);
// });

// test('authorization > runAssertions > handles null assertions', (t) => {
//   const result = Assertions.runAssertions({}, null);
//   t.deepEqual(result, []);
// });
