"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stats = undefined;

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description It moves all the require("style.css")s in entry chunks into
 * a separate single CSS file. So your styles are no longer inlined
 * into the JS bundle, but separate in a CSS bundle file (styles.css).
 * If your total stylesheet volume is big, it will be faster because
 * the CSS bundle is loaded in parallel to the JS bundle.
 */
var _require = require(process.env.__p_root + "/directories"),
    srcDir = _require.srcDir;

var coreRootDir = process.env.__c_root;
var coreSrcDir = _path2.default.join(coreRootDir, "src");
// minimal logging
var stats = exports.stats = {
  assets: false,
  colors: true,
  version: false,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  children: false
};

var _default = function _default(_ref) {
  var _ref$imageOutputPath = _ref.imageOutputPath,
      imageOutputPath = _ref$imageOutputPath === undefined ? "images/" : _ref$imageOutputPath;

  return [
  // Rules for js or jsx files. Use the babel loader.
  // Other babel configuration can be found in .babelrc
  {
    test: /pages(\/|\\).*\.jsx?$/,
    include: [srcDir, coreSrcDir],
    use: [{
      loader: "babel-loader"
    }, {
      loader: "route-loader"
    }]
  }, {
    test: /\.jsx?$/,
    include: [srcDir, coreSrcDir],
    use: [{
      loader: "babel-loader"
    }]
  }].concat([(0, _utils.getStylesRule)({ development: false, extract: true, isResource: false })], [(0, _utils.getStylesRule)({ development: false, extract: true, isResource: true })], [{
    test: /\.(eot|ttf|woff|woff2)$/,
    loader: "file-loader?outputPath=fonts/&name=[path][hash].[ext]&context=" + srcDir
  }, {
    test: /\.(jpe?g|png|svg|gif|webp)$/i,
    // match one of the loader's main parameters (sizes and placeholder)
    resourceQuery: /[?&](sizes|placeholder)(=|&|\[|$)/i,
    use: ["pwa-srcset-loader"]
  }, {
    test: /\.(jpe?g|png|gif|svg|webp)$/i,
    // match one of the loader's main parameters (sizes and placeholder)
    use: ["file-loader?outputPath=" + imageOutputPath + "&name=[path][hash].[ext]&context=" + srcDir, {
      loader: "imagemin-loader",
      options: {
        plugins: [{
          use: "imagemin-pngquant",
          options: {
            quality: 80
          }
        }, {
          use: "imagemin-mozjpeg",
          options: {
            quality: 80
          }
        }, {
          use: "imagemin-gifsicle",
          options: {
            optimizationLevel: 3
          }
        }, {
          use: "imagemin-optipng",
          options: {
            optimizationLevel: 7
          }
        }]
      }
    }]
  }]);
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(coreRootDir, "coreRootDir", "lib/webpack/config/prod.rules.js");

  __REACT_HOT_LOADER__.register(coreSrcDir, "coreSrcDir", "lib/webpack/config/prod.rules.js");

  __REACT_HOT_LOADER__.register(stats, "stats", "lib/webpack/config/prod.rules.js");

  __REACT_HOT_LOADER__.register(_default, "default", "lib/webpack/config/prod.rules.js");
}();

;