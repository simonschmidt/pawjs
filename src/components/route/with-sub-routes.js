"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require("react-router-dom");

var _renderer = require("../../utils/renderer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouteWithSubRoutes = (_temp = _class = function (_React$Component) {
  _inherits(RouteWithSubRoutes, _React$Component);

  function RouteWithSubRoutes() {
    _classCallCheck(this, RouteWithSubRoutes);

    return _possibleConstructorReturn(this, (RouteWithSubRoutes.__proto__ || Object.getPrototypeOf(RouteWithSubRoutes)).apply(this, arguments));
  }

  _createClass(RouteWithSubRoutes, [{
    key: "renderAbstract",
    value: function renderAbstract(route) {
      return _react2.default.createElement(
        route.component,
        _extends({
          preLoadedData: route.preLoadedData,
          parentPreLoadedData: this.props.parentPreLoadedData,
          api: this.props.api,
          storage: this.props.storage
        }, route.props, {
          routes: route.routes
        }),
        (0, _renderer.renderSubRoutes)({
          props: {
            api: this.props.api,
            storage: this.props.storage,
            preLoadedData: route.preLoadedData,
            routes: route.routes
          }
        })
      );
    }
  }, {
    key: "renderWithLayout",
    value: function renderWithLayout(route) {
      var _this2 = this;

      if (!route.layout) return this.renderRoute(route);
      return _react2.default.createElement(_reactRouterDom.Route, {
        path: route.path,
        exact: route.exact,
        render: function render(props) {

          return _react2.default.createElement(
            route.layout,
            _extends({
              parentPreLoadedData: _this2.props.parentPreLoadedData,
              preLoadedData: route.preLoadedData,
              api: _this2.props.api,
              storage: _this2.props.storage
            }, route.props, props),
            route.abstract ? _this2.renderAbstract(route) : _this2.renderComponent(route, props)
          );
        }
      });
    }
  }, {
    key: "renderComponent",
    value: function renderComponent(route, props) {
      return _react2.default.createElement(route.component, _extends({
        preLoadedData: route.preLoadedData,
        routes: route.routes,
        api: this.props.api,
        storage: this.props.storage,
        parentPreLoadedData: this.props.parentPreLoadedData
      }, route.props, props));
    }
  }, {
    key: "renderRoute",
    value: function renderRoute(route) {
      var _this3 = this;

      return _react2.default.createElement(_reactRouterDom.Route, {
        path: route.path,
        exact: route.exact,
        render: function render(props) {
          return _this3.renderComponent(route, props);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var route = this.props.route;

      if (route.layout) {
        return this.renderWithLayout(route);
      }
      if (route.abstract) {
        return this.renderAbstract(route);
      }
      return this.renderRoute(route);
    }
  }]);

  return RouteWithSubRoutes;
}(_react2.default.Component), _class.propTypes = {
  route: _propTypes2.default.shape({
    abstract: _propTypes2.default.bool,
    bundleKey: _propTypes2.default.string.isRequired,
    component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    exact: _propTypes2.default.bool,
    layout: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.element, _propTypes2.default.func]),
    path: _propTypes2.default.string,
    preLoadedData: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.shape({})]),
    props: _propTypes2.default.object,
    routes: _propTypes2.default.arrayOf(_propTypes2.default.shape({})),
    seo: _propTypes2.default.shape({})
  }).isRequired,
  api: _propTypes2.default.any,
  storage: _propTypes2.default.any,
  parentPreLoadedData: _propTypes2.default.any
}, _class.defaultProps = {
  route: {
    abstract: false,
    exact: false,
    layout: false,
    preLoadedData: {},
    props: {},
    routes: []
  },
  parentPreLoadedData: {}
}, _temp);
var _default = RouteWithSubRoutes;
exports.default = _default;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(RouteWithSubRoutes, "RouteWithSubRoutes", "lib/components/route/with-sub-routes.js");

  __REACT_HOT_LOADER__.register(_default, "default", "lib/components/route/with-sub-routes.js");
}();

;