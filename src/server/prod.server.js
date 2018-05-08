"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRouteNamespace = exports.setRoutes = undefined;

var _defaults2 = require("lodash/defaults");

var _defaults3 = _interopRequireDefault(_defaults2);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _startsWith2 = require("lodash/startsWith");

var _startsWith3 = _interopRequireDefault(_startsWith2);

var _cloneDeep2 = require("lodash/cloneDeep");

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _assignIn2 = require("lodash/assignIn");

var _assignIn3 = _interopRequireDefault(_assignIn2);

var _map2 = require("lodash/map");

var _map3 = _interopRequireDefault(_map2);

var _filter2 = require("lodash/filter");

var _filter3 = _interopRequireDefault(_filter2);

var _isEmpty2 = require("lodash/isEmpty");

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _set2 = require("lodash/set");

var _set3 = _interopRequireDefault(_set2);

var _find2 = require("lodash/find");

var _find3 = _interopRequireDefault(_find2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _hsts = require("hsts");

var _hsts2 = _interopRequireDefault(_hsts);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _isbot = require("isbot");

var _isbot2 = _interopRequireDefault(_isbot);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _serveFavicon = require("serve-favicon");

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _reactRouter = require("react-router");

var _createMemoryHistory = require("history/createMemoryHistory");

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _links = require("../utils/links");

var _bundler = require("../utils/bundler");

var _renderer = require("../utils/renderer");

var _storage = require("../libs/storage/storage.server");

var _storage2 = _interopRequireDefault(_storage);

var _api = require("../libs/api/api");

var _api2 = _interopRequireDefault(_api);

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _html = require("../components/html");

var _html2 = _interopRequireDefault(_html);

var _utils = require("../utils/utils");

var _server3 = require("../utils/server");

var _wook = require("wook");

var _wook2 = _interopRequireDefault(_wook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var DefaultRoutes = require(process.env.__p_root + "src/routes").default;
var assets = require(process.env.__p_root + "src/config/assets").default;
var config = require(process.env.__p_root + "src/config").default;
var pwaIcon = require(process.env.__p_root + "src/resources/images/pwa/icon-384x384.png");

var _require = require(process.env.__p_root + "directories"),
    publicDirName = _require.publicDirName;

/**
 * Set current dir for better computation
 * @type {String}
 */


var currentDir = __dirname;

// Set appropriate currentDir when build and run in production mode
var filename = (0, _find3.default)(process.argv, function (arg) {
  return arg.indexOf("/server.js") !== -1;
});
if (filename) {
  currentDir = _path2.default.dirname(filename);
}

/**
 * Routes management - For multiple domains -- start
 */
var routesMap = {
  "default": DefaultRoutes
};

var setRoutes = exports.setRoutes = function setRoutes() {
  var routeNamespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var routeList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!routeNamespace && routeNamespace.trim()) return;
  (0, _set3.default)(routesMap, routeNamespace.trim(), routeList);
};

var selectRouteNamespace = exports.selectRouteNamespace = function selectRouteNamespace(res) {
  var routeNamespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  var routeList = [];
  if (routeNamespace && routeNamespace.trim()) {
    routeList = (0, _get3.default)(routesMap, routeNamespace.trim(), []);
  }
  if (!(0, _isEmpty3.default)(routeList)) {
    (0, _set3.default)(res, "locals.route-namespace", routeNamespace);
  } else {
    (0, _set3.default)(res, "locals.route-namespace", "default");
  }
};

var getRoutes = function getRoutes(response) {
  var routeNamespace = (0, _get3.default)(response, "locals.route-namespace", "default");
  routeNamespace = routeNamespace.trim() ? routeNamespace.trim().toLowerCase() : "default";
  var routeList = (0, _get3.default)(routesMap, routeNamespace, DefaultRoutes);
  if (!(0, _isEmpty3.default)(routeList)) return routeList;
  return DefaultRoutes;
};
/**
 * Routes management - For multiple domains -- end
 */

// Get everything inside public path
var allAssets = [];
var getAllAssets = function getAllAssets() {
  if ((0, _isEmpty3.default)(allAssets)) {
    var publicDirPrefix = _path2.default.join(currentDir, publicDirName);
    allAssets = _glob2.default.sync(publicDirPrefix + "/**/*");
    allAssets = (0, _filter3.default)((0, _map3.default)(allAssets, function (a) {
      var replacedPath = a.replace(publicDirPrefix, "");

      // Path for windows!
      if (_path2.default.sep === "\\") {
        var publicDirPrefixWin = publicDirPrefix.replace(/\\/g, "/");
        replacedPath = replacedPath.replace(publicDirPrefixWin, "");
      }
      return replacedPath;
    }), function (a) {
      return !!_path2.default.extname(a);
    });
  }
  return allAssets;
};

var app = (0, _express2.default)();

// Extract cookies from the request, making it available as
// Object request.cookie.user etc..
app.use((0, _cookieParser2.default)());

// use compression for all requests
app.use((0, _compression2.default)());

// add events and filters to request and response
app.use(function (req, res, next) {
  if (!res.locals.wook) {
    res.locals.wook = new _wook2.default();
  }
  next();
});

// Add hsts settings for secure site
// mageAge: Must be at least 18 weeks to be approved by Google, but we are setting it to 1 year
var hstsSettings = (0, _get3.default)(config, "hsts", {
  enabled: true,
  maxAge: 31536000,
  includeSubDomains: true, // Must be enabled to be approved by Google
  preload: false
});

if (hstsSettings.enabled) {
  app.use((0, _hsts2.default)((0, _assignIn3.default)(hstsSettings, {
    // Enable hsts for https sites
    setIf: function setIf(req) {
      return req.secure || req.headers["x-forwarded-proto"] === "https";
    }
  })));
}

var cacheTime = 86400000 * 30; // 30 days;
app.use(_express2.default.static(_path2.default.join(currentDir, publicDirName), {
  maxAge: cacheTime
}));

// Disable x-powered-by (security issues)
app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});

