"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smoothScroll = exports.updateRoutes = exports.renderRoutes = exports.scrollToTop = exports.animateFadeOut = exports.animateFadeIn = exports.hideScreenLoader = exports.showScreenLoader = undefined;

var _findIndex2 = require("lodash/findIndex");

var _findIndex3 = _interopRequireDefault(_findIndex2);

var _forEach2 = require("lodash/forEach");

var _forEach3 = _interopRequireDefault(_forEach2);

var _defaults2 = require("lodash/defaults");

var _defaults3 = _interopRequireDefault(_defaults2);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _find2 = require("lodash/find");

var _find3 = _interopRequireDefault(_find2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _reactDom = require("react-dom");

var _bundler = require("./bundler");

var _storage = require("../libs/storage");

var _storage2 = _interopRequireDefault(_storage);

var _api = require("../libs/api");

var _api2 = _interopRequireDefault(_api);

var _action = require("../libs/network/action");

var _renderer = require("./renderer");

var _seo = require("./seo");

var _links = require("./links");

var _action2 = require("../components/screen/action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
/**
 * Rendering utilities
 */


// We require this cause we display screen loader as soon as there is
// url change, but if the loader function is completed in 100 milli-second then there is
// no sense in displaying the loader, rather wait for 100 milli-second and then show screen-loader
var screenLoaderTimeout = 0;
var waitTime = 100;

var DefaultRender = _reactDom.render;
var HydrateRender = process.env.NODE_ENV === "development" ? _reactDom.render : _reactDom.hydrate;
if (typeof HydrateRender === "undefined") {
  HydrateRender = _reactDom.render;
}

/**
 * Show screen loader and trigger dispatch accordingly
 * @param store
 */
var showScreenLoader = exports.showScreenLoader = function showScreenLoader(store) {
  screenLoaderTimeout && clearTimeout(screenLoaderTimeout);
  screenLoaderTimeout = setTimeout(function () {
    store.dispatch((0, _action2.screenLoading)());
    screenLoaderTimeout = 0;
  }, waitTime);
};

/**
 * Hide screen-loader
 * @param store
 */
var hideScreenLoader = exports.hideScreenLoader = function hideScreenLoader(store) {
  screenLoaderTimeout && clearTimeout(screenLoaderTimeout);
  var state = store.getState();
  var screenState = (0, _get3.default)(state, "screen.state", _action2.SCREEN_STATE_LOADED);
  if (screenState === _action2.SCREEN_STATE_LOADED) return;
  store.dispatch((0, _action2.screenLoaded)());
};

var ANIMATION_TIMEOUT = 400;
var animateFadeIn = exports.animateFadeIn = function animateFadeIn(global) {
  return new Promise(function (resolve) {
    if (global.isInitialLoad) return resolve();
    var state = global.store.getState();
    var animationState = (0, _get3.default)(state, "screen.animation", _action2.SCREEN_STATE_PAGE_ENTER);
    if (animationState === _action2.SCREEN_STATE_PAGE_ENTER) return;
    global.store.dispatch((0, _action2.screenPageEnter)());
    setTimeout(resolve, ANIMATION_TIMEOUT / 2);
  });
};
var animateFadeOut = exports.animateFadeOut = function animateFadeOut(global) {
  return new Promise(function (resolve) {
    if (global.isInitialLoad) return resolve();

    var state = global.store.getState();
    var animationState = (0, _get3.default)(state, "screen.animation", _action2.SCREEN_STATE_PAGE_ENTER);
    if (animationState === _action2.SCREEN_STATE_PAGE_EXIT) return resolve();

    global.store.dispatch((0, _action2.screenPageExit)());
    setTimeout(resolve, ANIMATION_TIMEOUT / 2);
  });
};

/**
 * Scroll to top for the specified route
 * @param currentRoutes
 */
var scrollToTop = exports.scrollToTop = function scrollToTop() {
  var currentRoutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (process.env.NODE_ENV === "development") {
    return;
  }
  var currExactRoute = (0, _find3.default)(currentRoutes, { match: { isExact: true } });
  var scrollTop = 0;
  if (currExactRoute) {
    scrollTop = (0, _get3.default)(currExactRoute, "scrollTop", 0);
    if (scrollTop === false) {
      return;
    }
  }
  return smoothScroll(undefined, scrollTop);
};

/**
 * Update meta-data for the specified url
 * @param routes
 */
var updateHtmlMeta = function updateHtmlMeta(routes) {

  var seoData = {};
  (0, _each3.default)(routes, function (r) {
    seoData = (0, _defaults3.default)({}, (0, _get3.default)(r, "seo", {}), seoData);
  });

  var allMeta = (0, _seo.generateMeta)(seoData, { baseUrl: window.location.origin, url: window.location.href });

  // Remove all meta tags
  var head = document.head;
  var metaTags = Array.prototype.slice.call(head.getElementsByTagName("meta"));
  metaTags.forEach(function (tag) {
    if (tag && tag.parentNode && tag.parentNode.removeChild) {
      tag.parentNode.removeChild(tag);
    }
  });

  var title = "";
  (0, _forEach3.default)(allMeta, function (meta) {
    if (meta.name === "title") {
      title = meta.content;
    }
    var metaTag = document.createElement("meta");
    (0, _each3.default)(meta, function (value, key) {
      if (key === "itemProp") {
        key = "itemprop";
      }
      metaTag.setAttribute(key, value);
    });
    head.appendChild(metaTag);
  });
  document.title = title;
  head.getElementsByTagName("title")[0].innerHTML = title;
};

var getAttribute = function getAttribute(ele, attr) {
  var result = ele.getAttribute && ele.getAttribute(attr) || null;
  if (!result) {
    var attrs = ele.attributes;
    var length = attrs.length;
    for (var i = 0; i < length; i++) {
      if (attrs[i].nodeName === attr) result = attrs[i].nodeValue;
    }
  }
  return result;
};

var updateHeadLinks = function updateHeadLinks(routes) {

  var seoData = {};
  (0, _each3.default)(routes, function (r) {
    seoData = (0, _defaults3.default)({}, (0, _get3.default)(r, "seo", {}), seoData);
  });

  var allLinks = (0, _links.generateLinks)(seoData, { baseUrl: window.location.origin, url: window.location.href });

  // Remove all seo links tags
  var head = document.head;
  var headLinks = Array.prototype.slice.call(head.getElementsByTagName("link"));
  headLinks.forEach(function (tag) {
    if (tag && tag.parentNode && tag.parentNode.removeChild) {
      var type = getAttribute(tag, "data-type");
      if (type === "seo") {
        tag.parentNode.removeChild(tag);
      }
    }
  });

  (0, _forEach3.default)(allLinks, function (link) {
    var linkTag = document.createElement("link");
    (0, _each3.default)(link, function (value, key) {
      linkTag.setAttribute(key, value);
    });
    linkTag.setAttribute("data-type", "seo");
    head.appendChild(linkTag);
  });
};

/**
 * Render routes for the provided url
 * @param url
 * @param collectedRoutes
 * @param renderRoot
 * @param store
 * @param history
 * @param options
 */
var renderRoutes = exports.renderRoutes = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var url = _ref.url,
        collectedRoutes = _ref.collectedRoutes,
        renderRoot = _ref.renderRoot,
        store = _ref.store,
        history = _ref.history,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? {
      showScreenLoader: false,
      isInitialLoad: false
    } : _ref$options;
    var currentRoutes, promises, error;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // Get current routes from the routes we need to load data
            currentRoutes = (0, _bundler.getRouteFromPath)(url, collectedRoutes);

            // If no routes are matching our criteria, that means we have a 404
            // else react-router is taking care of it.

            if (currentRoutes.length) {
              _context.next = 4;
              break;
            }

            (0, _renderer.renderNotFoundPage)({
              render: options.isInitialLoad ? HydrateRender : DefaultRender,
              history: history,
              renderRoot: renderRoot,
              url: url,
              routes: [],
              store: store
            }, function () {
              !options.isInitialLoad && hideScreenLoader(store);
              !options.isInitialLoad && scrollToTop(currentRoutes);
            });
            return _context.abrupt("return", Promise.resolve());

          case 4:

            // Preload Data
            promises = (0, _renderer.getPreloadDataPromises)({
              routes: currentRoutes,
              storage: _storage2.default,
              api: _api2.default,
              store: store,
              url: window.location.href.replace(window.location.origin, ""),
              host: window.location.protocol + "//" + window.location.host
            });
            _context.prev = 5;
            _context.next = 8;
            return Promise.all(promises);

          case 8:

            updateHtmlMeta(currentRoutes);
            updateHeadLinks(currentRoutes);
            (0, _renderer.renderRoutesByUrl)({
              render: options.isInitialLoad ? HydrateRender : DefaultRender,
              routes: currentRoutes,
              history: history,
              renderRoot: renderRoot,
              url: url,
              store: store
            }, function () {
              !options.isInitialLoad && hideScreenLoader(store);
              scrollToTop(currentRoutes);
            });
            return _context.abrupt("return", Promise.resolve());

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](5);
            error = _context.t0;

            if (_context.t0 && _context.t0.error instanceof Error) {
              error = _context.t0.error;
            } else if (!(_context.t0 instanceof Error)) {
              error = new Error(_context.t0);
            }

            error.statusCode = error.statusCode || 500;
            if (error.statusCode === 404) {
              (0, _renderer.renderNotFoundPage)({
                render: options.isInitialLoad ? HydrateRender : DefaultRender,
                history: history,
                renderRoot: renderRoot,
                url: url,
                routes: [],
                store: store
              }, function () {
                !options.isInitialLoad && hideScreenLoader(store);
                !options.isInitialLoad && scrollToTop(currentRoutes);
              });
            } else if (_action.NETWORK_STATE_OFFLINE === error.networkState) {
              (0, _renderer.renderOfflinePage)({
                render: options.isInitialLoad ? HydrateRender : DefaultRender,
                history: history,
                renderRoot: renderRoot,
                error: error,
                routes: currentRoutes,
                store: store
              }, function () {
                !options.isInitialLoad && hideScreenLoader(store);
                !options.isInitialLoad && scrollToTop(currentRoutes);
              });
            } else {
              (0, _renderer.renderErrorPage)({
                render: options.isInitialLoad ? HydrateRender : DefaultRender,
                history: history,
                renderRoot: renderRoot,
                error: error,
                store: store,
                routes: currentRoutes
              }, function () {
                !options.isInitialLoad && hideScreenLoader(store);
                !options.isInitialLoad && scrollToTop(currentRoutes);
              });
            }
            return _context.abrupt("return", Promise.reject(_context.t0));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 14]]);
  }));

  return function renderRoutes(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Load routes when a bundle is included,
 * this will be called from pages
 * @param routes
 * @param collectedRoutes
 */
var updateRoutes = exports.updateRoutes = function updateRoutes(_ref3) {
  var routes = _ref3.routes,
      collectedRoutes = _ref3.collectedRoutes;


  (0, _each3.default)(routes, function (route) {
    // remove functions as we cannot use find with functions in object
    var lessRoute = JSON.parse(JSON.stringify(route));
    var index = (0, _findIndex3.default)(collectedRoutes, lessRoute);

    if (index === -1) {
      collectedRoutes.push(route);
    } else {
      collectedRoutes[index] = route;
    }
  });
};

/**
 * Smooth scroll of window
 */
// Get y position of window
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop) {
    return document.documentElement.scrollTop;
  }
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

