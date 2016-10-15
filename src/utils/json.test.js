import test from 'ava';
import * as JsonUtils from './json';

test('utils > json > safeParse > handles bad json', (t) => {
  const result = JsonUtils.safeParse('{');
  t.deepEqual(result, {});
});

test('utils > json > safeParse > handles good json', (t) => {
  const result = JsonUtils.safeParse('{"foo": "bar"}');
  t.deepEqual(result, {foo: 'bar'});
});

test('utils > json > safeParse > handles a passed in object', (t) => {
  const obj = {foo: 'bar'};
  const result = JsonUtils.safeParse({foo: 'bar'});
  t.deepEqual(result, obj);
});

test('utils > json > safeStringify > handles good json', (t) => {
  const result = JsonUtils.safeStringify({foo: 'bar'});
  t.is(result, `{
    "foo": "bar"
}`);
});

test('utils > json > safeStringify > allows tab customization', (t) => {
  const result = JsonUtils.safeStringify({foo: 'bar'}, 2);
  t.is(result, `{
  "foo": "bar"
}`);
});

test('utils > json > safeStringify > handles a passed in string', (t) => {
  const obj = `{
  "foo": "bar"
}`;
  const result = JsonUtils.safeStringify(obj);
  t.is(result, obj);
});

test('utils > json > mapToNameValue > works', (t) => {
  const obj = {foo: 'bar', second: true};
  const result = JsonUtils.mapToNameValue(obj);
  const expected = [{
    name: 'foo',
    value: 'bar',
  }, {
    name: 'second',
    value: true,
  }];
  t.deepEqual(result, expected);
});

test('utils > json > mapToNameValue > handles array input', (t) => {
  const obj = [{
    name: 'foo',
    value: 'bar',
  }, {
    name: 'second',
    value: true,
  }];
  const result = JsonUtils.mapToNameValue(obj);
  t.deepEqual(result, obj);
});

test('utils > json > nameValueToMap > works', (t) => {
  const pairs = [{
    name: 'foo',
    value: 'bar',
  }, {
    name: 'second',
    value: true,
  }];

  const result = JsonUtils.nameValueToMap(pairs);
  const expected = {foo: 'bar', second: true};
  t.deepEqual(result, expected);
});

test('utils > json > nameValueToMap > handles map input', (t) => {
  const pairs = {foo: 'bar', second: true};
  const result = JsonUtils.nameValueToMap(pairs);
  t.deepEqual(result, pairs);
});
