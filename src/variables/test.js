import test from 'ava';
import * as Variables from '.';
import cases from './test-cases';

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
      script: '{$}'
    },
    after: {
      script: '{$}'
    }
  };
};

test('variables > replaceVariables > replaces variables', (t) => {
  let node = newNode();
  node = Variables.replaceVariables(node, {
    foo: 'bar',
  });
  t.is(node.input.name, 'bar');
  t.is(node.steps[0].name, 'bar');
  t.is(node.children[0].name, 'bar');
  t.is(node.functions[0].name, 'bar');
});

test('variables > replaceVariables > replaces nested variables', (t) => {
  let node = {
    input: {
      body: {
        foo: '{$.bar}',
      },
    },
  };

  node = Variables.replaceVariables(node, {
    bar: 'dog',
  });
  t.is(node.input.body.foo, 'dog');
});

test('variables > replaceNodeVariables > skips before logic', (t) => {
  let node = newNode();
  node = Variables.replaceNodeVariables(node);
  t.is(node.before.script, '{$}');
});

test('variables > replaceNodeVariables > skips after logic', (t) => {
  let node = newNode();
  node = Variables.replaceNodeVariables(node);
  t.is(node.after.script, '{$}');
});
