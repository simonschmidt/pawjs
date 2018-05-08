"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trimTillLastSentence = exports.getTextFromHtml = exports.generateMeta = undefined;

var _set2 = require("lodash/set");

var _set3 = _interopRequireDefault(_set2);

var _find3 = require("lodash/find");

var _find4 = _interopRequireDefault(_find3);

var _isEqual2 = require("lodash/isEqual");

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _uniqWith2 = require("lodash/uniqWith");

var _uniqWith3 = _interopRequireDefault(_uniqWith2);

var _isEmpty2 = require("lodash/isEmpty");

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isObject2 = require("lodash/isObject");

var _isObject3 = _interopRequireDefault(_isObject2);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _first2 = require("lodash/first");

var _first3 = _interopRequireDefault(_first2);

var _isArray2 = require("lodash/isArray");

var _isArray3 = _interopRequireDefault(_isArray2);

var _isString2 = require("lodash/isString");

var _isString3 = _interopRequireDefault(_isString2);

var _cloneDeep2 = require("lodash/cloneDeep");

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _startsWith2 = require("lodash/startsWith");

var _startsWith3 = _interopRequireDefault(_startsWith2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _defaultsDeep2 = require("lodash/defaultsDeep");

var _defaultsDeep3 = _interopRequireDefault(_defaultsDeep2);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var config = require(process.env.__p_root + "src/config").default;

/**
 * Seo Schema. This can be used while using it in routes
 */
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

var pwaSchema = (0, _defaultsDeep3.default)((0, _get3.default)(config, "pwa", {}), {
  "name": "",
  "short_name": "",

  // Possible values ltr(left to right)/rtl(right to left)
  "dir": "ltr",

  // language: Default en-US
  "lang": "en-US",

  // Orientation of web-app possible:
  // any, natural, landscape, landscape-primary, landscape-secondary, portrait, portrait-primary, portrait-secondary
  "orientation": "any",
  "start_url": "/",
  "background_color": "#fff",
  "theme_color": "#fff",
  "display": "standalone",
  "description": ""
});

var defaultMeta = [{
  charSet: "utf-8"
}, {
  httpEquiv: "x-ua-compatible",
  content: "ie=edge"
}, {
  name: "viewport",
  content: "width=device-width, initial-scale=1, shrink-to-fit=no"
}, {
  name: "application-name",
  content: (0, _get3.default)(pwaSchema, "name", "")
}, {
  name: "generator",
  content: "ReactPWA"
}, {
  name: "rating",
  content: "General"
}, {
  name: "mobile-web-app-capable",
  content: "yes"
}, {
  name: "apple-mobile-web-app-capable",
  content: "yes"
}, {
  name: "apple-mobile-web-app-status-bar-style",
  content: (0, _get3.default)(pwaSchema, "theme_color", "#fff")
}, {
  name: "apple-mobile-web-app-title",
  content: (0, _get3.default)(pwaSchema, "name", "")
}, {
  name: "msapplication-tooltip",
  content: (0, _get3.default)(pwaSchema, "description", "")
}, {
  name: "msapplication-starturl",
  content: (0, _get3.default)(pwaSchema, "start_url", "")
}, {
  name: "msapplication-TileColor",
  content: (0, _get3.default)(pwaSchema, "background_color", "#fff")
}, {
  name: "renderer",
  content: "webkit|ie-comp|ie-stand"
}, {
  name: "full-screen",
  content: "yes"
}];

/**
 * Standard meta keys to differentiate
 * @type {[*]}
 */
var metaKeys = ["name", "itemProp", "property", "charSet"];

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
 * Return array of meta tags required for the route
 * Pass seo data to the function and get array of meta data
 * @param data
 * @param options
 * @returns {Array}
 */
var generateMeta = exports.generateMeta = function generateMeta() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { baseUrl: "", url: "" };

  // deep defaults the seoSchema we have in config file and the data provided to us.
  var seoData = (0, _defaultsDeep3.default)(data, seoSchema);

  // Let store the generated Schema in following variable
  var generatedSchema = [];

  // Get 155 words out of description
  var desc155words = trimTillLastSentence(seoData.description, 155);

  // Get 200 words out of description
  var desc200words = trimTillLastSentence(seoData.description, 200);

  // Base url after removing the end slash
  var baseUrl = options.baseUrl.replace(/\/$/, "");

  // Add meta required for at top of head
  addUpdateMeta(generatedSchema, (0, _cloneDeep3.default)(defaultMeta));

  /**
   * Manage name/title
   */
  // Meta name
  generatedSchema.push({
    name: "title",
    content: seoData.title
  });
  // Twitter title
  generatedSchema.push({
    name: "twitter:title",
    content: seoData.title
  });
  generatedSchema.push({
    property: "og:title",
    content: seoData.title
  });

  /**
   * Manage keywords (allow string and array as well)
   */
  if ((0, _isString3.default)(seoData.keywords) && seoData.keywords.trim().length) {
    generatedSchema.push({
      name: "keywords",
      content: seoData.keywords
    });
  }
  if ((0, _isArray3.default)(seoData.keywords) && seoData.keywords.length) {
    generatedSchema.push({
      name: "keywords",
      content: seoData.keywords.join(",")
    });
  }

  /**
   * Manage twitter site & author
   */
  var twitterSite = (0, _get3.default)(seoData, "twitter.site", "");
  if (twitterSite.length) {
    generatedSchema.push({
      name: "twitter:site",
      content: twitterSite
    });
  }

  var twitterCreator = (0, _get3.default)(seoData, "twitter.creator", "");
  if (twitterCreator.length) {
    generatedSchema.push({
      name: "twitter:creator",
      content: twitterCreator
    });
  }

  /**
   * Manage facebook admins
   */
  var fbAdmins = (0, _get3.default)(seoData, "facebook.admins", []);
  if (fbAdmins && fbAdmins.length) {
    generatedSchema.push({
      property: "fb:admins",
      content: fbAdmins.join(",")
    });
  }

  /**
   * Manage description
   */
  // Meta description
  generatedSchema.push({
    name: "description",
    content: desc155words
  });
  generatedSchema.push({
    name: "twitter:description",
    content: desc200words
  });
  generatedSchema.push({
    property: "og:description",
    content: seoData.description
  });

  /**
   * Site name
   */
  if (seoData.site_name.length) {
    generatedSchema.push({
      property: "og:site_name",
      content: seoData.site_name
    });
  }

  /**
   * Manage Primary Image
   */
  var hasImage = !!seoData.image.length;

  if (hasImage) {
    var images = hasImage ? seoData.image : [];
    if (!(0, _isArray3.default)(images)) {
      images = [images];
    }

    var image = (0, _first3.default)(images);
    var fullImageUrl = getFullUrl(image, baseUrl);
    generatedSchema.push({
      itemProp: "image",
      content: fullImageUrl
    });
    generatedSchema.push({
      name: "twitter:image:src",
      content: fullImageUrl
    });
    if (image.length > 1) {
      (0, _each3.default)(images, function (img) {
        generatedSchema.push({
          property: "og:image",
          content: getFullUrl(img, baseUrl)
        });
      });
    } else {
      generatedSchema.push({
        property: "og:image",
        content: fullImageUrl
      });
    }

    // Add type of twitter card
    generatedSchema.push({
      name: "twitter:card",
      content: "summary_large_image"
    });
  } else {
    generatedSchema.push({
      name: "twitter:card",
      content: "summary"
    });
  }

  /**
   * Manage Type article/product/music/movie etc
   */
  generatedSchema.push({
    property: "og:type",
    content: seoData.type
  });

  var twitterDataCounter = 1;
  (0, _each3.default)(seoData.type_details, function (value, key) {
    if ((0, _isObject3.default)(value)) {
      (0, _each3.default)(value, function (subValue, subKey) {
        if (!(0, _isEmpty3.default)(subValue)) {
          generatedSchema.push({
            property: seoData.type + ":" + key + ":" + subKey,
            content: subValue
          });
          generatedSchema.push({
            name: "twitter:data" + twitterDataCounter,
            content: subValue
          });
          generatedSchema.push({
            name: "twitter:label" + twitterDataCounter,
            content: subKey
          });
          twitterDataCounter++;
        }
      });
    } else {
      if (!(0, _isEmpty3.default)(value)) {
        generatedSchema.push({
          property: seoData.type + ":" + key,
          content: value
        });
        generatedSchema.push({
          name: "twitter:data" + twitterDataCounter,
          content: value
        });
        generatedSchema.push({
          name: "twitter:label" + twitterDataCounter,
          content: key
        });
        twitterDataCounter++;
      }
    }
  });

  var url = (0, _get3.default)(seoData, "url", (0, _get3.default)(options, "url", ""));
  if (!url.length && (0, _utils.isBrowser)()) {
    url = (0, _get3.default)(window, "location.href", "");
  }
  if (url.trim().length) {
    generatedSchema.push({
      property: "og:url",
      content: url
    });
  }

  // Add config meta
  var configMeta = (0, _get3.default)(config, "seo.meta", []);
  addUpdateMeta(generatedSchema, configMeta);

  var userMeta = (0, _get3.default)(seoData, "meta", []);
  addUpdateMeta(generatedSchema, userMeta);

  generatedSchema = (0, _uniqWith3.default)(generatedSchema, _isEqual3.default);

  return generatedSchema;
};

