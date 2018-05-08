"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateLinks = undefined;

var _isEqual2 = require("lodash/isEqual");

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _uniqWith2 = require("lodash/uniqWith");

var _uniqWith3 = _interopRequireDefault(_uniqWith2);

var _set2 = require("lodash/set");

var _set3 = _interopRequireDefault(_set2);

var _find3 = require("lodash/find");

var _find4 = _interopRequireDefault(_find3);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _startsWith2 = require("lodash/startsWith");

var _startsWith3 = _interopRequireDefault(_startsWith2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _defaultsDeep2 = require("lodash/defaultsDeep");

var _defaultsDeep3 = _interopRequireDefault(_defaultsDeep2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var config = require(process.env.__p_root + "src/config").default;
// ** Icons for apple screens and
var pwaIcon72 = require(process.env.__p_root + "src/resources/images/pwa/icon-72x72.png");
var pwaIcon96 = require(process.env.__p_root + "src/resources/images/pwa/icon-96x96.png");
var pwaIcon128 = require(process.env.__p_root + "src/resources/images/pwa/icon-128x128.png");
var pwaIcon144 = require(process.env.__p_root + "src/resources/images/pwa/icon-144x144.png");
var pwaIcon152 = require(process.env.__p_root + "src/resources/images/pwa/icon-152x152.png");
var pwaIcon192 = require(process.env.__p_root + "src/resources/images/pwa/icon-192x192.png");
var pwaIcon384 = require(process.env.__p_root + "src/resources/images/pwa/icon-384x384.png");
var pwaIcon512 = require(process.env.__p_root + "src/resources/images/pwa/icon-512x512.png");

var seoSchema = (0, _defaultsDeep3.default)((0, _get3.default)(config, "seo", {}), {
  title: "",
  description: "",
  keywords: [],
  image: "",
  site_name: "",
  twitter: {
    site: "",
    creator: ""
  },
  facebook: {
    admins: []
  },
  type: "article", // article/product/music/video
  type_details: {
    section: "", // Lifestyle/sports/news
    published_time: "",
    modified_time: ""
  }
});

/**
 * Standard link keys to differentiate
 * @type {[*]}
 */
var linkKeys = ["href"];

/**
 * Get full url appended with base url if no protocol present in the provided link
 * @param url
 * @param baseUrl
 * @returns {*}
 */
var getFullUrl = function getFullUrl(url) {
  var baseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  var fullImageUrl = url;
  if (!(0, _startsWith3.default)(fullImageUrl, "http")) {
    fullImageUrl = "" + baseUrl + (!(0, _startsWith3.default)(fullImageUrl, "/") ? "/" : "") + fullImageUrl;
  }
  return fullImageUrl;
};

/**
 * Return the link key detected from the meta provided.
 * if no link key from our standard linkKeys is found then return false
 * @param meta
 * @returns {boolean|string}
 */
var getLinkKey = function getLinkKey(link) {
  var selectedLinkKey = false;
  (0, _each3.default)(linkKeys, function (key) {
    if (!selectedLinkKey && (0, _get3.default)(link, key, false)) {
      selectedLinkKey = key;
    }
  });
  return selectedLinkKey;
};

/**
 * Update the source directly,
 * thus pass as array
 * @param source {Array}
 * @param customLinks {Array}
 */
var addUpdateLinks = function addUpdateLinks() {
  var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var customLinks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


  (0, _each3.default)(customLinks, function (link) {
    var linkKey = getLinkKey(link);
    var linkUpdated = false;
    if (linkKey) {
      // Suppose we got a meta key in our generatedSchema
      // then we need to update the generated schema
      var generatedSchemaObj = (0, _find4.default)(source, _defineProperty({}, linkKey, link[linkKey]));

      if (generatedSchemaObj) {
        (0, _each3.default)(link, function (value, key) {
          (0, _set3.default)(generatedSchemaObj, key, value);
        });
        linkUpdated = true;
      }
    }
    // This means user is trying to add some meta that does
    // not match our standard criteria or is not present in our source, maybe for site verification
    // or google webmaster meta key etc
    if (!linkUpdated) {
      // Add data to source
      source.push(link);
    }
  });
};

/**
 * Return array of link tags required for the route
 * Pass seo data to the function and get array of links data
 * @param data
 * @param options
 * @returns {Array}
 */
var generateLinks = exports.generateLinks = function generateLinks() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { baseUrl: "" };

  // deep defaults the seoSchema we have in config file and the data provided to us.
  var seoData = (0, _defaultsDeep3.default)(data, seoSchema);

  var links = [];

  links.push({
    rel: "apple-touch-icon",
    href: getFullUrl(pwaIcon192, options.baseUrl)
  });
  links.push({
    rel: "apple-touch-icon",
    sizes: "72x72",
    href: getFullUrl(pwaIcon72, options.baseUrl)
  });
  links.push({
    rel: "apple-touch-icon",
    sizes: "96x96",
    href: getFullUrl(pwaIcon96, options.baseUrl)
  });
  links.push({
    rel: "apple-touch-icon",
    sizes: "128x128",
    href: getFullUrl(pwaIcon128, options.baseUrl)
  });
  links.push({
    rel: "apple-touch-icon",
    sizes: "144x144",
    href: getFullUrl(pwaIcon144, options.baseUrl)
  });
  links.push({
    rel: "apple-touch-icon",
    sizes: "152x152",
    href: getFullUrl(pwaIcon152, options.baseUrl)
  });
  links.push({
    rel: "apple-touch-icon",
    sizes: "192x192",
    href: getFullUrl(pwaIcon192, options.baseUrl)
  });
  links.push({
    rel: "apple-touch-icon",
    sizes: "384x384",
    href: getFullUrl(pwaIcon384, options.baseUrl)
  });
  links.push({
    rel: "apple-touch-icon",
    sizes: "512x512",
    href: getFullUrl(pwaIcon512, options.baseUrl)
  });
  links.push({
    rel: "apple-touch-startup-image",
    href: getFullUrl(pwaIcon512, options.baseUrl)
  });

  var configLinks = (0, _get3.default)(config, "seo.links", []);
  addUpdateLinks(links, configLinks);

  var userLinks = (0, _get3.default)(seoData, "links", []);
  addUpdateLinks(links, userLinks);

  links = (0, _uniqWith3.default)(links, _isEqual3.default);

  return links;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(config, "config", "lib/utils/links.js");

  __REACT_HOT_LOADER__.register(seoSchema, "seoSchema", "lib/utils/links.js");

  __REACT_HOT_LOADER__.register(linkKeys, "linkKeys", "lib/utils/links.js");

  __REACT_HOT_LOADER__.register(getFullUrl, "getFullUrl", "lib/utils/links.js");

  __REACT_HOT_LOADER__.register(getLinkKey, "getLinkKey", "lib/utils/links.js");

  __REACT_HOT_LOADER__.register(addUpdateLinks, "addUpdateLinks", "lib/utils/links.js");

  __REACT_HOT_LOADER__.register(generateLinks, "generateLinks", "lib/utils/links.js");
}();

;