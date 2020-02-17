/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/compareme/lib/array.comparator.js":
/*!********************************************************!*\
  !*** ./node_modules/compareme/lib/array.comparator.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _whatsme = _interopRequireDefault(__webpack_require__(/*! whatsme */ "./node_modules/whatsme/lib/index.js"));

var _empty = __webpack_require__(/*! ./empty.comparator */ "./node_modules/compareme/lib/empty.comparator.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var range = function range(start, end) {
  return Array(start > end ? 0 : end - start).fill().map(function (_, index) {
    return start + index;
  });
};

var getPos = function getPos(a, pos) {
  return pos < a.length ? a[pos] : undefined;
};

var ind = function ind(index, i) {
  return index ? "".concat(index, ".").concat(i) : i.toString();
};

var getMinLength = function getMinLength(a1, a2) {
  return Math.min(a1.length, a2.length);
};

var mustCheckDeep = function mustCheckDeep(_ref) {
  var _ref$deep = _ref.deep,
      deep = _ref$deep === void 0 ? false : _ref$deep,
      _ref$strict = _ref.strict,
      strict = _ref$strict === void 0 ? false : _ref$strict;
  return deep || strict;
};

var areBothArrays = function areBothArrays(a1, a2) {
  return _whatsme.default.isArray(a1) && _whatsme.default.isArray(a2);
};

var arrayComparator = function arrayComparator(comparator) {
  return function (options, level, index) {
    var comparePos = function comparePos(a1, a2, i) {
      return comparator(getPos(a1, i), getPos(a2, i), options, level + 1, ind(index, i));
    };

    var compareSection = function compareSection(a1, a2, start, end) {
      return range(start, end).reduce(function (result, i) {
        return (0, _empty.mergeResult)(result, comparePos(a1, a2, i));
      }, (0, _empty.emptyResult)());
    };

    var checkCommon = function checkCommon(a1, a2) {
      return compareSection(a1, a2, 0, getMinLength(a1, a2));
    };

    var compareA1Remains = function compareA1Remains(a1, a2) {
      return compareSection(a1, a2, getMinLength(a1, a2), a1.length);
    };

    var compareA2Remains = function compareA2Remains(a1, a2) {
      return compareSection(a1, a2, a1.length, a2.length);
    };

    var compareStrict = function compareStrict(a1, a2) {
      return (0, _empty.mergeResult)(compareA1Remains(a1, a2), compareA2Remains(a1, a2));
    };

    var doStrict = function doStrict(a1, a2, _ref2) {
      var _ref2$strict = _ref2.strict,
          strict = _ref2$strict === void 0 ? false : _ref2$strict;
      return strict ? compareStrict(a1, a2) : (0, _empty.emptyResult)();
    };

    var checkDeep = function checkDeep(a1, a2) {
      return (0, _empty.mergeResult)(checkCommon(a1, a2), doStrict(a1, a2, options));
    };

    return {
      compare: function compare(a1, a2) {
        return areBothArrays(a1, a2) && mustCheckDeep(options) ? checkDeep(a1, a2) : (0, _empty.getResult)(_whatsme.default.whats(a1), _whatsme.default.whats(a2), index);
      }
    };
  };
};

var _default = arrayComparator;
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/compare.js":
/*!***********************************************!*\
  !*** ./node_modules/compareme/lib/compare.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _whatsme = _interopRequireDefault(__webpack_require__(/*! whatsme */ "./node_modules/whatsme/lib/index.js"));

var _empty = __webpack_require__(/*! ./empty.comparator */ "./node_modules/compareme/lib/empty.comparator.js");

var _array = _interopRequireDefault(__webpack_require__(/*! ./array.comparator */ "./node_modules/compareme/lib/array.comparator.js"));

var _object = _interopRequireDefault(__webpack_require__(/*! ./object.comparator */ "./node_modules/compareme/lib/object.comparator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mustGoDeep = function mustGoDeep(level, _ref) {
  var _ref$deep = _ref.deep,
      deep = _ref$deep === void 0 ? false : _ref$deep;
  return deep || level === 1;
};

var compare = function compare(obj1, obj2) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var index = arguments.length > 4 ? arguments[4] : undefined;

  var type1 = _whatsme.default.whats(obj1);

  var type2 = _whatsme.default.whats(obj2);

  var result = (0, _empty.getResult)(type1, type2, index);
  return mustGoDeep(level, options) ? (0, _empty.mergeResult)(result, getComparator(type1)(options, level, index).compare(obj1, obj2)) : result;
};

