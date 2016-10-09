function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isEmpty = _interopDefault(require('lodash/isEmpty'));
var has = _interopDefault(require('lodash/has'));
var OAuth = _interopDefault(require('oauth-1.0a'));
var HmacSHA1 = _interopDefault(require('crypto-js/hmac-sha1'));
var HmacSHA256 = _interopDefault(require('crypto-js/hmac-sha256'));
var EncBASE64 = _interopDefault(require('crypto-js/enc-base64'));
var qs = _interopDefault(require('qs'));
var merge = _interopDefault(require('lodash/merge'));
var forEach = _interopDefault(require('lodash/forEach'));
var trim = _interopDefault(require('lodash/trim'));
var get = _interopDefault(require('lodash/get'));
var uniq = _interopDefault(require('lodash/uniq'));
var omit = _interopDefault(require('lodash/omit'));
var set = _interopDefault(require('lodash/set'));
var includes = _interopDefault(require('lodash/includes'));
var isEqual = _interopDefault(require('lodash/isEqual'));
var isNumber = _interopDefault(require('lodash/isNumber'));
var isUndefined = _interopDefault(require('lodash/isUndefined'));
var gt = _interopDefault(require('lodash/gt'));
var gte = _interopDefault(require('lodash/gte'));
var lt = _interopDefault(require('lodash/lt'));
var lte = _interopDefault(require('lodash/lte'));

var Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function encode(e) {
    var t = '';
    var n = void 0;
    var r = void 0;
    var i = void 0;
    var s = void 0;
    var o = void 0;
    var u = void 0;
    var a = void 0;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = (n & 3) << 4 | r >> 4;
      u = (r & 15) << 2 | i >> 6;
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64;
      } else if (isNaN(i)) {
        a = 64;
      }
      t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
    }
    return t;
  },
  decode: function decode(e) {
    var t = "";
    var n = void 0,
        r = void 0,
        i = void 0;
    var s = void 0,
        o = void 0,
        u = void 0,
        a = void 0;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = s << 2 | o >> 4;
      r = (o & 15) << 4 | u >> 2;
      i = (u & 3) << 6 | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r);
      }
      if (a != 64) {
        t = t + String.fromCharCode(i);
      }
    }
    t = Base64._utf8_decode(t);
    return t;
  },
  _utf8_encode: function _utf8_encode(e) {
    e = e.replace(/rn/g, "n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192);
        t += String.fromCharCode(r & 63 | 128);
      } else {
        t += String.fromCharCode(r >> 12 | 224);
        t += String.fromCharCode(r >> 6 & 63 | 128);
        t += String.fromCharCode(r & 63 | 128);
      }
    }
    return t;
  },
  _utf8_decode: function _utf8_decode(e) {
    var t = "";
    var n = 0;
    var r = c1 = c2 = 0;
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++;
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
        n += 2;
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        n += 3;
      }
    }
    return t;
  }
};

var setQuery = function setQuery(url, queryObj, options) {
  options = options || {};

  if (isEmpty(queryObj)) {
    return url;
  }

  var urlParts = url.split('?');
  var query = urlParts[1];
  var existingQueryObj = qs.parse(query);

  if (options.preserve) {
    merge(queryObj, existingQueryObj);
  }

  merge(existingQueryObj, queryObj);

  return urlParts[0] + '?' + qs.stringify(existingQueryObj);
};

var AUTH_TYPES = ['basic', 'digest', 'oauth1', 'oauth2'];

var generateBasicAuth = function generateBasicAuth(username, password, options) {
  options = options || {};

  var string = [username, password].join(':');
  string = Base64.encode(string); // Need to use custom base64 for golang vm.

  return {
    request: {
      headers: [{
        name: 'Authorization',
        value: 'Basic ' + string
      }]
    }
  };
};

var hashFunction = function hashFunction(method, encode, options) {
  options = options || {};

  return function (base_string, key) {
    var hash = void 0;

    switch (method) {
      case 'HMAC-SHA1':
        hash = HmacSHA1(base_string, key);
        break;
      case 'HMAC-SHA256':
        hash = HmacSHA256(base_string, key);
        break;
      default:
        return key;
    }

    if (encode) {
      return hash.toString(EncBASE64);
    }

    return hash.toString();
  };
};
var generateOAuth1 = function generateOAuth1(data, request, options) {
  options = options || {};

  var patch = {};
  if (data.useHeader && has(request, 'headers.Authorization')) {
    return patch;
  }

  var signatureMethod = data.signatureMethod || 'HMAC-SHA1';

  var encode = data.encode;
  var oauth = OAuth({
    consumer: {
      key: data.consumerKey,
      secret: data.consumerSecret
    },
    signature_method: signatureMethod,
    hash_function: hashFunction(signatureMethod, encode, options),
    version: data.version || '1.0',
    nonce_length: data.nonceLength || 32,
    parameter_seperator: data.parameterSeperator || ', '
  });

  var token = null;
  if (data.token) {
    token = {
      key: data.token,
      secret: data.tokenSecret
    };
  }

  var requestToAuthorize = {
    url: request.url,
    method: request.method.toUpperCase(),
    data: request.body
  };
  var authPatch = oauth.authorize(requestToAuthorize, token);
  patch.authorization = {
    oauth1: {
      nonce: authPatch.oauth_nonce
    }
  };

  if (data.useHeader) {
    // add to the header
    var headerPatch = oauth.toHeader(authPatch);
    patch.request = {
      headers: [{
        name: 'Authorization',
        value: headerPatch.Authorization
      }]
    };
  } else {
    // add to the query string
    patch.request = {
      url: setQuery(request.url, authPatch, { preserve: false })
    };
  }

  return patch;
};

