"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @author: Atyantik Technologies Private Limited
                                                                                                                                                                                                                                                                   */

/**
 * @description It moves all the require("style.css")s in entry chunks into
 * a separate single CSS file. So your styles are no longer inlined
 * into the JS bundle, but separate in a CSS bundle file (styles.css).
 * If your total stylesheet volume is big, it will be faster because
 * the CSS bundle is loaded in parallel to the JS bundle.
 */

/**
 * @description PostCSS plugin to parse CSS and add vendor prefixes
 * to CSS rules using values from Can I Use. It is recommended by Google
 * and used in Twitter and Taobao.
 */

/**
 * Get path from nodejs
 */


var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require("extract-text-webpack-plugin");

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _autoprefixer = require("autoprefixer");

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require(process.env.__p_root + "/directories"),
    buildDir = _require.buildDir,
    buildPublicPath = _require.buildPublicPath,
    distDir = _require.distDir,
    rootDir = _require.rootDir,
    srcDir = _require.srcDir,
    srcPublicDir = _require.srcPublicDir;

var coreRootDir = process.env.__c_root;
var coreSrcDir = _path2.default.join(process.env.__c_root, "src");

var entries = {};

var isolateVendorScripts = false;

var rules = [{
  test: /pages(\/|\\).*\.jsx?$/,
  include: [process.env.__p_root, coreSrcDir],
  use: [{
    loader: "babel-loader"
  }, {
    loader: "route-loader"
  }]
},
// Rules for js or jsx files. Use the babel loader.
// Other babel configuration can be found in .babelrc
{
  test: /\.jsx?$/,
  include: [srcDir, coreSrcDir],
  use: [{
    loader: "babel-loader"
  }]
}].concat([(0, _utils.getStylesRule)({ isResource: false })], [(0, _utils.getStylesRule)({ isResource: true })], [

// Managing fonts
{
  test: /\.(eot|ttf|woff|woff2)$/,
  use: "file-loader?outputPath=fonts/&name=[hash].[ext]"
},

// Manage images
{
  test: /\.(jpe?g|png|svg|gif|webp)$/i,
  // match one of the loader's main parameters (sizes and placeholder)
  resourceQuery: /[?&](sizes|placeholder)(=|&|\[|$)/i,
  use: ["pwa-srcset-loader"]
}, {
  test: /\.(jpe?g|png|gif|svg|webp)$/i,
  // match one of the loader's main parameters (sizes and placeholder)
  use: ["file-loader?outputPath=images/&name=[path][hash].[ext]&context=" + srcDir]
}]);

var commonStylePath = _path2.default.join(srcDir, "resources", "css", "style.scss");
var hasCommonStyle = _fs2.default.existsSync(commonStylePath);

var commonClientConfig = {
  name: "common-client",
  // The base directory, an absolute path, for resolving entry points
  // and loaders from configuration. Lets keep it to /src
  context: srcDir,

  // The point or points to enter the application. At this point the
  // application starts executing. If an array is passed all items will
  // be executed.
  entry: Object.assign({}, _extends({
    "client": ["babel-polyfill", "react-hot-loader/patch", _path2.default.join(coreSrcDir, "client/dev.client.js"), "webpack-hot-middleware/client?name=common-client&path=/__hmr_update&timeout=2000&overlay=true"]
  }, hasCommonStyle ? {
    "common-style": commonStylePath
  } : {}), entries),

  //These options determine how the different types of modules within
  // a project will be treated.
  module: {
    rules: rules
  },
  output: {

    // Output everything in build folder (dist/public/build)
    path: buildDir,

    // The file name to output
    filename: "[name].[hash].bundle.js",

    // public path is assets path
    publicPath: buildPublicPath
  },

  resolve: {
    modules: [_path2.default.resolve(_path2.default.join(rootDir, "node_modules")), _path2.default.resolve(_path2.default.join(coreRootDir, "node_modules"))],
    alias: {
      "src": srcDir
    }
  },
  resolveLoader: {
    modules: [_path2.default.resolve(_path2.default.join(rootDir, "node_modules")), _path2.default.resolve(_path2.default.join(coreRootDir, "node_modules")), _path2.default.resolve(_path2.default.join(coreSrcDir, "webpack", "loaders"))]
  },

  devServer: {
    // Do not open browser when dev server is started
    open: false,

    // the base of content, in our case its the "src/public" folder
    contentBase: srcPublicDir,

    compress: false,

    // Show errors and warning on overlap
    overlay: {
      warnings: true,
      errors: true
    }
  },

  devtool: "eval-source-map",

  plugins: [new _webpack2.default.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    "process.env.__p_root": JSON.stringify("")
  }),

  // Hot module replacement for getting latest updates
  // thus no reload required
  new _webpack2.default.HotModuleReplacementPlugin()].concat(_toConsumableArray(isolateVendorScripts ? [new _webpack2.default.optimize.CommonsChunkPlugin({
    name: "commons-vendor",
    filename: "common-0-vendor-[hash].js",
    minChunks: function minChunks(module) {

      if (module.resource && /^.*\.(css|scss|sass)$/.test(module.resource)) {
        return false;
      }

      // this assumes your vendor imports exist in the node_modules directory
      return module.context && (module.context.indexOf("node_modules") !== -1 || module.resource && module.resource.indexOf("/src/client") !== -1);
    }
  })] : []), [

  // Enable no errors plugin
  new _webpack2.default.NoEmitOnErrorsPlugin(),

  // Sass loader options for autoprefix
  new _webpack2.default.LoaderOptionsPlugin({
    options: {
      context: "/",
      sassLoader: {
        includePaths: [srcDir, _path2.default.join(rootDir, "core", "src")]
      },
      postcss: function postcss() {
        return [_autoprefixer2.default];
      }
    }
  })])
};

