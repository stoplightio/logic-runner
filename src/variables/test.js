import test from 'ava';
import * as Variables from '.';
import cases from './test-cases';

test('variables > replaceVariables > handles undefined input', (t) => {
  const result = Variables.replaceVariables();
  t.deepEqual(result, undefined);
});

for (const c of cases) {
  test(`variables > ${c.name}`, (t) => {
    const result = Variables.replaceVariables(c.target, c.variables, c.options);
    t.true(c.expected(result));
  });
}

const newNode = () => {
  return {
    steps: [{
      name: '<<foo>>',
    }],
    children: [{
      name: '<<foo>>',
    }],
    functions: [{
      name: '<<foo>>',
    }],
    input: {
      name: '<<foo>>',
    },
    state: {
      foo: 'bar',
    },
  };
};

test('variables > replaceNodeVariables > replaces variables', (t) => {
  let node = newNode();
  node = Variables.replaceNodeVariables(node);
  t.is(node.input.name, 'bar');
});

test('variables > replaceNodeVariables > replaces nested variables', (t) => {
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

  node = Variables.replaceNodeVariables(node);
  t.is(node.input.request.body.foo, 'dog');
});

test('variables > replaceNodeVariables > skips steps', (t) => {
  let node = newNode();
  node = Variables.replaceNodeVariables(node);
  t.is(node.steps[0].name, '<<foo>>');
});

test('variables > replaceNodeVariables > skips functions', (t) => {
  let node = newNode();
  node = Variables.replaceNodeVariables(node);
  t.is(node.functions[0].name, '<<foo>>');
});

test('variables > replaceNodeVariables > skips children', (t) => {
  let node = newNode();
  node = Variables.replaceNodeVariables(node);
  t.is(node.children[0].name, '<<foo>>');
});
