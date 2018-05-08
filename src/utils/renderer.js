"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPreloadDataPromises = exports.renderSubRoutes = exports.renderRoutesByUrl = exports.renderOfflinePage = exports.renderErrorPage = exports.renderNotFoundPage = undefined;

var _isFunction2 = require("lodash/isFunction");

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _defaults2 = require("lodash/defaults");

var _defaults3 = _interopRequireDefault(_defaults2);

var _each2 = require("lodash/each");

var _each3 = _interopRequireDefault(_each2);

var _map2 = require("lodash/map");

var _map3 = _interopRequireDefault(_map2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactDom = require("react-dom");

var _reactHotLoader = require("react-hot-loader");

var _ConnectedRouter = require("../libs/ConnectedRouter");

var _ConnectedRouter2 = _interopRequireDefault(_ConnectedRouter);

var _reactRouterDom = require("react-router-dom");

var _storage = require("../libs/storage");

var _storage2 = _interopRequireDefault(_storage);

var _api = require("../libs/api");

var _api2 = _interopRequireDefault(_api);

var _withSubRoutes = require("../components/route/with-sub-routes");

var _withSubRoutes2 = _interopRequireDefault(_withSubRoutes);

var _bundler = require("./bundler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentMap = require(process.env.__p_root + "src/config/classMap").default;

/**
 * Get component via componentMap in settings
 * @param componentReference
 */
var getComponent = function getComponent(componentReference) {
  var component = componentMap[componentReference] || false;
  if (!component) throw new Error("Cannot find component with reference " + componentReference);
  return component;
};

var DefaultRender = _reactDom.render;
var RootComponent = getComponent("root");
var Loader = getComponent("loader");
var NotFoundPage = getComponent("error/404");
var ErrorPage = getComponent("error/500");
var OfflinePage = getComponent("error/offline");

var renderNotFoundPage = exports.renderNotFoundPage = function renderNotFoundPage(_ref) {
  var _ref$render = _ref.render,
      render = _ref$render === undefined ? DefaultRender : _ref$render,
      _ref$Router = _ref.Router,
      Router = _ref$Router === undefined ? _reactRouterDom.Router : _ref$Router,
      _ref$Switch = _ref.Switch,
      Switch = _ref$Switch === undefined ? _reactRouterDom.Switch : _ref$Switch,
      _ref$Route = _ref.Route,
      Route = _ref$Route === undefined ? _reactRouterDom.Route : _ref$Route,
      _ref$api = _ref.api,
      api = _ref$api === undefined ? _api2.default : _ref$api,
      _ref$storage = _ref.storage,
      storage = _ref$storage === undefined ? _storage2.default : _ref$storage,
      history = _ref.history,
      store = _ref.store,
      context = _ref.context,
      routes = _ref.routes,
      _ref$renderRoot = _ref.renderRoot,
      renderRoot = _ref$renderRoot === undefined ? null : _ref$renderRoot;
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return null;
  };


  var component = _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _ConnectedRouter2.default,
      {
        Router: Router,
        context: context,
        history: history
      },
      _react2.default.createElement(
        RootComponent,
        {
          api: api,
          storage: storage,
          routes: routes
        },
        _react2.default.createElement(
          Switch,
          null,
          _react2.default.createElement(Route, { component: NotFoundPage })
        )
      )
    )
  );
  // If render is set false explicitly then just return the component
  if (!render) {
    return component;
  }
  // render 404
  return render(component, renderRoot, callback);
};

var renderErrorPage = exports.renderErrorPage = function renderErrorPage(_ref2) {
  var _ref2$render = _ref2.render,
      render = _ref2$render === undefined ? DefaultRender : _ref2$render,
      _ref2$Router = _ref2.Router,
      Router = _ref2$Router === undefined ? _reactRouterDom.Router : _ref2$Router,
      _ref2$Switch = _ref2.Switch,
      Switch = _ref2$Switch === undefined ? _reactRouterDom.Switch : _ref2$Switch,
      _ref2$api = _ref2.api,
      api = _ref2$api === undefined ? _api2.default : _ref2$api,
      _ref2$storage = _ref2.storage,
      storage = _ref2$storage === undefined ? _storage2.default : _ref2$storage,
      context = _ref2.context,
      history = _ref2.history,
      store = _ref2.store,
      routes = _ref2.routes,
      _ref2$renderRoot = _ref2.renderRoot,
      renderRoot = _ref2$renderRoot === undefined ? null : _ref2$renderRoot,
      error = _ref2.error;
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return null;
  };


  context = context || {};
  var component = _react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _ConnectedRouter2.default,
        {
          Router: Router,
          context: context,
          history: history
        },
        _react2.default.createElement(
          RootComponent,
          {
            api: api,
            storage: storage,
            routes: routes
          },
          _react2.default.createElement(
            Switch,
            null,
            _react2.default.createElement(ErrorPage, { error: error })
          )
        )
      )
    )
  );

  if (!render) {
    return component;
  }
  // Render 500
  return render(component, renderRoot, callback);
};

