function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isEmpty = _interopDefault(require('lodash/isEmpty'));
var has = _interopDefault(require('lodash/has'));
var OAuth = _interopDefault(require('oauth-1.0a'));
var HmacSHA1 = _interopDefault(require('crypto-js/hmac-sha1'));
var HmacSHA256 = _interopDefault(require('crypto-js/hmac-sha256'));
var EncBASE64 = _interopDefault(require('crypto-js/enc-base64'));
var qs = _interopDefault(require('qs'));
var merge = _interopDefault(require('lodash/merge'));
var map = _interopDefault(require('lodash/map'));
var isArray = _interopDefault(require('lodash/isArray'));
var stringify = _interopDefault(require('json-stringify-safe'));
var get = _interopDefault(require('lodash/get'));
var set = _interopDefault(require('lodash/set'));
var includes = _interopDefault(require('lodash/includes'));
var forEach = _interopDefault(require('lodash/forEach'));
var trim = _interopDefault(require('lodash/trim'));
var trimStart = _interopDefault(require('lodash/trimStart'));
var uniq = _interopDefault(require('lodash/uniq'));
var lodash_omit = require('lodash/omit');
var escapeRegExp = _interopDefault(require('lodash/escapeRegExp'));
var clone = _interopDefault(require('lodash/clone'));
var replace = _interopDefault(require('lodash/replace'));
var isEqual = _interopDefault(require('lodash/isEqual'));
var isNumber = _interopDefault(require('lodash/isNumber'));
var isUndefined = _interopDefault(require('lodash/isUndefined'));
var gt = _interopDefault(require('lodash/gt'));
var gte = _interopDefault(require('lodash/gte'));
var lt = _interopDefault(require('lodash/lt'));
var lte = _interopDefault(require('lodash/lte'));
var isFunction = _interopDefault(require('lodash/isFunction'));

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
    e = e.replace(/n/g, "n");
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

var QueryHelpers = Object.freeze({
	setQuery: setQuery
});

var safeParse = function safeParse(target, defaultValue) {
  if (typeof target === 'string') {
    try {
      return JSON.parse(target);
    } catch (e) {
      return defaultValue || {};
    }
  }

  return target;
};

var safeStringify = function safeStringify(target, offset) {
  if (target && typeof target !== 'string') {
    return stringify(target, null, offset || 4);
  }

  return target;
};

var mapToNameValue = function mapToNameValue(obj) {
  if (obj instanceof Array) {
    return obj;
  }

  return map(obj || {}, function (value, name) {
    return { name: name, value: value };
  });
};

var nameValueToMap = function nameValueToMap(nameValueArray) {
  if (!isArray(nameValueArray)) {
    return nameValueArray;
  }

  var result = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nameValueArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref2 = _step.value;
      var name = _ref2.name,
          value = _ref2.value;

      result[name] = value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};

