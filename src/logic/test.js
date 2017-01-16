import test from 'ava';
import * as Logic from '.';

test('logic > runLogic > handles undefined node', (t) => {
  const result = Logic.runLogic({}, );
  t.deepEqual(result, {});
});

test('logic > runLogic > handles null node', (t) => {
  const result = Logic.runLogic({}, null);
  t.deepEqual(result, {});
});

test('logic > runLogic > handles undefined logic', (t) => {
  const result = Logic.runLogic({}, {}, 'after');
  t.deepEqual(result, {});
});

test('logic > runLogic > runs before assertions', (t) => {
  let node = {
    input: {
      body: {
        foo: 5,
      }
    },
    before: {
      assertions: [
        {
          target: 'input.body.foo',
          op: 'eq',
          expected: 5,
        },
        {
          target: 'input.body.foo',
          op: 'lt',
          expected: 4,
        },
      ],
    },
  };

  let result = {};
  Logic.runLogic(result, node, 'before');
  t.is(result.before.assertions[0].pass, true);
  t.is(result.before.assertions[1].pass, false);
});
test('logic > runLogic > runs after assertions', (t) => {
  let node = {
    after: {
      assertions: [
        {
          target: 'output.body.foo',
          op: 'eq',
          expected: 5,
        },
        {
          target: 'output.body.foo',
          op: 'lt',
          expected: 4,
        },
      ],
    },
  };

  let result = {
    input: {},
    output: {
      body: {
        foo: 5,
      },
    },
  };

  Logic.runLogic(result, node, 'after');
  t.is(result.after.assertions[0].pass, true);
  t.is(result.after.assertions[1].pass, false);
});

test('logic > runLogic > runs before transforms', (t) => {
  let node = {
    input: {
      body: {
        foo: 5,
      },
    },
    before: {
      transforms: [
        {
          source: 'input.body.foo',
          target: 'input.method',
        },
      ],
    },
  };

  node = Logic.runLogic({}, node, 'before');
  t.is(node.input.method, 5);
});
test('logic > runLogic > runs after transforms', (t) => {
  let node = {
    after: {
      transforms: [
        {
          source: 'output.body.foo',
          target: 'output.headers.boo2',
        },
      ],
    },
  };

  let result = {
    output: {
      body: {
        foo: 5,
      },
    },
  };
  Logic.runLogic(result, node, 'after');
  t.is(result.output.headers.boo2, 5);
});

test('logic > runLogic > runs after root transforms', (t) => {
  // TODO: Figure out how to expose the $ object.
  let $ = {};
  let node = {
    after: {
      transforms: [
        {
          source: 'output.body.car',
          target: '$.response.body.foo',
        },
      ],
    },
  };

  let result = {
    output: {
      body: {
        car: 'nissan',
      },
    },
  };

  Logic.runLogic(result, node, 'after');
  t.is($.response.body.foo, 'nissan');
});

test('logic > runLogic > replaces variables before script is run', (t) => {
  let node = {
    input: {
      body: {
        foo: '{input.body.bar}',
        bar: 'dog',
      },
    },
  };

  node = Logic.runLogic({}, node, 'before');
  t.is(node.input.body.foo, 'dog');
});

test('logic > runLogic > replaces variables after script is run', (t) => {
  let node = {
    input: {
      body: {
        foo: '{state.bar}',
      },
    },
    before: {
      transforms: [{
        source: 'state.valueWithVar',
        target: 'input.body.dog',
      }],
    },
    state: {
      bar: 'dog',
      valueWithVar: '{state.dogName}',
      dogName: 'bart',
    },
  };


  node = Logic.runLogic({}, node, 'before');
  t.is(node.input.body.dog, 'bart');
});

// TODO: Can't run script tests right now because of strict mode
// test('logic > runScript > supports skip function', (t) => {
//   const result = Logic.runScript('skip();');
//   t.is(result.status, 'skipped');
// });
