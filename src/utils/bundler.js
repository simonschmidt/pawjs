"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureRoutes = exports.getExactRouteFromPath = exports.getRouteFromPath = exports.idlePreload = exports.preLoadFile = exports.isModuleLoaded = exports.loadModuleByUrl = exports.scriptBelongToMod = exports.getModuleByUrl = exports.loadGlobals = exports.setGlobalRoutes = undefined;

var _isArray2 = require("lodash/isArray");

var _isArray3 = _interopRequireDefault(_isArray2);

var _find2 = require("lodash/find");

var _find3 = _interopRequireDefault(_find2);

var _uniqBy2 = require("lodash/uniqBy");

var _uniqBy3 = _interopRequireDefault(_uniqBy2);

var _assignIn2 = require("lodash/assignIn");

var _assignIn3 = _interopRequireDefault(_assignIn2);

var _debounce2 = require("lodash/debounce");

var _debounce3 = _interopRequireDefault(_debounce2);

var _take2 = require("lodash/take");

var _take3 = _interopRequireDefault(_take2);

var _indexOf2 = require("lodash/indexOf");

var _indexOf3 = _interopRequireDefault(_indexOf2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _set2 = require("lodash/set");

var _set3 = _interopRequireDefault(_set2);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _cloneDeep2 = require("lodash/cloneDeep");

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _reactRouter = require("react-router");

var _universalFetch = require("universal-fetch");

var _universalFetch2 = _interopRequireDefault(_universalFetch);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var globalsLoaded = false;

var globals = {
  routes: []
};

var setGlobalRoutes = exports.setGlobalRoutes = function setGlobalRoutes(routes) {
  globals.routes = (0, _cloneDeep3.default)(routes);
};
/**
 * Load globals through the express route, we don't want to increase size of page
 * adding it to script tag
 * @returns {Promise.<*>}
 */
var loadGlobals = exports.loadGlobals = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if ((0, _utils.isBrowser)()) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", Promise.reject());

          case 2:
            if (!globalsLoaded) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", Promise.resolve(globals));

          case 4:
            return _context.abrupt("return", (0, _universalFetch2.default)(location.protocol + "//" + location.host + "/_globals").then(function (res) {
              return res.json();
            }).then(function (responseBody) {
              (0, _each3.default)(responseBody, function (value, key) {
                (0, _set3.default)(globals, key, value);
              });
              globalsLoaded = true;
              return globals;
            }).catch(function (ex) {
              // eslint-disable-next-line
              console.log("Cannot load _globals: ", ex);
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function loadGlobals() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Get requested module by specifying path
 * @param pathname
 * @param routes
 * @returns {boolean}
 */
var getModuleByUrl = exports.getModuleByUrl = function getModuleByUrl(pathname) {
  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globals.routes;

  var moduleName = false;

  // Try to get module if exact path is matched

  /**
   * Iterate through all the routes to get
   * the correct module name for the path.
   * This iteration is for exact match with pathname
   * thus giving more priority to /about/about-us to more than
   * /:something/:sub-something
   */
  (0, _each3.default)(routes, function (route) {

    // If already found a module name then return
    if (moduleName) return;

    // if current route is abstract then try to
    // search for sub routes
    if ((0, _get3.default)(route, "abstract", false)) {
      if ((0, _get3.default)(route, "routes", []).length) {
        moduleName = getModuleByUrl(pathname, route.routes);
      }
    } else if (route.path === pathname) {
      moduleName = route.bundleKey;
    }
  });

  /**
   * If no module name is found via match of react-router
   * i.e. using matchPath
   */
  if (!moduleName) {
    // Iterate through all the routes to get
    // the correct module name for the path
    (0, _each3.default)(routes, function (route) {

      // If already found a module name then return
      if (moduleName) return;

      // if current route is abstract then try to
      // search for sub routes
      if ((0, _get3.default)(route, "abstract", false)) {
        if ((0, _get3.default)(route, "routes", []).length) {
          moduleName = getModuleByUrl(pathname, route.routes);
        }
      } else if ((0, _reactRouter.matchPath)(pathname, route)) {
        moduleName = route.bundleKey;
      }
    });
  }

  return moduleName;
};

/**
 * Check if script requested belongs to the modules specified
 * check if build/mod-home-cat-1982Aasdd12ascgt3.bundle.js
 * belongs to home module or home-cat module
 *
 * @param script
 * @param mod
 * @returns {boolean}
 */
var scriptBelongToMod = exports.scriptBelongToMod = function scriptBelongToMod(script, mod) {
  var finalFileName = script.split("/").pop();
  if (!finalFileName) {
    return false;
  }
  var fileNameWithoutHash = finalFileName.split(".");
  if (fileNameWithoutHash.length < 4) {
    return false;
  }
  // Remove extension
  fileNameWithoutHash.pop();

  // Remove "bundle"
  fileNameWithoutHash.pop();

  // remove "hash"
  fileNameWithoutHash.pop();

  // Join with "." again
  fileNameWithoutHash = fileNameWithoutHash.join(".");

  return fileNameWithoutHash === "mod-" + mod;
};

/**
 * Keep track of modules loaded
 * @type {Array}
 */
var modulesLoaded = [];
/**
 * Load url specific modules & trigger call backs on load
 * @param url
 * @param cb
 */
var loadModuleByUrl = exports.loadModuleByUrl = function loadModuleByUrl(url) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};


  if (!(0, _utils.isBrowser)()) {
    cb();
    return;
  }

  loadGlobals().then(function () {

    var currentMod = getModuleByUrl(url, globals.routes);

    // location is an object like window.location
    // Load in respect to path
    var isLoaded = false;
    var afterLoad = function afterLoad() {
      isLoaded = true;
      modulesLoaded.push(currentMod);
      cb(currentMod);
      window.removeEventListener("routesload", afterLoad);
    };
    window.addEventListener("routesload", afterLoad);

    // Try to load after 5 second even if script does not call event
    var extendedAfterLoad = function extendedAfterLoad() {
      setTimeout(function () {
        if (!isLoaded) {
          afterLoad();
        }
      }, 5000);
    };

    var listOfPromises = [];
    (0, _each3.default)(globals.allCss, function (css) {
      if (scriptBelongToMod(css, currentMod)) {
        listOfPromises.push((0, _utils.loadStyle)(css));
      }
    });

    (0, _each3.default)(globals.allJs, function (js) {
      if (scriptBelongToMod(js, currentMod)) {
        listOfPromises.push((0, _utils.loadScript)(js));
      }
    });
    Promise.all(listOfPromises).then(extendedAfterLoad).catch(extendedAfterLoad);
  });
};

/**
 * Check if module for the url is loaded or not
 * @param url
 * @returns {boolean}
 */
var isModuleLoaded = exports.isModuleLoaded = function isModuleLoaded(url) {
  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globals.routes;

  var mod = getModuleByUrl(url, routes);
  return (0, _indexOf3.default)(modulesLoaded, mod) !== -1;
};

/**
 * List of hash of files pre-loaded
 * @type {Array}
 */
var preLoadedFiles = [];
/**
 * Get list of pending pre-loads files
 * @returns {[*,*]}
 */
var getPendingPreloadFiles = function getPendingPreloadFiles() {
  var pendingCss = [];
  var pendingJs = [];

  (0, _each3.default)(globals.allCss, function (css) {
    var cssHash = (0, _utils.generateStringHash)(css, "PRELOAD");
    if (css.indexOf("mod-") !== -1 && (0, _indexOf3.default)(preLoadedFiles, cssHash) === -1 && (0, _indexOf3.default)(preLoadingFiles, cssHash) === -1) {
      pendingCss.push(css);
    }
  });

  (0, _each3.default)(globals.allJs, function (js) {
    var jsHash = (0, _utils.generateStringHash)(js, "PRELOAD");
    if (js.indexOf("mod-") !== -1 && (0, _indexOf3.default)(preLoadedFiles, jsHash) === -1 && (0, _indexOf3.default)(preLoadingFiles, jsHash) === -1) {
      pendingJs.push(js);
    }
  });
  return [pendingCss, pendingJs];
};

/**
 * Preload a script, compatible with ie 6,7,8+ and all major browsers
 * @param path
 * @param fn
 * @param scope
 */
var preLoadingFiles = [];
var preLoadFile = exports.preLoadFile = function preLoadFile(path) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var scope = arguments[2];


  if (!(0, _utils.isBrowser)()) {
    // If not a browser then do not allow loading of
    // css file, return with success->false
    fn.call(scope, false);
  }

  var pathHash = (0, _utils.generateStringHash)(path, "PRELOAD");

  if ((0, _indexOf3.default)(preLoadedFiles, pathHash) !== -1) {
    // Give a success callback
    fn.call(scope || window, true);
  }
  if ((0, _indexOf3.default)(preLoadingFiles, pathHash) !== -1) {
    return;
  }
  preLoadingFiles.push(pathHash);
  var isIE = navigator.appName.indexOf("Microsoft") === 0;
  var s = void 0,
      r = void 0;
  if (isIE) {
    // Load for internet explorer
    r = false;
    s = new Image();
    s.width = 0;
    s.height = 0;
    s.id = pathHash;
    s.style = "display:none;";
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState === "complete")) {
        r = true;
        preLoadedFiles.push(pathHash);
        fn.call(scope || window, true, s);
      }
    };
    s.onerror = function () {
      preLoadedFiles.push(pathHash);
      fn.call(scope || window, true, s);
    };
    s.src = path;
    return s;
  }
  s = document.createElement("object");
  s.width = 0;
  s.height = 0;
  s.style = "position:fixed; left:-200vw;top: -200vh; visibility:hidden;";
  s.id = pathHash;
  s.onload = s.onreadystatechange = function () {
    if (!r && (!this.readyState || this.readyState === "complete")) {
      r = true;
      preLoadedFiles.push(pathHash);
      fn.call(scope || window, true, s);
    }
  };
  s.onerror = function () {
    preLoadedFiles.push(pathHash);
    fn.call(scope || window, true, s);
  };
  s.data = path;
  document.body.appendChild(s);
  return s;
};