var JSONHelpers = Object.freeze({
	safeParse: safeParse,
	safeStringify: safeStringify,
	mapToNameValue: mapToNameValue,
	nameValueToMap: nameValueToMap
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var AUTH_TYPES = ['basic', 'digest', 'oauth1', 'oauth2', 'aws'];

var generateBasicAuth = function generateBasicAuth(username, password, options) {
  options = options || {};

  var string = [username, password].join(':');
  string = Base64.encode(string); // Need to use custom base64 for golang vm.
  return {
    headers: {
      Authorization: 'Basic ' + string
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
    patch = {
      headers: {
        Authorization: headerPatch.Authorization
      }
    };
  } else {
    // add to the query string
    patch = {
      url: setQuery(request.url, authPatch, { preserve: true })
    };
  }

  return patch;
};

var generateAws = function generateAws(data, request, options) {
  options = options || {};

  var patch = {};

  if (!options.signAws) {
    console.warn('authorization/generateAws signAws function not supplied!');
    return patch;
  }

  if (has(request, 'headers.Authorization')) {
    return patch;
  }

  var requestToAuthorize = _extends({}, request, {
    method: request.method.toUpperCase(),
    body: safeStringify(request.body) || '',
    service: data.service,
    region: data.region
  });

  var headers = options.signAws(requestToAuthorize, {
    secretAccessKey: data.secretKey,
    accessKeyId: data.accessKey,
    sessionToken: data.sessionToken
  });

  // add to the header
  patch = {
    headers: headers
  };

  return patch;
};

var generateAuthPatch = function generateAuthPatch(authNode, request, options) {
  options = options || {};
  var patch = {};

  if (!authNode || AUTH_TYPES.indexOf(authNode.type) < 0) {
    return patch;
  }

  var details = authNode;
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
    case 'aws':
      patch = generateAws(details, request, options);
      break;
    default:
      console.log(authNode.type + ' auth not implemented');
  }

  return patch;
};

function compareVariableMatch(a, b) {
  if (a.charAt(0) === '{' && b.charAt(0) !== '{') return -1;
  if (a.charAt(0) !== '{' && b.charAt(0) === '{') return 1;
  return 0;
}

var extractVariables = function extractVariables(target) {
  var toProcess = safeStringify(target);
  var matches = [];
  var reg = new RegExp(/\{(\$\.[\[\]\.\w- ']+)\}|(\$\.[\[\]\.\w- ']+)"/g);
  while (true) {
    var match = reg.exec(toProcess);
    if (!match || isEmpty(match)) {
      return uniq(matches).sort(compareVariableMatch);
    }

    matches.push(match[1] ? match[0] : match[2]);
  }
};

var replaceVariables = function replaceVariables(target) {
  var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var parsedVariables = safeParse(variables);
  if (isEmpty(target) || isEmpty(parsedVariables)) {
    return target;
  }

  var toProcess = safeStringify(target);
  var matches = extractVariables(target);
  forEach(matches, function (match) {
    var variable = trimStart(trim(match, '{} '), '$.');
    var value = get(parsedVariables, variable);
    if (typeof value !== 'undefined') {
      if (typeof value === 'string') {
        toProcess = toProcess.replace(new RegExp(escapeRegExp(match), 'g'), safeStringify(value));
      } else {
        match = replace(match, '$.', '\\$\.');
        toProcess = toProcess.replace(new RegExp('"' + match + '"|' + match, 'g'), safeStringify(value));
      }
    }
  });

  return safeParse(toProcess, toProcess || target);
};

var replaceNodeVariables = function replaceNodeVariables(node) {
  var before = clone(node.before);
  var after = clone(node.after);

  node = replaceVariables(node, $);

  if (before) {
    forEach(before.assertions, function (a, i) {
      node.before.assertions[i].target = a.target;
    });
    node.before.script = before.script;
    node.before.transforms = before.transforms;
  }

  if (after) {
    forEach(after.assertions, function (a, i) {
      node.after.assertions[i].target = a.target;
    });
    node.after.script = after.script;
    node.after.transforms = after.transforms;
  }

  return node;
};

var VariableHelpers = Object.freeze({
	extractVariables: extractVariables,
	replaceVariables: replaceVariables,
	replaceNodeVariables: replaceNodeVariables
});

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

var ASSERTION_OPS = ['eq', 'ne', 'exists', 'contains', 'gt', 'gte', 'lt', 'lte', 'validate', 'validate.pass', 'validate.contract', 'validate.fail'];

var runAssertion = function runAssertion(resultNode, assertion) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var result = _extends({}, assertion, {
    pass: false,
    msg: '',
    details: ''
  });

  try {
    var validate = options.validate;


    var targetPath = trim(buildPathSelector([assertion.target]));
    var value = void 0;
    if (targetPath.charAt(0) === '$') {
      value = get($, trimStart(targetPath, '$.'));
    } else {
      value = get(resultNode, targetPath);
    }

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
        case 'validate':
        case 'validate.contract':
        case 'validate.pass':
        case 'validate.fail':
          if (!validate) {
            throw new Error('Cannot run ' + assertion.op + ' assertion - no validate function provided in options');
          }

          var expected = safeParse(assertion.expected);
          if (!expected || isEmpty(expected)) {
            throw new Error('Cannot run ' + assertion.op + ' assertion - JSON schema is null or empty. If using the \'Link to API design\' feature,\n              please make sure there is an endpoint that matches this request, with the appropriate status code, defined in your design.');
          }

          var validationResult = validate(value, expected);
          if (!validationResult) {
            throw new Error('Unknown validation error');
          }

          if (!isEmpty(validationResult.details)) {
            result.details = safeStringify(validationResult.details);
          }

          if (validationResult.error && ['validate.pass', 'validate', 'validate.contract'].indexOf(assertion.op) > -1) {
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
      result.msg = e.message;
    }

    return result;
  } catch (err) {
    result.pass = false;
    result.msg = err.message;

    return result;
  }
};

var runAssertions = function runAssertions(resultNode, assertions) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var results = [];
  if (assertions) {
    forEach(assertions, function (a) {
      results.push(runAssertion(resultNode, a, options));
    });
  }

  return results;
};

var runTransform = function runTransform(rootNode, resultNode, transform) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  try {
    var sourcePath = transform.source;
    var targetPath = transform.target;

    var sourceNode = sourcePath.charAt(0) === '$' ? rootNode : resultNode;
    var targetNode = targetPath.charAt(0) === '$' ? rootNode : resultNode;

    var value = get(sourceNode, trimStart(sourcePath, '$.'));

    set(targetNode, trimStart(targetPath, '$.'), value);
  } catch (e) {
    console.warn('transforms#runTransform', e, resultNode, transform);
  }
};

var runTransforms = function runTransforms(rootNode, resultNode, transforms) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  transforms = transforms || [];

  forEach(transforms, function (a) {
    runTransform(rootNode, resultNode, a, options);
  });
};

