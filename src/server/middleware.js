"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRouteNamespace = exports.setRoutes = undefined;

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _filter2 = require("lodash/filter");

var _filter3 = _interopRequireDefault(_filter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require(process.env.__p_root + "src/config").default;

var __development = process.env.NODE_ENV === "development";

var app = null;
var setRoutes = function setRoutes() {
  return null;
};
var selectRouteNamespace = function selectRouteNamespace() {
  return null;
};

// When not developing code, enabling it during development
// will take up un-necessary time and resources
if (__development) {
  // Hacky solution for webpack to not include the file
  // babel can import it as it will eval it and the file will be
  // still there.
  var devServer = eval("require")("./dev.server");
  app = devServer.default;
  exports.setRoutes = setRoutes = devServer.setRoutes;
  exports.selectRouteNamespace = selectRouteNamespace = devServer.selectRouteNamespace;
} else {
  var prodServer = require("./prod.server");
  app = prodServer.default;
  exports.setRoutes = setRoutes = prodServer.setRoutes;
  exports.selectRouteNamespace = selectRouteNamespace = prodServer.selectRouteNamespace;
}

// Add csp headers
var cspHeaders = (0, _filter3.default)((0, _get3.default)(config, "seo.meta", []), function (meta) {
  return "content-security-policy" === (0, _get3.default)(meta, "httpEquiv", "").toLowerCase();
});
app.use(function (req, res, next) {
  (0, _each3.default)(cspHeaders, function (cspHead) {
    cspHead.content && res.header("Content-Security-Policy", cspHead.content);
  });
  next();
});

var _default = app;
exports.default = _default;
exports.setRoutes = setRoutes;
exports.selectRouteNamespace = selectRouteNamespace;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(config, "config", "lib/server/middleware.js");

  __REACT_HOT_LOADER__.register(__development, "__development", "lib/server/middleware.js");

  __REACT_HOT_LOADER__.register(app, "app", "lib/server/middleware.js");

  __REACT_HOT_LOADER__.register(setRoutes, "setRoutes", "lib/server/middleware.js");

  __REACT_HOT_LOADER__.register(selectRouteNamespace, "selectRouteNamespace", "lib/server/middleware.js");

  __REACT_HOT_LOADER__.register(cspHeaders, "cspHeaders", "lib/server/middleware.js");

  __REACT_HOT_LOADER__.register(_default, "default", "lib/server/middleware.js");
}();

;