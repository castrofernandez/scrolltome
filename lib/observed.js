"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _repeat = _interopRequireDefault(require("./repeat.options"));

var _seen = _interopRequireDefault(require("./seen.status"));

var _whatsme = _interopRequireDefault(require("whatsme"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
        repeat = _options$repeat === void 0 ? _repeat["default"].FIRST_IN : _options$repeat;
    this.valid = (0, _utils.areOptionsValid)(options) && _whatsme["default"].isDefined(_repeat["default"][repeat]);
    (0, _utils.checkRepeatValue)(repeat);
    this.element = element;
    this.inViewPortHandler = inViewPortHandler;
    this.repeat = repeat;
    this.mustHandleOut = !!outOfViewPortHandler;

    this.outOfViewPortHandler = outOfViewPortHandler || function () {};

    this.status = new _seen["default"](repeat);
  }

  _createClass(Observed, [{
    key: "evaluate",
    value: function evaluate(direction) {
      return this.valid ? this.doEvaluate((0, _utils.isInViewPort)(this.element), direction) : false;
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
      return (0, _utils.getElementData)(this.element, direction);
    }
  }, {
    key: "finished",
    get: function get() {
      return !this.valid || this.status.finished;
    }
  }]);

  return Observed;
}();

var _default = Observed;
exports["default"] = _default;