var comparators = {
  array: (0, _array.default)(compare),
  object: (0, _object.default)(compare)
};

var getComparator = function getComparator(type) {
  return comparators[type] || _empty.emptyComparator;
};

var _default = compare;
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/empty.comparator.js":
/*!********************************************************!*\
  !*** ./node_modules/compareme/lib/empty.comparator.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResult = exports.mergeResult = exports.emptyComparator = exports.emptyResult = void 0;

var _whatsme = _interopRequireDefault(__webpack_require__(/*! whatsme */ "./node_modules/whatsme/lib/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var emptyResult = function emptyResult() {
  return {
    success: true,
    differences: []
  };
};

exports.emptyResult = emptyResult;

var emptyComparator = function emptyComparator() {
  return {
    compare: function compare() {
      return emptyResult();
    }
  };
};

exports.emptyComparator = emptyComparator;

var mergeResult = function mergeResult(res1, res2) {
  return Object.assign(res1, {
    success: res1.success && res2.success,
    differences: [].concat(_toConsumableArray(res1.differences), _toConsumableArray(res2.differences))
  });
};

exports.mergeResult = mergeResult;

var withIndex = function withIndex(index, obj) {
  return _whatsme.default.isDefined(index) ? _objectSpread({}, obj, {
    index: index
  }) : obj;
};

var getDifference = function getDifference(type1, type2, index) {
  return type1 === type2 ? [] : [withIndex(index, {
    first: type1,
    second: type2
  })];
};

var getResult = function getResult(type1, type2, index) {
  return {
    success: type1 === type2,
    differences: getDifference(type1, type2, index)
  };
};

exports.getResult = getResult;

/***/ }),

/***/ "./node_modules/compareme/lib/get.js":
/*!*******************************************!*\
  !*** ./node_modules/compareme/lib/get.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compare = _interopRequireDefault(__webpack_require__(/*! ./compare */ "./node_modules/compareme/lib/compare.js"));

var _properties = __webpack_require__(/*! ./properties */ "./node_modules/compareme/lib/properties.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UNDEFINED = 'undefined';

var createInstance = function createInstance(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var instance = {
    with: function _with(obj) {
      return decorate((0, _compare.default)(value, obj, options), options);
    }
  };
  (0, _properties.defineProperties)(instance, {
    differences: function differences() {
      return instance;
    },
    elements: function elements() {
      return instance;
    },
    and: function and() {
      return instance;
    },
    type: function type() {
      return createInstance(value, _objectSpread({}, options, {
        type: true
      }));
    },
    missing: function missing() {
      return createInstance(value, _objectSpread({}, options, {
        missing: true
      }));
    },
    unexpected: function unexpected() {
      return createInstance(value, _objectSpread({}, options, {
        unexpected: true
      }));
    },
    deeply: function deeply() {
      return createInstance(value, _objectSpread({}, options, {
        deep: true
      }));
    },
    strictly: function strictly() {
      return createInstance(value, _objectSpread({}, options, {
        strict: true
      }));
    }
  });
  return instance;
};

var decorators = [{
  should: function should(_ref) {
    var _ref$missing = _ref.missing,
        missing = _ref$missing === void 0 ? false : _ref$missing;
    return missing;
  },
  decorate: function decorate(res) {
    return res.differences.filter(function (d) {
      return d.first !== UNDEFINED && d.second === UNDEFINED;
    });
  }
}, {
  should: function should(_ref2) {
    var _ref2$type = _ref2.type,
        type = _ref2$type === void 0 ? false : _ref2$type;
    return type;
  },
  decorate: function decorate(res) {
    return res.differences.filter(function (d) {
      return d.first !== UNDEFINED && d.second !== UNDEFINED;
    });
  }
}, {
  should: function should(_ref3) {
    var _ref3$unexpected = _ref3.unexpected,
        unexpected = _ref3$unexpected === void 0 ? false : _ref3$unexpected;
    return unexpected;
  },
  decorate: function decorate(res) {
    return res.differences.filter(function (d) {
      return d.first === UNDEFINED;
    });
  }
}, {
  should: function should() {
    return true;
  },
  decorate: function decorate(res) {
    return res;
  }
}];

var findDecorator = function findDecorator(options) {
  return decorators.find(function (decorator) {
    return decorator.should(options);
  }).decorate;
};

var decorate = function decorate(result, options) {
  return findDecorator(options)(result);
};

var get = function get(obj) {
  return createInstance(obj);
};

var _default = get;
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/compareme/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _is = _interopRequireDefault(__webpack_require__(/*! ./is */ "./node_modules/compareme/lib/is.js"));

var _get = _interopRequireDefault(__webpack_require__(/*! ./get */ "./node_modules/compareme/lib/get.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  is: _is.default,
  get: _get.default
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/is.js":
/*!******************************************!*\
  !*** ./node_modules/compareme/lib/is.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compare = _interopRequireDefault(__webpack_require__(/*! ./compare */ "./node_modules/compareme/lib/compare.js"));

var _properties = __webpack_require__(/*! ./properties */ "./node_modules/compareme/lib/properties.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createInstance = function createInstance(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$comparison = options.comparison,
      comparison = _options$comparison === void 0 ? true : _options$comparison;
  var instance = {
    like: function like(obj) {
      return comparison === (0, _compare.default)(value, obj, options).success;
    }
  };
  (0, _properties.defineProperties)(instance, {
    not: function not() {
      return createInstance(value, _objectSpread({}, options, {
        comparison: !comparison
      }));
    },
    deeply: function deeply() {
      return createInstance(value, _objectSpread({}, options, {
        deep: true
      }));
    },
    strictly: function strictly() {
      return createInstance(value, _objectSpread({}, options, {
        strict: true
      }));
    },
    and: function and() {
      return instance;
    }
  });
  return instance;
};

var is = function is(obj) {
  return createInstance(obj);
};

var _default = is;
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/object.comparator.js":
/*!*********************************************************!*\
  !*** ./node_modules/compareme/lib/object.comparator.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _whatsme = _interopRequireDefault(__webpack_require__(/*! whatsme */ "./node_modules/whatsme/lib/index.js"));

