"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.track = exports.trackPageView = undefined;

var _assignIn2 = require("lodash/assignIn");

var _assignIn3 = _interopRequireDefault(_assignIn2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Get GoogleTagManager
 * @returns {Array}
 */
var getGTM = function getGTM() {
  if (typeof window !== "undefined" && (0, _get3.default)(window, "dataLayer", false)) {
    return (0, _get3.default)(window, "dataLayer", []);
  }
  return [];
};

/**
 * Get instance of facebook api
 * @returns {function()}
 */
var getFB = function getFB() {
  if (typeof window !== "undefined" && (0, _get3.default)(window, "fbq", false)) {
    return (0, _get3.default)(window, "fbq", function () {});
  }
  return function () {};
};

/**
 * Get instance of google analytics
 * @returns {function()}
 */
var getGA = function getGA() {
  if (typeof window !== "undefined" && (0, _get3.default)(window, "ga", false)) {
    return (0, _get3.default)(window, "ga", function () {});
  }
  return function () {};
};
/**
 * Get instance of segment
 * @returns {{page: (function()), track: (function()), identify: (function())}}
 */
var getSegment = function getSegment() {
  var defaults = {
    page: function page() {},
    track: function track() {},
    identify: function identify() {}
  };
  if (typeof window !== "undefined" && (0, _get3.default)(window, "analytics", false)) {
    return (0, _get3.default)(window, "analytics", defaults);
  }
  return defaults;
};

/**
 * Track page view
 * @param location URL to be tracked
 * @param title Page title
 * @returns {Promise.<void>}
 */
var trackPageView = exports.trackPageView = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var loc, t, fbq, ga, dataLayer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 50);
            });

          case 2:
            loc = location;

            if (!loc) {
              loc = (0, _get3.default)(window, "location.pathname", "") + (0, _get3.default)(window, "location.search", "");
            }
            t = title;

            if (!t) {
              t = (0, _get3.default)(document, "title", "");
            }

            // Facebook track page view
            fbq = getFB();

            fbq("track", "PageView");

            // Track page view via google analytics
            ga = getGA();

            ga("send", "pageview", loc);

            // Track via google tag manager
            dataLayer = getGTM();

            dataLayer.push({
              "event": "VirtualPageview",
              "virtualPageUrl": loc,
              "virtualPageTitle": t
            });
            return _context.abrupt("return", Promise.resolve());

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function trackPageView() {
    return _ref.apply(this, arguments);
  };
}();

var track = exports.track = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(str) {
    var metaData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var segment, ga, fbq, dataLayer;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            metaData = (0, _assignIn3.default)({}, metaData);

            segment = getSegment();

            segment.track(str, metaData);

            ga = getGA();

            ga("send", "event", "Custom", str, str);

            // Track via Facebook Pixel
            fbq = getFB();

            fbq("trackCustom", str, (0, _assignIn3.default)({}, {
              content_name: str,
              content_category: "Custom"
            }, metaData));

            dataLayer = getGTM();

            dataLayer.push(_extends({
              event: "GAEvent"
            }, (0, _assignIn3.default)({
              eventCategory: (0, _get3.default)(metaData, "eventCategory", "Custom"),
              eventAction: (0, _get3.default)(metaData, "eventAction", str),
              eventLabel: (0, _get3.default)(metaData, "eventLabel", str),
              eventValue: (0, _get3.default)(metaData, "eventValue", str),
              userId: (0, _get3.default)(metaData, "userId", false)
            }, metaData)));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function track(_x4) {
    return _ref2.apply(this, arguments);
  };
}();
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getGTM, "getGTM", "lib/utils/analytics.js");

  __REACT_HOT_LOADER__.register(getFB, "getFB", "lib/utils/analytics.js");

  __REACT_HOT_LOADER__.register(getGA, "getGA", "lib/utils/analytics.js");

  __REACT_HOT_LOADER__.register(getSegment, "getSegment", "lib/utils/analytics.js");

  __REACT_HOT_LOADER__.register(trackPageView, "trackPageView", "lib/utils/analytics.js");

  __REACT_HOT_LOADER__.register(track, "track", "lib/utils/analytics.js");
}();

;