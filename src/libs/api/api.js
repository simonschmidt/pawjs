"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assignIn2 = require("lodash/assignIn");

var _assignIn3 = _interopRequireDefault(_assignIn2);

var _trimStart2 = require("lodash/trimStart");

var _trimStart3 = _interopRequireDefault(_trimStart2);

var _startsWith2 = require("lodash/startsWith");

var _startsWith3 = _interopRequireDefault(_startsWith2);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _sortBy2 = require("lodash/sortBy");

var _sortBy3 = _interopRequireDefault(_sortBy2);

var _maxBy2 = require("lodash/maxBy");

var _maxBy3 = _interopRequireDefault(_maxBy2);

var _remove2 = require("lodash/remove");

var _remove3 = _interopRequireDefault(_remove2);

var _set2 = require("lodash/set");

var _set3 = _interopRequireDefault(_set2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _universalFetch = require("universal-fetch");

var _universalFetch2 = _interopRequireDefault(_universalFetch);

var _action = require("../network/action");

var _config = require("src/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var api = function () {
  function api(_ref) {
    var storage = _ref.storage,
        _ref$store = _ref.store,
        store = _ref$store === undefined ? null : _ref$store;

    _classCallCheck(this, api);

    this.baseUrl = (0, _get3.default)(_config2.default, "api.baseUrl", "");
    this.appState = {};
    this.storage = null;
    this.filters = {};
    this.store = null;

    this.storage = storage;
    this.store = store;
  }
  /**
   * Store is required for API to get network status
   * @type {store} Redux Store
   */


  _createClass(api, [{
    key: "setStore",
    value: function setStore(store) {
      this.store = store;
    }
  }, {
    key: "setState",
    value: function setState(variable, value) {
      (0, _set3.default)(this.appState, variable, value);
      return this;
    }
  }, {
    key: "getState",
    value: function getState(variable, defaultValue) {
      if (!variable) {
        return this.appState;
      }
      return (0, _get3.default)(this.appState, variable, defaultValue);
    }
  }, {
    key: "processSWCache",
    value: function processSWCache(url, options) {
      if (typeof window === "undefined" || !("serviceWorker" in window.navigator)) {
        return false;
      }

      // Add extra headers if we need custom cache
      // these headers are only when serviceWorker is active & listening
      var swEnabled = this.getState("SW_ENABLED", false);
      if (swEnabled) {
        var swcache = (0, _get3.default)(options, "swcache", 0);
        if (swcache) {

          var currentServiceWorker = window.navigator.serviceWorker.controller;
          if (!currentServiceWorker || currentServiceWorker.state !== "activated") {
            return null;
          }
          currentServiceWorker.postMessage(JSON.stringify({
            action: "SWCACHE_TTL_STORE",
            ttl: swcache,
            url: url,
            options: options
          }));
        }
      }
      return false;
    }
  }, {
    key: "removeFilter",
    value: function removeFilter(filterName, callback) {
      if (!this.filters[filterName]) {
        return;
      }
      (0, _remove3.default)(this.filters[filterName], function (f) {
        return f.callback.toString() === callback.toString();
      });
    }
  }, {
    key: "addFilter",
    value: function addFilter(filterName, callback) {
      var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

      if (!this.filters[filterName]) {
        this.filters[filterName] = [];
      }
      this.filters[filterName].push({
        callback: callback,
        priority: priority,
        index: (0, _get3.default)((0, _maxBy3.default)(this.filters[filterName], "index"), "index", 0) + 1
      });
      (0, _sortBy3.default)(this.filters[filterName], ["priority", "index"], ["asc", "asc"]);
      return this;
    }
  }, {
    key: "applyFilter",
    value: function applyFilter(filterName, data, staticParams) {
      if (!this.filters[filterName] || !this.filters[filterName].length) return data;
      var filteredData = data;
      (0, _each3.default)(this.filters[filterName], function (filter) {
        filteredData = filter.callback(filteredData, staticParams);
      });
      return filteredData;
    }
  }, {
    key: "fetch",
    value: function fetch(url) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ignoreHeaders: false };

      if (typeof options === "undefined") {
        options = {};
      }
      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };

      // Remove our custom headers
      if (options.ignoreHeaders) {
        headers = {};
      }

      var apiUrl = url;
      var externalRequest = true;

      if (!(0, _startsWith3.default)(url, "//") && !(0, _startsWith3.default)(url, "http")) {
        // this means that its a pure API call. We can add the authorization headers here
        apiUrl = (0, _trimStart3.default)(apiUrl, "/");
        apiUrl = this.baseUrl + apiUrl;
        externalRequest = false;
      }
      if ((0, _startsWith3.default)(url, "http") && url.indexOf(this.baseUrl) !== -1) {
        externalRequest = false;
      }

      var requestOptions = Object.assign({}, {
        method: "GET",
        mode: "cors",
        headers: (0, _assignIn3.default)(headers, options.headers)
      }, options);

      requestOptions = this.applyFilter("beforeFetch", requestOptions, {
        url: apiUrl,
        external: externalRequest
      });

      return new Promise(function (resolve, reject) {

        // Inform service worker if sw-cache is present
        _this.processSWCache(apiUrl, requestOptions);

        (0, _universalFetch2.default)(apiUrl, requestOptions).then(api.checkStatus).then(api.parseJSON).then(function (data) {
          resolve(data);
        }).catch(function (error) {

          if (!_this.store) {
            error.networkState = _action.NETWORK_STATE_ONLINE;
          } else {
            error.networkState = (0, _get3.default)(_this.store.getState(), "network.state", _action.NETWORK_STATE_ONLINE);
          }

          if (error && error.response && typeof error.response.text === "function") {
            error.response.text().then(function (text) {
              var errorData = text;
              try {
                errorData = JSON.parse(text);
                reject({ response: errorData, error: error });
              } catch (err) {
                reject({ response: text, error: error });
              }
            });
          } else {
            reject({ response: {}, error: error });
          }
        });
      });
    }
  }], [{
    key: "checkStatus",
    value: function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }

      var error = new Error(response.statusText);
      error.response = response;
      error.statusCode = 500;
      throw error;
    }
  }, {
    key: "parseJSON",
    value: function parseJSON(response) {
      return response.json();
    }
  }]);

  return api;
}();

var _default = api;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(api, "api", "lib/libs/api/api.js");

  __REACT_HOT_LOADER__.register(_default, "default", "lib/libs/api/api.js");
}();

;