var _empty = __webpack_require__(/*! ./empty.comparator */ "./node_modules/compareme/lib/empty.comparator.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ind = function ind(key, index) {
  return index ? "".concat(index, ".").concat(key) : key.toString();
};

var getCommonKeys = function getCommonKeys(a, b) {
  return a.filter(function (key) {
    return b.includes(key);
  });
};

var mustCheckDeep = function mustCheckDeep(_ref) {
  var _ref$deep = _ref.deep,
      deep = _ref$deep === void 0 ? false : _ref$deep,
      _ref$strict = _ref.strict,
      strict = _ref$strict === void 0 ? false : _ref$strict;
  return deep || strict;
};

var getRemains = function getRemains() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return a.filter(function (key) {
    return !b.includes(key);
  });
};

var getKeys = function getKeys(obj) {
  return Object.keys(obj);
};

var areBothObjects = function areBothObjects(o1, o2) {
  return _whatsme.default.isObject(o1) && _whatsme.default.isObject(o2);
};

var objectComparator = function objectComparator(comparator) {
  return function (options, level, index) {
    var compKey = function compKey(o1, o2, key) {
      return comparator(o1[key], o2[key], options, level + 1, ind(key, index));
    };

    var compareByKeys = function compareByKeys(o1, o2, keys) {
      return keys.reduce(function (result, key) {
        return (0, _empty.mergeResult)(result, compKey(o1, o2, key));
      }, (0, _empty.emptyResult)());
    };

    var checkCommon = function checkCommon(o1, o2) {
      return compareByKeys(o1, o2, getCommonKeys(getKeys(o1), getKeys(o2)));
    };

    var compareO1Remains = function compareO1Remains(o1, o2) {
      return compareByKeys(o1, o2, getRemains(getKeys(o1), getKeys(o2)));
    };

    var compareO2Remains = function compareO2Remains(o1, o2) {
      return compareByKeys(o1, o2, getRemains(getKeys(o2), getKeys(o1)));
    };

    var compareStrict = function compareStrict(o1, o2) {
      return (0, _empty.mergeResult)(compareO1Remains(o1, o2), compareO2Remains(o1, o2));
    };

    var doStrict = function doStrict(o1, o2, _ref2) {
      var _ref2$strict = _ref2.strict,
          strict = _ref2$strict === void 0 ? false : _ref2$strict;
      return strict ? compareStrict(o1, o2) : (0, _empty.emptyResult)();
    };

    var checkDeep = function checkDeep(o1, o2) {
      return (0, _empty.mergeResult)(checkCommon(o1, o2), doStrict(o1, o2, options));
    };

    return {
      compare: function compare(o1, o2) {
        return areBothObjects(o1, o2) && mustCheckDeep(options) ? checkDeep(o1, o2) : (0, _empty.getResult)(_whatsme.default.whats(o1), _whatsme.default.whats(o2), index);
      }
    };
  };
};

