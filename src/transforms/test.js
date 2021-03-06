import test from 'ava';
import * as Transforms from '.';

test('transforms > runTransform > handles a simple transform', (t) => {
  const resultNode = {
    result: {
      state: {},
      output: {
        response: {
          body: {
            foo: 5,
          },
        },
      },
    },
  };

  const transform = {
    sourceLocation: 'result.output',
    sourcePath: 'response.body.foo',
    targetLocation: 'state',
    targetPath: 'foo',
  };

  Transforms.runTransform({}, resultNode, transform);
  t.is(resultNode.state.foo, 5);
});

test('transforms > runTransform > handles setting on root', (t) => {
  const rootNode = {
    result: {
      state: {},
      output: {},
    },
  };

  const resultNode = {
    result: {
      state: {},
      output: {
        response: {
          body: {
            foo: 5,
          },
        },
      },
    },
  };

  const transform = {
    sourceLocation: 'result.output',
    sourcePath: 'response.body',
    targetLocation: 'root.result.output',
    targetPath: 'response.body',
  };

  Transforms.runTransform(rootNode, resultNode, transform);
  t.is(rootNode.result.output.response.body.foo, 5);
});

test('transforms > runTransform > handles getting from root', (t) => {
  const rootNode = {
    result: {
      state: {
        foo: 'bar',
      },
      output: {},
    },
  };

  const resultNode = {
    result: {
      state: {},
      output: {
        response: {
          body: {},
        },
      },
    },
  };

  const transform = {
    sourceLocation: 'root.result.state',
    sourcePath: 'foo',
    targetLocation: 'result.output',
    targetPath: 'response.body.foo',
  };

  Transforms.runTransform(rootNode, resultNode, transform);
  t.is(resultNode.result.output.response.body.foo, 'bar');
});

test('transforms > runTransform > handles a undefined target', (t) => {
  const resultNode = {
    result: {
      state: {},
      output: {
        response: {
          body: {
            foo: 5,
          },
        },
      },
    },
  };

  const transform = {
    sourceLocation: 'result.output',
    sourcePath: 'response.body.foo',
    targetLocation: 'state',
    targetPath: 'boo',
  };

  Transforms.runTransform({}, resultNode, transform);
  t.is(resultNode.state.foo, undefined);
});

test('transforms > runTransforms > handles several transforms', (t) => {
  const resultNode = {
    result: {
      state: {},
      output: {
        response: {
          body: {
            foo: 5,
          },
        },
      },
    },
  };

  const transforms = [
    {
      sourceLocation: 'result.output',
      sourcePath: 'response.body.foo',
      targetLocation: 'state',
      targetPath: 'boo',
    },
    {
      sourceLocation: 'result.output',
      sourcePath: 'response.body.foo',
      targetLocation: 'state',
      targetPath: 'boo2',
    },
  ];

  Transforms.runTransforms({}, resultNode, transforms);
  t.is(resultNode.state.boo, 5);
  t.is(resultNode.state.boo2, 5);
});
