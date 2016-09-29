import test from 'ava';
import runLogic from '.';

test('logic > runLogic > handles undefined node', t => {
  const result = runLogic();
  t.deepEqual(result, {});
});

test('logic > runLogic > handles null node', t => {
  const result = runLogic(null);
  t.deepEqual(result, {});
});

test('logic > runLogic > handles undefined logic', t => {
  const result = runLogic({}, 'after');
  t.deepEqual(result, {});
});

test('logic > runLogic > runs assertions', t => {
  const resultNode = {
    output: {
      response: {
        body: {
          foo: 5,
        },
      },
    },
    after: {
      assertions: [
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
      ],
    },
  };

  const result = runLogic(resultNode, 'after');
  t.is(result.after.assertions[0].result.pass, true);
  t.is(result.after.assertions[1].result.pass, false);
});
