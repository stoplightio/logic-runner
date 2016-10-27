var logicRunner = (function () {
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

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
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

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
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

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$2(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$2;

var isObject$1 = isObject_1;

/** `Object#toString` result references. */
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$3.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$1(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject$1(value) ? objectToString$1.call(value) : '';
  return tag == funcTag || tag == genTag;
}

var isFunction_1 = isFunction$1;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$2 = freeGlobal || freeSelf || Function('return this')();

var _root = root$2;

var root$1 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$1['__core-js_shared__'];

var _coreJsData = coreJsData$1;

var coreJsData = _coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

var _isMasked = isMasked$1;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource$2;

var isFunction = isFunction_1;
var isMasked = _isMasked;
var isObject = isObject_1;
var toSource$1 = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}

var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

var baseIsNative = _baseIsNative;
var getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$1(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$1;

var getNative = _getNative;
var root = _root;

/* Built-in method references that are verified to be native. */
var DataView$1 = getNative(root, 'DataView');

var _DataView = DataView$1;

var getNative$2 = _getNative;
var root$3 = _root;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative$2(root$3, 'Map');

var _Map = Map$1;

var getNative$3 = _getNative;
var root$4 = _root;

/* Built-in method references that are verified to be native. */
var Promise$2 = getNative$3(root$4, 'Promise');

var _Promise = Promise$2;

var getNative$4 = _getNative;
var root$5 = _root;

/* Built-in method references that are verified to be native. */
var Set$1 = getNative$4(root$5, 'Set');

var _Set = Set$1;

var getNative$5 = _getNative;
var root$6 = _root;

/* Built-in method references that are verified to be native. */
var WeakMap$1 = getNative$5(root$6, 'WeakMap');

var _WeakMap = WeakMap$1;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$2 = objectProto$4.toString;

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  return objectToString$2.call(value);
}

var _baseGetTag = baseGetTag$1;

var DataView = _DataView;
var Map = _Map;
var Promise$1 = _Promise;
var Set = _Set;
var WeakMap = _WeakMap;
var baseGetTag = _baseGetTag;
var toSource = _toSource;

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]';
var objectTag = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$1 = '[object Set]';
var weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto$1.toString;

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView);
var mapCtorString = toSource(Map);
var promiseCtorString = toSource(Promise$1);
var setCtorString = toSource(Set);
var weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag$1 = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if (DataView && getTag$1(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag$1(new Map()) != mapTag$1 || Promise$1 && getTag$1(Promise$1.resolve()) != promiseTag || Set && getTag$1(new Set()) != setTag$1 || WeakMap && getTag$1(new WeakMap()) != weakMapTag) {
    getTag$1 = function getTag$1(value) {
        var result = objectToString.call(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : undefined;

        if (ctorString) {
            switch (ctorString) {
                case dataViewCtorString:
                    return dataViewTag;
                case mapCtorString:
                    return mapTag$1;
                case promiseCtorString:
                    return promiseTag;
                case setCtorString:
                    return setTag$1;
                case weakMapCtorString:
                    return weakMapTag;
            }
        }
        return result;
    };
}

var _getTag = getTag$1;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength$1(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength$1;

var isFunction$2 = isFunction_1;
var isLength = isLength_1;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike$2(value) {
  return value != null && isLength(value.length) && !isFunction$2(value);
}

var isArrayLike_1 = isArrayLike$2;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

var isObjectLike_1 = isObjectLike$1;

var isArrayLike$1 = isArrayLike_1;
var isObjectLike = isObjectLike_1;

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject$1(value) {
  return isObjectLike(value) && isArrayLike$1(value);
}

var isArrayLikeObject_1 = isArrayLikeObject$1;

var isArrayLikeObject = isArrayLikeObject_1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$5.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$3 = objectProto$5.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments$1(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty$2.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString$3.call(value) == argsTag);
}

var isArguments_1 = isArguments$1;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray$1 = Array.isArray;

var isArray_1 = isArray$1;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
  var root = _root,
      stubFalse = stubFalse_1;

  /** Detect free variable `exports`. */
  var freeExports = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  module.exports = isBuffer;
});

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype$1(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$6;

  return value === proto;
}

