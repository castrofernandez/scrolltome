"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _observed = _interopRequireDefault(require("./observed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable require-jsdoc */
var getDirection = function getDirection(previousPosition) {
  return previousPosition - window.scrollY >= 0 ? 'UP' : 'DOWN';
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
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var obs = new _observed["default"](data);
      this.subscribers.push(obs);
      obs.evaluate(this.direction);
    }
  }, {
    key: "evaluate",
    value: function evaluate() {
      var direction = this.direction;
      this.subscribers.forEach(function (subscriber) {
        return subscriber.evaluate(direction);
      });
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
var _default = scrollObserver;
exports["default"] = _default;
window.addEventListener('scroll', function () {
  return scrollObserver.onScroll();
});