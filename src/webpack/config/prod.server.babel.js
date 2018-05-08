"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

var _webpackDeleteAfterEmit = require("webpack-delete-after-emit");

var _webpackDeleteAfterEmit2 = _interopRequireDefault(_webpackDeleteAfterEmit);

var _moveAfterEmit = require("./move-after-emit");

var _moveAfterEmit2 = _interopRequireDefault(_moveAfterEmit);

var _extractTextWebpackPlugin = require("extract-text-webpack-plugin");

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _autoprefixer = require("autoprefixer");

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _prod = require("./prod.rules");

var _prod2 = _interopRequireDefault(_prod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description PostCSS plugin to parse CSS and add vendor prefixes
 * to CSS rules using values from Can I Use. It is recommended by Google
 * and used in Twitter and Taobao.
 */
var _require = require(process.env.__p_root + "/directories"),
    buildDirName = _require.buildDirName,
    distDir = _require.distDir,
    publicDirName = _require.publicDirName,
    rootDir = _require.rootDir,
    srcDir = _require.srcDir;
/**
 * @description It moves all the require("style.css")s in entry chunks into
 * a separate single CSS file. So your styles are no longer inlined
 * into the JS bundle, but separate in a CSS bundle file (styles.css).
 * If your total stylesheet volume is big, it will be faster because
 * the CSS bundle is loaded in parallel to the JS bundle.
 */


var coreRootDir = process.env.__c_root;
var coreSrcDir = _path2.default.join(process.env.__c_root, "src");

var _default = [{

  name: "server",
  // The base directory, an absolute path, for resolving entry points
  // and loaders from configuration. Lets keep it to /src
  context: srcDir,

  // The point or points to enter the application. At this point the
  // application starts executing. If an array is passed all items will
  // be executed.
  entry: ["babel-polyfill", _path2.default.join(coreSrcDir, "server", "dom-polyfill.js"),
  // Initial entry point
  _path2.default.join(srcDir, "server.js")],

  //These options determine how the different types of modules within
  // a project will be treated.
  module: {
    rules: (0, _prod2.default)({
      "imageOutputPath": "build/images/"
    })
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
    path: distDir,

    // The file name to output
    filename: "server.js",

    // public path is assets path
    publicPath: "/"
  },

  node: {
    __filename: false,
    __dirname: false
  },
  target: "node",
  devtool: false,
  stats: _prod.stats,

  plugins: [new _uglifyjsWebpackPlugin2.default({
    uglifyOptions: {
      compress: {
        warnings: false
      }
    },
    sourceMap: false,
    parallel: 6
  }), new _webpack2.default.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
    "process.env.__p_root": JSON.stringify(process.env.__p_root || "")
  }),
  // Enable no errors plugin
  // new webpack.NoEmitOnErrorsPlugin(),

  // Extract the CSS so that it can be moved to CDN as desired
  // Also extracted CSS can be loaded parallel
  new _extractTextWebpackPlugin2.default("server.min.css"),
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
  }),
  // We are extracting server.min.css so that we do not have any window code in server.js
  // but we still need the css class names that are generated. Thus we remove the server.min.css
  // after the build process
  new _webpackDeleteAfterEmit2.default({
    globs: ["server.min.css", "service-worker.min.css"]
  }),
  // Remove build directory generated extra while compiling server
  // Remove build directory generated extra while compiling service-worker.js
  new _moveAfterEmit2.default([{
    from: buildDirName,
    to: publicDirName
  }])]
}, {
  name: "service-worker",

  // The base directory, an absolute path, for resolving entry points
  // and loaders from configuration. Lets keep it to /src
  context: srcDir,

  // The point or points to enter the application. At this point the
  // application starts executing. If an array is passed all items will
  // be executed.
  entry: {
    "service-worker": ["babel-polyfill",
    // Initial entry point
    _path2.default.join(srcDir, "service-worker.js")]
  },

  // These options determine how the different types of modules within
  // a project will be treated.
  module: {
    rules: (0, _prod2.default)({
      imageOutputPath: "build/images/"
    })
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
    path: distDir,

    // The file name to output
    filename: "[name].js",

    // public path is assets path
    publicPath: "/"
  },
  target: "web",
  devtool: false,
  stats: _prod.stats,

  plugins: [

  // Uglify the output so that we have the most optimized code
  new _uglifyjsWebpackPlugin2.default({
    uglifyOptions: {
      compress: {
        warnings: false
      }
    },
    sourceMap: false,
    parallel: 6
  }), new _webpack2.default.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
    "process.env.__p_root": JSON.stringify("")
  }),
  // Enable no errors plugin
  new _webpack2.default.NoEmitOnErrorsPlugin(),

  // Extract the CSS so that it can be moved to CDN as desired
  // Also extracted CSS can be loaded parallel
  new _extractTextWebpackPlugin2.default("service-worker.min.css"),

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
  }),

  // We are extracting server.min.css so that we do not have any window code in service-worker.js
  // but we still need the css class names that are generated. Thus we remove the server.min.css
  // after the build process
  new _webpackDeleteAfterEmit2.default({
    globs: ["server.min.css", "service-worker.min.css"]
  }),

  // Remove build directory generated extra while compiling service-worker.js
  new _moveAfterEmit2.default([{
    from: buildDirName,
    to: publicDirName
  }])]
}];
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(coreRootDir, "coreRootDir", "lib/webpack/config/prod.server.babel.js");

  __REACT_HOT_LOADER__.register(coreSrcDir, "coreSrcDir", "lib/webpack/config/prod.server.babel.js");

  __REACT_HOT_LOADER__.register(_default, "default", "lib/webpack/config/prod.server.babel.js");
}();

;