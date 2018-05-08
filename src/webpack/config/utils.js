"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStylesRule = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _extractTextWebpackPlugin = require("extract-text-webpack-plugin");

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require(process.env.__p_root + "/directories"),
    rootDir = _require.rootDir,
    srcDir = _require.srcDir;

var __development = process.env.NODE_ENV === "development";

/**
 * Get style rules based on environment
 * @param development
 * @param isResource
 * @param extract
 */
var getStylesRule = exports.getStylesRule = function getStylesRule(_ref) {
  var _ref$development = _ref.development,
      development = _ref$development === undefined ? __development : _ref$development,
      _ref$isResource = _ref.isResource,
      isResource = _ref$isResource === undefined ? false : _ref$isResource,
      _ref$extract = _ref.extract,
      extract = _ref$extract === undefined ? false : _ref$extract;


  var localIdentName = isResource ? "[local]" : development ? "[path][name]__[local]" : "[name]_[local]_[hash:base64:5]";

  var loaderUse = [].concat(_toConsumableArray(!extract ? [{
    loader: "style-loader",
    options: { sourceMap: development }
  }] : {}), [{
    loader: "css-loader",
    options: {
      modules: true,
      localIdentName: localIdentName,
      sourceMap: development,
      minimize: !development,
      importLoaders: 2
    }
  }, {
    loader: "postcss-loader",
    options: {
      sourceMap: development,
      path: _path2.default.join(rootDir, "core", "node_modules")
    }
  }, {
    loader: "sass-loader",
    options: {
      outputStyle: development ? "expanded" : "compressed",
      sourceMap: development,
      sourceMapContents: development
    }
  }]);

  return _extends({
    test: /\.(sass|scss|css)$/ }, isResource ? {
    include: [_path2.default.join(srcDir, "resources"), _path2.default.join(rootDir, "node_modules")]
  } : {}, !isResource ? {
    exclude: [_path2.default.join(srcDir, "resources"), _path2.default.join(rootDir, "node_modules")]
  } : {}, !extract ? { use: loaderUse } : {}, extract ? {
    loader: _extractTextWebpackPlugin2.default.extract({
      fallback: "style-loader",
      use: loaderUse
    })
  } : {});
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(__development, "__development", "lib/webpack/config/utils.js");

  __REACT_HOT_LOADER__.register(getStylesRule, "getStylesRule", "lib/webpack/config/utils.js");
}();

;