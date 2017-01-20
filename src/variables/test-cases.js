const buildCases = () => {
  return [
    {
      name: 'replaceVariables > handles simple variable',
      target: {
        foo: '{$.bar}',
      },
      variables: {
        bar: 'cat',
      },
      expected(result) {
        return result.foo === 'cat';
      },
    },
    {
      name: 'replaceVariables > handles curly brackets',
      target: {
        foo: '{$.bar}',
      },
      variables: {
        bar: 'cat',
      },
      expected(result) {
        return result.foo === 'cat';
      },
    },
    {
      name: 'replaceVariables > handles nested curly brackets',
      target: {
        foo: '{$.bar.name}',
      },
      variables: {
        bar: {
          name: 'cat',
        },
      },
      expected(result) {
        return result.foo === 'cat';
      },
    },
    {
      name: 'replaceVariables > does not replace curly json',
      target: {
        foo: '{"foo": "bar"}',
      },
      variables: {
        bar: 'cat',
      },
      expected(result) {
        return result.foo === '{"foo": "bar"}';
      },
    },
    {
      name: 'replaceVariables > does not replace curly javascript',
      target: {
        foo: '{foo: 123}',
      },
      variables: {
        bar: 'cat',
      },
      expected(result) {
        return result.foo === '{foo: 123}';
      },
    },
    {
      name: 'replaceVariables > does not replace curly deep javascript',
      target: {
        foo: '{foo: {"bar": 123, "cat": {$.test}}}',
      },
      variables: {
        test: 123,
      },
      expected(result) {
        return result.foo === '{foo: {"bar": 123, "cat": 123}}';
      },
    },
    {
      name: 'replaceVariables > handles nested stringified json',
      target: {
        foo: '{"foo": "{$.bar}"}',
      },
      variables: {
        bar: 'cat',
      },
      expected(result) {
        return result.foo === '{"foo": "cat"}';
      },
    },
    {
      name: 'replaceVariables > handles path selectors',
      target: {
        foo: '{$.bar.name}',
      },
      variables: {
        bar: {
          name: 'cat',
        },
      },
      expected(result) {
        return result.foo === 'cat';
      },
    },
    {
      name: 'replaceVariables > handles path selectors with arrays',
      target: {
        foo: '{$.bar[0].name}',
      },
      variables: {
        bar: [
          {
            name: 'cat',
          },
        ],
      },
      expected(result) {
        return result.foo === 'cat';
      },
    },
    {
      name: 'replaceVariables > handles solo non-string variables',
      target: {
        foo: '{$.bar}',
      },
      variables: {
        bar: 5,
      },
      expected(result) {
        return result.foo === 5;
      },
    },
    {
      name: 'replaceVariables > handles embedded non-string variables',
      target: {
        foo: '{"url": "http://example.com/{$.bar}"}',
      },
      variables: {
        bar: 5,
      },
      expected(result) {
        return result.foo === '{"url": "http://example.com/5"}';
      },
    },
    {
      name: 'replaceVariables > handles falsey',
      target: {
        foo: '{$.bar}',
      },
      variables: {
        bar: false,
      },
      expected(result) {
        return result.foo === false;
      },
    },
    {
      name: 'replaceVariables > handles variables that do not exist',
      target: {
        foo: '{$.doesNotExist}',
      },
      variables: {
        bar: false,
      },
      expected(result) {
        return result.foo === '{$.doesNotExist}';
      },
    },
    {
      name: 'replaceVariables > handles stringified variables',
      target: {
        foo: '{$.bar}',
      },
      variables: JSON.stringify({
        bar: false,
      }),
      expected(result) {
        return result.foo === false;
      },
    },
    {
      name: 'replaceVariables > returns the original',
      target: '',
      variables: JSON.stringify({
        bar: false,
      }),
      expected(result) {
        return result === '';
      },
    },
    {
      name: 'replaceVariables > replaces multiple occurrences',
      target: '{$.foo}is{$.foo}',
      variables: JSON.stringify({
        foo: 'cat',
      }),
      expected(result) {
        return result === 'catiscat';
      },
    },
    {
      name: 'replaceVariables > replaces variables that end in 3',
      target: 'foo is {$.bar3}',
      variables: JSON.stringify({
        bar3: 'cat',
      }),
      expected(result) {
        return result === 'foo is cat';
      },
    },
    {
      name: 'replaceVariables > handles variable values with a space',
      target: '{$.foo} are {$.bar}',
      variables: JSON.stringify({
        foo: 'dogs',
        bar: 'better than cats',
      }),
      expected(result) {
        return result === 'dogs are better than cats';
      },
    },
    {
      name: 'replaceVariables > handles ctx variable',
      target: {
        foo: '{$.ctx.bar}',
      },
      variables: {
        ctx: {
          bar: 'cat',
        },
      },
      expected(result) {
        return result.foo === 'cat';
      },
    },
    {
      name: 'replaceVariables > handles env variable',
      target: {
        foo: '{$.env.bar}',
      },
      variables: {
        env: {
          bar: 'cat',
        },
      },
      expected(result) {
        return result.foo === 'cat';
      },
    },
  ];
};

const cases = buildCases();

export default cases;
