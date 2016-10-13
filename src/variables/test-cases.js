const buildCases = () => {
  return [
    {
      name: 'replaceVariables > handles simple variable',
      target: {
        foo: '<<bar>>',
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
        foo: '{bar}',
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
        foo: '{bar.name}',
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
        foo: '{foo: {"bar": 123, "cat": {test}}}',
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
        foo: '{"foo": "<<bar>>"}',
      },
      variables: {
        bar: 'cat',
      },
      expected(result) {
        return result.foo === '{"foo": "cat"}';
      },
    },
    {
      name: 'replaceVariables > handles urlencoded carets',
      target: {
        foo: '{"foo": "%3C%3Cbar%3E%3E"}',
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
        foo: '<<bar.name>>',
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
      name: 'replaceVariables > handles path selectors when required',
      target: {
        foo: '<<!bar.name>>',
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
        foo: '<<bar[0].name>>',
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
        foo: '<<bar>>',
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
        foo: '{"url": "http://example.com/<<bar>>"}',
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
        foo: '<<bar>>',
      },
      variables: {
        bar: false,
      },
      expected(result) {
        return result.foo === false;
      },
    },
    {
      name: 'replaceVariables > handles required',
      target: {
        foo: '<<!bar>>',
      },
      variables: {
        bar: false,
      },
      expected(result) {
        return result.foo === false;
      },
    },
  ];
};

const cases = buildCases();

export default cases;
