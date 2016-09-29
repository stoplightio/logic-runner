import test from 'ava';
import * as jsonUtils from './json';

test('utils > json > safeParse > handles bad json', t => {
  const result = jsonUtils.safeParse('{');
  t.deepEqual(result, {});
});

test('utils > json > safeParse > handles good json', t => {
  const result = jsonUtils.safeParse('{"foo": "bar"}');
  t.deepEqual(result, {foo: 'bar'});
});

test('utils > json > safeParse > handles a passed in object', t => {
  const obj = {foo: 'bar'};
  const result = jsonUtils.safeParse({foo: 'bar'});
  t.deepEqual(result, obj);
});

test('utils > json > safeStringify > handles good json', t => {
  const result = jsonUtils.safeStringify({foo: 'bar'});
  t.is(result, `{
    "foo": "bar"
}`);
});

test('utils > json > safeStringify > allows tab customization', t => {
  const result = jsonUtils.safeStringify({foo: 'bar'}, 2);
  t.is(result, `{
  "foo": "bar"
}`);
});

test('utils > json > safeStringify > handles a passed in string', t => {
  const obj = `{
  "foo": "bar"
}`;
  const result = jsonUtils.safeStringify(obj);
  t.is(result, obj);
});