var renderOfflinePage = exports.renderOfflinePage = function renderOfflinePage(_ref3) {
  var _ref3$render = _ref3.render,
      render = _ref3$render === undefined ? DefaultRender : _ref3$render,
      _ref3$Router = _ref3.Router,
      Router = _ref3$Router === undefined ? _reactRouterDom.Router : _ref3$Router,
      _ref3$Switch = _ref3.Switch,
      Switch = _ref3$Switch === undefined ? _reactRouterDom.Switch : _ref3$Switch,
      _ref3$api = _ref3.api,
      api = _ref3$api === undefined ? _api2.default : _ref3$api,
      _ref3$storage = _ref3.storage,
      storage = _ref3$storage === undefined ? _storage2.default : _ref3$storage,
      context = _ref3.context,
      history = _ref3.history,
      store = _ref3.store,
      routes = _ref3.routes,
      _ref3$renderRoot = _ref3.renderRoot,
      renderRoot = _ref3$renderRoot === undefined ? null : _ref3$renderRoot,
      error = _ref3.error;
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return null;
  };


  context = context || {};
  var component = _react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _ConnectedRouter2.default,
        {
          Router: Router,
          context: context,
          history: history
        },
        _react2.default.createElement(
          RootComponent,
          {
            api: api,
            storage: storage,
            routes: routes
          },
          _react2.default.createElement(
            Switch,
            null,
            _react2.default.createElement(OfflinePage, { error: error })
          )
        )
      )
    )
  );

  if (!render) {
    return component;
  }
  // Render 500
  return render(component, renderRoot, callback);
};

var renderRoutesByUrl = exports.renderRoutesByUrl = function renderRoutesByUrl(_ref4) {
  var _ref4$render = _ref4.render,
      render = _ref4$render === undefined ? DefaultRender : _ref4$render,
      _ref4$Router = _ref4.Router,
      Router = _ref4$Router === undefined ? _reactRouterDom.Router : _ref4$Router,
      _ref4$Switch = _ref4.Switch,
      Switch = _ref4$Switch === undefined ? _reactRouterDom.Switch : _ref4$Switch,
      _ref4$api = _ref4.api,
      api = _ref4$api === undefined ? _api2.default : _ref4$api,
      _ref4$storage = _ref4.storage,
      storage = _ref4$storage === undefined ? _storage2.default : _ref4$storage,
      routes = _ref4.routes,
      url = _ref4.url,
      _ref4$context = _ref4.context,
      context = _ref4$context === undefined ? {} : _ref4$context,
      history = _ref4.history,
      store = _ref4.store,
      _ref4$renderRoot = _ref4.renderRoot,
      renderRoot = _ref4$renderRoot === undefined ? null : _ref4$renderRoot;
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return null;
  };

  var currentRoutes = url ? (0, _bundler.getRouteFromPath)(url, routes) : routes;

  context.api = api;
  context.storage = storage;

  var component = _react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _ConnectedRouter2.default,
        {
          context: context,
          location: url,
          history: history,
          Router: Router
        },
        _react2.default.createElement(
          RootComponent,
          {
            api: api,
            storage: storage,
            routes: routes
          },
          _react2.default.createElement(
            Loader,
            null,
            _react2.default.createElement(
              Switch,
              null,
              (0, _map3.default)(currentRoutes, function (route, i) {
                return _react2.default.createElement(_withSubRoutes2.default, {
                  key: i,
                  route: route,
                  storage: storage,
                  api: api
                });
              })
            )
          )
        )
      )
    )
  );
  if (!render) {
    return component;
  }
  render(component, renderRoot, callback);
};

var renderSubRoutes = exports.renderSubRoutes = function renderSubRoutes(component) {
  var _component$props = component.props,
      _component$props$rout = _component$props.routes,
      routes = _component$props$rout === undefined ? [] : _component$props$rout,
      api = _component$props.api,
      storage = _component$props.storage,
      preLoadedData = _component$props.preLoadedData;

  return (0, _map3.default)(routes, function (route, i) {
    return _react2.default.createElement(_withSubRoutes2.default, {
      key: i,
      route: route,
      api: api,
      storage: storage,
      routes: routes,
      parentPreLoadedData: preLoadedData
    });
  });
};

/**
 * Return of array of promises that needs to be reloaded
 * @param routes
 * @param storage
 * @param api
 * @param store
 * @param url
 * @param host
 * @returns {Array}
 */
var getPreloadDataPromises = exports.getPreloadDataPromises = function getPreloadDataPromises(_ref5) {
  var routes = _ref5.routes,
      storage = _ref5.storage,
      api = _ref5.api,
      store = _ref5.store,
      url = _ref5.url,
      host = _ref5.host;

  var promises = [];
  (0, _each3.default)(routes, function (r) {

    // Load data and add it to route itself
    if (r.preLoadData) {
      promises.push(function () {

        // Pass route as reference so that we can modify it while loading data
        var staticRoute = JSON.parse(JSON.stringify(r));
        var returnData = r.preLoadData({
          route: staticRoute,
          match: r.match,
          storage: storage,
          api: api,
          store: store,
          url: url,
          host: host,
          updateSeo: function updateSeo() {
            var seoData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return r.seo = (0, _defaults3.default)({}, (0, _get3.default)(r, "seo", {}), seoData);
          }
        });
        if (returnData && (0, _isFunction3.default)(returnData.then)) {
          return returnData.then(function (data) {
            return r.preLoadedData = data;
          }).catch(function (err) {
            throw err;
          });
        }
        return r.preLoadedData = returnData;
      }());
    }
  });
  return promises;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(componentMap, "componentMap", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(getComponent, "getComponent", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(DefaultRender, "DefaultRender", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(RootComponent, "RootComponent", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(Loader, "Loader", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(NotFoundPage, "NotFoundPage", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(ErrorPage, "ErrorPage", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(OfflinePage, "OfflinePage", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(renderNotFoundPage, "renderNotFoundPage", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(renderErrorPage, "renderErrorPage", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(renderOfflinePage, "renderOfflinePage", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(renderRoutesByUrl, "renderRoutesByUrl", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(renderSubRoutes, "renderSubRoutes", "lib/utils/renderer.js");

  __REACT_HOT_LOADER__.register(getPreloadDataPromises, "getPreloadDataPromises", "lib/utils/renderer.js");
}();

;