/**
 * Return the meta key detected from the meta provided.
 * if no meta key from our standard metaKeys is found then return false
 * @param meta
 * @returns {boolean|string}
 */
var getMetaKey = function getMetaKey(meta) {
  var selectedMetaKey = false;
  (0, _each3.default)(metaKeys, function (key) {
    if (!selectedMetaKey && (0, _get3.default)(meta, key, false)) {
      selectedMetaKey = key;
    }
  });
  return selectedMetaKey;
};

/**
 * Update the source directly,
 * thus pass as array
 * @param source {Array}
 * @param customMetas {Array}
 */
var addUpdateMeta = function addUpdateMeta() {
  var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var customMetas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


  (0, _each3.default)(customMetas, function (meta) {
    var metaKey = getMetaKey(meta);
    var metaUpdated = false;
    if (metaKey) {
      // Suppose we got a meta key in our generatedSchema
      // then we need to update the generated schema
      var generatedSchemaObj = (0, _find4.default)(source, _defineProperty({}, metaKey, meta[metaKey]));

      if (generatedSchemaObj) {
        (0, _each3.default)(meta, function (value, key) {
          (0, _set3.default)(generatedSchemaObj, key, value);
        });
        metaUpdated = true;
      }
    }
    // This means user is trying to add some meta that does
    // not match our standard criteria or is not present in our source, maybe for site verification
    // or google webmaster meta key etc
    if (!metaUpdated) {
      // Add data to source
      source.push(meta);
    }
  });
};