var _default = objectComparator;
exports.default = _default;

/***/ }),

/***/ "./node_modules/compareme/lib/properties.js":
/*!**************************************************!*\
  !*** ./node_modules/compareme/lib/properties.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineProperties = exports.defineProperty = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defineProperty = function defineProperty(instance, name, getter) {
  Object.defineProperty(instance, name, {
    get: getter,
    configurable: false
  });
};

exports.defineProperty = defineProperty;

var defineProperties = function defineProperties(instance, properties) {
  Object.entries(properties).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        getter = _ref2[1];

    defineProperty(instance, name, getter);
  });
};

exports.defineProperties = defineProperties;

/***/ }),

/***/ "./node_modules/setupme/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/setupme/lib/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _compareme = _interopRequireDefault(__webpack_require__(/*! compareme */ "./node_modules/compareme/lib/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var INVALID = 'INVALID';
var WRONG_TYPE = 'WRONG_TYPE';
var DEFAULT_SETTINGS = {
  logErrors: true,
  logName: 'setupme'
};

var getInvalidOptions = function getInvalidOptions() {
  var defaultOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _compareme["default"].get(defaultOptions).unexpected.elements.strictly.and.deeply["with"](options).map(function (diff) {
    return {
      error: INVALID,
      key: diff.index
    };
  });
};

var getWrongTypeOptions = function getWrongTypeOptions() {
  var defaultOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _compareme["default"].get(defaultOptions).type.differences.strictly.and.deeply["with"](options).map(function (diff) {
    return {
      error: WRONG_TYPE,
      key: diff.index,
      expected: diff.first,
      actual: diff.second
    };
  });
};

var getErrors = function getErrors() {
  var defaultOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return [].concat(_toConsumableArray(getWrongTypeOptions(defaultOptions, options)), _toConsumableArray(getInvalidOptions(defaultOptions, options)));
};

var getResultData = function getResultData() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    success: errors.length === 0,
    errors: errors
  };
};

var doLogErrors = function doLogErrors(defaultOptions, options, logName) {
  getWrongTypeOptions(defaultOptions, options).forEach(function (diff) {
    console.error("[".concat(logName, "] The option \"").concat(diff.key, "\" is expected to be ") + "\"".concat(diff.expected, "\" but received as \"").concat(diff.actual, "\"."));
  });
  getInvalidOptions(defaultOptions, options).forEach(function (diff) {
    console.error("[".concat(logName, "] The option \"").concat(diff.key, "\" is not valid."));
  });
};

var getSettings = function getSettings() {
  var defaultOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.assign({}, defaultOptions, options);
};

var logErrorsIfRequested = function logErrorsIfRequested() {
  var defaultOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref = arguments.length > 2 ? arguments[2] : undefined,
      _ref$logErrors = _ref.logErrors,
      logErrors = _ref$logErrors === void 0 ? DEFAULT_SETTINGS.logErrors : _ref$logErrors,
      _ref$logName = _ref.logName,
      logName = _ref$logName === void 0 ? DEFAULT_SETTINGS.logName : _ref$logName;

  return logErrors ? doLogErrors(defaultOptions, options, logName) : false;
};

var printErrorsOfSetupMeSettings = function printErrorsOfSetupMeSettings(settings) {
  return doLogErrors(DEFAULT_SETTINGS, settings, DEFAULT_SETTINGS.logName);
};

var validate = function validate() {
  var defaultOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  printErrorsOfSetupMeSettings(settings);
  logErrorsIfRequested(defaultOptions, options, getSettings(settings));
  return getResultData(getErrors(defaultOptions, options));
};

var _default = {
  validate: validate
};
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/whatsme/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/whatsme/lib/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var isType = _interopRequireWildcard(__webpack_require__(/*! ./is.type */ "./node_modules/whatsme/lib/is.type.js"));