// Get y position of element
function elmYPosition(element) {
  var elm = element;
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }return y;
}

/**
 * utils
 * @param eID
 * @param padding
 * @param speedMultiplier
 */
var smoothScroll = exports.smoothScroll = function smoothScroll(eID) {
  var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var speedMultiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var startY = currentYPosition();
  var stopY = 0;
  if (eID) {
    stopY = elmYPosition(eID) - padding;
  } else {
    stopY = stopY + padding;
  }
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;

  speed /= speedMultiplier;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      //eslint-disable-next-line
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY += step;if (leapY > stopY) leapY = stopY;timer++;
    }return;
  }
  for (var _i = startY; _i > stopY; _i -= step) {
    //eslint-disable-next-line
    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
    leapY -= step;if (leapY < stopY) leapY = stopY;timer++;
  }
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(screenLoaderTimeout, "screenLoaderTimeout", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(waitTime, "waitTime", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(DefaultRender, "DefaultRender", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(HydrateRender, "HydrateRender", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(showScreenLoader, "showScreenLoader", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(hideScreenLoader, "hideScreenLoader", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(ANIMATION_TIMEOUT, "ANIMATION_TIMEOUT", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(animateFadeIn, "animateFadeIn", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(animateFadeOut, "animateFadeOut", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(scrollToTop, "scrollToTop", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(updateHtmlMeta, "updateHtmlMeta", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(getAttribute, "getAttribute", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(updateHeadLinks, "updateHeadLinks", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(renderRoutes, "renderRoutes", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(updateRoutes, "updateRoutes", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(currentYPosition, "currentYPosition", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(elmYPosition, "elmYPosition", "lib/utils/client.js");

  __REACT_HOT_LOADER__.register(smoothScroll, "smoothScroll", "lib/utils/client.js");
}();

;