var patchAuthorization = function patchAuthorization(node, options) {
  var authNode = get(node, 'input.auth');

  // Run Authorization & Patch
  if (!isEmpty(authNode)) {
    var authPatch = generateAuthPatch(authNode, get(node, 'input'), options);
    if (!isEmpty(authPatch)) {
      var input = get(node, 'input') || {};
      merge(input, authPatch);
      set(node, 'input', input);
    }
  }
};

var runScript = function runScript(script, root) {
  var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var tests = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var input = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var output = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var logger = arguments[6];

  // additional functions available to scripts
  var Base64$$1 = Base64;
  var safeStringify$$1 = safeStringify,
      safeParse$$1 = safeParse;

  var skip = function skip() {
    throw new Error('SKIP');
  };
  var stop = function stop() {
    throw new Error('STOP');
  };
  var reportError = function reportError(e) {
    if (logger) {
      logger.log('error', 'script', ['script syntax error', String(e)]);
    } else {
      console.error('unknown script error', e);
    }
  };

  var result = {
    status: null
  };

  try {
    eval('\n      if (logger) {\n        console.debug = function() {\n          logger.log(\'debug\', \'script\', _.values(arguments));\n        }\n        console.log = console.info = function() {\n          logger.log(\'info\', \'script\', _.values(arguments));\n        }\n        console.warn = function() {\n          logger.log(\'warn\', \'script\', _.values(arguments));\n        }\n        console.error = function() {\n          logger.log(\'error\', \'script\', _.values(arguments));\n        }\n      }\n      ' + script + '\n    ');
  } catch (e) {
    if (e.message === 'SKIP') {
      result.status = 'skipped';
    } else if (e.message === 'STOP') {
      result.status = 'stopped';
    } else {
      // adjust the line number to remove code added that the user doesn't know about
      var match = e.message.match(/line [0-9]+/);
      if (match) {
        var parts = match[0].split(' ');
        var lineNum = Number(parts[1]);
        e.message = e.message.replace('line ' + lineNum, 'line ' + (lineNum - 18));
      }

      reportError(e);
    }
  }

  return result;
};