// Middleware to add assets to request
try {
  app.use(function (req, res, next) {
    req.assets = assets;
    next();
  });
} catch (ex) {
  // Do not do anything here.
  // cause the assets are most probably handled by webpack
}

var cachedswResponseText = null;
var getServiceWorkerContent = function getServiceWorkerContent() {
  if (cachedswResponseText) return cachedswResponseText;
  // Get contents of service worker
  var serviceWorkerContents = _fs2.default.readFileSync(_path2.default.resolve(_path2.default.join(currentDir, "service-worker.js")), "utf-8");

  // Create a response text without Version number
  var swResponseText = "\n    var ASSETS = " + JSON.stringify(getAllAssets()) + ";\n    " + serviceWorkerContents + "\n  ";
  // Create an MD5 hash of response and then append it to response
  var swVersionHash = _crypto2.default.createHash("md5").update(swResponseText).digest("hex");
  swResponseText = "\n    var VERSION = \"" + swVersionHash + "\";\n    " + swResponseText + "\n  ";
  cachedswResponseText = swResponseText;
  return swResponseText;
};

app.get("/sw.js", function (req, res) {

  var swResponseText = getServiceWorkerContent();
  res.setHeader("Content-Type", "application/javascript");
  // No cache header
  res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.setHeader("Expires", "-1");
  res.setHeader("Pragma", "no-cache");
  res.send(swResponseText);
});

