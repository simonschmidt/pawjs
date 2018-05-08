"use strict";

var _isFunction2 = require("lodash/isFunction");

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isEmpty2 = require("lodash/isEmpty");

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _cloneDeep2 = require("lodash/cloneDeep");

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _client = require("./client");

var _client2 = _interopRequireDefault(_client);

var _client3 = require("../utils/client");

var _bundler = require("../utils/bundler");

var _renderer = require("../utils/renderer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = require(process.env.__p_root + "src/routes").default;

_client2.default.collectedRoutes = (0, _cloneDeep3.default)(!(0, _isEmpty3.default)(_client2.default.collectedRoutes) ? _client2.default.collectedRoutes : Routes);
(0, _bundler.setGlobalRoutes)(_client2.default.collectedRoutes);

var updateByUrl = function updateByUrl(url) {
  return new Promise(function (resolve) {
    (0, _client3.animateFadeOut)(_client2.default).then(function () {
      // Show screen loader asap
      !_client2.default.isInitialLoad && (0, _client3.showScreenLoader)(_client2.default.store);

      var module = (0, _bundler.getModuleByUrl)(url, _client2.default.collectedRoutes);

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
          (0, _client3.animateFadeIn)(_client2.default);
        });
        return resolve();
      }
      return (0, _client.renderRoutesWrapper)({ url: url }).then(function () {
        (0, _client3.animateFadeIn)(_client2.default);
        resolve();
      });
    });
  });
};

if (_client2.default.unlisten) _client2.default.unlisten();
_client2.default.unlisten = _client2.default.history.listen(function (location) {
  // Set the record for last changed url
  _client2.default.previousUrl = location.pathname;

  if (window["ignoreHistoryChange"]) {
    window["ignoreHistoryChange"] = null;
    delete window["ignoreHistoryChange"];
    return false;
  }
  updateByUrl(location.pathname).then(function () {
    _client2.default.onPageChange && (0, _isFunction3.default)(_client2.default.onPageChange) && _client2.default.onPageChange();
  });
});

updateByUrl(window.location.pathname);

if (module.hot) {
  module.hot.accept();
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Routes, "Routes", "lib/client/dev.client.js");

  __REACT_HOT_LOADER__.register(updateByUrl, "updateByUrl", "lib/client/dev.client.js");
}();

;