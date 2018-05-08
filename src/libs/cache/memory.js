"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infiniteCache = exports.pageCache = undefined;

var _assignIn2 = require("lodash/assignIn");

var _assignIn3 = _interopRequireDefault(_assignIn2);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _memoryCache = require("memory-cache");

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var _isbot = require("isbot");

var _isbot2 = _interopRequireDefault(_isbot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __development = process.env.NODE_ENV === "development";
/**
 *
 * @param routes
 * @returns {function(*, *, *)}
 */
var pageCache = exports.pageCache = function pageCache() {
  var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { hook: "" };


  return function (req, res, next) {

    // Disable cache when env development
    if (__development) return next();

    var fullUrl = (req.headers["x-forwarded-protocol"] || req.headers["protocol"] || req.protocol) + "://" + (req.headers["x-host"] || req.headers["host"] || "") + (req.originalUrl || req.url);

    var getExactRouteFromPath = require("../../utils/bundler").getExactRouteFromPath;

    var bot = (0, _isbot2.default)((0, _get3.default)(req, "headers.user-agent", ""));
    var key = "__express__" + fullUrl;
    var headerKey = "__express__headers__" + fullUrl;

    if (bot) {
      key = "BOT_" + key;
      headerKey = "BOT_" + headerKey;
    }
    var cachedBody = _memoryCache2.default.get(key);
    var cachedHeaders = _memoryCache2.default.get(headerKey) || {};

    if (cachedBody) {
      // eslint-disable-next-line
      console.log("Using cache to send " + (bot ? "(BOT)" : "") + ": " + req.url);

      (0, _each3.default)(cachedHeaders, function (value, key) {
        res.setHeader(key, value);
      });
      if (options.hook && res.locals.wook) {
        cachedBody = res.locals.wook.apply_filters(options.hook, cachedBody);
      }
      return res.send(cachedBody);
    }

    var exactRoute = getExactRouteFromPath(req.path, routes);

    // If no route is found then just let it go with flow
    // i.e. do not cache 404 output
    if (!exactRoute) {
      return next();
    }

    var routeCacheSettings = (0, _assignIn3.default)({}, {
      enable: true,
      duration: 0
    }, (0, _get3.default)(exactRoute, "cache", {}));

    if (!routeCacheSettings.enable) {
      return next();
    }
    // If cache is enabled and duration is not set then set it
    // 1 year (unlimited time I guess)
    var duration = !routeCacheSettings.duration ? 31556926 : routeCacheSettings.duration * 1000;

    res.sendResponse = res.send;
    res.send = function (body) {
      for (var _len = arguments.length, other = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        other[_key - 1] = arguments[_key];
      }

      _memoryCache2.default.put(key, body, duration);
      _memoryCache2.default.put(headerKey, res.getHeaders(), duration);
      if (options.hook && res.locals.wook) {
        body = res.locals.wook.apply_filters(options.hook, cachedBody);
      }
      res.sendResponse.apply(res, [body].concat(other));
    };
    return next();
  };
};

var infiniteCache = exports.infiniteCache = function infiniteCache() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { hook: "" };


  return function (req, res, next) {

    // Disable cache while development
    if (__development) return next();

    var fullUrl = (req.headers["x-forwarded-protocol"] || req.headers["protocol"] || req.protocol) + "://" + (req.headers["x-host"] || req.headers["host"] || "") + (req.originalUrl || req.url);

    var bot = (0, _isbot2.default)((0, _get3.default)(req, "headers.user-agent", ""));

    var key = "__express__infinite__" + fullUrl;
    var headerKey = "__express__infinite__headers__" + fullUrl;

    if (bot) {
      key = "BOT_" + key;
      headerKey = "BOT_" + headerKey;
    }

    var cachedBody = _memoryCache2.default.get(key);
    var cachedHeaders = _memoryCache2.default.get(headerKey);

    if (cachedBody) {
      // eslint-disable-next-line
      console.log("Using cache to send " + (bot ? "(BOT)" : "") + ": " + req.url);

      (0, _each3.default)(cachedHeaders, function (value, key) {
        res.setHeader(key, value);
      });
      if (options.hook) {
        cachedBody = res.locals.wook.apply_filters(options.hook, cachedBody);
      }
      return res.send(cachedBody);
    }

    // If cache is enabled and duration is not set then set it
    // 1 year (unlimited time I guess)
    var duration = 31556926;

    res.sendResponse = res.send;
    res.send = function (body) {
      for (var _len2 = arguments.length, other = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        other[_key2 - 1] = arguments[_key2];
      }

      _memoryCache2.default.put(key, body, duration);

      _memoryCache2.default.put(headerKey, res.getHeaders(), duration);
      if (options.hook) {
        cachedBody = res.locals.wook.apply_filters(options.hook, body);
      }
      res.sendResponse.apply(res, [body].concat(other));
    };
    return next();
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(__development, "__development", "lib/libs/cache/memory.js");

  __REACT_HOT_LOADER__.register(pageCache, "pageCache", "lib/libs/cache/memory.js");

  __REACT_HOT_LOADER__.register(infiniteCache, "infiniteCache", "lib/libs/cache/memory.js");
}();

;