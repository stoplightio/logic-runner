import test from 'ava';
import * as Assertions from '.';
import cases from './test-cases';

test('assertions > runAssertions > handles undefined assertions', (t) => {
  const result = Assertions.runAssertions();
  t.deepEqual(result, []);
});

test('assertions > runAssertions > handles null assertions', (t) => {
  const result = Assertions.runAssertions({}, null);
  t.deepEqual(result, []);
});

test('assertions > runAssertions > runs an assertion', (t) => {
  const resultNode = {
    output: {
      response: {
        body: {
          foo: 5,
        },
      },
    },
  };

  const assertions = [
    {
      location: 'output.response',
      target: 'body.foo',
      op: 'eq',
      expected: 5,
    },
    {
      location: 'output.response',
      target: 'body.foo',
      op: 'lt',
      expected: 4,
    },
  ];

  const result = Assertions.runAssertions(resultNode, assertions);
  t.is(result[0].result.pass, true);
  t.is(result[1].result.pass, false);
});

for (const c of cases) {
  test(`assertions > ${c.name}`, (t) => {
    const result = Assertions.runAssertion(c.resultNode, c.assertion, c.options);
    t.true(c.expected(result));
  });
}