var isOther = _interopRequireWildcard(__webpack_require__(/*! ./is.other */ "./node_modules/whatsme/lib/is.other.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var whats = function whats(obj) {
  return geyKey(getFirstType(obj));
};
/* Aux */


var geyKey = function geyKey() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return obj.type || '';
};

var getFirstType = function getFirstType(obj) {
  return isType.validators.find(function (_ref) {
    var check = _ref.check;
    return check(obj);
  });
};

var whatsme = _objectSpread({}, isType.exposedMethods, isOther, {
  whats: whats
});

var _default = whatsme;
exports.default = _default;

/***/ }),

/***/ "./node_modules/whatsme/lib/is.other.js":
/*!**********************************************!*\
  !*** ./node_modules/whatsme/lib/is.other.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isNotNull", {
  enumerable: true,
  get: function get() {
    return _is.isNotNull;
  }
});
Object.defineProperty(exports, "isBoolean", {
  enumerable: true,
  get: function get() {
    return _is.isBoolean;
  }
});
exports.isNotEmpty = exports.isEmpty = exports.isFalsy = exports.isTruthy = exports.isSomething = exports.isDefined = void 0;

var _is = __webpack_require__(/*! ./is.type */ "./node_modules/whatsme/lib/is.type.js");

var isDefined = function isDefined(obj) {
  return !(0, _is.isUndefined)(obj);
};

exports.isDefined = isDefined;

var isSomething = function isSomething(obj) {
  return (0, _is.isNotNull)(obj) && isDefined(obj);
};

exports.isSomething = isSomething;

var isTruthy = function isTruthy(obj) {
  return !isFalsy(obj);
};

exports.isTruthy = isTruthy;

var isFalsy = function isFalsy(obj) {
  return (0, _is.isFalse)(obj) || !isSomething(obj) || (0, _is.isNaN)(obj) || obj === 0 || obj === '';
};

exports.isFalsy = isFalsy;

var isEmpty = function isEmpty(obj) {
  return isFalsy(obj) || (0, _is.isArray)(obj) && obj.length === 0 || (0, _is.isObject)(obj) && Object.keys(obj).length === 0;
};

exports.isEmpty = isEmpty;

var isNotEmpty = function isNotEmpty(obj) {
  return !isEmpty(obj);
};

exports.isNotEmpty = isNotEmpty;

/***/ }),

/***/ "./node_modules/whatsme/lib/is.type.js":
/*!*********************************************!*\
  !*** ./node_modules/whatsme/lib/is.type.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exposedMethods = exports.validators = exports.isBoolean = exports.isNotNull = exports.isFunction = exports.isObject = exports.isDate = exports.isRegExp = exports.isFalse = exports.isTrue = exports.isArray = exports.isNaN = exports.isNumber = exports.isString = exports.isSymbol = exports.isUndefined = exports.isNull = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isNull = function isNull(obj) {
  return obj === null;
};

exports.isNull = isNull;

var isUndefined = function isUndefined(obj) {
  return typeof obj === 'undefined';
};

exports.isUndefined = isUndefined;

var isSymbol = function isSymbol(obj) {
  return _typeof(obj) === 'symbol' || hasSymbolPrototype(obj);
};

exports.isSymbol = isSymbol;

var isString = function isString(obj) {
  return typeof obj === 'string' || obj instanceof String;
};

exports.isString = isString;

var isNumber = function isNumber(obj) {
  return !isNaN(parseFloat(obj)) && isFinite(obj);
};

exports.isNumber = isNumber;

var isNaN = function isNaN(obj) {
  return typeof obj === 'number' && Number.isNaN(obj);
};

exports.isNaN = isNaN;

var isArray = function isArray(obj) {
  return Array.isArray(obj);
};

exports.isArray = isArray;

var isTrue = function isTrue(obj) {
  return isBoolean(obj) && obj === true;
};

exports.isTrue = isTrue;

var isFalse = function isFalse(obj) {
  return isBoolean(obj) && obj === false;
};

exports.isFalse = isFalse;

var isRegExp = function isRegExp(obj) {
  return obj instanceof RegExp;
};

exports.isRegExp = isRegExp;

var isDate = function isDate(obj) {
  return comparePrototype(obj, '[object Date]');
};

exports.isDate = isDate;

var isObject = function isObject(obj) {
  return isNotNull(obj) && _typeof(obj) === 'object';
};

exports.isObject = isObject;

var isFunction = function isFunction(obj) {
  return comparePrototype(obj, '[object Function]');
};
/* Aux */


