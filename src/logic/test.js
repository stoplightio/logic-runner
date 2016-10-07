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

test('logic > runLogic > runs before assertions', (t) => {
  let node = {
    input: {
      request: {
        body: {
          foo: 5,
        },
      },
    },
    before: {
      assertions: [
        {
          location: 'input.request',
          target: 'body.foo',
          op: 'eq',
          expected: 5,
        },
        {
          location: 'input.request',
          target: 'body.foo',
          op: 'lt',
          expected: 4,
        },
      ],
    },
  };

  node = Logic.runLogic(node, 'before');
  t.is(node.before.assertions[0].result.pass, true);
  t.is(node.before.assertions[1].result.pass, false);
});
test('logic > runLogic > runs after assertions', (t) => {
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

test('logic > runLogic > runs before transforms', (t) => {
  let node = {
    input: {
      request: {
        body: {
          foo: 5,
        },
      },
    },
    before: {
      transforms: [
        {
          sourceLocation: 'input.request.body',
          sourcePath: 'foo',
          targetLocation: 'state',
          targetPath: 'boo2',
        },
      ],
    },
  };

  node = Logic.runLogic(node, 'before');
  t.is(node.state.boo2, 5);
});
test('logic > runLogic > runs after transforms', (t) => {
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

test('logic > runLogic > replaces variables before script is run', (t) => {
  let node = {
    input: {
      request: {
        body: {
          foo: '<<bar>>',
        },
      },
    },
    state: {
      bar: 'dog',
    },
  };

  node = Logic.runLogic(node, 'before');
  t.is(node.input.request.body.foo, 'dog');
});

test('logic > runLogic > replaces variables after script is run', (t) => {
  let node = {
    input: {
      request: {
        body: {
          foo: '<<bar>>',
        },
      },
    },
    before: {
      transforms: [{
        sourceLocation: 'state',
        sourcePath: 'valueWithVar',
        targetLocation: 'input.request',
        targetPath: 'body.dog',
      }],
    },
    state: {
      bar: 'dog',
      valueWithVar: '<<dogName>>',
      dogName: 'bart',
    },
  };

  node = Logic.runLogic(node, 'before');
  t.is(node.input.request.body.dog, 'bart');
});
