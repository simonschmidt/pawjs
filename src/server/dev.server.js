"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _startsWith2 = require("lodash/startsWith");

var _startsWith3 = _interopRequireDefault(_startsWith2);

var _filter2 = require("lodash/filter");

var _filter3 = _interopRequireDefault(_filter2);

var _map2 = require("lodash/map");

var _map3 = _interopRequireDefault(_map2);

var _isString2 = require("lodash/isString");

var _isString3 = _interopRequireDefault(_isString2);

var _isObject2 = require("lodash/isObject");

var _isObject3 = _interopRequireDefault(_isObject2);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _isArray2 = require("lodash/isArray");

var _isArray3 = _interopRequireDefault(_isArray2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _serveFavicon = require("serve-favicon");

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require("webpack-dev-middleware");

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require("webpack-hot-middleware");

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _dev = require("../webpack/config/dev.babel");

var _dev2 = _interopRequireDefault(_dev);

var _utils = require("../utils");

var _html = require("../components/html");

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * We do not want to do any isomorphic reply and leave everything to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * client code for error reporting and redirection.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Thus we are just simply returning HTML with non-mod assets
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var applyServerFilter = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
    for (var _len = arguments.length, otherArgs = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      otherArgs[_key - 3] = arguments[_key];
    }

    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var data = arguments[2];

    var _res$locals$wook;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(res && res.locals && res.locals.wook && res.locals.wook.apply_filters && name)) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return (_res$locals$wook = res.locals.wook).apply_filters.apply(_res$locals$wook, [name, data].concat(_toConsumableArray(otherArgs)));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
            return _context.abrupt("return", data);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function applyServerFilter(_x2) {
    return _ref.apply(this, arguments);
  };
}();

var _require = require(process.env.__p_root + "directories"),
    publicDirName = _require.publicDirName,
    srcPublicDir = _require.srcPublicDir;

var app = (0, _express2.default)();

var enableServiceWorker = false;

// Extract cookies from the request, making it available as
// Object request.cookie.user etc..
app.use((0, _cookieParser2.default)());

// eslint-disable-next-line no-console
console.log("Creating bundle with Webpack dev server.. Please wait..");

/**
 * Try to serve favicon
 */
try {
  var faviconPath = _path2.default.join(srcPublicDir, "favicon.ico");
  if (_path2.default.resolve(faviconPath)) {
    app.use((0, _serveFavicon2.default)(faviconPath));
  }
} catch (ex) {
  // eslint-disable-next-line
  console.log("Please add favicon @ " + publicDirName + "/favicon.ico for improved performance.");
}

// Get common client webpack config
var commonClientConfig = _dev2.default;

// Initialize service worker config as null
var serviceWorkerConfig = null;

// If multi-config is returned, it means configuration for
// service worker is also present
if ((0, _isArray3.default)(_dev2.default)) {
  var _webpackConfig = _slicedToArray(_dev2.default, 2);

  commonClientConfig = _webpackConfig[0];
  serviceWorkerConfig = _webpackConfig[1];
}

// server content from content base
app.use(_express2.default.static(commonClientConfig.devServer.contentBase));

// Compile common & client configurations
var commonClientCompiler = (0, _webpack2.default)(commonClientConfig);

var commonClientMiddlewareInstance = (0, _webpackDevMiddleware2.default)(commonClientCompiler, {
  stats: "errors-only",
  noInfo: true,
  contentBase: commonClientConfig.devServer.contentBase,
  publicPath: commonClientConfig.output.publicPath,
  watchOptions: (0, _get3.default)(commonClientConfig, "devServer.watchOptions", {}),
  serverSideRender: true
});

// Use the webpack middleware
app.use(commonClientMiddlewareInstance);

// Use the Webpack Hot middleware only for common & client, we do not need
// hot updates for service-worker
app.use((0, _webpackHotMiddleware2.default)(commonClientCompiler, {
  log: false,
  path: "/__hmr_update",
  heartbeat: 2000
}));

// Add assets to request, we will need to compute it properly as we need to append
// the public path as well
app.use(function (req, res, next) {

  // get stats from webpack
  var webpackStats = res.locals.webpackStats.toJson();

  var assets = {};
  if (!webpackStats.children || webpackStats.children.length <= 1) {
    webpackStats = [webpackStats];
  } else {
    webpackStats = webpackStats.children;
  }

  (0, _each3.default)(webpackStats, function (stat) {
    var assetsByChunkName = stat.assetsByChunkName;
    var publicPath = stat.publicPath;

    (0, _each3.default)(assetsByChunkName, function (chunkValue, chunkName) {

      // If its array then it just contains chunk value as array
      if ((0, _isArray3.default)(chunkValue)) {
        (0, _each3.default)(chunkValue, function (path, index) {
          assetsByChunkName[chunkName][index] = "" + publicPath + path;
        });
      } else if ((0, _isObject3.default)(chunkValue)) {
        (0, _each3.default)(chunkValue, function (subChunkValues, subChunkType) {
          (0, _each3.default)(subChunkValues, function (subChunkValue, subChunkIndex) {
            assetsByChunkName[chunkName][subChunkType][subChunkIndex] = "" + publicPath + subChunkValue;
          });
        });
      } else if ((0, _isString3.default)(chunkValue)) {
        assetsByChunkName[chunkName] = "" + publicPath + chunkValue;
      }
    });
    assets = _extends({}, assets, assetsByChunkName);
  });
  // All assets
  req.assets = assets;
  // all css assets
  req.cssAssets = (0, _utils.extractFilesFromAssets)(assets, ".css");

  // all js assets
  req.jsAssets = (0, _utils.extractFilesFromAssets)(assets, ".js");

  next();
});

