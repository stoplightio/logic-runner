import test from 'ava';
import * as Logic from '.';

test('logic > runLogic > handles undefined node', t => {
  const result = Logic.runLogic();
  t.deepEqual(result, {});
});

test('logic > runLogic > handles null node', t => {
  const result = Logic.runLogic(null);
  t.deepEqual(result, {});
});

test('logic > runLogic > handles undefined logic', t => {
  const result = Logic.runLogic({}, 'after');
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

  const result = Logic.runLogic(resultNode, 'after');
  t.is(result.after.assertions[0].result.pass, true);
  t.is(result.after.assertions[1].result.pass, false);
});

test('logic > runLogic > runs transforms', t => {
  const resultNode = {
    output: {
      response: {
        body: {
          foo: 5,
        },
      },
    },
    after: {
      transforms: [
        {
          sourceLocation: 'output',
          sourcePath: 'response.body.foo',
          targetLocation: 'state',
          targetPath: 'boo2',
        },
      ],
    },
  };

  const result = Logic.runLogic(resultNode, 'after');
  t.is(result.state.boo2, 5);
});