var _isPrototype = isPrototype$1;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg$1(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg$1;

var overArg = _overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys$1 = overArg(Object.keys, Object);

var _nativeKeys = nativeKeys$1;

var getTag = _getTag;
var isArguments = isArguments_1;
var isArray = isArray_1;
var isArrayLike = isArrayLike_1;
var isBuffer = isBuffer_1;
var isPrototype = _isPrototype;
var nativeKeys = _nativeKeys;

/** `Object#toString` result references. */
var mapTag = '[object Map]';
var setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (isArrayLike(value) && (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !nativeKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

var isEmpty_1 = isEmpty;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$7.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas$1(object, key) {
  return object != null && hasOwnProperty$3.call(object, key);
}

var _baseHas = baseHas$1;

var getNative$6 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$1 = getNative$6(Object, 'create');

var _nativeCreate = nativeCreate$1;

var nativeCreate = _nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear$1;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete$1;

var nativeCreate$2 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$8.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$4.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

var nativeCreate$3 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$9.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$3 ? data[key] !== undefined : hasOwnProperty$5.call(data, key);
}

var _hashHas = hashHas$1;

var nativeCreate$4 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$4 && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet$1;

var hashClear = _hashClear;
var hashDelete = _hashDelete;
var hashGet = _hashGet;
var hashHas = _hashHas;
var hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
    var index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear;
Hash$1.prototype['delete'] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;

var _Hash = Hash$1;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear$1;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq$1(value, other) {
  return value === other || value !== value && other !== other;
}

var eq_1 = eq$1;

var eq = eq_1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$1(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf$1;

var assocIndexOf = _assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete$1;

var assocIndexOf$2 = _assocIndexOf;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet$1;

var assocIndexOf$3 = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$3(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas$1;

var assocIndexOf$4 = _assocIndexOf;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf$4(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet$1;

var listCacheClear = _listCacheClear;
var listCacheDelete = _listCacheDelete;
var listCacheGet = _listCacheGet;
var listCacheHas = _listCacheHas;
var listCacheSet = _listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$1(entries) {
    var index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `ListCache`.
ListCache$1.prototype.clear = listCacheClear;
ListCache$1.prototype['delete'] = listCacheDelete;
ListCache$1.prototype.get = listCacheGet;
ListCache$1.prototype.has = listCacheHas;
ListCache$1.prototype.set = listCacheSet;

var _ListCache = ListCache$1;

var Hash = _Hash;
var ListCache = _ListCache;
var Map$2 = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map$2 || ListCache)(),
    'string': new Hash()
  };
}

var _mapCacheClear = mapCacheClear$1;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable$1(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

var _isKeyable = isKeyable$1;

var isKeyable = _isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$1(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

var _getMapData = getMapData$1;

var getMapData = _getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete$1;

var getMapData$2 = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}

var _mapCacheGet = mapCacheGet$1;

var getMapData$3 = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$3(this, key).has(key);
}

var _mapCacheHas = mapCacheHas$1;

var getMapData$4 = _getMapData;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  var data = getMapData$4(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet$1;

var mapCacheClear = _mapCacheClear;
var mapCacheDelete = _mapCacheDelete;
var mapCacheGet = _mapCacheGet;
var mapCacheHas = _mapCacheHas;
var mapCacheSet = _mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
    var index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype['delete'] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;

var _MapCache = MapCache$1;

var MapCache = _MapCache;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize$1(func, resolver) {
  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache)();
  return memoized;
}

// Expose `MapCache`.
memoize$1.Cache = MapCache;

var memoize_1 = memoize$1;

var memoize = memoize_1;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped$1(func) {
  var result = memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped$1;

var root$7 = _root;

/** Built-in value references. */
var _Symbol2 = root$7.Symbol;

var _Symbol$1 = _Symbol2;

var isObjectLike$2 = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto$10 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$4 = objectProto$10.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike$2(value) && objectToString$4.call(value) == symbolTag;
}

var isSymbol_1 = isSymbol$1;

var _Symbol = _Symbol$1;
var isSymbol = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$1(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

var _baseToString = baseToString$1;

var baseToString = _baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$2(value) {
  return value == null ? '' : baseToString(value);
}

var toString_1 = toString$2;

var memoizeCapped = _memoizeCapped;
var toString$1 = toString_1;

/** Used to match property names within property paths. */
var reLeadingDot = /^\./;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath$1 = memoizeCapped(function (string) {
  string = toString$1(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

var _stringToPath = stringToPath$1;

var isArray$4 = isArray_1;
var stringToPath = _stringToPath;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath$1(value) {
  return isArray$4(value) ? value : stringToPath(value);
}

var _castPath = castPath$1;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$1(value, length) {
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

var _isIndex = isIndex$1;

var isArray$5 = isArray_1;
var isSymbol$2 = isSymbol_1;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey$1(value, object) {
  if (isArray$5(value)) {
    return false;
  }
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol$2(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

var _isKey = isKey$1;

var isSymbol$3 = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey$1(value) {
  if (typeof value == 'string' || isSymbol$3(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}

var _toKey = toKey$1;

var castPath = _castPath;
var isArguments$2 = isArguments_1;
var isArray$3 = isArray_1;
var isIndex = _isIndex;
var isKey = _isKey;
var isLength$2 = isLength_1;
var toKey = _toKey;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath$1(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object ? object.length : 0;
  return !!length && isLength$2(length) && isIndex(key, length) && (isArray$3(object) || isArguments$2(object));
}

var _hasPath = hasPath$1;

var baseHas = _baseHas;
var hasPath = _hasPath;

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

var has_1 = has;

var oauth1_0a = createCommonjsModule(function (module, exports) {
    if (typeof module !== 'undefined' && typeof exports !== 'undefined') {
        module.exports = OAuth;
    }

    /**
     * Constructor
     * @param {Object} opts consumer key and secret
     */
    function OAuth(opts) {
        if (!(this instanceof OAuth)) {
            return new OAuth(opts);
        }

        if (!opts) {
            opts = {};
        }

        if (!opts.consumer) {
            throw new Error('consumer option is required');
        }

        this.consumer = opts.consumer;
        this.nonce_length = opts.nonce_length || 32;
        this.version = opts.version || '1.0';
        this.parameter_seperator = opts.parameter_seperator || ', ';

        if (typeof opts.last_ampersand === 'undefined') {
            this.last_ampersand = true;
        } else {
            this.last_ampersand = opts.last_ampersand;
        }

        // default signature_method is 'PLAINTEXT'
        this.signature_method = opts.signature_method || 'PLAINTEXT';

        if (this.signature_method == 'PLAINTEXT' && !opts.hash_function) {
            opts.hash_function = function (base_string, key) {
                return key;
            };
        }

        if (!opts.hash_function) {
            throw new Error('hash_function option is required');
        }

        this.hash_function = opts.hash_function;
    }

    /**
     * OAuth request authorize
     * @param  {Object} request data
     * {
     *     method,
     *     url,
     *     data
     * }
     * @param  {Object} key and secret token
     * @return {Object} OAuth Authorized data
     */
    OAuth.prototype.authorize = function (request, token) {
        var oauth_data = {
            oauth_consumer_key: this.consumer.key,
            oauth_nonce: this.getNonce(),
            oauth_signature_method: this.signature_method,
            oauth_timestamp: this.getTimeStamp(),
            oauth_version: this.version
        };

        if (!token) {
            token = {};
        }

        if (token.key) {
            oauth_data.oauth_token = token.key;
        }

        if (!request.data) {
            request.data = {};
        }

        oauth_data.oauth_signature = this.getSignature(request, token.secret, oauth_data);

        return oauth_data;
    };

    /**
     * Create a OAuth Signature
     * @param  {Object} request data
     * @param  {Object} token_secret key and secret token
     * @param  {Object} oauth_data   OAuth data
     * @return {String} Signature
     */
    OAuth.prototype.getSignature = function (request, token_secret, oauth_data) {
        return this.hash_function(this.getBaseString(request, oauth_data), this.getSigningKey(token_secret));
    };

    /**
     * Base String = Method + Base Url + ParameterString
     * @param  {Object} request data
     * @param  {Object} OAuth data
     * @return {String} Base String
     */
    OAuth.prototype.getBaseString = function (request, oauth_data) {
        return request.method.toUpperCase() + '&' + this.percentEncode(this.getBaseUrl(request.url)) + '&' + this.percentEncode(this.getParameterString(request, oauth_data));
    };

    /**
     * Get data from url
     * -> merge with oauth data
     * -> percent encode key & value
     * -> sort
     *
     * @param  {Object} request data
     * @param  {Object} OAuth data
     * @return {Object} Parameter string data
     */
    OAuth.prototype.getParameterString = function (request, oauth_data) {
        var base_string_data = this.sortObject(this.percentEncodeData(this.mergeObject(oauth_data, this.mergeObject(request.data, this.deParamUrl(request.url)))));

        var data_str = '';

        //base_string_data to string
        for (var key in base_string_data) {
            var value = base_string_data[key];
            // check if the value is an array
            // this means that this key has multiple values
            if (value && Array.isArray(value)) {
                // sort the array first
                value.sort();

                var valString = "";
                // serialize all values for this key: e.g. formkey=formvalue1&formkey=formvalue2
                value.forEach(function (item, i) {
                    valString += key + '=' + item;
                    if (i < value.length) {
                        valString += "&";
                    }
                }.bind(this));
                data_str += valString;
            } else {
                data_str += key + '=' + value + '&';
            }
        }

        //remove the last character
        data_str = data_str.substr(0, data_str.length - 1);
        return data_str;
    };

    /**
     * Create a Signing Key
     * @param  {String} token_secret Secret Token
     * @return {String} Signing Key
     */
    OAuth.prototype.getSigningKey = function (token_secret) {
        token_secret = token_secret || '';

        if (!this.last_ampersand && !token_secret) {
            return this.percentEncode(this.consumer.secret);
        }

        return this.percentEncode(this.consumer.secret) + '&' + this.percentEncode(token_secret);
    };

    /**
     * Get base url
     * @param  {String} url
     * @return {String}
     */
    OAuth.prototype.getBaseUrl = function (url) {
        return url.split('?')[0];
    };

    /**
     * Get data from String
     * @param  {String} string
     * @return {Object}
     */
    OAuth.prototype.deParam = function (string) {
        var arr = string.split('&');
        var data = {};

        for (var i = 0; i < arr.length; i++) {
            var item = arr[i].split('=');

            // '' value
            item[1] = item[1] || '';

            data[item[0]] = decodeURIComponent(item[1]);
        }

        return data;
    };

    /**
     * Get data from url
     * @param  {String} url
     * @return {Object}
     */
    OAuth.prototype.deParamUrl = function (url) {
        var tmp = url.split('?');

        if (tmp.length === 1) return {};

        return this.deParam(tmp[1]);
    };

    /**
     * Percent Encode
     * @param  {String} str
     * @return {String} percent encoded string
     */
    OAuth.prototype.percentEncode = function (str) {
        return encodeURIComponent(str).replace(/\!/g, "%21").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
    };

    /**
     * Percent Encode Object
     * @param  {Object} data
     * @return {Object} percent encoded data
     */
    OAuth.prototype.percentEncodeData = function (data) {
        var result = {};

        for (var key in data) {
            var value = data[key];
            // check if the value is an array
            if (value && Array.isArray(value)) {
                var newValue = [];
                // percentEncode every value
                value.forEach(function (val) {
                    newValue.push(this.percentEncode(val));
                }.bind(this));
                value = newValue;
            } else {
                value = this.percentEncode(value);
            }
            result[this.percentEncode(key)] = value;
        }

        return result;
    };

    /**
     * Get OAuth data as Header
     * @param  {Object} oauth_data
     * @return {String} Header data key - value
     */
    OAuth.prototype.toHeader = function (oauth_data) {
        oauth_data = this.sortObject(oauth_data);

        var header_value = 'OAuth ';

        for (var key in oauth_data) {
            if (key.indexOf('oauth_') === -1) continue;
            header_value += this.percentEncode(key) + '="' + this.percentEncode(oauth_data[key]) + '"' + this.parameter_seperator;
        }

        return {
            Authorization: header_value.substr(0, header_value.length - this.parameter_seperator.length) //cut the last chars
        };
    };

    /**
     * Create a random word characters string with input length
     * @return {String} a random word characters string
     */
    OAuth.prototype.getNonce = function () {
        var word_characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = '';

        for (var i = 0; i < this.nonce_length; i++) {
            result += word_characters[parseInt(Math.random() * word_characters.length, 10)];
        }

        return result;
    };

    /**
     * Get Current Unix TimeStamp
     * @return {Int} current unix timestamp
     */
    OAuth.prototype.getTimeStamp = function () {
        return parseInt(new Date().getTime() / 1000, 10);
    };

    ////////////////////// HELPER FUNCTIONS //////////////////////

    /**
     * Merge object
     * @param  {Object} obj1
     * @param  {Object} obj2
     * @return {Object}
     */
    OAuth.prototype.mergeObject = function (obj1, obj2) {
        obj1 = obj1 || {};
        obj2 = obj2 || {};

        var merged_obj = obj1;
        for (var key in obj2) {
            merged_obj[key] = obj2[key];
        }
        return merged_obj;
    };

    /**
     * Sort object by key
     * @param  {Object} data
     * @return {Object} sorted object
     */
    OAuth.prototype.sortObject = function (data) {
        var keys = Object.keys(data);
        var result = {};

        keys.sort();

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            result[key] = data[key];
        }

        return result;
    };
});

var core = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
			// CommonJS
			module.exports = exports = factory();
		} else if (typeof define === "function" && define.amd) {
			// AMD
			define([], factory);
		} else {
			// Global (browser)
			root.CryptoJS = factory();
		}
	})(commonjsGlobal, function () {

		/**
   * CryptoJS core components.
   */
		var CryptoJS = CryptoJS || function (Math, undefined) {
			/**
    * CryptoJS namespace.
    */
			var C = {};

			/**
    * Library namespace.
    */
			var C_lib = C.lib = {};

			/**
    * Base object for prototypal inheritance.
    */
			var Base = C_lib.Base = function () {
				function F() {}

				return {
					/**
      * Creates a new object that inherits from this object.
      *
      * @param {Object} overrides Properties to copy into the new object.
      *
      * @return {Object} The new object.
      *
      * @static
      *
      * @example
      *
      *     var MyType = CryptoJS.lib.Base.extend({
      *         field: 'value',
      *
      *         method: function () {
      *         }
      *     });
      */
					extend: function extend(overrides) {
						// Spawn
						F.prototype = this;
						var subtype = new F();

						// Augment
						if (overrides) {
							subtype.mixIn(overrides);
						}

						// Create default initializer
						if (!subtype.hasOwnProperty('init')) {
							subtype.init = function () {
								subtype.$super.init.apply(this, arguments);
							};
						}

						// Initializer's prototype is the subtype object
						subtype.init.prototype = subtype;

						// Reference supertype
						subtype.$super = this;

						return subtype;
					},

					/**
      * Extends this object and runs the init method.
      * Arguments to create() will be passed to init().
      *
      * @return {Object} The new object.
      *
      * @static
      *
      * @example
      *
      *     var instance = MyType.create();
      */
					create: function create() {
						var instance = this.extend();
						instance.init.apply(instance, arguments);

						return instance;
					},

					/**
      * Initializes a newly created object.
      * Override this method to add some logic when your objects are created.
      *
      * @example
      *
      *     var MyType = CryptoJS.lib.Base.extend({
      *         init: function () {
      *             // ...
      *         }
      *     });
      */
					init: function init() {},

					/**
      * Copies properties into this object.
      *
      * @param {Object} properties The properties to mix in.
      *
      * @example
      *
      *     MyType.mixIn({
      *         field: 'value'
      *     });
      */
					mixIn: function mixIn(properties) {
						for (var propertyName in properties) {
							if (properties.hasOwnProperty(propertyName)) {
								this[propertyName] = properties[propertyName];
							}
						}

						// IE won't copy toString using the loop above
						if (properties.hasOwnProperty('toString')) {
							this.toString = properties.toString;
						}
					},

					/**
      * Creates a copy of this object.
      *
      * @return {Object} The clone.
      *
      * @example
      *
      *     var clone = instance.clone();
      */
					clone: function clone() {
						return this.init.prototype.extend(this);
					}
				};
			}();

			/**
    * An array of 32-bit words.
    *
    * @property {Array} words The array of 32-bit words.
    * @property {number} sigBytes The number of significant bytes in this word array.
    */
			var WordArray = C_lib.WordArray = Base.extend({
				/**
     * Initializes a newly created word array.
     *
     * @param {Array} words (Optional) An array of 32-bit words.
     * @param {number} sigBytes (Optional) The number of significant bytes in the words.
     *
     * @example
     *
     *     var wordArray = CryptoJS.lib.WordArray.create();
     *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
     *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
     */
				init: function init(words, sigBytes) {
					words = this.words = words || [];

					if (sigBytes != undefined) {
						this.sigBytes = sigBytes;
					} else {
						this.sigBytes = words.length * 4;
					}
				},

				/**
     * Converts this word array to a string.
     *
     * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
     *
     * @return {string} The stringified word array.
     *
     * @example
     *
     *     var string = wordArray + '';
     *     var string = wordArray.toString();
     *     var string = wordArray.toString(CryptoJS.enc.Utf8);
     */
				toString: function toString(encoder) {
					return (encoder || Hex).stringify(this);
				},

				/**
     * Concatenates a word array to this word array.
     *
     * @param {WordArray} wordArray The word array to append.
     *
     * @return {WordArray} This word array.
     *
     * @example
     *
     *     wordArray1.concat(wordArray2);
     */
				concat: function concat(wordArray) {
					// Shortcuts
					var thisWords = this.words;
					var thatWords = wordArray.words;
					var thisSigBytes = this.sigBytes;
					var thatSigBytes = wordArray.sigBytes;

					// Clamp excess bits
					this.clamp();

					// Concat
					if (thisSigBytes % 4) {
						// Copy one byte at a time
						for (var i = 0; i < thatSigBytes; i++) {
							var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
							thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
						}
					} else {
						// Copy one word at a time
						for (var i = 0; i < thatSigBytes; i += 4) {
							thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
						}
					}
					this.sigBytes += thatSigBytes;

					// Chainable
					return this;
				},

				/**
     * Removes insignificant bits.
     *
     * @example
     *
     *     wordArray.clamp();
     */
				clamp: function clamp() {
					// Shortcuts
					var words = this.words;
					var sigBytes = this.sigBytes;

					// Clamp
					words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
					words.length = Math.ceil(sigBytes / 4);
				},

				/**
     * Creates a copy of this word array.
     *
     * @return {WordArray} The clone.
     *
     * @example
     *
     *     var clone = wordArray.clone();
     */
				clone: function clone() {
					var clone = Base.clone.call(this);
					clone.words = this.words.slice(0);

					return clone;
				},

				/**
     * Creates a word array filled with random bytes.
     *
     * @param {number} nBytes The number of random bytes to generate.
     *
     * @return {WordArray} The random word array.
     *
     * @static
     *
     * @example
     *
     *     var wordArray = CryptoJS.lib.WordArray.random(16);
     */
				random: function random(nBytes) {
					var words = [];

					var r = function r(m_w) {
						var m_w = m_w;
						var m_z = 0x3ade68b1;
						var mask = 0xffffffff;

						return function () {
							m_z = 0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10) & mask;
							m_w = 0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10) & mask;
							var result = (m_z << 0x10) + m_w & mask;
							result /= 0x100000000;
							result += 0.5;
							return result * (Math.random() > .5 ? 1 : -1);
						};
					};

					for (var i = 0, rcache; i < nBytes; i += 4) {
						var _r = r((rcache || Math.random()) * 0x100000000);

						rcache = _r() * 0x3ade67b7;
						words.push(_r() * 0x100000000 | 0);
					}

					return new WordArray.init(words, nBytes);
				}
			});

			/**
    * Encoder namespace.
    */
			var C_enc = C.enc = {};

			/**
    * Hex encoding strategy.
    */
			var Hex = C_enc.Hex = {
				/**
     * Converts a word array to a hex string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The hex string.
     *
     * @static
     *
     * @example
     *
     *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
     */
				stringify: function stringify(wordArray) {
					// Shortcuts
					var words = wordArray.words;
					var sigBytes = wordArray.sigBytes;

					// Convert
					var hexChars = [];
					for (var i = 0; i < sigBytes; i++) {
						var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
						hexChars.push((bite >>> 4).toString(16));
						hexChars.push((bite & 0x0f).toString(16));
					}

					return hexChars.join('');
				},

				/**
     * Converts a hex string to a word array.
     *
     * @param {string} hexStr The hex string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
     */
				parse: function parse(hexStr) {
					// Shortcut
					var hexStrLength = hexStr.length;

					// Convert
					var words = [];
					for (var i = 0; i < hexStrLength; i += 2) {
						words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
					}

					return new WordArray.init(words, hexStrLength / 2);
				}
			};

			/**
    * Latin1 encoding strategy.
    */
			var Latin1 = C_enc.Latin1 = {
				/**
     * Converts a word array to a Latin1 string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The Latin1 string.
     *
     * @static
     *
     * @example
     *
     *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
     */
				stringify: function stringify(wordArray) {
					// Shortcuts
					var words = wordArray.words;
					var sigBytes = wordArray.sigBytes;

					// Convert
					var latin1Chars = [];
					for (var i = 0; i < sigBytes; i++) {
						var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
						latin1Chars.push(String.fromCharCode(bite));
					}

					return latin1Chars.join('');
				},

				/**
     * Converts a Latin1 string to a word array.
     *
     * @param {string} latin1Str The Latin1 string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
     */
				parse: function parse(latin1Str) {
					// Shortcut
					var latin1StrLength = latin1Str.length;

					// Convert
					var words = [];
					for (var i = 0; i < latin1StrLength; i++) {
						words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
					}

					return new WordArray.init(words, latin1StrLength);
				}
			};

			/**
    * UTF-8 encoding strategy.
    */
			var Utf8 = C_enc.Utf8 = {
				/**
     * Converts a word array to a UTF-8 string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The UTF-8 string.
     *
     * @static
     *
     * @example
     *
     *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
     */
				stringify: function stringify(wordArray) {
					try {
						return decodeURIComponent(escape(Latin1.stringify(wordArray)));
					} catch (e) {
						throw new Error('Malformed UTF-8 data');
					}
				},

				/**
     * Converts a UTF-8 string to a word array.
     *
     * @param {string} utf8Str The UTF-8 string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
     */
				parse: function parse(utf8Str) {
					return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
				}
			};

			/**
    * Abstract buffered block algorithm template.
    *
    * The property blockSize must be implemented in a concrete subtype.
    *
    * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
    */
			var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
				/**
     * Resets this block algorithm's data buffer to its initial state.
     *
     * @example
     *
     *     bufferedBlockAlgorithm.reset();
     */
				reset: function reset() {
					// Initial values
					this._data = new WordArray.init();
					this._nDataBytes = 0;
				},

				/**
     * Adds new data to this block algorithm's buffer.
     *
     * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
     *
     * @example
     *
     *     bufferedBlockAlgorithm._append('data');
     *     bufferedBlockAlgorithm._append(wordArray);
     */
				_append: function _append(data) {
					// Convert string to WordArray, else assume WordArray already
					if (typeof data == 'string') {
						data = Utf8.parse(data);
					}

					// Append
					this._data.concat(data);
					this._nDataBytes += data.sigBytes;
				},

				/**
     * Processes available data blocks.
     *
     * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
     *
     * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
     *
     * @return {WordArray} The processed data.
     *
     * @example
     *
     *     var processedData = bufferedBlockAlgorithm._process();
     *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
     */
				_process: function _process(doFlush) {
					// Shortcuts
					var data = this._data;
					var dataWords = data.words;
					var dataSigBytes = data.sigBytes;
					var blockSize = this.blockSize;
					var blockSizeBytes = blockSize * 4;

					// Count blocks ready
					var nBlocksReady = dataSigBytes / blockSizeBytes;
					if (doFlush) {
						// Round up to include partial blocks
						nBlocksReady = Math.ceil(nBlocksReady);
					} else {
						// Round down to include only full blocks,
						// less the number of blocks that must remain in the buffer
						nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
					}

					// Count words ready
					var nWordsReady = nBlocksReady * blockSize;

					// Count bytes ready
					var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

					// Process blocks
					if (nWordsReady) {
						for (var offset = 0; offset < nWordsReady; offset += blockSize) {
							// Perform concrete-algorithm logic
							this._doProcessBlock(dataWords, offset);
						}

						// Remove processed words
						var processedWords = dataWords.splice(0, nWordsReady);
						data.sigBytes -= nBytesReady;
					}

					// Return processed words
					return new WordArray.init(processedWords, nBytesReady);
				},

				/**
     * Creates a copy of this object.
     *
     * @return {Object} The clone.
     *
     * @example
     *
     *     var clone = bufferedBlockAlgorithm.clone();
     */
				clone: function clone() {
					var clone = Base.clone.call(this);
					clone._data = this._data.clone();

					return clone;
				},

				_minBufferSize: 0
			});

			/**
    * Abstract hasher template.
    *
    * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
    */
			var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
				/**
     * Configuration options.
     */
				cfg: Base.extend(),

				/**
     * Initializes a newly created hasher.
     *
     * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
     *
     * @example
     *
     *     var hasher = CryptoJS.algo.SHA256.create();
     */
				init: function init(cfg) {
					// Apply config defaults
					this.cfg = this.cfg.extend(cfg);

					// Set initial values
					this.reset();
				},

				/**
     * Resets this hasher to its initial state.
     *
     * @example
     *
     *     hasher.reset();
     */
				reset: function reset() {
					// Reset data buffer
					BufferedBlockAlgorithm.reset.call(this);

					// Perform concrete-hasher logic
					this._doReset();
				},

				/**
     * Updates this hasher with a message.
     *
     * @param {WordArray|string} messageUpdate The message to append.
     *
     * @return {Hasher} This hasher.
     *
     * @example
     *
     *     hasher.update('message');
     *     hasher.update(wordArray);
     */
				update: function update(messageUpdate) {
					// Append
					this._append(messageUpdate);

					// Update the hash
					this._process();

					// Chainable
					return this;
				},

				/**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {WordArray|string} messageUpdate (Optional) A final message update.
     *
     * @return {WordArray} The hash.
     *
     * @example
     *
     *     var hash = hasher.finalize();
     *     var hash = hasher.finalize('message');
     *     var hash = hasher.finalize(wordArray);
     */
				finalize: function finalize(messageUpdate) {
					// Final message update
					if (messageUpdate) {
						this._append(messageUpdate);
					}

					// Perform concrete-hasher logic
					var hash = this._doFinalize();

					return hash;
				},

				blockSize: 512 / 32,

				/**
     * Creates a shortcut function to a hasher's object interface.
     *
     * @param {Hasher} hasher The hasher to create a helper for.
     *
     * @return {Function} The shortcut function.
     *
     * @static
     *
     * @example
     *
     *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
     */
				_createHelper: function _createHelper(hasher) {
					return function (message, cfg) {
						return new hasher.init(cfg).finalize(message);
					};
				},

				/**
     * Creates a shortcut function to the HMAC's object interface.
     *
     * @param {Hasher} hasher The hasher to use in this HMAC helper.
     *
     * @return {Function} The shortcut function.
     *
     * @static
     *
     * @example
     *
     *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
     */
				_createHmacHelper: function _createHmacHelper(hasher) {
					return function (message, key) {
						return new C_algo.HMAC.init(hasher, key).finalize(message);
					};
				}
			});

			/**
    * Algorithm namespace.
    */
			var C_algo = C.algo = {};

			return C;
		}(Math);

		return CryptoJS;
	});
});

