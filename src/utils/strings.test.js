import test from 'ava';
import * as stringUtils from './strings';

test('utils > strings > buildPathSelector > no path parts', (t) => {
  const result = stringUtils.buildPathSelector();
  t.is(result, '');
});

test('utils > strings > buildPathSelector > one part', (t) => {
  const result = stringUtils.buildPathSelector(['id']);
  t.is(result, 'id');
});

test('utils > strings > buildPathSelector > two parts with object', (t) => {
  const result = stringUtils.buildPathSelector(['response', 'id']);
  t.is(result, 'response.id');
});

test('utils > strings > buildPathSelector > two parts with array', (t) => {
  const result = stringUtils.buildPathSelector(['response', '[0].id']);
  t.is(result, 'response[0].id');
});

test('utils > strings > buildPathSelector > two array parts', (t) => {
  const result = stringUtils.buildPathSelector(['[0]', '[0].id']);
  t.is(result, '[0][0].id');
});