/**
 * Get text from html string
 * @param str
 * @returns {string}
 */
var getTextFromHtml = exports.getTextFromHtml = function getTextFromHtml() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  return str.replace(/<(?:.|\n)*?>/gm, "").trim();
};

/**
 * Process string to get appropriate trimmed data
 * Thus string "Tirth Bodawala" should return "Tirth Bodawala" with length 14
 * & should return "Tirth" with length 13, first it tries to search for "." and then
 * for " "(space)
 * @param str
 * @param length
 * @returns String
 */
var trimTillLastSentence = exports.trimTillLastSentence = function trimTillLastSentence(str) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  // Get pure text from string provided, necessary
  // to remove html tags
  str = getTextFromHtml(str);

  // If no min length specified or no string
  // length then return string
  if (!length || !str.length) {
    return str;
  }

  // Add leading space to preserve string length
  str += " ";

  //trim the string to the maximum length
  var trimmedString = str.substr(0, length + 1);

  // Re-trim if we are in the middle of a word
  var separator = ".";

  // Check if there is a sentence and a "." exists
  if (trimmedString.lastIndexOf(separator) === -1) {
    separator = " ";
    if (trimmedString.lastIndexOf(separator) === -1) {
      // if no space exists at all then return the string
      // with max length value
      trimmedString = str.substr(0, length);
      return trimmedString;
    }
  }
  return trimmedString.substr(0, Math.min(trimmedString.length - 1, trimmedString.lastIndexOf(separator))).trim();
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(config, "config", "lib/utils/seo.js");

  __REACT_HOT_LOADER__.register(seoSchema, "seoSchema", "lib/utils/seo.js");

  __REACT_HOT_LOADER__.register(pwaSchema, "pwaSchema", "lib/utils/seo.js");

  __REACT_HOT_LOADER__.register(defaultMeta, "defaultMeta", "lib/utils/seo.js");

  __REACT_HOT_LOADER__.register(metaKeys, "metaKeys", "lib/utils/seo.js");

  __REACT_HOT_LOADER__.register(getFullUrl, "getFullUrl", "lib/utils/seo.js");

  __REACT_HOT_LOADER__.register(generateMeta, "generateMeta", "lib/utils/seo.js");

  __REACT_HOT_LOADER__.register(getMetaKey, "getMetaKey", "lib/utils/seo.js");

  __REACT_HOT_LOADER__.register(addUpdateMeta, "addUpdateMeta", "lib/utils/seo.js");

  __REACT_HOT_LOADER__.register(getTextFromHtml, "getTextFromHtml", "lib/utils/seo.js");

  __REACT_HOT_LOADER__.register(trimTillLastSentence, "trimTillLastSentence", "lib/utils/seo.js");
}();

;