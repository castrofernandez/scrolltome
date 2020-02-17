"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areOptionsValid = exports.checkRepeatValue = exports.getElementData = exports.isInViewPort = void 0;

var _setupme = _interopRequireDefault(require("setupme"));

var _repeat = _interopRequireDefault(require("./repeat.options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LOG_NAME = 'scrolltome';
var DEFAULT_OPTIONS = {
  element: {},
  inViewPortHandler: function inViewPortHandler() {},
  outOfViewPortHandler: function outOfViewPortHandler() {},
  repeat: _repeat["default"].FIRST_IN
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

exports.isInViewPort = isInViewPort;

var getElementData = function getElementData(el, direction) {
  return _objectSpread({}, getData(getRect(el)), {
    direction: direction
  });
};

exports.getElementData = getElementData;

var getValidRepeats = function getValidRepeats() {
  return Object.keys(_repeat["default"]).join(', ');
};

var checkRepeatValue = function checkRepeatValue(repeat) {
  return _repeat["default"][repeat] ? true : console.error("[".concat(LOG_NAME, "] option \"").concat(repeat, "\" is not valid. \"repeat\" options are: ").concat(getValidRepeats(), "."));
};

exports.checkRepeatValue = checkRepeatValue;

var areOptionsValid = function areOptionsValid(options) {
  return _setupme["default"].validate(DEFAULT_OPTIONS, options, {
    logName: LOG_NAME
  }).success;
};

exports.areOptionsValid = areOptionsValid;