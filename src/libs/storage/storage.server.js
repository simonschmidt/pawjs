"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys2 = require("lodash/keys");

var _keys3 = _interopRequireDefault(_keys2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
  function Storage(req, res) {
    _classCallCheck(this, Storage);

    this.request = null;
    this.response = null;

    this.request = req;
    this.response = res;
  }

  /**
   * Set request
   * @param req
   * @returns {Storage}
   */


  _createClass(Storage, [{
    key: "setRequest",
    value: function setRequest(req) {
      this.request = req;
      return this;
    }

    /**
     * Set response
     *
     * @param res
     * @returns {Storage}
     */

  }, {
    key: "setResponse",
    value: function setResponse(res) {
      this.response = res;
      return this;
    }

    /**
     * Clear all cookies
     */

  }, {
    key: "clear",
    value: function clear() {
      var _this = this;

      (0, _each3.default)((0, _get3.default)(this.request, "cookies", {}), function (value, key) {
        _this.removeItem(key);
      });
    }

    /**
     * Get item from cookie
     * @param key
     */

  }, {
    key: "getItem",
    value: function getItem(key) {
      return (0, _get3.default)(this.request, "cookies." + key, null);
    }
  }, {
    key: "key",
    value: function key(index) {
      var keys = this.keys();
      if (index <= keys) {
        return keys[index];
      }
      return null;
    }
  }, {
    key: "keys",
    value: function keys() {
      return (0, _keys3.default)((0, _get3.default)(this.request, "cookies", {}));
    }

    /**
     * Set a cookie
     * @param key
     * @param value
     * @returns {Storage}
     */

  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this.response.cookie(key, value);
      return this;
    }

    /**
     * Return total number of cookies
     */

  }, {
    key: "length",
    value: function length() {
      return this.keys().length;
    }

    /**
     * Remove a cookie
     * @param key
     * @returns {Storage}
     */

  }, {
    key: "removeItem",
    value: function removeItem(key) {
      this.response.cookie(key, "", { expires: new Date(0) });
      return this;
    }
  }]);

  return Storage;
}();

exports.default = Storage;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Storage, "Storage", "lib/libs/storage/storage.server.js");
}();

;