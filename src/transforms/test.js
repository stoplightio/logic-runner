import test from 'ava';
import * as Transforms from '.';

test('transforms > runTransform > handles a simple transform', t => {
  const resultNode = {
    state: {},
    output: {
      response: {
        body: {
          foo: 5,
        },
      },
    },
  };

  const transform = {
    sourceLocation: 'output',
    sourcePath: 'response.body.foo',
    targetLocation: 'state',
    targetPath: 'foo',
  };

  Transforms.runTransform(resultNode, transform);
  t.is(resultNode.state.foo, 5);
});

test('transforms > runTransform > handles a undefined target', t => {
  const resultNode = {
    state: {},
    output: {
      response: {
        body: {
          foo: 5,
        },
      },
    },
  };

  const transform = {
    sourceLocation: 'output',
    sourcePath: 'response.body.foo',
    targetLocation: 'state',
    targetPath: 'boo',
  };

  Transforms.runTransform(resultNode, transform);
  t.is(resultNode.state.foo, undefined);
});

test('transforms > runTransform > enforces sourceLocation whitelist', t => {
  const resultNode = {
    state: {},
    output: {
      response: {
        body: {
          foo: 5,
        },
      },
    },
  };

  const resultNode2 = {
    state: {},
    output: {
      response: {
        body: {
          foo: 5,
        },
      },
    },
  };

  const transform = {
    sourceLocation: 'someRandomKey',
    sourcePath: 'response.body.foo',
    targetLocation: 'state',
    targetPath: 'boo',
  };

  Transforms.runTransform(resultNode, transform);
  t.deepEqual(resultNode, resultNode2);
});

test('transforms > runTransforms > handles several transforms', t => {
  const resultNode = {
    state: {},
    output: {
      response: {
        body: {
          foo: 5,
        },
      },
    },
  };

  const transforms = [
    {
      sourceLocation: 'output',
      sourcePath: 'response.body.foo',
      targetLocation: 'state',
      targetPath: 'boo',
    },
    {
      sourceLocation: 'output',
      sourcePath: 'response.body.foo',
      targetLocation: 'state',
      targetPath: 'boo2',
    },
  ];

  Transforms.runTransforms(resultNode, transforms);
  t.is(resultNode.state.boo, 5);
  t.is(resultNode.state.boo2, 5);
});
