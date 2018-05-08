"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

var _api2 = _interopRequireDefault(_api);

var _storage = require("../storage");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiInstance = new _api2.default({ storage: _storage2.default });
var _default = apiInstance;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(apiInstance, "apiInstance", "lib/libs/api/api.client.js");

  __REACT_HOT_LOADER__.register(_default, "default", "lib/libs/api/api.client.js");
}();

;