var sha1 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === "object") {
			// CommonJS
			module.exports = exports = factory(core);
		} else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		} else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	})(commonjsGlobal, function (CryptoJS) {

		(function () {
			// Shortcuts
			var C = CryptoJS;
			var C_lib = C.lib;
			var WordArray = C_lib.WordArray;
			var Hasher = C_lib.Hasher;
			var C_algo = C.algo;

			// Reusable object
			var W = [];

			/**
    * SHA-1 hash algorithm.
    */
			var SHA1 = C_algo.SHA1 = Hasher.extend({
				_doReset: function _doReset() {
					this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
				},

				_doProcessBlock: function _doProcessBlock(M, offset) {
					// Shortcut
					var H = this._hash.words;

					// Working variables
					var a = H[0];
					var b = H[1];
					var c = H[2];
					var d = H[3];
					var e = H[4];

					// Computation
					for (var i = 0; i < 80; i++) {
						if (i < 16) {
							W[i] = M[offset + i] | 0;
						} else {
							var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
							W[i] = n << 1 | n >>> 31;
						}

						var t = (a << 5 | a >>> 27) + e + W[i];
						if (i < 20) {
							t += (b & c | ~b & d) + 0x5a827999;
						} else if (i < 40) {
							t += (b ^ c ^ d) + 0x6ed9eba1;
						} else if (i < 60) {
							t += (b & c | b & d | c & d) - 0x70e44324;
						} else /* if (i < 80) */{
								t += (b ^ c ^ d) - 0x359d3e2a;
							}

						e = d;
						d = c;
						c = b << 30 | b >>> 2;
						b = a;
						a = t;
					}

					// Intermediate hash value
					H[0] = H[0] + a | 0;
					H[1] = H[1] + b | 0;
					H[2] = H[2] + c | 0;
					H[3] = H[3] + d | 0;
					H[4] = H[4] + e | 0;
				},

				_doFinalize: function _doFinalize() {
					// Shortcuts
					var data = this._data;
					var dataWords = data.words;

					var nBitsTotal = this._nDataBytes * 8;
					var nBitsLeft = data.sigBytes * 8;

					// Add padding
					dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
					dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
					dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
					data.sigBytes = dataWords.length * 4;

					// Hash final blocks
					this._process();

					// Return final computed hash
					return this._hash;
				},

				clone: function clone() {
					var clone = Hasher.clone.call(this);
					clone._hash = this._hash.clone();

					return clone;
				}
			});

			/**
    * Shortcut function to the hasher's object interface.
    *
    * @param {WordArray|string} message The message to hash.
    *
    * @return {WordArray} The hash.
    *
    * @static
    *
    * @example
    *
    *     var hash = CryptoJS.SHA1('message');
    *     var hash = CryptoJS.SHA1(wordArray);
    */
			C.SHA1 = Hasher._createHelper(SHA1);

			/**
    * Shortcut function to the HMAC's object interface.
    *
    * @param {WordArray|string} message The message to hash.
    * @param {WordArray|string} key The secret key.
    *
    * @return {WordArray} The HMAC.
    *
    * @static
    *
    * @example
    *
    *     var hmac = CryptoJS.HmacSHA1(message, key);
    */
			C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
		})();

		return CryptoJS.SHA1;
	});
});

var hmac = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === "object") {
			// CommonJS
			module.exports = exports = factory(core);
		} else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		} else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	})(commonjsGlobal, function (CryptoJS) {

		(function () {
			// Shortcuts
			var C = CryptoJS;
			var C_lib = C.lib;
			var Base = C_lib.Base;
			var C_enc = C.enc;
			var Utf8 = C_enc.Utf8;
			var C_algo = C.algo;

			/**
    * HMAC algorithm.
    */
			var HMAC = C_algo.HMAC = Base.extend({
				/**
     * Initializes a newly created HMAC.
     *
     * @param {Hasher} hasher The hash algorithm to use.
     * @param {WordArray|string} key The secret key.
     *
     * @example
     *
     *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
     */
				init: function init(hasher, key) {
					// Init hasher
					hasher = this._hasher = new hasher.init();

					// Convert string to WordArray, else assume WordArray already
					if (typeof key == 'string') {
						key = Utf8.parse(key);
					}

					// Shortcuts
					var hasherBlockSize = hasher.blockSize;
					var hasherBlockSizeBytes = hasherBlockSize * 4;

					// Allow arbitrary length keys
					if (key.sigBytes > hasherBlockSizeBytes) {
						key = hasher.finalize(key);
					}

					// Clamp excess bits
					key.clamp();

					// Clone key for inner and outer pads
					var oKey = this._oKey = key.clone();
					var iKey = this._iKey = key.clone();

					// Shortcuts
					var oKeyWords = oKey.words;
					var iKeyWords = iKey.words;

					// XOR keys with pad constants
					for (var i = 0; i < hasherBlockSize; i++) {
						oKeyWords[i] ^= 0x5c5c5c5c;
						iKeyWords[i] ^= 0x36363636;
					}
					oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

					// Set initial values
					this.reset();
				},

				/**
     * Resets this HMAC to its initial state.
     *
     * @example
     *
     *     hmacHasher.reset();
     */
				reset: function reset() {
					// Shortcut
					var hasher = this._hasher;

					// Reset
					hasher.reset();
					hasher.update(this._iKey);
				},

				/**
     * Updates this HMAC with a message.
     *
     * @param {WordArray|string} messageUpdate The message to append.
     *
     * @return {HMAC} This HMAC instance.
     *
     * @example
     *
     *     hmacHasher.update('message');
     *     hmacHasher.update(wordArray);
     */
				update: function update(messageUpdate) {
					this._hasher.update(messageUpdate);

					// Chainable
					return this;
				},

				/**
     * Finalizes the HMAC computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {WordArray|string} messageUpdate (Optional) A final message update.
     *
     * @return {WordArray} The HMAC.
     *
     * @example
     *
     *     var hmac = hmacHasher.finalize();
     *     var hmac = hmacHasher.finalize('message');
     *     var hmac = hmacHasher.finalize(wordArray);
     */
				finalize: function finalize(messageUpdate) {
					// Shortcut
					var hasher = this._hasher;

					// Compute HMAC
					var innerHash = hasher.finalize(messageUpdate);
					hasher.reset();
					var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

					return hmac;
				}
			});
		})();
	});
});

