"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderRoutesWrapper = undefined;

var _assignIn2 = require("lodash/assignIn");

var _assignIn3 = _interopRequireDefault(_assignIn2);

var _isEmpty2 = require("lodash/isEmpty");

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Network actions for monitoring network changes (online/offline)
 */

/**
 * Client utilities
 */

/**
 * Get API instance
 */


var _createBrowserHistory = require("history/createBrowserHistory");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _action = require("../libs/network/action");

var _client = require("../utils/client");

var _api = require("../libs/api");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customClient = require(process.env.__p_root + "src/client");

// Polyfill for CustomEvent & window.location.origin
(function (w) {
  // Adding origin to non-supported browsers
  if (!w.location.origin) {
    w.location.origin = w.location.protocol + "//" + w.location.hostname + (w.location.port ? ":" + w.location.port : "");
  }

  // Adding custom event
  if (typeof w.CustomEvent === "function") return false; //If not IE
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = w.Event.prototype;
  w.CustomEvent = CustomEvent;
})(window);

var __development = process.env.NODE_ENV === "development";

var hot = !!module.hot && __development;

// Set a namespace-d global when in development mode
var global = {};
if (hot && typeof window !== "undefined") {
  global = window["__GLOBALS"] || global;
  window["__GLOBALS"] = global;
}

// Custom reducers
var reduxEnhancers = customClient.reduxEnhancers,
    reduxMiddlewares = customClient.reduxMiddlewares,
    reduxReducers = customClient.reduxReducers,
    reduxInitialState = customClient.reduxInitialState,
    onPageChange = customClient.onPageChange;

if (!reduxReducers) reduxReducers = null;
if (!reduxInitialState) reduxInitialState = {};

// Provide onPageChange to globals
global.onPageChange = onPageChange;

// Collect routes from all the routes
// loaded over time
global.collectedRoutes = global.collectedRoutes || (!(0, _isEmpty3.default)(customClient.routes) ? customClient.routes : []);

// Create enhanced history with
global.history = global.history || (0, _createBrowserHistory2.default)();

// Create redux store
global.store = global.store || (0, _store2.default)(_extends({
  history: global.history,

  initialState: (0, _assignIn3.default)({}, {
    network: {
      state: window.navigator.onLine ? _action.NETWORK_STATE_ONLINE : _action.NETWORK_STATE_OFFLINE
    }
  }, reduxInitialState)
}, reduxMiddlewares ? { middleware: reduxMiddlewares } : {}, reduxEnhancers ? { enhancers: reduxEnhancers } : {}, reduxReducers ? { reducers: reduxReducers } : {}));

// check if application is loaded initially or its just a hot update from HMR
global.isInitialLoad = _typeof(global.isInitialLoad) === Boolean ? global.isInitialLoad : true;

// Check if service worker already initialized
global.isSWInitialized = _typeof(global.isSWInitialized) === Boolean ? global.isSWInitialized : false;

// Set previous url
global.previousUrl = global.previousUrl || "";

// Monitor online and offline state of application
/**
 * Need to check for online/offline status
 */
var updateNetworkStatus = function updateNetworkStatus(status) {
  global.store.dispatch(status === _action.NETWORK_STATE_ONLINE ? (0, _action.networkOnline)() : (0, _action.networkOffline)());
};
var setNetworkOnline = function setNetworkOnline() {
  return updateNetworkStatus(_action.NETWORK_STATE_ONLINE);
};
var setNetworkOffline = function setNetworkOffline() {
  return updateNetworkStatus(_action.NETWORK_STATE_OFFLINE);
};

// Just in case OR with HMR if client.js is included twice lets remove the
// eventListener and then add it again
window.removeEventListener("online", setNetworkOnline);
window.addEventListener("online", setNetworkOnline);

window.removeEventListener("offline", setNetworkOffline);
window.addEventListener("offline", setNetworkOffline);

/** Api requires store to check the network status */
_api2.default.setStore(global.store);

// Get our dom app
global.renderRoot = global.renderRoot || document.getElementById("app");

var renderRoutesWrapper = exports.renderRoutesWrapper = function renderRoutesWrapper(_ref) {
  var _ref$url = _ref.url,
      url = _ref$url === undefined ? global.previousUrl : _ref$url;


  return (0, _client.renderRoutes)({
    url: url,
    store: global.store,
    history: global.history,
    renderRoot: global.renderRoot,
    collectedRoutes: global.collectedRoutes,
    options: {
      isInitialLoad: global.isInitialLoad
    }
  }).then(function () {
    global.isInitialLoad = false;
    (0, _client.animateFadeIn)(global);
  }).catch(function (ex) {
    // eslint-disable-next-line
    console.log(ex);
    global.isInitialLoad = false;
    (0, _client.animateFadeIn)(global);
  });
};

var _default = global;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(__development, "__development", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(hot, "hot", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(global, "global", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(reduxEnhancers, "reduxEnhancers", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(reduxMiddlewares, "reduxMiddlewares", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(reduxReducers, "reduxReducers", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(reduxInitialState, "reduxInitialState", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(onPageChange, "onPageChange", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(updateNetworkStatus, "updateNetworkStatus", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(setNetworkOnline, "setNetworkOnline", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(setNetworkOffline, "setNetworkOffline", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(renderRoutesWrapper, "renderRoutesWrapper", "lib/client/client.js");

  __REACT_HOT_LOADER__.register(_default, "default", "lib/client/client.js");
}();

;