exports.isFunction = isFunction;

var isBoolean = function isBoolean(obj) {
  return typeof obj === 'boolean';
};

exports.isBoolean = isBoolean;

var isNotNull = function isNotNull(obj) {
  return !isNull(obj);
};

exports.isNotNull = isNotNull;

var getPrototype = function getPrototype(obj) {
  return Object.prototype.toString.call(obj);
};

var comparePrototype = function comparePrototype(obj, prototype) {
  return getPrototype(obj) === prototype;
};

var hasSymbolPrototype = function hasSymbolPrototype(obj) {
  return comparePrototype(obj, '[object Symbol]');
};

var validators = [{
  name: 'isNull',
  check: isNull,
  type: 'null'
}, {
  name: 'isUndefined',
  check: isUndefined,
  type: 'undefined'
}, {
  name: 'isSymbol',
  check: isSymbol,
  type: 'symbol'
}, {
  name: 'isArray',
  check: isArray,
  type: 'array'
}, {
  name: 'isString',
  check: isString,
  type: 'string'
}, {
  name: 'isNumber',
  check: isNumber,
  type: 'number'
}, {
  name: 'isNaN',
  check: isNaN,
  type: 'NaN'
}, {
  name: 'isBoolean',
  check: isBoolean,
  type: 'boolean'
}, {
  name: 'isRegExp',
  check: isRegExp,
  type: 'RegExp'
}, {
  name: 'isDate',
  check: isDate,
  type: 'Date'
}, {
  name: 'isObject',
  check: isObject,
  type: 'object'
}, {
  name: 'isFunction',
  check: isFunction,
  type: 'function'
}];
exports.validators = validators;
var exposedMethods = {
  isNull: isNull,
  isUndefined: isUndefined,
  isSymbol: isSymbol,
  isArray: isArray,
  isString: isString,
  isNumber: isNumber,
  isNaN: isNaN,
  isTrue: isTrue,
  isFalse: isFalse,
  isRegExp: isRegExp,
  isDate: isDate,
  isObject: isObject,
  isFunction: isFunction
};
exports.exposedMethods = exposedMethods;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scroll_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll.observer */ "./src/scroll.observer.js");


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


var scrolltome = {
  subscribe: function subscribe() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _scroll_observer__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe(element, data);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (scrolltome);

if (window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
  window['scrolltome'] = scrolltome;
}

window.addEventListener('scroll', function () {
  return _scroll_observer__WEBPACK_IMPORTED_MODULE_0__["default"].onScroll();
});

/***/ }),

/***/ "./src/observed.js":
/*!*************************!*\
  !*** ./src/observed.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _repeat_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repeat.options */ "./src/repeat.options.js");