if (enableServiceWorker && serviceWorkerConfig !== null) {
  var serviceWorkerCompiler = (0, _webpack2.default)(serviceWorkerConfig);
  var serviceWorkerMiddlewareInstance = (0, _webpackDevMiddleware2.default)(serviceWorkerCompiler, {
    noInfo: true,
    // We can use he same contentBase as used by commonClient
    contentBase: commonClientConfig.devServer.contentBase,
    publicPath: serviceWorkerConfig.output.publicPath,
    serverSideRender: true,
    watchOptions: (0, _get3.default)(serviceWorkerConfig, "devServer.watchOptions", (0, _get3.default)(commonClientConfig, "devServer.watchOptions", {}))
  });
  app.use(serviceWorkerMiddlewareInstance);

  app.get("/sw.js", function (req, res) {
    var webpackStats = res.locals.webpackStats.toJson();
    var assets = (0, _map3.default)((0, _map3.default)((0, _filter3.default)((0, _get3.default)(webpackStats, "assets", []), { emitted: true }), "name"), function (a) {
      return "" + webpackStats.publicPath + a;
    });

    var serviceWorkerContents = serviceWorkerMiddlewareInstance.fileSystem.readFileSync(serviceWorkerConfig.output.path + "/service-worker.js", "utf-8");

    var swResponseText = "\n      var ASSETS = " + JSON.stringify(assets) + ";\n      " + serviceWorkerContents + "\n    ";
    var swVersionHash = _crypto2.default.createHash("md5").update(swResponseText).digest("hex");
    swResponseText = "\n      var VERSION = \"" + swVersionHash + "\";\n      " + swResponseText + "\n    ";

    res.setHeader("Content-Type", "application/javascript");
    // No cache header
    res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.setHeader("Expires", "-1");
    res.setHeader("Pragma", "no-cache");
    res.send(swResponseText);
  });
}

/**
 * Send global data to user, as we do not want to send it via
 * window object
 */
app.get("/_globals", function (req, res) {

  // Never ever cache this request
  var cssAssets = req.cssAssets,
      jsAssets = req.jsAssets;


  res.setHeader("Content-Type", "application/json");
  // No cache header
  res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.setHeader("Expires", "-1");
  res.setHeader("Pragma", "no-cache");

  return res.send(JSON.stringify({
    allCss: cssAssets,
    allJs: jsAssets
  }));
});

app.get("*", function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var cssAssets, jsAssets, requestHost, currentUrl, currentRouteCss, currentRouteJs, pawHead, pawFooter, html;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            // Get list of assets from request
            cssAssets = req.cssAssets, jsAssets = req.jsAssets;
            requestHost = (req.headers["x-forwarded-protocol"] || req.headers["protocol"] || req.protocol) + "://" + (req.headers["x-host"] || req.headers["host"] || "");
            currentUrl = "" + requestHost + req.path;

            /**
             * Get common/client (non-module) CSS generated
             */

            currentRouteCss = (0, _filter3.default)(cssAssets, function (css) {
              var fileName = css.split("/").pop();
              return !(0, _startsWith3.default)(fileName, "mod-");
            });

            /**
             * Get common/client (non-module) JS generated
             */

            currentRouteJs = (0, _filter3.default)(jsAssets, function (js) {
              var fileName = js.split("/").pop();
              return !(0, _startsWith3.default)(fileName, "mod-") && !(0, _startsWith3.default)(fileName, "service-worker.js");
            });
            _context2.next = 7;
            return applyServerFilter(res, "paw_head", [], { req: req, res: res });

          case 7:
            pawHead = _context2.sent;
            _context2.next = 10;
            return applyServerFilter(res, "paw_footer", [], { req: req, res: res });

          case 10:
            pawFooter = _context2.sent;
            html = _server2.default.renderToString(_react2.default.createElement(_html2.default, {
              stylesheets: currentRouteCss,
              scripts: currentRouteJs,
              pawHead: pawHead,
              pawFooter: pawFooter,
              url: currentUrl,
              baseUrl: requestHost
            }));

            res.status(200).send("<!DOCTYPE html>" + html);
            next();

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());

if (module.hot) module.hot.accept();

var _default = app;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(applyServerFilter, "applyServerFilter", "lib/server/dev.server.js");

  __REACT_HOT_LOADER__.register(app, "app", "lib/server/dev.server.js");

  __REACT_HOT_LOADER__.register(enableServiceWorker, "enableServiceWorker", "lib/server/dev.server.js");

  __REACT_HOT_LOADER__.register(commonClientConfig, "commonClientConfig", "lib/server/dev.server.js");

  __REACT_HOT_LOADER__.register(serviceWorkerConfig, "serviceWorkerConfig", "lib/server/dev.server.js");

  __REACT_HOT_LOADER__.register(commonClientCompiler, "commonClientCompiler", "lib/server/dev.server.js");

  __REACT_HOT_LOADER__.register(commonClientMiddlewareInstance, "commonClientMiddlewareInstance", "lib/server/dev.server.js");

  __REACT_HOT_LOADER__.register(_default, "default", "lib/server/dev.server.js");
}();

;