// Only if service worker is enabled then emit manifest.json
app.get("/manifest.json", function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var pwa, availableSizes, icons;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pwa = config.pwa;
            availableSizes = [72, 96, 128, 144, 152, 192, 384, 512];
            icons = availableSizes.map(function (size) {
              return {
                "src": require("src/resources/images/pwa/icon-" + size + "x" + size + ".png"),
                sizes: size + "x" + size
              };
            });

            (0, _set3.default)(pwa, "icons", icons);

            res.setHeader("Content-Type", "application/manifest+json");
            // No cache header
            res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.setHeader("Expires", "-1");
            res.setHeader("Pragma", "no-cache");

            res.send(JSON.stringify(pwa));

            return _context.abrupt("return", next());

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * Try to get the public dir
 */
try {
  var faviconPath = _path2.default.join(currentDir, publicDirName, "favicon.ico");
  if (_path2.default.resolve(faviconPath)) {
    app.use((0, _serveFavicon2.default)(faviconPath));
  }
} catch (ex) {
  // eslint-disable-next-line
  console.log("Please add favicon @ " + publicDirName + "/favicon.ico for improved performance.");
}

/**
 * Send global data to user, as we do not want to send it via
 * window object
 */
app.get("/_globals", function (req, res) {
  // Never ever cache this request
  var assets = req.assets;

  var allCss = (0, _utils.extractFilesFromAssets)(assets, ".css");
  var allJs = (0, _utils.extractFilesFromAssets)(assets, ".js");

  res.setHeader("Content-Type", "application/json");
  // No cache header
  res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.setHeader("Expires", "-1");
  res.setHeader("Pragma", "no-cache");

  return res.send(JSON.stringify({
    routes: getRoutes(res),
    allCss: allCss,
    allJs: allJs
  }));
});

app.get("*", function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var routes, assets, allCss, allJs, mod, currentRoutes, storage, history, store, api, currentRouteCss, inlineCss, currentRouteJs, context, html, statusCode, seoDetails, routerComponent, requestHost, currentUrl, bot, pawHead, pawFooter, promises, hasSeoImage, links;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            routes = (0, _cloneDeep3.default)(getRoutes(res));

            // Get list of assets from request

            assets = req.assets;

            /**
             * Get all css and js files for mapping
             */

            allCss = (0, _utils.extractFilesFromAssets)(assets, ".css");
            allJs = (0, _utils.extractFilesFromAssets)(assets, ".js");
            mod = (0, _bundler.getModuleByUrl)(req.path, routes);
            currentRoutes = (0, _bundler.getRouteFromPath)(req.path, routes);
            storage = new _storage2.default(req, res);
            history = (0, _createMemoryHistory2.default)();
            // Create redux store

            store = (0, _store2.default)(_extends({
              history: history,
              // Combine initial state with our default state
              initialState: (0, _assignIn3.default)({
                network: {
                  state: "online"
                },
                router: {
                  location: {
                    pathname: req.path,
                    search: req.url.replace(req.path, ""),
                    hash: ""
                  }
                }
              }, (0, _get3.default)(res, "locals.reduxInitialState", {}))

            }, typeof res.locals["reduxEnhancers"] !== "undefined" ? {
              enhancers: res.locals["reduxEnhancers"]
            } : {}, typeof res.locals["reduxMiddlewares"] !== "undefined" ? {
              middleware: res.locals["reduxMiddlewares"]
            } : {}, typeof res.locals["reduxReducers"] !== "undefined" ? {
              reducers: res.locals["reduxReducers"]
            } : {}));
            api = new _api2.default({ storage: storage, store: store });

            /**
             * Get css generated by current route and module
             */

            currentRouteCss = (0, _filter3.default)(allCss, function (css) {
              var fileName = css.split("/").pop();
              return !((0, _startsWith3.default)(fileName, "mod-") && fileName.indexOf(mod) === -1);
            });
            inlineCss = (0, _map3.default)(currentRouteCss, function (css) {
              return _fs2.default.readFileSync(_path2.default.join(currentDir, publicDirName, css), "utf8");
            }).join("");

            /**
             * Get all javascript but the modules
             */

            currentRouteJs = (0, _filter3.default)(allJs, function (js) {
              var fileName = js.split("/").pop();
              return !(0, _startsWith3.default)(fileName, "mod-") && !(0, _startsWith3.default)(fileName, "service-worker.js");
            });
            context = {
              storage: storage,
              api: api,
              pathname: req.path
            };
            html = void 0, statusCode = 200;

            // Get seo details for the routes in an inherited manner
            // i.e. get seo details of parent when feasible

            seoDetails = {};
            routerComponent = null;
            requestHost = (req.headers["x-forwarded-protocol"] || req.headers["protocol"] || req.protocol) + "://" + (req.headers["x-host"] || req.headers["host"] || "");
            currentUrl = "" + requestHost + req.path;
            bot = (0, _isbot2.default)((0, _get3.default)(req, "headers.user-agent", ""));
            _context2.next = 22;
            return (0, _server3.applyServerFilter)(res, "paw_head", [], { req: req, res: res });

          case 22:
            pawHead = _context2.sent;
            _context2.next = 25;
            return (0, _server3.applyServerFilter)(res, "paw_footer", [], { req: req, res: res });

          case 25:
            pawFooter = _context2.sent;
            _context2.prev = 26;

            // Also preload data required when asked
            promises = (0, _renderer.getPreloadDataPromises)({
              routes: currentRoutes,
              storage: storage,
              api: api,
              url: currentUrl,
              store: store,
              host: requestHost
            });
            _context2.next = 30;
            return Promise.all(promises);

          case 30:

            // Once all data has been pre-loaded and processed
            (0, _each3.default)(currentRoutes, function (r) {
              seoDetails = (0, _defaults3.default)({}, (0, _get3.default)(r, "seo", {}), seoDetails);
            });
            hasSeoImage = !!(seoDetails.image && seoDetails.image.length);

            if (!hasSeoImage) {
              seoDetails.image = pwaIcon;
            }

            if (!currentRoutes.length) {
              routerComponent = (0, _renderer.renderNotFoundPage)({
                render: false,
                Router: _reactRouter.StaticRouter,
                url: req.path,
                Switch: _reactRouter.Switch,
                Route: _reactRouter.Route,
                context: context,
                store: store,
                api: api,
                storage: storage
              });
            } else {
              routerComponent = (0, _renderer.renderRoutesByUrl)({
                render: false,
                Router: _reactRouter.StaticRouter,
                url: req.path,
                Switch: _reactRouter.Switch,
                Route: _reactRouter.Route,
                context: context,
                routes: currentRoutes,
                storage: storage,
                store: store,
                api: api
              });
            }

            links = (0, _links.generateLinks)(seoDetails, { baseUrl: requestHost, url: currentUrl });


            html = _server2.default.renderToString(_react2.default.createElement(
              _html2.default,
              {
                inlineCss: inlineCss,
                scripts: currentRouteJs,
                pawHead: pawHead,
                pawFooter: pawFooter,
                seo: seoDetails,
                baseUrl: requestHost,
                url: currentUrl,
                isBot: bot,
                links: links
              },
              routerComponent
            ));

            statusCode = context.status || 200;
            if (context.url) {
              // Somewhere a `<Redirect>` was rendered
              res.status(statusCode).redirect(context.url);
            } else {
              res.status(statusCode).send("<!DOCTYPE html>" + html);
            }
            // Get data to load for all the routes
            _context2.next = 45;
            break;

          case 40:
            _context2.prev = 40;
            _context2.t0 = _context2["catch"](26);


            if (_context2.t0 && _context2.t0.statusCode && _context2.t0.statusCode === 404) {
              routerComponent = (0, _renderer.renderNotFoundPage)({
                render: false,
                Router: _reactRouter.StaticRouter,
                url: req.path,
                Switch: _reactRouter.Switch,
                Route: _reactRouter.Route,
                context: context,
                store: store,
                api: api,
                storage: storage
              });
            } else {
              routerComponent = (0, _server3.getErrorComponent)(_context2.t0, store, storage, api);
            }

            html = _server2.default.renderToString(_react2.default.createElement(
              _html2.default,
              {
                inlineCss: inlineCss,
                scripts: currentRouteJs,
                pawHead: pawHead,
                pawFooter: pawFooter,
                baseUrl: requestHost,
                url: currentUrl,
                isBot: bot
              },
              routerComponent
            ));
            res.status(_context2.t0.statusCode || 500).send("<!DOCTYPE html>" + html);

          case 45:
            next();

          case 46:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[26, 40]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}());

var _default = app;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DefaultRoutes, "DefaultRoutes", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(assets, "assets", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(config, "config", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(currentDir, "currentDir", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(filename, "filename", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(routesMap, "routesMap", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(setRoutes, "setRoutes", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(selectRouteNamespace, "selectRouteNamespace", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(getRoutes, "getRoutes", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(allAssets, "allAssets", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(getAllAssets, "getAllAssets", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(app, "app", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(hstsSettings, "hstsSettings", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(cacheTime, "cacheTime", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(cachedswResponseText, "cachedswResponseText", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(getServiceWorkerContent, "getServiceWorkerContent", "lib/server/prod.server.js");

  __REACT_HOT_LOADER__.register(_default, "default", "lib/server/prod.server.js");
}();

;