/**
 * Runs a logic block on a given node. For example, the before, after, assertions, and transforms for a function.
 * @param {string} node - The flow node we are operating on, for example a single "step" or "function" object.
 * @param {string} logicPath - The path selector (ie [0].before) to the logic object we are running.
 * @param {Object} options
 * @param {function(object, object)} options.validate - An optional validation function, takes the value as the first argument, and the schema as the second.
 */
var runLogic = function runLogic(result, node, logicPath, options) {
  if (!node) {
    return {};
  }

  // TODO: Order Transforms, script, replace/parse variables, assertions
  var logic = get(node, logicPath);
  if (!logic) {
    // Patch Authorization
    node = replaceNodeVariables(node);
    patchAuthorization(node, options);
    return node;
  }

  // Init Logs
  var logs = get(result, 'logs') || [];
  // Init Options
  options = options || {};
  options.logger = {
    log: function log(type, context, messages) {
      if (isEmpty(messages)) {
        console.warn('You cannot log with no messages.');
      }

      var cleanMessages = messages.map(function (m) {
        return safeStringify(m);
      });
      // print(cleanMessages);
      logs.push({
        type: type,
        source: [logicPath].concat(context || []).join('.'),
        msg: cleanMessages
      });
    }
  };

  // Run Transforms
  runTransforms($, logicPath === 'before' ? node : result, logic.transforms, options);
  node = replaceNodeVariables(node);
  logic = get(node, logicPath);
  // Run Script
  var tests = {};
  var script = logic.script;
  var scriptResult = void 0;
  if (!isEmpty(script)) {
    if (logicPath === 'before') {
      var input = get(node, 'input') || {};
      // TODO: Figure out CTX and Env
      scriptResult = runScript(script, $.response || {}, {}, tests, input, {}, options.logger);
    } else {
      var _input = get(result, 'input') || {};
      var output = get(result, 'output') || {};
      // TODO: Figure out CTX and Env
      scriptResult = runScript(script, $.response || {}, {}, tests, _input, output, options.logger);
    }

    if (includes(['skipped', 'stopped'], scriptResult.status)) {
      result.status = scriptResult.status;
      return node;
    }
  }

  // Patch Authorization
  patchAuthorization(node, options);

  // Replace variables after script
  node = replaceNodeVariables(node);
  logic = get(node, logicPath);

  // Run Assertions
  var n = node;
  if (logicPath === 'after') {
    n = result;
  }
  var assertions = runAssertions(n, logic.assertions, options);

  // Add Test Assertions
  if (!isEmpty(tests)) {
    for (var key in tests) {
      var pass = tests[key];
      assertions.push({
        target: logicPath + '.script',
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
  set(result, logicPath + '.assertions', assertions);

  // Set fail/pass count
  forEach(assertions, function (a) {
    if (a.pass) {
      result.passCount += 1;
    } else {
      result.failCount += 1;
    }
  });

  // Set Logs
  set(result, 'logs', logs);

  return node;
};

var runNode = function runNode(node, options) {
  if (!node) {
    return {};
  }

  var result = {
    status: 'running',
    name: node.name,
    type: node.type,
    failCount: 0,
    passCount: 0
  };
  $.steps[node.id] = result;

  // TODO: Update how we do invoke, pass it in options so we don't have to copy it.
  var invoke = void 0;
  if (node.input && isFunction(node.input.invoke)) {
    invoke = node.input.invoke;
  }

  var start = Date.now();
  node = runLogic(result, node, 'before', options);

  if (invoke) {
    node.input.invoke = invoke;
  }
  result.input = node.input;

  if (invoke) {
    result.output = node.input.invoke(_$cenario.session, result.input);
  }
  runLogic(result, node, 'after', options);

  result.ctx = clone($.ctx);
  result.env = clone($.env);

  result.status = 'completed';
  result.time = Date.now() - start;

  // Update scenario result pass/fail count.
  $.passCount += result.passCount;
  $.failCount += result.failCount;

  return node;
};

var index = _extends({
  generateAuthPatch: generateAuthPatch,
  runNode: runNode,
  runLogic: runLogic,
  buildPathSelector: buildPathSelector
}, VariableHelpers, JSONHelpers, QueryHelpers);

module.exports = index;