/**
 * Detect idle time for user and download assets accordingly
 * @param idleTime
 */
var timerEventInitialized = false;
var idlePreload = exports.idlePreload = function idlePreload() {
  var idleTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;

  if (!(0, _utils.isBrowser)()) return;

  var concurrentLoading = 1;

  var timerInt = void 0;

  var loadingFile = false;
  var loadedFiles = 0;
  var preload = function preload() {
    if (loadingFile) {
      return;
    }

    var _getPendingPreloadFil = getPendingPreloadFiles(),
        _getPendingPreloadFil2 = _slicedToArray(_getPendingPreloadFil, 2),
        pendingCss = _getPendingPreloadFil2[0],
        pendingJs = _getPendingPreloadFil2[1];

    // Beauty is everything load css first
    // and then other files
    // BUT Load one file at a time


    var filesToBeLoaded = [];
    var isCss = false;

    if (pendingCss && pendingCss.length) {
      filesToBeLoaded = (0, _take3.default)(pendingCss, 1);
      isCss = true;
    } else if (pendingJs && pendingJs.length) {
      filesToBeLoaded = (0, _take3.default)(pendingJs, 1);
    }

    loadingFile = !!filesToBeLoaded.length;
    (0, _each3.default)(filesToBeLoaded, function (path) {
      preLoadFile(path, function () {
        loadedFiles++;

        if (isCss) {
          // Load stylesheet right away
          (0, _utils.loadStyle)(path);
        }
        // If files loaded change loadingFile to false
        if (loadedFiles >= concurrentLoading) {
          loadedFiles = 0;
          loadingFile = false;
          timerInt = setTimeout(preload, 100);
        }
      });
    });
  };

  var resetTimer = (0, _debounce3.default)(function () {
    clearTimeout(timerInt);
    timerInt = setTimeout(function () {
      preload();
    }, idleTime); // time is in milliseconds
  }, 10);

  timerInt = setTimeout(function () {
    preload();
  }, idleTime); // time is in milliseconds

  if (!timerEventInitialized) {
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer; // catches touchscreen presses
    window.onclick = resetTimer; // catches touchpad clicks
    window.onscroll = resetTimer; // catches scrolling with arrow keys
    window.onkeypress = resetTimer;
    timerEventInitialized = true;
  }
};