/* harmony import */ var _seen_status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./seen.status */ "./src/seen.status.js");
/* harmony import */ var whatsme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! whatsme */ "./node_modules/whatsme/lib/index.js");
/* harmony import */ var whatsme__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(whatsme__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable require-jsdoc */





var Observed =
/*#__PURE__*/
function () {
  function Observed() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Observed);

    var _options$inViewPortHa = options.inViewPortHandler,
        inViewPortHandler = _options$inViewPortHa === void 0 ? function () {} : _options$inViewPortHa,
        outOfViewPortHandler = options.outOfViewPortHandler,
        _options$repeat = options.repeat,
        repeat = _options$repeat === void 0 ? _repeat_options__WEBPACK_IMPORTED_MODULE_0__["default"].FIRST_IN : _options$repeat;
    this.valid = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["areOptionsValid"])(options) && whatsme__WEBPACK_IMPORTED_MODULE_2___default.a.isDefined(_repeat_options__WEBPACK_IMPORTED_MODULE_0__["default"][repeat]);
    Object(_utils__WEBPACK_IMPORTED_MODULE_3__["checkRepeatValue"])(repeat);
    this.element = element;
    this.inViewPortHandler = inViewPortHandler;
    this.repeat = repeat;
    this.mustHandleOut = !!outOfViewPortHandler;

    this.outOfViewPortHandler = outOfViewPortHandler || function () {}; // this.inViewPort = false;


    this.status = new _seen_status__WEBPACK_IMPORTED_MODULE_1__["default"](repeat);
  }

  _createClass(Observed, [{
    key: "evaluate",
    value: function evaluate(direction) {
      return this.valid ? this.doEvaluate(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["isInViewPort"])(this.element), direction) : false;
    }
  }, {
    key: "doEvaluate",
    value: function doEvaluate(inViewPort, direction) {
      this.update(inViewPort);
      this.check(direction);
    }
  }, {
    key: "update",
    value: function update(inViewPort) {
      this.status.update(inViewPort);
      this.inViewPort = inViewPort;
    }
  }, {
    key: "check",
    value: function check(direction) {
      return this.checkEntering(direction) || this.checkLeaving(direction);
    }
  }, {
    key: "checkEntering",
    value: function checkEntering(direction) {
      return this.status.entering ? this.enteringInViewPort(direction) : false;
    }
  }, {
    key: "checkLeaving",
    value: function checkLeaving(direction) {
      return this.status.leaving ? this.leavingViewPort(direction) : false;
    }
  }, {
    key: "enteringInViewPort",
    value: function enteringInViewPort(direction) {
      this.inViewPortHandler(this.getElementData(direction));
      return true;
    }
  }, {
    key: "leavingViewPort",
    value: function leavingViewPort(direction) {
      this.outOfViewPortHandler(this.getElementData(direction));
      return true;
    }
  }, {
    key: "getElementData",
    value: function getElementData(direction) {
      return Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getElementData"])(this.element, direction);
    }
  }, {
    key: "finished",
    get: function get() {
      return !this.valid || this.status.finished;
    }
  }]);

  return Observed;
}();

/* harmony default export */ __webpack_exports__["default"] = (Observed);

/***/ }),

/***/ "./src/repeat.options.js":
/*!*******************************!*\
  !*** ./src/repeat.options.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var REPEAT = {
  FIRST_IN: 'FIRST_IN',
  FIRST_OUT: 'FIRST_OUT',
  FIRST_IN_AND_OUT: 'FIRST_IN_AND_OUT',
  KEEP: 'KEEP'
};
/* harmony default export */ __webpack_exports__["default"] = (REPEAT);

/***/ }),

/***/ "./src/scroll.observer.js":
/*!********************************!*\
  !*** ./src/scroll.observer.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _observed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observed */ "./src/observed.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable require-jsdoc */
var getDirection = function getDirection(previousPosition) {
  return previousPosition - window.scrollY >= 0 ? 'UP' : 'DOWN';
};



var evaluateSubscribers = function evaluateSubscribers() {
  var subscribers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  return subscribers.forEach(function (item) {
    return item.evaluate(direction);
  });
};

var filterFinished = function filterFinished() {
  var subscribers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return subscribers.filter(function (_ref) {
    var finished = _ref.finished;
    return !finished;
  });
};

var Observer =
/*#__PURE__*/
function () {
  function Observer() {
    _classCallCheck(this, Observer);

    this.subscribers = [];
    this.previousScrollPosition = 0;
  }

  _createClass(Observer, [{
    key: "subscribe",
    value: function subscribe() {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var obs = new _observed__WEBPACK_IMPORTED_MODULE_0__["default"](element, data);
      this.subscribers.push(obs);
      obs.evaluate(this.direction);
    }
  }, {
    key: "evaluate",
    value: function evaluate() {
      evaluateSubscribers(this.subscribers, this.direction);
      this.subscribers = filterFinished(this.subscribers);
    }
  }, {
    key: "onScroll",
    value: function onScroll() {
      this.evaluate();
      this.previousScrollPosition = window.scrollY;
    }
  }, {
    key: "direction",
    get: function get() {
      return getDirection(this.previousScrollPosition);
    }
  }]);

  return Observer;
}();

var scrollObserver = new Observer();
/* harmony default export */ __webpack_exports__["default"] = (scrollObserver);

/***/ }),

/***/ "./src/seen.status.js":
/*!****************************!*\
  !*** ./src/seen.status.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _repeat_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repeat.options */ "./src/repeat.options.js");
