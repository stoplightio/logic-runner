import test from 'ava';
import * as queryUtils from './query';

test('utils > query > setQuery > no query string no set', (t) => {
  const url = 'http://example.com';
  const result = queryUtils.setQuery(url);
  t.is(result, url);
});

test('utils > query > setQuery > empty query string no set', (t) => {
  const url = 'http://example.com?';
  const result = queryUtils.setQuery(url);
  t.is(result, url);
});

test('utils > query > setQuery > no query string with set', (t) => {
  const url = 'http://example.com';
  const result = queryUtils.setQuery(url, {foo: 'bar'});
  const expected = `${url}?foo=bar`;
  t.is(result, expected);
});

test('utils > query > setQuery > empty query string with set', (t) => {
  const url = 'http://example.com?';
  const result = queryUtils.setQuery(url, {foo: 'bar'});
  const expected = `${url}foo=bar`;
  t.is(result, expected);
});

test('utils > query > setQuery > merges into existing query string', (t) => {
  const url = 'http://example.com?foo=bar&cat=dog';
  const result = queryUtils.setQuery(url, {cat: 'cat'});
  const expected = 'http://example.com?foo=bar&cat=cat';
  t.is(result, expected);
});
