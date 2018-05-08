"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wook = require("wook");

var _wook2 = _interopRequireDefault(_wook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(req, res, next) {
  // add events and filters to request and response
  if (!res.locals.wook) {
    res.locals.wook = new _wook2.default();
  }
  next();
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, "default", "lib/server/hooks.js");
}();

;