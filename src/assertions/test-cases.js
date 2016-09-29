const VALIDATE_BAD_SCHEMA = 'Validation error: you must provide a valid JSON schema.';

const validateSpy = (target, schema) => {
  if (!schema) {
    return {
      error: VALIDATE_BAD_SCHEMA,
    };
  }

  return {};
};

const buildCases = () => {
  return [
    // eq

    {
      name: 'eq > handles pass',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'bar',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'eq',
        expected: 'bar',
      },
      expected(result) {
        return result.pass;
      },
    },
    {
      name: 'eq > handles fail',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'bar2',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'eq',
        expected: 'bar',
      },
      expected(result) {
        return !result.pass;
      },
    },

    // ne

    {
      name: 'ne > handles pass',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'bar',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'ne',
        expected: 'bar2',
      },
      expected(result) {
        return result.pass;
      },
    },
    {
      name: 'ne > handles fail',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'bar',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'ne',
        expected: 'bar',
      },
      expected(result) {
        return !result.pass;
      },
    },

    // exists

    {
      name: 'exists > handles pass',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'bar',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'exists',
      },
      expected(result) {
        return result.pass;
      },
    },
    {
      name: 'exists > handles fail',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'bar',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.bar',
        op: 'exists',
      },
      expected(result) {
        return !result.pass;
      },
    },

    // exists

    {
      name: 'contains > handles pass with string',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'my string',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'contains',
        expected: 'my',
      },
      expected(result) {
        return result.pass;
      },
    },
    {
      name: 'contains > handles pass with array',
      resultNode: {
        output: {
          response: {
            body: {
              foo: ['my', 'string'],
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'contains',
        expected: 'my',
      },
      expected(result) {
        return result.pass;
      },
    },
    {
      name: 'contains > handles fail',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'bar',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.bar',
        op: 'contains',
        expected: 'my',
      },
      expected(result) {
        return !result.pass;
      },
    },

    // gt

    {
      name: 'gt > handles pass',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 5,
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'gt',
        expected: 3,
      },
      expected(result) {
        return result.pass;
      },
    },
    {
      name: 'gt > handles fail',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 5,
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'gt',
        expected: 5,
      },
      expected(result) {
        return !result.pass;
      },
    },
    {
      name: 'gt > handles non numeric',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'foo',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'gt',
        expected: 5,
      },
      expected(result) {
        return !result.pass;
      },
    },

    // gte

    {
      name: 'gte > handles pass',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 5,
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'gte',
        expected: 5,
      },
      expected(result) {
        return result.pass;
      },
    },
    {
      name: 'gte > handles fail',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 5,
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'gte',
        expected: 6,
      },
      expected(result) {
        return !result.pass;
      },
    },
    {
      name: 'gte > handles non numeric',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'foo',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'gte',
        expected: 5,
      },
      expected(result) {
        return !result.pass;
      },
    },

    // lt

    {
      name: 'lt > handles pass',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 5,
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'lt',
        expected: 6,
      },
      expected(result) {
        return result.pass;
      },
    },
    {
      name: 'lt > handles fail',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 5,
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'lt',
        expected: 5,
      },
      expected(result) {
        return !result.pass;
      },
    },
    {
      name: 'lt > handles non numeric',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'foo',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'lt',
        expected: 5,
      },
      expected(result) {
        return !result.pass;
      },
    },

    // lte

    {
      name: 'lte > handles pass',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 5,
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'lte',
        expected: 5,
      },
      expected(result) {
        return result.pass;
      },
    },
    {
      name: 'lte > handles fail',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 5,
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'lte',
        expected: 4,
      },
      expected(result) {
        return !result.pass;
      },
    },
    {
      name: 'lte > handles non numeric',
      resultNode: {
        output: {
          response: {
            body: {
              foo: 'foo',
            },
          },
        },
      },
      assertion: {
        location: 'output.response',
        target: 'body.foo',
        op: 'lte',
        expected: 5,
      },
      expected(result) {
        return !result.pass;
      },
    },

    // validate.pass

    {
      name: 'validate.pass > fails if no validate function passed in',
      resultNode: {},
      assertion: {
        op: 'validate.pass',
      },
      expected(result) {
        return !result.pass;
      },
    },
    {
      name: 'validate.pass > validate errors correctly if schema is bad',
      resultNode: {},
      assertion: {
        location: 'output.response',
        target: 'body',
        op: 'validate.pass',
      },
      options: {
        validate: validateSpy,
      },
      expected(result) {
        return !result.pass && result.message === VALIDATE_BAD_SCHEMA;
      },
    },
    {
      name: 'validate.pass > handles pass',
      resultNode: {},
      assertion: {
        location: 'output.response',
        target: 'body',
        op: 'validate.pass',
        expected: {},
      },
      options: {
        validate: () => {
          return {};
        },
      },
      expected(result) {
        return result.pass;
      },
    },
    {
      name: 'validate.pass > handles fail',
      resultNode: {},
      assertion: {
        location: 'output.response',
        target: 'body',
        op: 'validate.pass',
        expected: {},
      },
      options: {
        validate: () => {
          return {
            error: 'this validation failed',
          };
        },
      },
      expected(result) {
        return !result.pass;
      },
    },

    // validate.fail

    {
      name: 'validate.fail > fails if no validate function passed in',
      resultNode: {},
      assertion: {
        op: 'validate.pass',
      },
      expected(result) {
        return !result.pass;
      },
    },
    {
      name: 'validate.fail > handles pass',
      resultNode: {},
      assertion: {
        location: 'output.response',
        target: 'body',
        op: 'validate.fail',
        expected: {},
      },
      options: {
        validate: () => {
          return {
            error: 'this validation failed',
          };
        },
      },
      expected(result) {
        return result.pass;
      },
    },
    {
      name: 'validate.fail > handles fail',
      resultNode: {},
      assertion: {
        location: 'output.response',
        target: 'body',
        op: 'validate.fail',
        expected: {},
      },
      options: {
        validate: () => {
          return {};
        },
      },
      expected(result) {
        return !result.pass;
      },
    },

    // misc

    {
      name: 'unknown op throws error',
      resultNode: {},
      assertion: {
        location: 'output.response',
        target: 'body',
        op: 'foo',
      },
      expected(result) {
        return !result.pass;
      },
    },
  ];
};

const cases = buildCases();

export default cases;