/* harmony import */ var whatsme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! whatsme */ "./node_modules/whatsme/lib/index.js");
/* harmony import */ var whatsme__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(whatsme__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable require-jsdoc */


var REPEAT_FINISHED_HANDLER = {
  FIRST_IN: function FIRST_IN(seen, hidden) {
    return seen;
  },
  FIRST_OUT: function FIRST_OUT(seen, hidden) {
    return hidden;
  },
  FIRST_IN_AND_OUT: function FIRST_IN_AND_OUT(seen, hidden) {
    return seen && hidden;
  },
  KEEP: function KEEP(seen, hidden) {
    return false;
  }
};

var getHandler = function getHandler(repeat) {
  return REPEAT_FINISHED_HANDLER[repeat] || function () {
    return false;
  };
};

var SeenStatus =
/*#__PURE__*/
function () {
  function SeenStatus() {
    var repeat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _repeat_options__WEBPACK_IMPORTED_MODULE_0__["default"].FIRST_IN;

    _classCallCheck(this, SeenStatus);

    this.repeat = repeat;
    this.hasBeenSeen = false;
    this.hasBeenHidden = false;
    this.inViewPort = null;
  }

  _createClass(SeenStatus, [{
    key: "update",
    value: function update() {
      var inViewPort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.hasBeenSeen = this.hasBeenSeen || inViewPort;
      this.hasBeenHidden = this.hasBeenHidden || !inViewPort;
      this.checkEntering(inViewPort);
      this.checkLeaving(inViewPort);
      this.inViewPort = inViewPort;
    }
  }, {
    key: "checkEntering",
    value: function checkEntering(inViewPort) {
      this.entering = inViewPort && !this.inViewPort;
    }
  }, {
    key: "checkLeaving",
    value: function checkLeaving(inViewPort) {
      this.leaving = !inViewPort && (this.inViewPort || whatsme__WEBPACK_IMPORTED_MODULE_1___default.a.isNull(this.inViewPort));
    }
  }, {
    key: "finished",
    get: function get() {
      return getHandler(this.repeat)(this.hasBeenSeen, this.hasBeenHidden);
    }
  }]);

  return SeenStatus;
}();

/* harmony default export */ __webpack_exports__["default"] = (SeenStatus);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isInViewPort, getElementData, checkRepeatValue, areOptionsValid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInViewPort", function() { return isInViewPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementData", function() { return getElementData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkRepeatValue", function() { return checkRepeatValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areOptionsValid", function() { return areOptionsValid; });
/* harmony import */ var setupme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! setupme */ "./node_modules/setupme/lib/index.js");
/* harmony import */ var setupme__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(setupme__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _repeat_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./repeat.options */ "./src/repeat.options.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var LOG_NAME = 'scrolltome';
var DEFAULT_OPTIONS = {
  element: {},
  inViewPortHandler: function inViewPortHandler() {},
  outOfViewPortHandler: function outOfViewPortHandler() {},
  repeat: _repeat_options__WEBPACK_IMPORTED_MODULE_1__["default"].FIRST_IN
};

var getViewPortHeight = function getViewPortHeight() {
  return window.innerHeight || document.documentElement.clientHeight;
};

var checkLocation = function checkLocation(_ref) {
  var top = _ref.top,
      bottom = _ref.bottom;
  return (top > 0 || bottom > 0) && top < getViewPortHeight();
};

var getRect = function getRect(element) {
  return element.getBoundingClientRect();
};

var getData = function getData(_ref2) {
  var top = _ref2.top,
      bottom = _ref2.bottom;
  return {
    top: top,
    bottom: bottom
  };
};

var isInViewPort = function isInViewPort() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return checkLocation(getRect(element));
};

var getElementData = function getElementData(el, direction) {
  return _objectSpread({}, getData(getRect(el)), {
    direction: direction
  });
};

var getValidRepeats = function getValidRepeats() {
  return Object.keys(_repeat_options__WEBPACK_IMPORTED_MODULE_1__["default"]).join(', ');
};

var checkRepeatValue = function checkRepeatValue(repeat) {
  return _repeat_options__WEBPACK_IMPORTED_MODULE_1__["default"][repeat] ? true : console.error("[".concat(LOG_NAME, "] option \"").concat(repeat, "\" is not valid. \"repeat\" options are: ").concat(getValidRepeats(), "."));
};

var areOptionsValid = function areOptionsValid(options) {
  return setupme__WEBPACK_IMPORTED_MODULE_0___default.a.validate(DEFAULT_OPTIONS, options, {
    logName: LOG_NAME
  }).success;
};



/***/ })

/******/ });
//# sourceMappingURL=index.js.map