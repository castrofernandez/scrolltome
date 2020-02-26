"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _repeat = _interopRequireDefault(require("./repeat.options"));

var _whatsme = _interopRequireDefault(require("whatsme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var mustKeep = function mustKeep(repeat) {
  return repeat === _repeat["default"].KEEP;
};

var SeenStatus =
/*#__PURE__*/
function () {
  function SeenStatus() {
    var repeat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _repeat["default"].FIRST_IN;

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
      this.entering = inViewPort && (!this.inViewPort || mustKeep(this.repeat));
    }
  }, {
    key: "checkLeaving",
    value: function checkLeaving(inViewPort) {
      this.leaving = !inViewPort && (this.inViewPort || _whatsme["default"].isNull(this.inViewPort) || mustKeep(this.repeat));
    }
  }, {
    key: "finished",
    get: function get() {
      return getHandler(this.repeat)(this.hasBeenSeen, this.hasBeenHidden);
    }
  }]);

  return SeenStatus;
}();

var _default = SeenStatus;
exports["default"] = _default;