"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _map2 = require("lodash/map");

var _map3 = _interopRequireDefault(_map2);

var _find2 = require("lodash/find");

var _find3 = _interopRequireDefault(_find2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../utils/utils");

var _seo = require("../utils/seo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __development = process.env.NODE_ENV === "development";

var Html = (_temp = _class = function (_React$Component) {
  _inherits(Html, _React$Component);

  function Html() {
    _classCallCheck(this, Html);

    return _possibleConstructorReturn(this, (Html.__proto__ || Object.getPrototypeOf(Html)).apply(this, arguments));
  }

  _createClass(Html, [{
    key: "getMeta",
    value: function getMeta() {
      return (0, _seo.generateMeta)(this.props.seo, { baseUrl: this.props.baseUrl, url: this.props.url });
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      var allMeta = this.getMeta();
      var metaForTitle = (0, _find3.default)(allMeta, { name: "title" });
      if (metaForTitle) {
        return metaForTitle.content;
      }
      return "";
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          stylesheets = _props.stylesheets,
          scripts = _props.scripts,
          links = _props.links,
          inlineCss = _props.inlineCss;

      return _react2.default.createElement(
        "html",
        { lang: "en" },
        _react2.default.createElement(
          "head",
          null,
          (0, _map3.default)(this.getMeta(), function (meta, i) {
            return _react2.default.createElement("meta", _extends({ key: i }, meta));
          }),
          _react2.default.createElement(
            "title",
            null,
            this.getTitle()
          ),
          !__development && _react2.default.createElement("link", { rel: "manifest", href: "/manifest.json" }),
          inlineCss && inlineCss.length && _react2.default.createElement("style", { type: "text/css", dangerouslySetInnerHTML: { __html: inlineCss } }),
          (0, _map3.default)(stylesheets, function (path) {
            var pathHash = (0, _utils.generateStringHash)(path, "CSS");
            return _react2.default.createElement("link", { rel: "stylesheet", type: "text/css", key: pathHash, id: pathHash, href: path });
          }),
          (0, _map3.default)(links, function (link, i) {
            return _react2.default.createElement("link", _extends({ key: i }, link, { "data-type": "seo" }));
          }),
          this.props.pawHead
        ),
        _react2.default.createElement(
          "body",
          null,
          _react2.default.createElement(
            "div",
            { id: "app" },
            this.props.children
          ),
          !this.props.isBot && (0, _map3.default)(scripts, function (path) {
            var pathHash = (0, _utils.generateStringHash)(path, "JS");
            return _react2.default.createElement("script", { type: "text/javascript", key: pathHash, id: pathHash, src: path, defer: true });
          }),
          this.props.pawFooter
        )
      );
    }
  }]);

  return Html;
}(_react2.default.Component), _class.propTypes = {
  inlineCss: _propTypes2.default.string,
  stylesheets: _propTypes2.default.array,
  scripts: _propTypes2.default.array,
  pawHead: _propTypes2.default.array,
  pawFooter: _propTypes2.default.array,
  globals: _propTypes2.default.shape({}),
  seo: _propTypes2.default.shape({}),
  isBot: _propTypes2.default.bool,
  baseUrl: _propTypes2.default.string,
  url: _propTypes2.default.string,
  links: _propTypes2.default.array
}, _class.defaultProps = {
  inlineCss: "",
  stylesheets: [],
  scripts: [],
  pawHead: [],
  pawFooter: [],
  globals: {},
  seo: {},
  isBot: false,
  baseUrl: "",
  url: "",
  links: []
}, _temp);
exports.default = Html;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(__development, "__development", "lib/components/html.js");

  __REACT_HOT_LOADER__.register(Html, "Html", "lib/components/html.js");
}();

;