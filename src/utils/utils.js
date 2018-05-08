"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractFilesFromAssets = exports.generateStringHash = exports.loadScript = exports.loadStyle = exports.isBrowser = undefined;

var _endsWith2 = require("lodash/endsWith");

var _endsWith3 = _interopRequireDefault(_endsWith2);

var _isObject2 = require("lodash/isObject");

var _isObject3 = _interopRequireDefault(_isObject2);

var _isArray2 = require("lodash/isArray");

var _isArray3 = _interopRequireDefault(_isArray2);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _startsWith2 = require("lodash/startsWith");

var _startsWith3 = _interopRequireDefault(_startsWith2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Check if current script is running in browser or not
 * @returns {boolean}
 */
var isBrowser = exports.isBrowser = function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

var loadPromises = {};

/**
 * Load stylesheet
 * @param path
 * @returns {Promise}
 */
var loadStyle = exports.loadStyle = function loadStyle(path) {
  var pathHash = generateStringHash(path, "CSS");

  if (loadPromises[pathHash]) return loadPromises[pathHash];

  loadPromises[pathHash] = new Promise(function (resolve, reject) {
    if (!isBrowser()) {
      reject("Cannot call from server. Function can be executed only from browser");
    }

    // Do not load css if already loaded
    var previousLink = document.getElementById(pathHash.toString());
    if (previousLink) {
      resolve();
      return previousLink;
    }

    var head = document.getElementsByTagName("head")[0],
        // reference to document.head for appending/ removing link nodes
    link = document.createElement("link"); // create the link node

    link.setAttribute("href", path);
    link.setAttribute("id", pathHash.toString());
    link.setAttribute("rel", "stylesheet");
    link.async = true;
    link.defer = true;
    link.setAttribute("type", "text/css");

    var sheet = void 0,
        cssRules = void 0;
    // get the correct properties to check for depending on the browser
    if ("sheet" in link) {
      sheet = "sheet";
      cssRules = "cssRules";
    } else {
      sheet = "styleSheet";
      cssRules = "rules";
    }

    // start checking whether the style sheet has successfully loaded
    var interval_id = setInterval(function () {
      try {
        // SUCCESS! our style sheet has loaded
        if (link[sheet] && link[sheet][cssRules].length) {

          // clear the counters
          clearInterval(interval_id);

          // Declared after "," so it will be available in Interval
          clearTimeout(timeout_id);
          resolve();
        }
      } catch (e) {
        // Do nothing, timeout will handle it for fail after 15 seconds
      }
    }, 10),

    // how often to check if the stylesheet is loaded

    // start counting down till fail
    timeout_id = setTimeout(function () {
      // clear the counters
      clearInterval(interval_id);
      clearTimeout(timeout_id);

      // since the style sheet didn't load, remove the link node from the DOM
      head.removeChild(link);
      reject("Timeout, unable to load css file");
      // how long to wait before failing
    }, 15000);

    // insert the link node into the DOM and start loading the style sheet

    head.appendChild(link);
    // return the link node;
    return link;
  });
  return loadPromises[pathHash];
};

/**
 * Load javascript file by path
 * @param path
 * @param attributes
 * @returns {Promise}
 */
var loadScript = exports.loadScript = function loadScript(path) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var pathHash = generateStringHash(path, "JS").toString();
  if (loadPromises[pathHash]) return loadPromises[pathHash];

  loadPromises[pathHash] = new Promise(function (resolve, reject) {
    if (!isBrowser()) {
      // If not a browser then do not allow loading of
      // css file, return with success->false
      reject("Cannot call from server. Function can be executed only from browser");
      return;
    }

    // Do not load script if already loaded
    var previousLink = document.getElementById(pathHash);
    if (previousLink) {
      resolve();
      return previousLink;
    }

    var s = void 0,
        r = void 0,
        t = void 0;
    r = false;
    s = document.createElement("script");
    s.type = "text/javascript";
    s.id = pathHash;
    s.src = path;
    s.defer = true;
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState === "complete")) {
        r = true;
        resolve();
      }
    };
    // Add custom attribute added by user
    for (var attr in attributes) {
      s[attr] = attributes[attr];
    }
    t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(s, t);
    return s;
  });
  return loadPromises[pathHash];
};

/**
 * Simple numeric hash of a string, used for non-secure usage only
 * @param str
 * @param namespace
 * @returns {string}
 */
var generateStringHash = exports.generateStringHash = function generateStringHash(str, namespace) {
  namespace = namespace || "";
  var hash = 0,
      i = void 0,
      chr = void 0;
  if (str.length === 0) return namespace + "__" + hash;
  str = namespace + "_" + str;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return namespace + "__" + hash;
};

/**
 * Extract files from given assets collection
 * @param assets
 * @param ext
 * @returns {[*,*,*]}
 */
var extractFilesFromAssets = exports.extractFilesFromAssets = function extractFilesFromAssets(assets) {
  var ext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".js";

  var common = [];
  var dev = [];
  var other = [];

  var addToList = function addToList(file) {

    var fileName = file.split("/").pop();

    if ((0, _startsWith3.default)(fileName, "common")) {
      common.push(file);
      return;
    }
    if ((0, _startsWith3.default)(fileName, "dev")) {
      dev.push(file);
      return;
    }
    other.push(file);
  };

  (0, _each3.default)(assets, function (asset) {
    if ((0, _isArray3.default)(asset) || (0, _isObject3.default)(asset)) {
      (0, _each3.default)(asset, function (file) {
        if ((0, _endsWith3.default)(file, ext)) {
          addToList(file);
        }
      });
    } else {
      if ((0, _endsWith3.default)(asset, ext)) {
        addToList(asset);
      }
    }
  });

  return [].concat(_toConsumableArray(common.sort()), _toConsumableArray(dev.sort()), _toConsumableArray(other.sort()));
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(isBrowser, "isBrowser", "lib/utils/utils.js");

  __REACT_HOT_LOADER__.register(loadPromises, "loadPromises", "lib/utils/utils.js");

  __REACT_HOT_LOADER__.register(loadStyle, "loadStyle", "lib/utils/utils.js");

  __REACT_HOT_LOADER__.register(loadScript, "loadScript", "lib/utils/utils.js");

  __REACT_HOT_LOADER__.register(generateStringHash, "generateStringHash", "lib/utils/utils.js");

  __REACT_HOT_LOADER__.register(extractFilesFromAssets, "extractFilesFromAssets", "lib/utils/utils.js");
}();

;