var generateAuthPatch = function generateAuthPatch(authNode, request, options) {
  options = options || {};
  var patch = {};

  if (!authNode || AUTH_TYPES.indexOf(authNode.type) < 0) {
    return patch;
  }

  var details = authNode[authNode.type];
  if (isEmpty(details)) {
    return patch;
  }

  switch (authNode.type) {
    case 'basic':
      if (!has(request, 'headers.Authorization')) {
        patch = generateBasicAuth(details.username, details.password, options);
      }

      break;
    case 'oauth1':
      patch = generateOAuth1(details, request, options);
      break;
    default:
      console.log(authNode.type + ' auth not implemented');
  }

  return patch;
};

var safeParse = function safeParse(target) {
  if (typeof target === 'string') {
    try {
      return JSON.parse(target);
    } catch (e) {
      return {};
    }
  }

  return target;
};

var safeStringify = function safeStringify(target, offset) {
  if (target && typeof target !== 'string') {
    return JSON.stringify(target, null, offset || 4);
  }

  return target;
};

var replaceVariables = function replaceVariables(target, variables) {
  if (isEmpty(target) || isEmpty(variables)) {
    return target || {};
  }

  var toProcess = safeStringify(target);

  var matches = uniq(toProcess.match(/<<([\[\]\.\w- ]+)>>|<<([\[\]\.\w- ]+)>>|%3C%3C([[\[\]\.\w- ]+)%3E%3E|\\<\\<([[\[\]\.\w- ]+)\\>\\>/gm));
  forEach(matches, function (match) {
    var variable = trim(match, '<>%3C%3E\\<\\>');

    var value = get(variables, variable);
    if (typeof value === 'string') {
      toProcess = toProcess.replace(match, value);
    } else {
      toProcess = toProcess.replace(new RegExp('"' + match + '"|' + match, 'g'), value);
    }
  });

  return safeParse(toProcess);
};

var replaceNodeVariables = function replaceNodeVariables(node) {
  var steps = node.steps;
  var children = node.children;
  var functions = node.functions;

  var newNode = replaceVariables(omit(node, 'steps', 'children', 'functions'), node.state);
  if (steps) {
    newNode.steps = steps;
  }
  if (children) {
    newNode.children = children;
  }
  if (functions) {
    newNode.functions = functions;
  }

  return newNode;
};

var buildPathSelector = function buildPathSelector(parts) {
  parts = parts || [];
  var targetPath = '';

  forEach(parts, function (part) {
    if (!isEmpty(part)) {
      if (isEmpty(targetPath) || part.charAt(0) === '[') {
        targetPath += part;
      } else {
        targetPath += '.' + part;
      }
    }
  });

  return targetPath;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var ASSERTION_OPS = ['eq', 'ne', 'exists', 'contains', 'gt', 'gte', 'lt', 'lte', 'validate.pass', 'validate.fail'];

var runAssertion = function runAssertion(resultNode, assertion) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var result = {
    pass: false,
    message: '',
    details: ''
  };

  try {
    var validate = options.validate;


    var targetPath = buildPathSelector([assertion.location, assertion.target]);
    var value = get(resultNode, targetPath);

    try {
      switch (assertion.op) {
        case 'eq':
          if (!isEqual(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to equal ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'ne':
          if (isEqual(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to NOT equal ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'exists':
          var shouldExist = assertion.hasOwnProperty('expected') ? assertion.expected : true;
          if (isUndefined(value)) {
            if (shouldExist) {
              throw new Error('Expected ' + targetPath + ' to exist');
            }
          } else if (!shouldExist) {
            throw new Error('Expected ' + targetPath + ' NOT to exist - actual is \'' + value + '\'');
          }
          break;
        case 'contains':
          if (!includes(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to contain ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'gt':
          if (!gt(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to be greater than ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'gte':
          if (!gte(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to be greater than or equal to ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'lt':
          if (!lt(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to be less than ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'lte':
          if (!lte(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to be less than or equal to ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'gt':
        case 'gte':
        case 'lt':
        case 'lte':
          if (!isNumber(value)) {
            throw new Error('Expected ' + targetPath + ' to be a number - actual is ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
          }
          break;
        case 'validate.pass':
        case 'validate.fail':
          if (!validate) {
            throw new Error('Cannot run ' + assertion.op + ' assertion - no validate function provided in options');
          }

          var validationResult = validate(value, safeParse(assertion.expected));

          if (!validationResult) {
            throw new Error('Unknown validation error');
          }

          if (!isEmpty(validationResult.details)) {
            result.details = safeStringify(validationResult.details);
          }

          if (validationResult.error && assertion.op === 'validate.pass') {
            throw new Error(validationResult.error);
          }

          if (!validationResult.error && assertion.op === 'validate.fail') {
            throw new Error('Expected validate to fail - actual passed');
          }

          break;
        default:
          result.details = 'valid types are ' + ASSERTION_OPS.join(',');
          throw new Error('\'' + assertion.op + '\' is not a valid operation type');
      }

      result.pass = true;
    } catch (e) {
      result.pass = false;
      result.message = e.message;
    }

    return result;
  } catch (err) {
    result.pass = false;
    result.message = err.message;

    return result;
  }
};

var runAssertions = function runAssertions(resultNode, assertions) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  assertions = assertions || [];

  forEach(assertions, function (a) {
    a.result = runAssertion(resultNode, a, options);
  });

  return assertions;
};

var SOURCE_REGEX = new RegExp(/^state|status|result|input/);

var runTransform = function runTransform(resultNode, transform) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  try {
    var sourcePath = buildPathSelector([transform.sourceLocation, transform.sourcePath]);

    if (!sourcePath.match(SOURCE_REGEX)) {
      return;
    }

    var targetPath = buildPathSelector([transform.targetLocation, transform.targetPath]);
    var value = get(resultNode, sourcePath);
    set(resultNode, targetPath, value);
  } catch (e) {
    console.warn('transforms#runTransform', e, resultNode, transform);
  }
};

var runTransforms = function runTransforms(resultNode, transforms) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  transforms = transforms || [];

  forEach(transforms, function (a) {
    runTransform(resultNode, a, options);
  });
};

var patchAuthorization = function patchAuthorization(node, options) {
  // Run Authorization & Patch
  var authPatch = generateAuthPatch(get(node, 'input.authorization'), get(node, 'input.request'), options);
  if (!isEmpty(authPatch)) {
    var input = get(node, 'input') || {};
    merge(input, authPatch);
    set(node, 'input', input);
  }
};

var runScript = function runScript(func) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var tests = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var input = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var output = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  eval('\n    with (input) {\n      with (output) {\n        ' + func + '\n      }\n    }');
};

/**
 * Runs a logic block on a given node. For example, the before, after, assertions, and transforms for a function.
 * @param {string} node - The flow node we are operating on, for example a single "step" or "function" object.
 * @param {string} logicPath - The path selector (ie [0].before) to the logic object we are running.
 * @param {Object} options
 * @param {function(object, object)} options.validate - An optional validation function, takes the value as the first argument, and the schema as the second.
 */
var runLogic = function runLogic(node, logicPath, options) {
  if (!node) {
    return {};
  }

  // Replace variables before script
  node = replaceNodeVariables(node);

  var logic = get(node, logicPath);
  if (!logic) {
    // Patch Authorization
    patchAuthorization(node, options);
    return node;
  }

  // Run Transforms
  runTransforms(node, logic.transforms, options);

  // Run Script
  var tests = {};
  var script = logic.script;
  if (!isEmpty(script)) {
    if (logicPath === 'before') {
      var input = get(node, 'input') || {};
      var state = get(node, 'state') || {};
      runScript(script, state, tests, input);
      set(node, 'state', state);
    } else {
      var _input = get(node, 'result.input') || {};
      var output = get(node, 'result.output') || {};
      var _state = get(node, 'result.state') || {};
      runScript(script, _state, tests, _input, output);
      set(node, 'result.state', _state);
    }
  }

  // Patch Authorization
  patchAuthorization(node, options);

  // Replace variables after script
  node = replaceNodeVariables(node);

  // Run Assertions
  var assertions = runAssertions(node, logic.assertions, options);

  // Add Test Assertions
  if (!isEmpty(tests)) {
    for (var key in tests) {
      var pass = tests[key];
      assertions.push({
        location: logicPath + ' script',
        target: '',
        op: 'tests',
        expected: '',
        result: {
          pass: pass,
          message: key
        }
      });
    }
  }

  // Set Assertions
  set(node, logicPath + '.assertions', assertions);

  return node;
};

// export const runNode = (node, options) => {
//   node = runLogic(node, 'before', options);
//   options.invoke(node);
//   node = runLogic(node, 'after', options);

//   return node;
// }

var index = {
  generateAuthPatch: generateAuthPatch,
  replaceVariables: replaceVariables,
  runLogic: runLogic,
  buildPathSelector: buildPathSelector
};

module.exports = index;
