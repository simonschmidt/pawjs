"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var error404 = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    pathname: state.router.location.pathname
  };
}), _dec(_class = function (_Component) {
  _inherits(error404, _Component);

  function error404() {
    _classCallCheck(this, error404);

    return _possibleConstructorReturn(this, (error404.__proto__ || Object.getPrototypeOf(error404)).apply(this, arguments));
  }

  _createClass(error404, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          pathname = _props.pathname,
          staticContext = _props.staticContext;

      if (staticContext) {
        staticContext.status = 404;
      }
      /**
       * @patch
       * When a page is loading and even common modules is not
       * loaded, then user tries to go back, it takes him to 404 page
       * As this is expected we simply ask user to check if
       * url is still loading and if so, go back
       * (as per history user will already on back page) and reload the url
       */
      if (typeof window !== "undefined") {
        if (window.__URL_LOADING__) {
          window.location.reload(false);
          return null;
        }
      }
      return _react2.default.createElement(
        "div",
        { className: "container text-center mt-5" },
        _react2.default.createElement(
          "h1",
          { className: "mt-5" },
          "404"
        ),
        _react2.default.createElement(
          "p",
          { className: "h3" },
          "Page not found"
        ),
        _react2.default.createElement(
          "p",
          null,
          _react2.default.createElement(
            "small",
            null,
            _react2.default.createElement(
              "i",
              null,
              pathname
            )
          )
        ),
        _react2.default.createElement(
          "p",
          null,
          "The page you are looking for doesn't exists. Go back."
        )
      );
    }
  }]);

  return error404;
}(_react.Component)) || _class);
exports.default = error404;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(error404, "error404", "lib/components/error/404.js");
}();

;