/**
 * Service worker need to only worry about JavaScript, other thing should be
 * available via cache or install activity
 */
var serviceWorkerConfig = {
  name: "service-worker",
  // The base directory, an absolute path, for resolving entry points
  // and loaders from configuration. Lets keep it to /src
  context: srcDir,

  // The point or points to enter the application. At this point the
  // application starts executing. If an array is passed all items will
  // be executed.
  entry: Object.assign({}, {
    "service-worker": ["babel-polyfill", _path2.default.join(srcDir, "service-worker.js")]
  }),

  //These options determine how the different types of modules within
  // a project will be treated.
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [srcDir, coreSrcDir],
      use: [{
        loader: "babel-loader"
      }]
    }].concat([(0, _utils.getStylesRule)({ isResource: false, extract: true })], [(0, _utils.getStylesRule)({ isResource: true, extract: true })])
  },
  output: {

    // Output everything in build folder (dist)
    path: distDir,

    // The file name to output
    filename: "[name].js",

    // public path is assets path
    publicPath: "/"
  },

  resolve: {
    modules: [_path2.default.resolve(_path2.default.join(rootDir, "node_modules")), _path2.default.resolve(_path2.default.join(coreRootDir, "node_modules"))],
    alias: {
      "src": srcDir
    }
  },

  devtool: "eval-source-map",

  plugins: [new _webpack2.default.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
  }),

  // Enable no errors plugin
  new _webpack2.default.NoEmitOnErrorsPlugin(),

  // Extract the CSS so that it can be moved to CDN as desired
  // Also extracted CSS can be loaded parallel
  new _extractTextWebpackPlugin2.default({
    filename: "service-worker.min.css"
  })]
};

var _default = [commonClientConfig, serviceWorkerConfig];
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(coreRootDir, "coreRootDir", "lib/webpack/config/dev.babel.js");

  __REACT_HOT_LOADER__.register(coreSrcDir, "coreSrcDir", "lib/webpack/config/dev.babel.js");

  __REACT_HOT_LOADER__.register(entries, "entries", "lib/webpack/config/dev.babel.js");

  __REACT_HOT_LOADER__.register(isolateVendorScripts, "isolateVendorScripts", "lib/webpack/config/dev.babel.js");

  __REACT_HOT_LOADER__.register(rules, "rules", "lib/webpack/config/dev.babel.js");

  __REACT_HOT_LOADER__.register(commonStylePath, "commonStylePath", "lib/webpack/config/dev.babel.js");

  __REACT_HOT_LOADER__.register(hasCommonStyle, "hasCommonStyle", "lib/webpack/config/dev.babel.js");

  __REACT_HOT_LOADER__.register(commonClientConfig, "commonClientConfig", "lib/webpack/config/dev.babel.js");

  __REACT_HOT_LOADER__.register(serviceWorkerConfig, "serviceWorkerConfig", "lib/webpack/config/dev.babel.js");

  __REACT_HOT_LOADER__.register(_default, "default", "lib/webpack/config/dev.babel.js");
}();

;