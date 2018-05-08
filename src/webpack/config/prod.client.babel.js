"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _assetsWebpackPlugin = require("assets-webpack-plugin");

var _assetsWebpackPlugin2 = _interopRequireDefault(_assetsWebpackPlugin);

var _cleanWebpackPlugin = require("clean-webpack-plugin");

var _cleanWebpackPlugin2 = _interopRequireDefault(_cleanWebpackPlugin);

var _uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

var _copyWebpackPlugin = require("copy-webpack-plugin");

var _copyWebpackPlugin2 = _interopRequireDefault(_copyWebpackPlugin);

var _extractTextWebpackPlugin = require("extract-text-webpack-plugin");

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _autoprefixer = require("autoprefixer");

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _prod = require("./prod.rules");

var _prod2 = _interopRequireDefault(_prod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
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


var _require = require(process.env.__p_root + "/directories"),
    buildDir = _require.buildDir,
    buildPath = _require.buildPath,
    distDirName = _require.distDirName,
    distPublicDir = _require.distPublicDir,
    pagesDir = _require.pagesDir,
    rootDir = _require.rootDir,
    srcDir = _require.srcDir,
    srcPublicDir = _require.srcPublicDir;

var coreRootDir = process.env.__c_root;
var coreSrcDir = _path2.default.join(process.env.__c_root, "src");

var isolateVendorScripts = false;

var configDirName = "config";
// Config dir is the dir that contains all the configurations
var configDir = _path2.default.join(srcDir, configDirName);

// We would need the assets as different file as we
// would like it to include in the dev.server.js
var AssetsPluginInstance = new _assetsWebpackPlugin2.default({
  filename: "assets.js",
  path: configDir,
  update: true,
  prettyPrint: true,
  assetsRegex: /\.(jpe?g|png|gif|svg)\?./i,
  processOutput: function processOutput(assets) {
    return "export default " + JSON.stringify(assets) + ";";
  }
});

var pages = _fs2.default.readdirSync(pagesDir);
var entries = {};
pages.forEach(function (page) {
  var slugishName = page.replace(/\.jsx?$/, "");
  entries["mod-" + slugishName] = _path2.default.join(pagesDir, page);
});

var commonStylePath = _path2.default.join(srcDir, "resources", "css", "style.scss");
var hasCommonStyle = _fs2.default.existsSync(commonStylePath);

var _default = {

  // The base directory, an absolute path, for resolving entry points
  // and loaders from configuration. Lets keep it to /src
  context: srcDir,

  // The point or points to enter the application. At this point the
  // application starts executing. If an array is passed all items will
  // be executed.
  entry: Object.assign({}, {
    "client": ["babel-polyfill", _path2.default.resolve(_path2.default.join(coreSrcDir, "/client/prod.client.js")), hasCommonStyle ? _path2.default.join(srcDir, "resources", "css", "style.scss") : undefined]
  }, entries),

  //These options determine how the different types of modules within
  // a project will be treated.
  module: {
    rules: (0, _prod2.default)({})
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

  output: {

    // Output everything in dist folder
    path: buildDir,

    // The file name to output
    filename: "[name].[chunkhash].bundle.js",

    // public path is assets path
    publicPath: buildPath
  },

  devtool: false,

  // Stats from rules
  stats: _prod.stats,

  plugins: [
  // While building remove the dist dir
  new _cleanWebpackPlugin2.default([distDirName], {
    root: rootDir,
    verbose: true
  }),
  // Assets plugin to generate
  AssetsPluginInstance,

  // Uglify the output so that we have the most optimized code
  new _uglifyjsWebpackPlugin2.default({
    uglifyOptions: {
      compress: {
        warnings: false
      }
    },
    sourceMap: false,
    parallel: 6
  })].concat(_toConsumableArray(isolateVendorScripts ? [new _webpack2.default.optimize.CommonsChunkPlugin({
    name: "commons-vendor",
    filename: "common-vendor-[chunkhash].js",
    minChunks: function minChunks(module) {
      /** Ignore css files **/
      if (module.resource && /^.*\.(css|scss|sass)$/.test(module.resource)) {
        return false;
      }
      // this assumes your vendor imports exist in the node_modules directory
      return module.context && (module.context.indexOf("node_modules") !== -1 || module.resource && module.resource.indexOf("/src/client") !== -1);
    }
  })] : []), [new _copyWebpackPlugin2.default([{
    from: srcPublicDir,
    to: distPublicDir
  }]), new _webpack2.default.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
    "process.env.__p_root": JSON.stringify("")
  }),

  // Enable no errors plugin
  // new webpack.NoEmitOnErrorsPlugin(),

  // Extract the CSS so that it can be moved to CDN as desired
  // Also extracted CSS can be loaded parallel
  new _extractTextWebpackPlugin2.default("[name].[chunkhash].min.css"),

  // Sass loader options for autoprefix
  new _webpack2.default.LoaderOptionsPlugin({
    options: {
      context: "/",
      sassLoader: {
        includePaths: [srcDir]
      },
      postcss: function postcss() {
        return [_autoprefixer2.default];
      }
    }
  })])
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(coreRootDir, "coreRootDir", "lib/webpack/config/prod.client.babel.js");

  __REACT_HOT_LOADER__.register(coreSrcDir, "coreSrcDir", "lib/webpack/config/prod.client.babel.js");

  __REACT_HOT_LOADER__.register(isolateVendorScripts, "isolateVendorScripts", "lib/webpack/config/prod.client.babel.js");

  __REACT_HOT_LOADER__.register(configDirName, "configDirName", "lib/webpack/config/prod.client.babel.js");

  __REACT_HOT_LOADER__.register(configDir, "configDir", "lib/webpack/config/prod.client.babel.js");

  __REACT_HOT_LOADER__.register(AssetsPluginInstance, "AssetsPluginInstance", "lib/webpack/config/prod.client.babel.js");

  __REACT_HOT_LOADER__.register(pages, "pages", "lib/webpack/config/prod.client.babel.js");

  __REACT_HOT_LOADER__.register(entries, "entries", "lib/webpack/config/prod.client.babel.js");

  __REACT_HOT_LOADER__.register(commonStylePath, "commonStylePath", "lib/webpack/config/prod.client.babel.js");

  __REACT_HOT_LOADER__.register(hasCommonStyle, "hasCommonStyle", "lib/webpack/config/prod.client.babel.js");

  __REACT_HOT_LOADER__.register(_default, "default", "lib/webpack/config/prod.client.babel.js");
}();

;