/**
 * Get routes from path
 * @param routes
 * @param path
 */
var getRouteFromPath = exports.getRouteFromPath = function getRouteFromPath(path) {
  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globals.routes;

  var selectedRoute = [];

  var changeMatchToNull = function changeMatchToNull(route) {
    if (route.match) {
      route.match = null;
    }
    if (route.routes && route.routes.length) {
      (0, _each3.default)(route.routes, function (subRoute) {
        return changeMatchToNull(subRoute);
      });
    }
  };

  var bundleKey = getModuleByUrl(path, routes);

  (0, _each3.default)(routes, function (route) {
    if (route.bundleKey !== bundleKey) return;
    if ((0, _get3.default)(route, "abstract", false)) {
      // If abstract is present then Try to see if sub-routes matches
      // the path.

      if (route.routes && route.routes.length) {
        // If subRoutes are found to match the provided path,
        // that means we can add the abstract path to list of
        // our routes
        var subRoutes = getRouteFromPath(path, route.routes);

        if (subRoutes.length) {
          // Add abstract path to our list in expected order and then
          // add sub routes accordingly
          selectedRoute.push((0, _assignIn3.default)(route, { match: null }));
          selectedRoute.push.apply(selectedRoute, _toConsumableArray(subRoutes));
        } else {
          changeMatchToNull(route);
        }
      }
    } else {

      // If route.path is found and route is not abstract
      // match with the path and if it matches try to match sub-routes
      // as well
      var match = (0, _reactRouter.matchPath)(path, route);
      if (match) {
        selectedRoute.push((0, _assignIn3.default)(route, { match: match }));
        if (route.routes && route.routes.length) {
          selectedRoute.push.apply(selectedRoute, _toConsumableArray(getRouteFromPath(path, route.routes)));
        }
      } else {
        changeMatchToNull(route);
      }
    }
  });
  // Do not repeat paths even if the provided routes to the function has repeated paths
  // Thus make them unique by path
  return (0, _uniqBy3.default)(selectedRoute, "path");
};

