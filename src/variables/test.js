import test from 'ava';
import * as Variables from '.';
import cases from './test-cases';

test('variables > replaceVariables > handles undefined input', t => {
  const result = Variables.replaceVariables();
  t.deepEqual(result, {});
});

for (const c of cases) {
  test(`variables > ${c.name}`, t => {
    const result = Variables.replaceVariables(c.target, c.variables, c.options);
    t.true(c.expected(result));
  });
}
