import test from 'ava';
import * as Logic from '.';

test('logic > runLogic > handles undefined node', (t) => {
  const result = Logic.runLogic();
  t.deepEqual(result, {});
});

test('logic > runLogic > handles null node', (t) => {
  const result = Logic.runLogic(null);
  t.deepEqual(result, {});
});

test('logic > runLogic > handles undefined logic', (t) => {
  const result = Logic.runLogic({}, 'after');
  t.deepEqual(result, {});
});

test('logic > runLogic > runs assertions', (t) => {
  let node = {
    result: {
      output: {
        response: {
          body: {
            foo: 5,
          },
        },
      },
    },
    after: {
      assertions: [
        {
          location: 'result.output.response',
          target: 'body.foo',
          op: 'eq',
          expected: 5,
        },
        {
          location: 'result.output.response',
          target: 'body.foo',
          op: 'lt',
          expected: 4,
        },
      ],
    },
  };

  node = Logic.runLogic(node, 'after');
  t.is(node.after.assertions[0].result.pass, true);
  t.is(node.after.assertions[1].result.pass, false);
});

test('logic > runLogic > runs transforms', (t) => {
  let node = {
    result: {
      output: {
        response: {
          body: {
            foo: 5,
          },
        },
      },
    },
    after: {
      transforms: [
        {
          sourceLocation: 'result.output',
          sourcePath: 'response.body.foo',
          targetLocation: 'result.state',
          targetPath: 'boo2',
        },
      ],
    },
  };

  node = Logic.runLogic(node, 'after');
  t.is(node.result.state.boo2, 5);
});
