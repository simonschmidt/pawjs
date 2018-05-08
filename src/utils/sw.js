"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOfflineHtml = exports.decodeMessage = exports.messageAllClients = exports.deleteOldCache = exports.log = undefined;

var _defaults2 = require("lodash/defaults");

var _defaults3 = _interopRequireDefault(_defaults2);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _startsWith2 = require("lodash/startsWith");

var _startsWith3 = _interopRequireDefault(_startsWith2);

var _filter2 = require("lodash/filter");

var _filter3 = _interopRequireDefault(_filter2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _assignIn2 = require("lodash/assignIn");

var _assignIn3 = _interopRequireDefault(_assignIn2);

var _isString2 = require("lodash/isString");

var _isString3 = _interopRequireDefault(_isString2);

var _isEmpty2 = require("lodash/isEmpty");

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _map2 = require("lodash/map");

var _map3 = _interopRequireDefault(_map2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _html = require("../components/html");

var _html2 = _interopRequireDefault(_html);

var _bundler = require("./bundler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// As service worker has special scope for self lets store it to variable
// eslint-disable-next-line
var serviceWorker = self;

/**
 * Log to console if environment is development
 * @param args
 */
var log = exports.log = function log() {
  if (process.env.NODE_ENV === "development") {
    var _console;

    // eslint-disable-next-line
    console.log("\n");(_console = console).log.apply(_console, arguments);
  }
};

/**
 *
 * @param currentCacheName
 * @param cachePrefix
 * @returns {Promise.<TResult>|*}
 */
var deleteOldCache = exports.deleteOldCache = function deleteOldCache() {
  var currentCacheName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var cachePrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  return caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cacheName) {
      if (currentCacheName !== cacheName && cacheName.startsWith(cachePrefix)) {
        return caches.delete(cacheName);
      }
    }));
  });
};

/**
 * Send message to all clients
 * @param serviceWorker
 * @param message
 * @returns {Promise}
 */
var messageAllClients = exports.messageAllClients = function messageAllClients(serviceWorker, message) {
  var msg = generateMessage(message);
  return new Promise(function (resolve) {
    serviceWorker.clients.matchAll().then(function (clients) {
      return Promise.all((0, _map3.default)(clients, function (client) {
        return postMessage(client, msg);
      }));
    }).then(resolve);
  });
};

/**
 * Generate message from * Generic data and send object accordingly
 * @param data
 * @returns {*}
 */
var generateMessage = function generateMessage(data) {
  if (!data || (0, _isEmpty3.default)(data)) {
    throw new Error("Cannot send empty/null/undefined data!");
  }
  var message = data;
  if ((0, _isString3.default)(data)) {
    message = {
      message: data
    };
  }
  return message;
};

/**
 * Post a message to client
 * @param client
 * @param message
 * @returns {Promise.<*>}
 */
var postMessage = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(client && client.postMessage)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", client.postMessage(JSON.stringify(message)));

          case 2:
            return _context.abrupt("return", Promise.resolve());

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function postMessage(_x4) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Decode a message received to Service worker
 * via json parse
 * @param data
 * @returns {*}
 */
var decodeMessage = exports.decodeMessage = function decodeMessage(data) {
  var msg = data;
  if ((0, _isString3.default)(data)) {
    try {
      msg = JSON.parse(data);
    } catch (ex) {
      msg = data;
    }
  }
  return msg;
};

/**
 * Return Offline HTML required to run the application
 * @param url
 * @returns {*}
 */
var getOfflineHtml = exports.getOfflineHtml = function getOfflineHtml() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";


  var globals = serviceWorker._GLOBALS;
  var routes = (0, _assignIn3.default)({}, (0, _get3.default)(globals, "routes", []));
  var currentRoutes = (0, _bundler.getRouteFromPath)(url, routes);

  var allCss = (0, _get3.default)(globals, "allCss", []);
  var allJs = (0, _get3.default)(globals, "allJs", []);
  //
  var mod = (0, _bundler.getModuleByUrl)(url, routes);

  /**
   * Get css generated by current route and module
   */
  var currentRouteCss = (0, _filter3.default)(allCss, function (css) {
    var fileName = css.split("/").pop();
    return !((0, _startsWith3.default)(fileName, "mod-") && fileName.indexOf(mod) === -1);
  });

  /**
   * Get all javascript but the modules
   */
  var currentRouteJs = (0, _filter3.default)(allJs, function (js) {
    var fileName = js.split("/").pop();
    return !(0, _startsWith3.default)(fileName, "mod-") && !(0, _startsWith3.default)(fileName, "service-worker.js");
  });

  // Get seo details for the routes in an inherited manner
  // i.e. get seo details of parent when feasible
  var seoDetails = {};

  (0, _each3.default)(currentRoutes, function (r) {
    seoDetails = (0, _defaults3.default)({}, (0, _get3.default)(r, "seo", {}), seoDetails);
  });

  /**
   * Trying offline solution. Continue on that
   */
  return _server2.default.renderToStaticMarkup(_react2.default.createElement(_html2.default, {
    stylesheets: currentRouteCss,
    scripts: currentRouteJs,
    seo: seoDetails
  }));
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(serviceWorker, "serviceWorker", "lib/utils/sw.js");

  __REACT_HOT_LOADER__.register(log, "log", "lib/utils/sw.js");

  __REACT_HOT_LOADER__.register(deleteOldCache, "deleteOldCache", "lib/utils/sw.js");

  __REACT_HOT_LOADER__.register(messageAllClients, "messageAllClients", "lib/utils/sw.js");

  __REACT_HOT_LOADER__.register(generateMessage, "generateMessage", "lib/utils/sw.js");

  __REACT_HOT_LOADER__.register(postMessage, "postMessage", "lib/utils/sw.js");

  __REACT_HOT_LOADER__.register(decodeMessage, "decodeMessage", "lib/utils/sw.js");

  __REACT_HOT_LOADER__.register(getOfflineHtml, "getOfflineHtml", "lib/utils/sw.js");
}();

;