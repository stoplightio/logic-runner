import test from 'ava';
import * as Transforms from '.';

test('transforms > runTransform > handles a simple transform', (t) => {
  const resultNode = {
    output: {
      body: {
        foo: 5,
      },
    },
  };

  const transform = {
    source: 'output.body.foo',
    target: 'output.headers.foo',
  };

  Transforms.runTransform({}, resultNode, transform);
  t.is(resultNode.output.headers.foo, 5);
});

test('transforms > runTransform > handles setting on root', (t) => {
  const rootNode = {
    response: {
      headers: {
        'content-type': 'application/json',
      },
      body: {},
      status: 200,
    },
  };

  const resultNode = {
    output: {
      body: {
        foo: 5,
      },
    },
  };

  const transform = {
    source: 'output.body',
    target: '$.response.body',
  };

  Transforms.runTransform(rootNode, resultNode, transform);
  t.is(rootNode.response.body.foo, 5);
});

test('transforms > runTransform > handles getting from root', (t) => {
  const rootNode = {
    ctx: {
      foo: 'bar',
    },
  };

  const resultNode = {
    output: {
      body: {},
    },
  };

  const transform = {
    source: '$.ctx.foo',
    target: 'output.body.foo',
  };

  Transforms.runTransform(rootNode, resultNode, transform);
  t.is(resultNode.output.body.foo, 'bar');
});

test('transforms > runTransform > handles a undefined target', (t) => {
  const rootNode = {
    ctx: {},
  };

  const resultNode = {
    body: {
      foo: 5,
    },
  };

  const transform = {
    source: 'output.body.foo',
    target: '$.ctx.foo',
  };

  Transforms.runTransform(rootNode, resultNode, transform);
  t.is(rootNode.ctx.foo, undefined);
});

test('transforms > runTransforms > handles several transforms', (t) => {
  const rootNode = {
    ctx: {},
  };

  const resultNode = {
    output: {
      body: {
        foo: 5,
      },
    },
  };

  const transforms = [
    {
      source: 'output.body.foo',
      target: '$.ctx.boo',
    },
    {
      source: 'output.body.foo',
      target: '$.ctx.boo2',
    },
  ];

  Transforms.runTransforms(rootNode, resultNode, transforms);
  t.is(rootNode.ctx.boo, 5);
  t.is(rootNode.ctx.boo2, 5);
});

test('transforms > runTransforms > handle array', (t) => {
  const rootNode = {
    ctx: {
      results: [
        'step1',
        'step2'
      ]
    },
  };

  const resultNode = {
    output: {
      body: {
      },
    },
  };

  const transforms = [
    {
      source: '$.ctx.results',
      target: 'output.body.results',
    },
  ];

  Transforms.runTransforms(rootNode, resultNode, transforms);
  t.deepEqual(resultNode.output.body.results, ['step1', 'step2']);
});
