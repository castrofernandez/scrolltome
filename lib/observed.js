"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setupme = _interopRequireDefault(require("setupme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REPEAT = {
  FIRST_IN: 'FIRST_IN',
  FIRST_OUT: 'FIRST_OUT',
  FIRST_IN_AND_OUT: 'FIRST_IN_AND_OUT',
  KEEP: 'KEEP'
};
var DEFAULT_OPTIONS = {
  element: {},
  inViewPortHandler: function inViewPortHandler() {},
  outOfViewPortHandler: function outOfViewPortHandler() {},
  repeat: REPEAT.FIRST_IN
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

var _getElementData = function getElementData(el, direction) {
  return _objectSpread({}, getData(getRect(el)), {
    direction: direction
  });
};

var Observed =
/*#__PURE__*/
function () {
  function Observed() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Observed);

    var _options$element = options.element,
        element = _options$element === void 0 ? {} : _options$element,
        _options$inViewPortHa = options.inViewPortHandler,
        inViewPortHandler = _options$inViewPortHa === void 0 ? function () {} : _options$inViewPortHa,
        outOfViewPortHandler = options.outOfViewPortHandler;

    _setupme["default"].validate(DEFAULT_OPTIONS, options, {
      logName: 'scrolltome'
    });

    this.element = element;
    this.inViewPortHandler = inViewPortHandler;
    this.mustHandleOut = !!outOfViewPortHandler;

    this.outOfViewPortHandler = outOfViewPortHandler || function () {};

    this.inViewPort = false;
    this.seen = false;
    this.hidden = false;
  }

  _createClass(Observed, [{
    key: "evaluate",
    value: function evaluate(direction) {
      this.doEvaluate(isInViewPort(this.element), direction);
    }
  }, {
    key: "doEvaluate",
    value: function doEvaluate(currentStatus, direction) {
      this.check(currentStatus, direction);
      this.update(currentStatus);
    }
  }, {
    key: "update",
    value: function update(currentStatus) {
      this.seen = this.seen || currentStatus;
      this.hidden = this.hidden || this.seen && !currentStatus;
      this.inViewPort = currentStatus;
    }
  }, {
    key: "check",
    value: function check(currentStatus, direction) {
      return this.checkEntering(currentStatus, direction) || this.checkLeaving(currentStatus, direction);
    }
  }, {
    key: "checkEntering",
    value: function checkEntering(currentStatus, direction) {
      return currentStatus && !this.inViewPort ? this.isEnteringInViewPort(direction) : false;
    }
  }, {
    key: "checkLeaving",
    value: function checkLeaving(currentStatus, direction) {
      return !currentStatus && this.inViewPort ? this.isLeavingViewPort(direction) : false;
    }
  }, {
    key: "isEnteringInViewPort",
    value: function isEnteringInViewPort(direction) {
      this.inViewPortHandler(this.getElementData(direction));
      return true;
    }
  }, {
    key: "isLeavingViewPort",
    value: function isLeavingViewPort(direction) {
      this.outOfViewPortHandler(this.getElementData(direction));
      return true;
    }
  }, {
    key: "getElementData",
    value: function getElementData(direction) {
      return _getElementData(this.element, direction);
    }
  }, {
    key: "hasBeenSeen",
    get: function get() {
      return this.seen;
    }
  }, {
    key: "hasBeenHidden",
    get: function get() {
      return this.hidden;
    }
  }, {
    key: "hasBeenSeenAndHidden",
    get: function get() {
      return this.hasBeenSeen && this.hasBeenHidden;
    }
  }]);

  return Observed;
}();

var _default = Observed;
exports["default"] = _default;