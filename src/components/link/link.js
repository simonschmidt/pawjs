"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require("react-router-dom");

var _action = require("../screen/action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    reduxAnimateSection: state.screen.animate_section
  };
}), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(Link, _Component);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
  }

  _createClass(Link, [{
    key: "onClick",
    value: function onClick() {
      var _props;

      if (this.props.reduxAnimateSection !== this.props.animateSection) {
        this.props.dispatch((0, _action.animateSection)(this.props.animateSection));
      }
      return (_props = this.props).onClick.apply(_props, arguments);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // eslint-disable-next-line
      var _props2 = this.props,
          animateSection = _props2.animateSection,
          onClick = _props2.onClick,
          dispatch = _props2.dispatch,
          reduxAnimateSection = _props2.reduxAnimateSection,
          otherProps = _objectWithoutProperties(_props2, ["animateSection", "onClick", "dispatch", "reduxAnimateSection"]);

      return _react2.default.createElement(
        _reactRouterDom.Link,
        _extends({}, otherProps, { onClick: function onClick() {
            return _this2.onClick.apply(_this2, arguments);
          } }),
        this.props.children
      );
    }
  }]);

  return Link;
}(_react.Component), _class2.propTypes = {
  animateSection: _propTypes2.default.string,
  onClick: _propTypes2.default.func
}, _class2.defaultProps = {
  animateSection: _action.ANIMATE_PAGE,
  onClick: function onClick() {
    return null;
  }
}, _temp)) || _class);
exports.default = Link;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Link, "Link", "lib/components/link/link.js");
}();

;