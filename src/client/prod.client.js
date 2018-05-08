"use strict";

var _isString2 = require("lodash/isString");

var _isString3 = _interopRequireDefault(_isString2);

var _isFunction2 = require("lodash/isFunction");

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _client = require("./client");

var _client2 = _interopRequireDefault(_client);

var _client3 = require("../utils/client");

var _bundler = require("../utils/bundler");

var _renderer = require("../utils/renderer");

var _store = require("../store");

var _api = require("../libs/api");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Check if current browser/client supports service worker
var supportsServiceWorker = !!(0, _get3.default)(window, "navigator.serviceWorker", false);

// Add update routes globally
(function (w) {

  w.__updatePage = function (_ref) {
    var routes = _ref.routes,
        bundleKey = _ref.bundleKey,
        reducers = _ref.reducers;

    var routesloadEvent = new CustomEvent("routesload");
    (0, _store.injectAsyncReducers)(_client2.default.store, reducers);
    (0, _client3.updateRoutes)({
      routes: (0, _bundler.configureRoutes)([{ default: routes, bundleKey: bundleKey }]),
      collectedRoutes: _client2.default.collectedRoutes
    });

    w.dispatchEvent(routesloadEvent);
  };

  w.__renderRoutes = function () {
    (0, _client.renderRoutesWrapper)({ url: window.location.pathname });
  };
})(window);

var updateByUrl = function updateByUrl(url) {
  return new Promise(function (resolve) {
    (0, _client3.animateFadeOut)(_client2.default).then(function () {
      // Show screen loader asap
      !_client2.default.isInitialLoad && (0, _client3.showScreenLoader)(_client2.default.store);

      var module = (0, _bundler.getModuleByUrl)(url);

      if (!module) {
        // If no module found for the route simple ask to render it as it will display
        // 404 page
        (0, _renderer.renderNotFoundPage)({
          history: _client2.default.history,
          renderRoot: _client2.default.renderRoot,
          url: url,
          routes: [],
          store: _client2.default.store
        }, function () {
          !_client2.default.isInitialLoad && (0, _client3.hideScreenLoader)(_client2.default.store);
          !_client2.default.isInitialLoad && (0, _client3.scrollToTop)();
        });
        return resolve();
      }

      if ((0, _bundler.isModuleLoaded)(url, _client2.default.collectedRoutes)) {
        return (0, _client.renderRoutesWrapper)({ url: url }).then(function () {
          (0, _client3.animateFadeIn)(_client2.default);
          resolve();
        });
      }
      // Load module, as the module load automatically triggers __renderRoutes,
      // it should just work fine
      (0, _bundler.loadModuleByUrl)(url, resolve);
    });
  });
};

_client2.default.unlisten = _client2.default.history.listen(function (location) {

  // Set the record for last changed url
  _client2.default.previousUrl = location.pathname;

  if (window["ignoreHistoryChange"]) {
    window["ignoreHistoryChange"] = null;
    delete window["ignoreHistoryChange"];
    return false;
  }
  updateByUrl(location.pathname).then(function () {
    // Execute onPageChange Event
    _client2.default.onPageChange && (0, _isFunction3.default)(_client2.default.onPageChange) && _client2.default.onPageChange();
  });
});

_client2.default.previousUrl = window.location.pathname;

/**
 * Service worker configuration
 */
if (!_client2.default.isSWInitialized && supportsServiceWorker) {
  var serviceWorker = (0, _get3.default)(window, "navigator.serviceWorker", {
    register: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", Promise.reject("Browser does not support service workers!"));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function register() {
        return _ref2.apply(this, arguments);
      }

      return register;
    }()
  });

  // Register service worker
  serviceWorker.register("/sw.js", { scope: "/" }).then(function (reg) {

    // Inform API that it can now accept sw cache global
    _api2.default.setState("SW_ENABLED", true);
    reg.onupdatefound = function () {
      var installingWorker = reg.installing;
      installingWorker.onstatechange = function () {
        switch (installingWorker.state) {
          case "activated":
            // eslint-disable-next-line
            console.log("Updated service worker");
            break;
        }
      };
    };
  }).catch(function (err) {
    // eslint-disable-next-line
    console.log("Cannot register Service Worker: ", err);
  });

  // @todo handle messaging via service worker
  if (serviceWorker.addEventListener) {
    serviceWorker.addEventListener("message", function (event) {
      var message = event.data;
      try {
        message = JSON.parse(event.data);
      } catch (ex) {
        if ((0, _isString3.default)(event.data)) {
          message = {
            message: event.data
          };
        }
      }
      /**
       * @todo Enable messaging via Service worker
       */
      // do nothing with messages as of now
      // eslint-disable-next-line
      console.log(message);
    });
  }
  _client2.default.isSWInitialized = true;
}

(0, _bundler.loadModuleByUrl)(_client2.default.previousUrl, function () {
  // Start preloading data if service worker is not
  // supported. We can cache data with serviceWorker
  !supportsServiceWorker && (0, _bundler.idlePreload)(5000);
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(supportsServiceWorker, "supportsServiceWorker", "lib/client/prod.client.js");

  __REACT_HOT_LOADER__.register(updateByUrl, "updateByUrl", "lib/client/prod.client.js");
}();

;