var hmacSha1 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === "object") {
			// CommonJS
			module.exports = exports = factory(core, sha1, hmac);
		} else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./sha1", "./hmac"], factory);
		} else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	})(commonjsGlobal, function (CryptoJS) {

		return CryptoJS.HmacSHA1;
	});
});

var sha256 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === "object") {
			// CommonJS
			module.exports = exports = factory(core);
		} else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		} else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	})(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
			// Shortcuts
			var C = CryptoJS;
			var C_lib = C.lib;
			var WordArray = C_lib.WordArray;
			var Hasher = C_lib.Hasher;
			var C_algo = C.algo;

			// Initialization and round constants tables
			var H = [];
			var K = [];

			// Compute constants
			(function () {
				function isPrime(n) {
					var sqrtN = Math.sqrt(n);
					for (var factor = 2; factor <= sqrtN; factor++) {
						if (!(n % factor)) {
							return false;
						}
					}

					return true;
				}

				function getFractionalBits(n) {
					return (n - (n | 0)) * 0x100000000 | 0;
				}

				var n = 2;
				var nPrime = 0;
				while (nPrime < 64) {
					if (isPrime(n)) {
						if (nPrime < 8) {
							H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
						}
						K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

						nPrime++;
					}

					n++;
				}
			})();

			// Reusable object
			var W = [];

			/**
    * SHA-256 hash algorithm.
    */
			var SHA256 = C_algo.SHA256 = Hasher.extend({
				_doReset: function _doReset() {
					this._hash = new WordArray.init(H.slice(0));
				},

				_doProcessBlock: function _doProcessBlock(M, offset) {
					// Shortcut
					var H = this._hash.words;

					// Working variables
					var a = H[0];
					var b = H[1];
					var c = H[2];
					var d = H[3];
					var e = H[4];
					var f = H[5];
					var g = H[6];
					var h = H[7];

					// Computation
					for (var i = 0; i < 64; i++) {
						if (i < 16) {
							W[i] = M[offset + i] | 0;
						} else {
							var gamma0x = W[i - 15];
							var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;

							var gamma1x = W[i - 2];
							var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;

							W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
						}

						var ch = e & f ^ ~e & g;
						var maj = a & b ^ a & c ^ b & c;

						var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
						var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);

						var t1 = h + sigma1 + ch + K[i] + W[i];
						var t2 = sigma0 + maj;

						h = g;
						g = f;
						f = e;
						e = d + t1 | 0;
						d = c;
						c = b;
						b = a;
						a = t1 + t2 | 0;
					}

					// Intermediate hash value
					H[0] = H[0] + a | 0;
					H[1] = H[1] + b | 0;
					H[2] = H[2] + c | 0;
					H[3] = H[3] + d | 0;
					H[4] = H[4] + e | 0;
					H[5] = H[5] + f | 0;
					H[6] = H[6] + g | 0;
					H[7] = H[7] + h | 0;
				},

				_doFinalize: function _doFinalize() {
					// Shortcuts
					var data = this._data;
					var dataWords = data.words;

					var nBitsTotal = this._nDataBytes * 8;
					var nBitsLeft = data.sigBytes * 8;

					// Add padding
					dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
					dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
					dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
					data.sigBytes = dataWords.length * 4;

					// Hash final blocks
					this._process();

					// Return final computed hash
					return this._hash;
				},

				clone: function clone() {
					var clone = Hasher.clone.call(this);
					clone._hash = this._hash.clone();

					return clone;
				}
			});

			/**
    * Shortcut function to the hasher's object interface.
    *
    * @param {WordArray|string} message The message to hash.
    *
    * @return {WordArray} The hash.
    *
    * @static
    *
    * @example
    *
    *     var hash = CryptoJS.SHA256('message');
    *     var hash = CryptoJS.SHA256(wordArray);
    */
			C.SHA256 = Hasher._createHelper(SHA256);

			/**
    * Shortcut function to the HMAC's object interface.
    *
    * @param {WordArray|string} message The message to hash.
    * @param {WordArray|string} key The secret key.
    *
    * @return {WordArray} The HMAC.
    *
    * @static
    *
    * @example
    *
    *     var hmac = CryptoJS.HmacSHA256(message, key);
    */
			C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
		})(Math);

		return CryptoJS.SHA256;
	});
});

var hmacSha256 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === "object") {
			// CommonJS
			module.exports = exports = factory(core, sha256, hmac);
		} else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core", "./sha256", "./hmac"], factory);
		} else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	})(commonjsGlobal, function (CryptoJS) {

		return CryptoJS.HmacSHA256;
	});
});

var encBase64 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === "object") {
			// CommonJS
			module.exports = exports = factory(core);
		} else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		} else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	})(commonjsGlobal, function (CryptoJS) {

		(function () {
			// Shortcuts
			var C = CryptoJS;
			var C_lib = C.lib;
			var WordArray = C_lib.WordArray;
			var C_enc = C.enc;

			/**
    * Base64 encoding strategy.
    */
			var Base64 = C_enc.Base64 = {
				/**
     * Converts a word array to a Base64 string.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {string} The Base64 string.
     *
     * @static
     *
     * @example
     *
     *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
     */
				stringify: function stringify(wordArray) {
					// Shortcuts
					var words = wordArray.words;
					var sigBytes = wordArray.sigBytes;
					var map = this._map;

					// Clamp excess bits
					wordArray.clamp();

					// Convert
					var base64Chars = [];
					for (var i = 0; i < sigBytes; i += 3) {
						var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
						var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
						var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;

						var triplet = byte1 << 16 | byte2 << 8 | byte3;

						for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
							base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
						}
					}

					// Add padding
					var paddingChar = map.charAt(64);
					if (paddingChar) {
						while (base64Chars.length % 4) {
							base64Chars.push(paddingChar);
						}
					}

					return base64Chars.join('');
				},

				/**
     * Converts a Base64 string to a word array.
     *
     * @param {string} base64Str The Base64 string.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
     */
				parse: function parse(base64Str) {
					// Shortcuts
					var base64StrLength = base64Str.length;
					var map = this._map;

					// Ignore padding
					var paddingChar = map.charAt(64);
					if (paddingChar) {
						var paddingIndex = base64Str.indexOf(paddingChar);
						if (paddingIndex != -1) {
							base64StrLength = paddingIndex;
						}
					}

					// Convert
					var words = [];
					var nBytes = 0;
					for (var i = 0; i < base64StrLength; i++) {
						if (i % 4) {
							var bits1 = map.indexOf(base64Str.charAt(i - 1)) << i % 4 * 2;
							var bits2 = map.indexOf(base64Str.charAt(i)) >>> 6 - i % 4 * 2;
							var bitsCombined = bits1 | bits2;
							words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
							nBytes++;
						}
					}

					return WordArray.create(words, nBytes);
				},

				_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
			};
		})();

		return CryptoJS.enc.Base64;
	});
});

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

var utils$1 = createCommonjsModule(function (module, exports) {
    'use strict';

    var has = Object.prototype.hasOwnProperty;

    var hexTable = function () {
        var array = [];
        for (var i = 0; i < 256; ++i) {
            array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
        }

        return array;
    }();

    exports.arrayToObject = function (source, options) {
        var obj = options && options.plainObjects ? Object.create(null) : {};
        for (var i = 0; i < source.length; ++i) {
            if (typeof source[i] !== 'undefined') {
                obj[i] = source[i];
            }
        }

        return obj;
    };

    exports.merge = function (target, source, options) {
        if (!source) {
            return target;
        }

        if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {
            if (Array.isArray(target)) {
                target.push(source);
            } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object') {
                target[source] = true;
            } else {
                return [target, source];
            }

            return target;
        }

        if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
            return [target].concat(source);
        }

        var mergeTarget = target;
        if (Array.isArray(target) && !Array.isArray(source)) {
            mergeTarget = exports.arrayToObject(target, options);
        }

        if (Array.isArray(target) && Array.isArray(source)) {
            source.forEach(function (item, i) {
                if (has.call(target, i)) {
                    if (target[i] && _typeof(target[i]) === 'object') {
                        target[i] = exports.merge(target[i], item, options);
                    } else {
                        target.push(item);
                    }
                } else {
                    target[i] = item;
                }
            });
            return target;
        }

        return Object.keys(source).reduce(function (acc, key) {
            var value = source[key];

            if (Object.prototype.hasOwnProperty.call(acc, key)) {
                acc[key] = exports.merge(acc[key], value, options);
            } else {
                acc[key] = value;
            }
            return acc;
        }, mergeTarget);
    };

    exports.decode = function (str) {
        try {
            return decodeURIComponent(str.replace(/\+/g, ' '));
        } catch (e) {
            return str;
        }
    };

    exports.encode = function (str) {
        // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
        // It has been adapted here for stricter adherence to RFC 3986
        if (str.length === 0) {
            return str;
        }

        var string = typeof str === 'string' ? str : String(str);

        var out = '';
        for (var i = 0; i < string.length; ++i) {
            var c = string.charCodeAt(i);

            if (c === 0x2D || // -
            c === 0x2E || // .
            c === 0x5F || // _
            c === 0x7E || // ~
            c >= 0x30 && c <= 0x39 || // 0-9
            c >= 0x41 && c <= 0x5A || // a-z
            c >= 0x61 && c <= 0x7A // A-Z
            ) {
                    out += string.charAt(i);
                    continue;
                }

            if (c < 0x80) {
                out = out + hexTable[c];
                continue;
            }

            if (c < 0x800) {
                out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);
                continue;
            }

            if (c < 0xD800 || c >= 0xE000) {
                out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);
                continue;
            }

            i += 1;
            c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);
            out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];
        }

        return out;
    };

    exports.compact = function (obj, references) {
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
            return obj;
        }

        var refs = references || [];
        var lookup = refs.indexOf(obj);
        if (lookup !== -1) {
            return refs[lookup];
        }

        refs.push(obj);

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var i = 0; i < obj.length; ++i) {
                if (obj[i] && _typeof(obj[i]) === 'object') {
                    compacted.push(exports.compact(obj[i], refs));
                } else if (typeof obj[i] !== 'undefined') {
                    compacted.push(obj[i]);
                }
            }

            return compacted;
        }

        var keys = Object.keys(obj);
        keys.forEach(function (key) {
            obj[key] = exports.compact(obj[key], refs);
        });

        return obj;
    };

    exports.isRegExp = function (obj) {
        return Object.prototype.toString.call(obj) === '[object RegExp]';
    };

    exports.isBuffer = function (obj) {
        if (obj === null || typeof obj === 'undefined') {
            return false;
        }

        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
});

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var formats$2 = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function RFC1738(value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function RFC3986(value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

var utils = utils$1;
var formats$1 = formats$2;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults$1 = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify$2 = function stringify$2(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            return [formatter(encoder(prefix)) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify$2(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter));
        } else {
            values = values.concat(stringify$2(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter));
        }
    }

    return values;
};

var stringify_1 = function stringify_1(object, opts) {
    var obj = object;
    var options = opts || {};
    var delimiter = typeof options.delimiter === 'undefined' ? defaults$1.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults$1.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults$1.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults$1.encode;
    var encoder = encode ? typeof options.encoder === 'function' ? options.encoder : defaults$1.encoder : null;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults$1.serializeDate;
    if (typeof options.format === 'undefined') {
        options.format = formats$1.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats$1.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats$1.formatters[options.format];
    var objKeys;
    var filter;

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify$2(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter));
    }

    return keys.join(delimiter);
};

var utils$3 = utils$1;

var has$2 = Object.prototype.hasOwnProperty;

var defaults$2 = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils$3.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has$2.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObject(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^\.\[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has$2.call(Object.prototype, segment[1])) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has$2.call(Object.prototype, segment[1].replace(/\[|\]/g, ''))) {
            if (!options.allowPrototypes) {
                continue;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var parse$2 = function parse$2(str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || utils$3.isRegExp(options.delimiter) ? options.delimiter : defaults$2.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults$2.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults$2.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults$2.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults$2.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults$2.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults$2.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults$2.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults$2.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils$3.merge(obj, newObj, options);
    }

    return utils$3.compact(obj);
};

var stringify$1 = stringify_1;
var parse$1 = parse$2;
var formats = formats$2;

var index$1 = {
    formats: formats,
    parse: parse$1,
    stringify: stringify$1
};

var ListCache$3 = _ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}