/**
 * Get end/exact route for path
 * @param routes
 * @param path
 */
var getExactRouteFromPath = exports.getExactRouteFromPath = function getExactRouteFromPath(path) {
  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globals.routes;

  var currentRoutes = getRouteFromPath(path, routes);
  return (0, _find3.default)(currentRoutes, function (r) {
    return (0, _get3.default)(r, "match.isExact", false);
  });
};

var addBundleKeyToRoutes = function addBundleKeyToRoutes(routes) {
  var bundleKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  if (!(0, _isArray3.default)(routes)) {
    routes.bundleKey = bundleKey;
    (0, _isArray3.default)(routes.routes) && addBundleKeyToRoutes(routes.routes, bundleKey);
  } else {
    (0, _each3.default)(routes, function (route) {
      route.bundleKey = bundleKey;
      (0, _isArray3.default)(route.routes) && addBundleKeyToRoutes(route.routes, bundleKey);
    });
  }
  return routes;
};

var configureRoutes = exports.configureRoutes = function configureRoutes(routes) {
  var finalRoutes = [];
  (0, _each3.default)(routes, function (route) {
    var bundleKey = route.bundleKey || "";
    finalRoutes = [].concat(_toConsumableArray(finalRoutes), _toConsumableArray(addBundleKeyToRoutes(route.default, bundleKey)));
  });
  return finalRoutes;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(globalsLoaded, "globalsLoaded", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(globals, "globals", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(setGlobalRoutes, "setGlobalRoutes", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(loadGlobals, "loadGlobals", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(getModuleByUrl, "getModuleByUrl", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(scriptBelongToMod, "scriptBelongToMod", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(modulesLoaded, "modulesLoaded", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(loadModuleByUrl, "loadModuleByUrl", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(isModuleLoaded, "isModuleLoaded", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(preLoadedFiles, "preLoadedFiles", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(getPendingPreloadFiles, "getPendingPreloadFiles", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(preLoadingFiles, "preLoadingFiles", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(preLoadFile, "preLoadFile", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(timerEventInitialized, "timerEventInitialized", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(idlePreload, "idlePreload", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(getRouteFromPath, "getRouteFromPath", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(getExactRouteFromPath, "getExactRouteFromPath", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(addBundleKeyToRoutes, "addBundleKeyToRoutes", "lib/utils/bundler.js");

  __REACT_HOT_LOADER__.register(configureRoutes, "configureRoutes", "lib/utils/bundler.js");
}();

;