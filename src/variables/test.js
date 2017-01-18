import test from 'ava';
import * as Variables from '.';
import cases from './test-cases';

test.before(t => {
  global.$ = {
    foo: 'bar',
    bar: 'dog',
    ctx: {
      todoId: 1234,
      results: [
        'step1',
        'step2',
      ]
    },
  };
});

test('variables > replaceVariables > handles undefined input', (t) => {
  const result = Variables.replaceVariables();
  t.deepEqual(result, undefined);
});

for (const c of cases) {
  test(`variables > ${c.name}`, (t) => {
    const result = Variables.replaceVariables(c.target, c.variables);
    t.true(c.expected(result));
  });
}

const newNode = () => {
  return {
    steps: [{
      name: '{$.foo}',
    }],
    children: [{
      name: '{$.foo}',
    }],
    functions: [{
      name: '{$.foo}',
    }],
    input: {
      name: '{$.foo}',
    },
    before: {
      script: '{$.foo}',
      transforms: '{$.foo}',
    },
    after: {
      script: '{$.foo}',
      transforms: '{$.foo}',
    }
  };
};

test('variables > replaceNodeVariables > replaces variables', (t) => {
  let node = newNode();
  node = Variables.replaceNodeVariables(node);
  t.is(node.input.name, 'bar');
  t.is(node.steps[0].name, 'bar');
  t.is(node.children[0].name, 'bar');
  t.is(node.functions[0].name, 'bar');
});

test('variables > replaceNodeVariables > replaces nested variables', (t) => {
  let node = {
    input: {
      body: {
        foo: '{$.bar}',
      },
    },
  };

  node = Variables.replaceNodeVariables(node);
  t.is(node.input.body.foo, 'dog');
});

test('variables > replaceNodeVariables > skips before logic for scripting and transforms', (t) => {
  let node = newNode();
  node = Variables.replaceNodeVariables(node);
  t.is(node.before.script, '{$.foo}');
  t.is(node.before.transforms, '{$.foo}');
});

test('variables > replaceNodeVariables > skips after logic for scripting and transforms', (t) => {
  let node = newNode();
  node = Variables.replaceNodeVariables(node);
  t.is(node.after.script, '{$.foo}');
  t.is(node.after.transforms, '{$.foo}');
});

test('variables > replaceNodeVariables > replace more specific first', (t) => {
  let node = {
    after: {
      assertions: [{
          target: "$.ctx.todoId",
          op: "eq",
          expected: "{$.ctx.todoId}"
        },
      ],
    }
  };
  node = Variables.replaceNodeVariables(node);
  t.is(node.after.assertions[0].expected, 1234);
});

test('variables > replaceNodeVariables > replace array variable', (t) => {
  let node = {
    input: {
      body: {
        results: '{$.ctx.results}',
      },
    },
  };

  node = Variables.replaceNodeVariables(node);
  t.deepEqual(node.input.body.results, ['step1', 'step2']);
});