var _stackClear = stackClear$1;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete$1(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete$1;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet$1(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet$1;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas$1(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas$1;

var ListCache$4 = _ListCache;
var Map$3 = _Map;
var MapCache$2 = _MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$4) {
    var pairs = data.__data__;
    if (!Map$3 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$2(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet$1;

var ListCache$2 = _ListCache;
var stackClear = _stackClear;
var stackDelete = _stackDelete;
var stackGet = _stackGet;
var stackHas = _stackHas;
var stackSet = _stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack$1(entries) {
  var data = this.__data__ = new ListCache$2(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack$1.prototype.clear = stackClear;
Stack$1.prototype['delete'] = stackDelete;
Stack$1.prototype.get = stackGet;
Stack$1.prototype.has = stackHas;
Stack$1.prototype.set = stackSet;

var _Stack = Stack$1;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach$1(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach$1;

/** Built-in value references. */
var defineProperty$1 = Object.defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue$1(object, key, value) {
  if (key == '__proto__' && defineProperty$1) {
    defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue$1;

var baseAssignValue = _baseAssignValue;
var eq$2 = eq_1;

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue$1(object, key, value) {
  if (value !== undefined && !eq$2(object[key], value) || typeof key == 'number' && value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

var _assignMergeValue = assignMergeValue$1;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn$1;

var isObject$4 = isObject_1;
var isPrototype$2 = _isPrototype;
var nativeKeysIn = _nativeKeysIn;

/** Used for built-in method references. */
var objectProto$11 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$11.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn$1(object) {
  if (!isObject$4(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$2(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$6.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn$1;

var baseAssignValue$2 = _baseAssignValue;
var eq$3 = eq_1;

/** Used for built-in method references. */
var objectProto$12 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$12.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue$1(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$7.call(object, key) && eq$3(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue$2(object, key, value);
  }
}

var _assignValue = assignValue$1;

var assignValue$2 = _assignValue;
var baseAssignValue$3 = _baseAssignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject$1(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue$3(object, key, newValue);
    } else {
      assignValue$2(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject$1;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes$1(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes$1;

var baseTimes = _baseTimes;
var isArguments$4 = isArguments_1;
var isArray$9 = isArray_1;
var isIndex$2 = _isIndex;

/** Used for built-in method references. */
var objectProto$13 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$13.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys$1(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = isArray$9(value) || isArguments$4(value) ? baseTimes(value.length, String) : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$8.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex$2(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys$1;

var isPrototype$3 = _isPrototype;
var nativeKeys$2 = _nativeKeys;

/** Used for built-in method references. */
var objectProto$14 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$14.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys$1(object) {
  if (!isPrototype$3(object)) {
    return nativeKeys$2(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$9.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys$1;

var arrayLikeKeys = _arrayLikeKeys;
var baseKeys = _baseKeys;
var isArrayLike$3 = isArrayLike_1;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$2(object) {
  return isArrayLike$3(object) ? arrayLikeKeys(object) : baseKeys(object);
}

var keys_1 = keys$2;

var copyObject = _copyObject;
var keys$1 = keys_1;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign$1(object, source) {
  return object && copyObject(source, keys$1(source), object);
}

var _baseAssign = baseAssign$1;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
  var root = _root;

  /** Detect free variable `exports`. */
  var freeExports = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  module.exports = cloneBuffer;
});

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray$2(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray$2;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray$1() {
  return [];
}

var stubArray_1 = stubArray$1;

var overArg$2 = _overArg;
var stubArray = stubArray_1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols$1 = nativeGetSymbols ? overArg$2(nativeGetSymbols, Object) : stubArray;

var _getSymbols = getSymbols$1;

var copyObject$2 = _copyObject;
var getSymbols = _getSymbols;

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols$1(source, object) {
  return copyObject$2(source, getSymbols(source), object);
}

var _copySymbols = copySymbols$1;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush$1(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush$1;

var arrayPush = _arrayPush;
var isArray$10 = isArray_1;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys$1(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$10(object) ? result : arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys$1;

var baseGetAllKeys = _baseGetAllKeys;
var getSymbols$2 = _getSymbols;
var keys$3 = keys_1;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys$1(object) {
  return baseGetAllKeys(object, keys$3, getSymbols$2);
}

var _getAllKeys = getAllKeys$1;

/** Used for built-in method references. */
var objectProto$15 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$10 = objectProto$15.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray$1(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$10.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

var _initCloneArray = initCloneArray$1;

var root$8 = _root;

/** Built-in value references. */
var Uint8Array$1 = root$8.Uint8Array;

var _Uint8Array = Uint8Array$1;

var Uint8Array = _Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer$1(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer$1;

var cloneArrayBuffer$2 = _cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView$1;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry$1(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

var _addMapEntry = addMapEntry$1;

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce$1(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

var _arrayReduce = arrayReduce$1;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray$1(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray$1;

var addMapEntry = _addMapEntry;
var arrayReduce = _arrayReduce;
var mapToArray = _mapToArray;

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap$1(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor());
}

var _cloneMap = cloneMap$1;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp$1;

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry$1(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

var _addSetEntry = addSetEntry$1;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray$1(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray$1;

var addSetEntry = _addSetEntry;
var arrayReduce$2 = _arrayReduce;
var setToArray = _setToArray;

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet$1(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce$2(array, addSetEntry, new set.constructor());
}

var _cloneSet = cloneSet$1;

var _Symbol$3 = _Symbol$1;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol$3 ? _Symbol$3.prototype : undefined;
var symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol$1;

var cloneArrayBuffer$3 = _cloneArrayBuffer;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$3(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray$1;

var cloneArrayBuffer = _cloneArrayBuffer;
var cloneDataView = _cloneDataView;
var cloneMap = _cloneMap;
var cloneRegExp = _cloneRegExp;
var cloneSet = _cloneSet;
var cloneSymbol = _cloneSymbol;
var cloneTypedArray = _cloneTypedArray;

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]';
var dateTag$1 = '[object Date]';
var mapTag$3 = '[object Map]';
var numberTag$1 = '[object Number]';
var regexpTag$1 = '[object RegExp]';
var setTag$3 = '[object Set]';
var stringTag$1 = '[object String]';
var symbolTag$2 = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]';
var dataViewTag$2 = '[object DataView]';
var float32Tag$1 = '[object Float32Array]';
var float64Tag$1 = '[object Float64Array]';
var int8Tag$1 = '[object Int8Array]';
var int16Tag$1 = '[object Int16Array]';
var int32Tag$1 = '[object Int32Array]';
var uint8Tag$1 = '[object Uint8Array]';
var uint8ClampedTag$1 = '[object Uint8ClampedArray]';
var uint16Tag$1 = '[object Uint16Array]';
var uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag$1(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$2:
      return cloneDataView(object, isDeep);

    case float32Tag$1:case float64Tag$1:
    case int8Tag$1:case int16Tag$1:case int32Tag$1:
    case uint8Tag$1:case uint8ClampedTag$1:case uint16Tag$1:case uint32Tag$1:
      return cloneTypedArray(object, isDeep);

    case mapTag$3:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$3:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag$2:
      return cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag$1;

var isObject$7 = isObject_1;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate$1 = function () {
  function object() {}
  return function (proto) {
    if (!isObject$7(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = prototype;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();

var _baseCreate = baseCreate$1;

var overArg$3 = _overArg;

/** Built-in value references. */
var getPrototype$1 = overArg$3(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype$1;

var baseCreate = _baseCreate;
var getPrototype = _getPrototype;
var isPrototype$4 = _isPrototype;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject$1(object) {
    return typeof object.constructor == 'function' && !isPrototype$4(object) ? baseCreate(getPrototype(object)) : {};
}

var _initCloneObject = initCloneObject$1;

var Stack$2 = _Stack;
var arrayEach$2 = _arrayEach;
var assignValue = _assignValue;
var baseAssign = _baseAssign;
var cloneBuffer = _cloneBuffer;
var copyArray$1 = _copyArray;
var copySymbols = _copySymbols;
var getAllKeys = _getAllKeys;
var getTag$2 = _getTag;
var initCloneArray = _initCloneArray;
var initCloneByTag = _initCloneByTag;
var initCloneObject = _initCloneObject;
var isArray$8 = isArray_1;
var isBuffer$2 = isBuffer_1;
var isObject$6 = isObject_1;
var keys = keys_1;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var funcTag$1 = '[object Function]';
var genTag$1 = '[object GeneratorFunction]';
var mapTag$2 = '[object Map]';
var numberTag = '[object Number]';
var objectTag$1 = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag$2 = '[object Set]';
var stringTag = '[object String]';
var symbolTag$1 = '[object Symbol]';
var weakMapTag$1 = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag$1 = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$2] = cloneableTags[numberTag] = cloneableTags[objectTag$1] = cloneableTags[regexpTag] = cloneableTags[setTag$2] = cloneableTags[stringTag] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag$1] = cloneableTags[weakMapTag$1] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone$1(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject$6(value)) {
    return value;
  }
  var isArr = isArray$8(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray$1(value, result);
    }
  } else {
    var tag = getTag$2(value),
        isFunc = tag == funcTag$1 || tag == genTag$1;

    if (isBuffer$2(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone$1, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack$2());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach$2(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone$1(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone$1;

var getPrototype$2 = _getPrototype;
var isObjectLike$3 = isObjectLike_1;

/** `Object#toString` result references. */
var objectTag$2 = '[object Object]';

/** Used for built-in method references. */
var funcProto$2 = Function.prototype;
var objectProto$16 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$11 = objectProto$16.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString$2.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$5 = objectProto$16.toString;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject$1(value) {
  if (!isObjectLike$3(value) || objectToString$5.call(value) != objectTag$2) {
    return false;
  }
  var proto = getPrototype$2(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$11.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
}

var isPlainObject_1 = isPlainObject$1;

var isLength$3 = isLength_1;
var isObjectLike$4 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';
var arrayTag$1 = '[object Array]';
var boolTag$2 = '[object Boolean]';
var dateTag$2 = '[object Date]';
var errorTag$1 = '[object Error]';
var funcTag$2 = '[object Function]';
var mapTag$4 = '[object Map]';
var numberTag$2 = '[object Number]';
var objectTag$3 = '[object Object]';
var regexpTag$2 = '[object RegExp]';
var setTag$4 = '[object Set]';
var stringTag$2 = '[object String]';
var weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]';
var dataViewTag$3 = '[object DataView]';
var float32Tag$2 = '[object Float32Array]';
var float64Tag$2 = '[object Float64Array]';
var int8Tag$2 = '[object Int8Array]';
var int16Tag$2 = '[object Int16Array]';
var int32Tag$2 = '[object Int32Array]';
var uint8Tag$2 = '[object Uint8Array]';
var uint8ClampedTag$2 = '[object Uint8ClampedArray]';
var uint16Tag$2 = '[object Uint16Array]';
var uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$2] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;

/** Used for built-in method references. */
var objectProto$17 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$6 = objectProto$17.toString;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray$1(value) {
    return isObjectLike$4(value) && isLength$3(value.length) && !!typedArrayTags[objectToString$6.call(value)];
}

var _baseIsTypedArray = baseIsTypedArray$1;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary$1(func) {
  return function (value) {
    return func(value);
  };
}

var _baseUnary = baseUnary$1;

var _nodeUtil = createCommonjsModule(function (module, exports) {
  var freeGlobal = _freeGlobal;

  /** Detect free variable `exports`. */
  var freeExports = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = function () {
    try {
      return freeProcess && freeProcess.binding('util');
    } catch (e) {}
  }();

  module.exports = nodeUtil;
});

var baseIsTypedArray = _baseIsTypedArray;
var baseUnary = _baseUnary;
var nodeUtil = _nodeUtil;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray$2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray_1 = isTypedArray$2;

var arrayLikeKeys$2 = _arrayLikeKeys;
var baseKeysIn$2 = _baseKeysIn;
var isArrayLike$4 = isArrayLike_1;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn$1(object) {
  return isArrayLike$4(object) ? arrayLikeKeys$2(object, true) : baseKeysIn$2(object);
}

var keysIn_1 = keysIn$1;

var copyObject$3 = _copyObject;
var keysIn = keysIn_1;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject$1(value) {
  return copyObject$3(value, keysIn(value));
}

var toPlainObject_1 = toPlainObject$1;

var assignMergeValue$2 = _assignMergeValue;
var baseClone = _baseClone;
var copyArray = _copyArray;
var isArguments$3 = isArguments_1;
var isArray$7 = isArray_1;
var isArrayLikeObject$2 = isArrayLikeObject_1;
var isFunction$3 = isFunction_1;
var isObject$5 = isObject_1;
var isPlainObject = isPlainObject_1;
var isTypedArray$1 = isTypedArray_1;
var toPlainObject = toPlainObject_1;

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep$1(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue$2(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    newValue = srcValue;
    if (isArray$7(srcValue) || isTypedArray$1(srcValue)) {
      if (isArray$7(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject$2(objValue)) {
        newValue = copyArray(objValue);
      } else {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
    } else if (isPlainObject(srcValue) || isArguments$3(srcValue)) {
      if (isArguments$3(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject$5(objValue) || srcIndex && isFunction$3(objValue)) {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      } else {
        newValue = objValue;
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue$2(object, key, newValue);
}

var _baseMergeDeep = baseMergeDeep$1;

var Stack = _Stack;
var arrayEach = _arrayEach;
var assignMergeValue = _assignMergeValue;
var baseKeysIn = _baseKeysIn;
var baseMergeDeep = _baseMergeDeep;
var isArray$6 = isArray_1;
var isObject$3 = isObject_1;
var isTypedArray = isTypedArray_1;

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge$1(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  if (!(isArray$6(source) || isTypedArray(source))) {
    var props = baseKeysIn(source);
  }
  arrayEach(props || source, function (srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObject$3(srcValue)) {
      stack || (stack = new Stack());
      baseMergeDeep(object, source, key, srcIndex, baseMerge$1, customizer, stack);
    } else {
      var newValue = customizer ? customizer(object[key], srcValue, key + '', object, source, stack) : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  });
}

var _baseMerge = baseMerge$1;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity$1(value) {
  return value;
}

var identity_1 = identity$1;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply$1;

var apply = _apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest$1(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

var _overRest = overRest$1;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant$1(value) {
  return function () {
    return value;
  };
}

var constant_1 = constant$1;

var getNative$7 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeDefineProperty$1 = getNative$7(Object, 'defineProperty');

var _nativeDefineProperty = nativeDefineProperty$1;

var constant = constant_1;
var identity$2 = identity_1;
var nativeDefineProperty = _nativeDefineProperty;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString$1 = !nativeDefineProperty ? identity$2 : function (func, string) {
  return nativeDefineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString$1;

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 500;
var HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut$1(func) {
  var count = 0,
      lastCalled = 0;

  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut$1;

var baseSetToString = _baseSetToString;
var shortOut = _shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString$1 = shortOut(baseSetToString);

var _setToString = setToString$1;

var identity = identity_1;
var overRest = _overRest;
var setToString = _setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

var _baseRest = baseRest$1;

var eq$4 = eq_1;
var isArrayLike$5 = isArrayLike_1;
var isIndex$3 = _isIndex;
var isObject$8 = isObject_1;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall$1(value, index, object) {
  if (!isObject$8(object)) {
    return false;
  }
  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
  if (type == 'number' ? isArrayLike$5(object) && isIndex$3(index, object.length) : type == 'string' && index in object) {
    return eq$4(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall$1;

var baseRest = _baseRest;
var isIterateeCall = _isIterateeCall;

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner$1(assigner) {
  return baseRest(function (object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

var _createAssigner = createAssigner$1;

var baseMerge = _baseMerge;
var createAssigner = _createAssigner;

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge$1 = createAssigner(function (object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

var merge_1 = merge$1;

var setQuery = function setQuery(url, queryObj, options) {
  options = options || {};

  if (isEmpty_1(queryObj)) {
    return url;
  }

  var urlParts = url.split('?');
  var query = urlParts[1];
  var existingQueryObj = index$1.parse(query);

  if (options.preserve) {
    merge_1(queryObj, existingQueryObj);
  }

  merge_1(existingQueryObj, queryObj);

  return urlParts[0] + '?' + index$1.stringify(existingQueryObj);
};

var AUTH_TYPES = ['basic', 'digest', 'oauth1', 'oauth2'];

var generateBasicAuth = function generateBasicAuth(username, password, options) {
  options = options || {};

  var string = [username, password].join(':');
  string = Base64.encode(string); // Need to use custom base64 for golang vm.

  return {
    request: {
      headers: {
        Authorization: 'Basic ' + string
      }
    }
  };
};

var hashFunction = function hashFunction(method, encode, options) {
  options = options || {};

  return function (base_string, key) {
    var hash = void 0;

    switch (method) {
      case 'HMAC-SHA1':
        hash = hmacSha1(base_string, key);
        break;
      case 'HMAC-SHA256':
        hash = hmacSha256(base_string, key);
        break;
      default:
        return key;
    }

    if (encode) {
      return hash.toString(encBase64);
    }

    return hash.toString();
  };
};
var generateOAuth1 = function generateOAuth1(data, request, options) {
  options = options || {};

  var patch = {};
  if (data.useHeader && has_1(request, 'headers.Authorization')) {
    return patch;
  }

  var signatureMethod = data.signatureMethod || 'HMAC-SHA1';

  var encode = data.encode;
  var oauth = oauth1_0a({
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
      headers: {
        Authorization: headerPatch.Authorization
      }
    };
  } else {
    // add to the query string
    patch.request = {
      url: setQuery(request.url, authPatch, { preserve: true })
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
  if (isEmpty_1(details)) {
    return patch;
  }

  switch (authNode.type) {
    case 'basic':
      if (!has_1(request, 'headers.Authorization')) {
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

var castPath$2 = _castPath;
var isKey$2 = _isKey;
var toKey$2 = _toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet$1(object, path) {
  path = isKey$2(path, object) ? [path] : castPath$2(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey$2(path[index++])];
  }
  return index && index == length ? object : undefined;
}

var _baseGet = baseGet$1;

var baseGet = _baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get$1;

var assignValue$3 = _assignValue;
var castPath$3 = _castPath;
var isIndex$4 = _isIndex;
var isKey$3 = _isKey;
var isObject$9 = isObject_1;
var toKey$3 = _toKey;

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet$1(object, path, value, customizer) {
  if (!isObject$9(object)) {
    return object;
  }
  path = isKey$3(path, object) ? [path] : castPath$3(path);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey$3(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject$9(objValue) ? objValue : isIndex$4(path[index + 1]) ? [] : {};
      }
    }
    assignValue$3(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

var _baseSet = baseSet$1;

var baseSet = _baseSet;

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set$1(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

var set_1 = set$1;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex$1(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

var _baseFindIndex = baseFindIndex$1;

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN$1(value) {
  return value !== value;
}

var _baseIsNaN = baseIsNaN$1;

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf$1(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

var _strictIndexOf = strictIndexOf$1;

var baseFindIndex = _baseFindIndex;
var baseIsNaN = _baseIsNaN;
var strictIndexOf = _strictIndexOf;

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf$1(array, value, fromIndex) {
    return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
}

var _baseIndexOf = baseIndexOf$1;

var isArray$11 = isArray_1;
var isObjectLike$5 = isObjectLike_1;

/** `Object#toString` result references. */
var stringTag$3 = '[object String]';

/** Used for built-in method references. */
var objectProto$18 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$7 = objectProto$18.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString$1(value) {
  return typeof value == 'string' || !isArray$11(value) && isObjectLike$5(value) && objectToString$7.call(value) == stringTag$3;
}

var isString_1 = isString$1;

var isObject$10 = isObject_1;
var isSymbol$4 = isSymbol_1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol$4(value)) {
    return NAN;
  }
  if (isObject$10(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$10(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

var toNumber_1 = toNumber$1;

var toNumber = toNumber_1;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;
var MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite$1(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY$2 || value === -INFINITY$2) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

var toFinite_1 = toFinite$1;

var toFinite = toFinite_1;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger$1(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? remainder ? result - remainder : result : 0;
}

var toInteger_1 = toInteger$1;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap$1(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap$1;

var arrayMap = _arrayMap;

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues$1(object, props) {
  return arrayMap(props, function (key) {
    return object[key];
  });
}

var _baseValues = baseValues$1;

var baseValues = _baseValues;
var keys$4 = keys_1;

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values$1(object) {
  return object ? baseValues(object, keys$4(object)) : [];
}

var values_1 = values$1;

var baseIndexOf = _baseIndexOf;
var isArrayLike$6 = isArrayLike_1;
var isString = isString_1;
var toInteger = toInteger_1;
var values = values_1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike$6(collection) ? collection : values(collection);
  fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax$1(length + fromIndex, 0);
  }
  return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
}

var includes_1 = includes;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor$1(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor$1;

var createBaseFor = _createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor$1 = createBaseFor();

var _baseFor = baseFor$1;

var baseFor = _baseFor;
var keys$5 = keys_1;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn$1(object, iteratee) {
  return object && baseFor(object, iteratee, keys$5);
}

var _baseForOwn = baseForOwn$1;

var isArrayLike$7 = isArrayLike_1;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach$1(eachFunc, fromRight) {
  return function (collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike$7(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

var _createBaseEach = createBaseEach$1;

var baseForOwn = _baseForOwn;
var createBaseEach = _createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach$1 = createBaseEach(baseForOwn);

var _baseEach = baseEach$1;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd$1(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

var _setCacheAdd = setCacheAdd$1;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas$1(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas$1;

var MapCache$3 = _MapCache;
var setCacheAdd = _setCacheAdd;
var setCacheHas = _setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache$1(values) {
    var index = -1,
        length = values ? values.length : 0;

    this.__data__ = new MapCache$3();
    while (++index < length) {
        this.add(values[index]);
    }
}

// Add methods to `SetCache`.
SetCache$1.prototype.add = SetCache$1.prototype.push = setCacheAdd;
SetCache$1.prototype.has = setCacheHas;

var _SetCache = SetCache$1;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome$1(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome$1;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas$1(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas$1;

var SetCache = _SetCache;
var arraySome = _arraySome;
var cacheHas = _cacheHas;

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG$1 = 1;
var PARTIAL_COMPARE_FLAG$2 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays$1(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG$2,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = bitmask & UNORDERED_COMPARE_FLAG$1 ? new SetCache() : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays$1;

var _Symbol$4 = _Symbol$1;
var Uint8Array$2 = _Uint8Array;
var eq$5 = eq_1;
var equalArrays$2 = _equalArrays;
var mapToArray$2 = _mapToArray;
var setToArray$2 = _setToArray;

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG$2 = 1;
var PARTIAL_COMPARE_FLAG$3 = 2;

/** `Object#toString` result references. */
var boolTag$3 = '[object Boolean]';
var dateTag$3 = '[object Date]';
var errorTag$2 = '[object Error]';
var mapTag$5 = '[object Map]';
var numberTag$3 = '[object Number]';
var regexpTag$3 = '[object RegExp]';
var setTag$5 = '[object Set]';
var stringTag$4 = '[object String]';
var symbolTag$3 = '[object Symbol]';

var arrayBufferTag$3 = '[object ArrayBuffer]';
var dataViewTag$4 = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = _Symbol$4 ? _Symbol$4.prototype : undefined;
var symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag$1(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag$4:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$3:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$2(object), new Uint8Array$2(other))) {
        return false;
      }
      return true;

    case boolTag$3:
    case dateTag$3:
    case numberTag$3:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq$5(+object, +other);

    case errorTag$2:
      return object.name == other.name && object.message == other.message;

    case regexpTag$3:
    case stringTag$4:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag$5:
      var convert = mapToArray$2;

    case setTag$5:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG$3;
      convert || (convert = setToArray$2);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays$2(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag$3:
      if (symbolValueOf$1) {
        return symbolValueOf$1.call(object) == symbolValueOf$1.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag$1;

var keys$6 = keys_1;

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG$4 = 2;

/** Used for built-in method references. */
var objectProto$20 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$13 = objectProto$20.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects$1(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG$4,
      objProps = keys$6(object),
      objLength = objProps.length,
      othProps = keys$6(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$13.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects$1;

var Stack$4 = _Stack;
var equalArrays = _equalArrays;
var equalByTag = _equalByTag;
var equalObjects = _equalObjects;
var getTag$3 = _getTag;
var isArray$14 = isArray_1;
var isTypedArray$3 = isTypedArray_1;

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG$1 = 2;

/** `Object#toString` result references. */
var argsTag$3 = '[object Arguments]';
var arrayTag$2 = '[object Array]';
var objectTag$4 = '[object Object]';

/** Used for built-in method references. */
var objectProto$19 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$12 = objectProto$19.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep$1(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray$14(object),
      othIsArr = isArray$14(other),
      objTag = arrayTag$2,
      othTag = arrayTag$2;

  if (!objIsArr) {
    objTag = getTag$3(object);
    objTag = objTag == argsTag$3 ? objectTag$4 : objTag;
  }
  if (!othIsArr) {
    othTag = getTag$3(other);
    othTag = othTag == argsTag$3 ? objectTag$4 : othTag;
  }
  var objIsObj = objTag == objectTag$4,
      othIsObj = othTag == objectTag$4,
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack$4());
    return objIsArr || isTypedArray$3(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG$1)) {
    var objIsWrapped = objIsObj && hasOwnProperty$12.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$12.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack$4());
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack$4());
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep$1;

var baseIsEqualDeep = _baseIsEqualDeep;
var isObject$11 = isObject_1;
var isObjectLike$6 = isObjectLike_1;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual$1(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObject$11(value) && !isObjectLike$6(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual$1, customizer, bitmask, stack);
}

var _baseIsEqual = baseIsEqual$1;

var Stack$3 = _Stack;
var baseIsEqual = _baseIsEqual;

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1;
var PARTIAL_COMPARE_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch$1(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack$3();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch$1;

var isObject$12 = isObject_1;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable$1(value) {
  return value === value && !isObject$12(value);
}

var _isStrictComparable = isStrictComparable$1;

var isStrictComparable = _isStrictComparable;
var keys$7 = keys_1;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData$1(object) {
    var result = keys$7(object),
        length = result.length;

    while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
}

var _getMatchData = getMatchData$1;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable$1(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}

var _matchesStrictComparable = matchesStrictComparable$1;

var baseIsMatch = _baseIsMatch;
var getMatchData = _getMatchData;
var matchesStrictComparable = _matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches$1(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function (object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches$1;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn$1(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn$1;

var baseHasIn = _baseHasIn;
var hasPath$2 = _hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn$1(object, path) {
  return object != null && hasPath$2(object, path, baseHasIn);
}

var hasIn_1 = hasIn$1;

var baseIsEqual$2 = _baseIsEqual;
var get$3 = get_1;
var hasIn = hasIn_1;
var isKey$4 = _isKey;
var isStrictComparable$2 = _isStrictComparable;
var matchesStrictComparable$2 = _matchesStrictComparable;
var toKey$4 = _toKey;

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG$3 = 1;
var PARTIAL_COMPARE_FLAG$5 = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty$1(path, srcValue) {
  if (isKey$4(path) && isStrictComparable$2(srcValue)) {
    return matchesStrictComparable$2(toKey$4(path), srcValue);
  }
  return function (object) {
    var objValue = get$3(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual$2(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG$3 | PARTIAL_COMPARE_FLAG$5);
  };
}

var _baseMatchesProperty = baseMatchesProperty$1;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty$1(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty$1;

var baseGet$2 = _baseGet;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep$1(path) {
  return function (object) {
    return baseGet$2(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep$1;

var baseProperty = _baseProperty;
var basePropertyDeep = _basePropertyDeep;
var isKey$5 = _isKey;
var toKey$5 = _toKey;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property$1(path) {
  return isKey$5(path) ? baseProperty(toKey$5(path)) : basePropertyDeep(path);
}

var property_1 = property$1;

var baseMatches = _baseMatches;
var baseMatchesProperty = _baseMatchesProperty;
var identity$3 = identity_1;
var isArray$13 = isArray_1;
var property = property_1;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee$1(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity$3;
  }
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
    return isArray$13(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }
  return property(value);
}

var _baseIteratee = baseIteratee$1;

var arrayEach$3 = _arrayEach;
var baseEach = _baseEach;
var baseIteratee = _baseIteratee;
var isArray$12 = isArray_1;

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray$12(collection) ? arrayEach$3 : baseEach;
  return func(collection, baseIteratee(iteratee, 3));
}

var forEach_1 = forEach;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice$1(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

var _baseSlice = baseSlice$1;

var baseSlice = _baseSlice;

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice$1(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return !start && end >= length ? array : baseSlice(array, start, end);
}

var _castSlice = castSlice$1;

var baseIndexOf$2 = _baseIndexOf;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */
function charsEndIndex$1(strSymbols, chrSymbols) {
  var index = strSymbols.length;

  while (index-- && baseIndexOf$2(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

var _charsEndIndex = charsEndIndex$1;

var baseIndexOf$3 = _baseIndexOf;

/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex$1(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && baseIndexOf$3(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

var _charsStartIndex = charsStartIndex$1;

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray$1(string) {
  return string.split('');
}

var _asciiToArray = asciiToArray$1;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff';
var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23';
var rsComboSymbolsRange = '\\u20d0-\\u20f0';
var rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode$1(string) {
  return reHasUnicode.test(string);
}

var _hasUnicode = hasUnicode$1;

/** Used to compose unicode character classes. */
var rsAstralRange$1 = '\\ud800-\\udfff';
var rsComboMarksRange$1 = '\\u0300-\\u036f\\ufe20-\\ufe23';
var rsComboSymbolsRange$1 = '\\u20d0-\\u20f0';
var rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange$1 + ']';
var rsCombo = '[' + rsComboMarksRange$1 + rsComboSymbolsRange$1 + ']';
var rsFitz = '\\ud83c[\\udffb-\\udfff]';
var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
var rsNonAstral = '[^' + rsAstralRange$1 + ']';
var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsZWJ$1 = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?';
var rsOptVar = '[' + rsVarRange$1 + ']?';
var rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray$1(string) {
    return string.match(reUnicode) || [];
}

var _unicodeToArray = unicodeToArray$1;

var asciiToArray = _asciiToArray;
var hasUnicode = _hasUnicode;
var unicodeToArray = _unicodeToArray;

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray$1(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}

var _stringToArray = stringToArray$1;

var baseToString$2 = _baseToString;
var castSlice = _castSlice;
var charsEndIndex = _charsEndIndex;
var charsStartIndex = _charsStartIndex;
var stringToArray = _stringToArray;
var toString$3 = toString_1;

/** Used to match leading and trailing whitespace. */
var reTrim$1 = /^\s+|\s+$/g;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
function trim(string, chars, guard) {
  string = toString$3(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim$1, '');
  }
  if (!string || !(chars = baseToString$2(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

var trim_1 = trim;

var baseIndexOf$4 = _baseIndexOf;

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes$1(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf$4(array, value, 0) > -1;
}

var _arrayIncludes = arrayIncludes$1;

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith$1(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

var _arrayIncludesWith = arrayIncludesWith$1;

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop$1() {
  // No operation performed.
}

var noop_1 = noop$1;

var Set$2 = _Set;
var noop = noop_1;
var setToArray$4 = _setToArray;

/** Used as references for various `Number` constants. */
var INFINITY$3 = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet$1 = !(Set$2 && 1 / setToArray$4(new Set$2([, -0]))[1] == INFINITY$3) ? noop : function (values) {
  return new Set$2(values);
};

var _createSet = createSet$1;

var SetCache$2 = _SetCache;
var arrayIncludes = _arrayIncludes;
var arrayIncludesWith = _arrayIncludesWith;
var cacheHas$2 = _cacheHas;
var createSet = _createSet;
var setToArray$3 = _setToArray;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$1 = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq$1(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE$1) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray$3(set);
    }
    isCommon = false;
    includes = cacheHas$2;
    seen = new SetCache$2();
  } else {
    seen = iteratee ? [] : result;
  }
  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = comparator || value !== 0 ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

var _baseUniq = baseUniq$1;

var baseUniq = _baseUniq;

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return array && array.length ? baseUniq(array) : [];
}

var uniq_1 = uniq;

var SetCache$3 = _SetCache;
var arrayIncludes$2 = _arrayIncludes;
var arrayIncludesWith$2 = _arrayIncludesWith;
var arrayMap$3 = _arrayMap;
var baseUnary$2 = _baseUnary;
var cacheHas$3 = _cacheHas;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$2 = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference$1(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes$2,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap$3(values, baseUnary$2(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith$2;
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE$2) {
    includes = cacheHas$3;
    isCommon = false;
    values = new SetCache$3(values);
  }
  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = comparator || value !== 0 ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    } else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

var _baseDifference = baseDifference$1;

var baseAssignValue$4 = _baseAssignValue;

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick from.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy$1(object, props, predicate) {
  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (predicate(value, key)) {
      baseAssignValue$4(result, key, value);
    }
  }
  return result;
}

var _basePickBy = basePickBy$1;

var basePickBy = _basePickBy;

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick.
 * @returns {Object} Returns the new object.
 */
function basePick$1(object, props) {
  object = Object(object);
  return basePickBy(object, props, function (value, key) {
    return key in object;
  });
}

var _basePick = basePick$1;

var _Symbol$5 = _Symbol$1;
var isArguments$5 = isArguments_1;
var isArray$15 = isArray_1;

/** Built-in value references. */
var spreadableSymbol = _Symbol$5 ? _Symbol$5.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable$1(value) {
    return isArray$15(value) || isArguments$5(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable$1;

var arrayPush$2 = _arrayPush;
var isFlattenable = _isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten$1(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten$1(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush$2(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

var _baseFlatten = baseFlatten$1;

var baseFlatten = _baseFlatten;

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten$1(array) {
  var length = array ? array.length : 0;
  return length ? baseFlatten(array, 1) : [];
}

var flatten_1 = flatten$1;

var flatten = flatten_1;
var overRest$2 = _overRest;
var setToString$2 = _setToString;

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest$1(func) {
  return setToString$2(overRest$2(func, undefined, flatten), func + '');
}

var _flatRest = flatRest$1;

var arrayPush$3 = _arrayPush;
var getPrototype$3 = _getPrototype;
var getSymbols$3 = _getSymbols;
var stubArray$2 = stubArray_1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbol properties
 * of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn$1 = !nativeGetSymbols$1 ? stubArray$2 : function (object) {
  var result = [];
  while (object) {
    arrayPush$3(result, getSymbols$3(object));
    object = getPrototype$3(object);
  }
  return result;
};

var _getSymbolsIn = getSymbolsIn$1;

var baseGetAllKeys$2 = _baseGetAllKeys;
var getSymbolsIn = _getSymbolsIn;
var keysIn$2 = keysIn_1;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn$1(object) {
  return baseGetAllKeys$2(object, keysIn$2, getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn$1;

var arrayMap$2 = _arrayMap;
var baseDifference = _baseDifference;
var basePick = _basePick;
var flatRest = _flatRest;
var getAllKeysIn = _getAllKeysIn;
var toKey$6 = _toKey;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable string keyed properties of `object` that are
 * not omitted.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function (object, props) {
  if (object == null) {
    return {};
  }
  props = arrayMap$2(props, toKey$6);
  return basePick(object, baseDifference(getAllKeysIn(object), props));
});

var omit_1 = omit;

var toString$4 = toString_1;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g;
var reHasRegExpChar = RegExp(reRegExpChar$1.source);

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = toString$4(string);
  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar$1, '\\$&') : string;
}

var escapeRegExp_1 = escapeRegExp;

var baseEach$2 = _baseEach;
var isArrayLike$8 = isArrayLike_1;

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap$1(collection, iteratee) {
  var index = -1,
      result = isArrayLike$8(collection) ? Array(collection.length) : [];

  baseEach$2(collection, function (value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

var _baseMap = baseMap$1;

var arrayMap$4 = _arrayMap;
var baseIteratee$2 = _baseIteratee;
var baseMap = _baseMap;
var isArray$16 = isArray_1;

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray$16(collection) ? arrayMap$4 : baseMap;
  return func(collection, baseIteratee$2(iteratee, 3));
}

var map_1 = map;

var stringify_1$2 = createCommonjsModule(function (module, exports) {
  exports = module.exports = stringify;
  exports.getSerialize = serializer;

  function stringify(obj, replacer, spaces, cycleReplacer) {
    return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
  }

  function serializer(replacer, cycleReplacer) {
    var stack = [],
        keys = [];

    if (cycleReplacer == null) cycleReplacer = function cycleReplacer(key, value) {
      if (stack[0] === value) return "[Circular ~]";
      return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
    };

    return function (key, value) {
      if (stack.length > 0) {
        var thisPos = stack.indexOf(this);
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
        ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
        if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value);
      } else stack.push(value);

      return replacer == null ? value : replacer.call(this, key, value);
    };
  }
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
    return stringify_1$2(target, null, offset || 4);
  }

  return target;
};

var mapToNameValue = function mapToNameValue(obj) {
  if (obj instanceof Array) {
    return obj;
  }

  return map_1(obj || {}, function (value, name) {
    return { name: name, value: value };
  });
};

var nameValueToMap = function nameValueToMap(nameValueArray) {
  if (!isArray_1(nameValueArray)) {
    return nameValueArray;
  }

  var result = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nameValueArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value;
      var name = _step$value.name;
      var value = _step$value.value;

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

var extractVariables = function extractVariables(target) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref$strip = _ref.strip;
  var strip = _ref$strip === undefined ? false : _ref$strip;
  var _ref$required = _ref.required;
  var required = _ref$required === undefined ? false : _ref$required;

  var toProcess = safeStringify(target);
  var matches = void 0;
  if (required) {
    matches = uniq_1(toProcess.match(/<<!([\[\]\.\w- ]+)>>/gm)) || [];
  } else {
    matches = uniq_1(toProcess.match(/<<!([\[\]\.\w- ]+)>>|<<([\[\]\.\w- ]+)>>|\{([\[\]\.\w- ]+)\}|%3C%3C([[\[\]\.\w- ]+)%3E%3E|\\<\\<([[\[\]\.\w- ]+)\\>\\>/gm)) || [];
  }

  if (strip) {
    for (var i in matches) {
      matches[i] = trim_1(matches[i], '<!>{}\\<\\>').replace(/%3C|%3E/g, '');
    }
  }

  return matches;
};

var replaceVariables = function replaceVariables(target, variables) {
  var parsedVariables = safeParse(variables);

  if (isEmpty_1(target) || isEmpty_1(parsedVariables)) {
    return target;
  }

  var toProcess = safeStringify(target);
  var matches = extractVariables(target);
  forEach_1(matches, function (match) {
    var variable = trim_1(match, '<!>{}\\<\\>').replace(/%3C|%3E/g, '');

    var value = get_1(parsedVariables, variable);
    if (typeof value !== 'undefined') {
      if (typeof value === 'string') {
        toProcess = toProcess.replace(new RegExp(escapeRegExp_1(match), 'g'), value);
      } else {
        toProcess = toProcess.replace(new RegExp('"' + match + '"|' + match, 'g'), value);
      }
    }
  });

  return safeParse(toProcess, toProcess || target);
};

var replaceNodeVariables = function replaceNodeVariables(node) {
  var steps = node.steps;
  var children = node.children;
  var functions = node.functions;

  var newNode = replaceVariables(omit_1(node, 'steps', 'children', 'functions'), node.state);
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

var VariableHelpers = Object.freeze({
	extractVariables: extractVariables,
	replaceVariables: replaceVariables,
	replaceNodeVariables: replaceNodeVariables
});

var baseIsEqual$3 = _baseIsEqual;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are **not** supported.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual$3(value, other);
}

var isEqual_1 = isEqual;

var isObjectLike$7 = isObjectLike_1;

/** `Object#toString` result references. */
var numberTag$4 = '[object Number]';

/** Used for built-in method references. */
var objectProto$21 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$8 = objectProto$21.toString;

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' || isObjectLike$7(value) && objectToString$8.call(value) == numberTag$4;
}

var isNumber_1 = isNumber;

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

var isUndefined_1 = isUndefined;

/**
 * The base implementation of `_.gt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 */
function baseGt$1(value, other) {
  return value > other;
}

var _baseGt = baseGt$1;

var toNumber$2 = toNumber_1;

/**
 * Creates a function that performs a relational operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @returns {Function} Returns the new relational operation function.
 */
function createRelationalOperation$1(operator) {
  return function (value, other) {
    if (!(typeof value == 'string' && typeof other == 'string')) {
      value = toNumber$2(value);
      other = toNumber$2(other);
    }
    return operator(value, other);
  };
}

var _createRelationalOperation = createRelationalOperation$1;

var baseGt = _baseGt;
var createRelationalOperation = _createRelationalOperation;

/**
 * Checks if `value` is greater than `other`.
 *
 * @static
 * @memberOf _
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 * @see _.lt
 * @example
 *
 * _.gt(3, 1);
 * // => true
 *
 * _.gt(3, 3);
 * // => false
 *
 * _.gt(1, 3);
 * // => false
 */
var gt = createRelationalOperation(baseGt);

var gt_1 = gt;

var createRelationalOperation$2 = _createRelationalOperation;

/**
 * Checks if `value` is greater than or equal to `other`.
 *
 * @static
 * @memberOf _
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than or equal to
 *  `other`, else `false`.
 * @see _.lte
 * @example
 *
 * _.gte(3, 1);
 * // => true
 *
 * _.gte(3, 3);
 * // => true
 *
 * _.gte(1, 3);
 * // => false
 */
var gte = createRelationalOperation$2(function (value, other) {
  return value >= other;
});

var gte_1 = gte;

/**
 * The base implementation of `_.lt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than `other`,
 *  else `false`.
 */
function baseLt$1(value, other) {
  return value < other;
}

var _baseLt = baseLt$1;

var baseLt = _baseLt;
var createRelationalOperation$3 = _createRelationalOperation;

/**
 * Checks if `value` is less than `other`.
 *
 * @static
 * @memberOf _
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than `other`,
 *  else `false`.
 * @see _.gt
 * @example
 *
 * _.lt(1, 3);
 * // => true
 *
 * _.lt(3, 3);
 * // => false
 *
 * _.lt(3, 1);
 * // => false
 */
var lt = createRelationalOperation$3(baseLt);

var lt_1 = lt;

var createRelationalOperation$4 = _createRelationalOperation;

/**
 * Checks if `value` is less than or equal to `other`.
 *
 * @static
 * @memberOf _
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than or equal to
 *  `other`, else `false`.
 * @see _.gte
 * @example
 *
 * _.lte(1, 3);
 * // => true
 *
 * _.lte(3, 3);
 * // => true
 *
 * _.lte(3, 1);
 * // => false
 */
var lte = createRelationalOperation$4(function (value, other) {
  return value <= other;
});

var lte_1 = lte;

var buildPathSelector = function buildPathSelector(parts) {
  parts = parts || [];
  var targetPath = '';

  forEach_1(parts, function (part) {
    if (!isEmpty_1(part)) {
      if (isEmpty_1(targetPath) || part.charAt(0) === '[') {
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

  var result = {
    pass: false,
    message: '',
    details: ''
  };

  try {
    var validate = options.validate;


    var targetPath = buildPathSelector([assertion.location, assertion.target]);
    var value = get_1(resultNode, targetPath);

    try {
      switch (assertion.op) {
        case 'eq':
          if (!isEqual_1(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to equal ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'ne':
          if (isEqual_1(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to NOT equal ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'exists':
          var shouldExist = assertion.hasOwnProperty('expected') ? assertion.expected : true;
          if (isUndefined_1(value)) {
            if (shouldExist) {
              throw new Error('Expected ' + targetPath + ' to exist');
            }
          } else if (!shouldExist) {
            throw new Error('Expected ' + targetPath + ' NOT to exist - actual is \'' + value + '\'');
          }
          break;
        case 'contains':
          if (!includes_1(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to contain ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'gt':
          if (!gt_1(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to be greater than ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'gte':
          if (!gte_1(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to be greater than or equal to ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'lt':
          if (!lt_1(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to be less than ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'lte':
          if (!lte_1(value, assertion.expected)) {
            throw new Error('Expected ' + targetPath + ' to be less than or equal to ' + assertion.expected + ' - actual is \'' + value + '\'');
          }
          break;
        case 'gt':
        case 'gte':
        case 'lt':
        case 'lte':
          if (!isNumber_1(value)) {
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
          if (!expected || isEmpty_1(expected)) {
            throw new Error('Cannot run ' + assertion.op + ' assertion - JSON schema is null or empty. If using the \'Link to API design\' feature,\n              please make sure there is an endpoint that matches this request, with the appropriate status code, defined in your design.');
          }

          var validationResult = validate(value, expected);

          if (!validationResult) {
            throw new Error('Unknown validation error');
          }

          if (!isEmpty_1(validationResult.details)) {
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

  forEach_1(assertions, function (a) {
    a.result = runAssertion(resultNode, a, options);
  });

  return assertions;
};

var SOURCE_REGEX = new RegExp(/^root|state|status|result|input|response/);
var ROOT_REGEX = new RegExp(/^root\./);

var runTransform = function runTransform(rootNode, resultNode, transform) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  try {
    var sourceLocation = transform.sourceLocation;
    var useRootSource = sourceLocation.match(ROOT_REGEX);
    if (useRootSource) {
      sourceLocation = sourceLocation.replace(ROOT_REGEX, '');
    }
    var sourcePath = buildPathSelector([sourceLocation, transform.sourcePath]);
    if (!sourcePath.match(SOURCE_REGEX)) {
      return;
    }

    var targetLocation = transform.targetLocation;
    var useRootTarget = targetLocation.match(ROOT_REGEX);
    if (useRootTarget) {
      targetLocation = targetLocation.replace(ROOT_REGEX, '');
    }
    var targetPath = buildPathSelector([targetLocation, transform.targetPath]);
    if (!targetPath.match(SOURCE_REGEX)) {
      return;
    }

    var sourceNode = useRootSource ? rootNode : resultNode;
    var targetNode = useRootTarget ? rootNode : resultNode;

    var value = get_1(sourceNode, sourcePath);

    set_1(targetNode, targetPath, value);
  } catch (e) {
    console.warn('transforms#runTransform', e, resultNode, transform);
  }
};

var runTransforms = function runTransforms(rootNode, resultNode, transforms) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  transforms = transforms || [];

  forEach_1(transforms, function (a) {
    runTransform(rootNode, resultNode, a, options);
  });
};

var patchAuthorization = function patchAuthorization(node, options) {
  var authNode = get_1(node, 'input.authorization');

  // Run Authorization & Patch
  if (!isEmpty_1(authNode)) {
    var authPatch = generateAuthPatch(authNode, get_1(node, 'input.request'), options);
    if (!isEmpty_1(authPatch)) {
      var input = get_1(node, 'input') || {};
      merge_1(input, authPatch);
      set_1(node, 'input', input);
    }
  }
};

var runScript = function runScript(script, root) {
  var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var tests = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var input = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var output = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var logger = arguments[6];

  // additional functions available to scripts
  var Base64$$1 = Base64;
  var safeStringify$$1 = safeStringify;
  var safeParse$$1 = safeParse;

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
    eval('\n      if (logger) {\n        console.debug = function() {\n          logger.log(\'debug\', \'script\', _.values(arguments));\n        }\n        console.log = console.info = function() {\n          logger.log(\'info\', \'script\', _.values(arguments));\n        }\n        console.warn = function() {\n          logger.log(\'warn\', \'script\', _.values(arguments));\n        }\n        console.error = function() {\n          logger.log(\'error\', \'script\', _.values(arguments));\n        }\n      }\n\n      with (input) {\n        with (output) {\n          ' + script + '\n        }\n      }\n    ');
  } catch (e) {
    if (e.message === 'SKIP') {
      result.status = 'skipped';
    } else if (e.message === 'STOP') {
      result.status = 'stopped';
    } else {
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
var runLogic = function runLogic(rootResultNode, node, logicPath, options) {
  if (!node) {
    return {};
  }

  // Init Logs
  var logs = get_1(node, 'result.logs') || [];

  // Init Options
  options = options || {};
  options.logger = {
    log: function log(type, context, messages) {
      if (isEmpty_1(messages)) {
        console.warn('You cannot log with no messages.');
      }

      var cleanMessages = messages.map(function (m) {
        return safeStringify(m);
      });

      logs.push({
        type: type,
        context: [logicPath].concat(context || []).join('.'),
        messages: cleanMessages
      });
    }
  };

  // Replace variables before script
  node = replaceNodeVariables(node);

  var logic = get_1(node, logicPath);
  if (!logic) {
    // Patch Authorization
    patchAuthorization(node, options);
    return node;
  }

  // Run Transforms
  runTransforms(rootResultNode, node, logic.transforms, options);

  // Run Script
  var tests = {};
  var script = logic.script;
  var scriptResult = void 0;
  if (!isEmpty_1(script)) {
    if (logicPath === 'before') {
      var input = get_1(node, 'input') || {};
      var state = get_1(node, 'state') || {};
      var resultOutput = get_1(rootResultNode, 'output');
      scriptResult = runScript(script, resultOutput, state, tests, input, {}, options.logger);
      set_1(node, 'state', state);
    } else {
      var _input = get_1(node, 'result.input') || {};
      var output = get_1(node, 'result.output') || {};
      var _state = get_1(node, 'result.state') || {};
      var _resultOutput = get_1(rootResultNode, 'output');
      scriptResult = runScript(script, _resultOutput, _state, tests, _input, output, options.logger);
      set_1(node, 'result.state', _state);
    }

    if (includes_1(['skipped', 'stopped'], scriptResult.status)) {
      node.status = scriptResult.status;
      return node;
    }
  }

  // Patch Authorization
  patchAuthorization(node, options);

  // Replace variables after script
  node = replaceNodeVariables(node);

  // Run Assertions
  var assertions = runAssertions(node, logic.assertions, options);

  // Add Test Assertions
  if (!isEmpty_1(tests)) {
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
  set_1(node, logicPath + '.assertions', assertions);

  // Set Logs
  set_1(node, 'result.logs', logs);

  return node;
};

// export const runNode = (node, options) => {
//   node = runLogic(node, 'before', options);
//   options.invoke(node);
//   node = runLogic(node, 'after', options);

//   return node;
// }

var index = _extends({
  generateAuthPatch: generateAuthPatch,
  runLogic: runLogic,
  buildPathSelector: buildPathSelector
}, VariableHelpers, JSONHelpers);

return index;

}());
