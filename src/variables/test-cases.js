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
  ];
};

const cases = buildCases();

export default cases;
