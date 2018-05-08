"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require("react-redux");

var _action = require("../screen/action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transition = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    screenAnimation: state.screen.animation,
    animateSection: state.screen.animate_section
  };
}), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(Transition, _Component);

  function Transition() {
    _classCallCheck(this, Transition);

    return _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).apply(this, arguments));
  }

  _createClass(Transition, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          onEnterClassName = _props.onEnterClassName,
          onExitClassName = _props.onExitClassName;

      var animationClass = onEnterClassName;
      if (this.props.screenAnimation === _action.SCREEN_STATE_PAGE_EXIT && this.props.animateSection === this.props.sectionName) {
        animationClass = onExitClassName;
      }
      return _react2.default.createElement(
        "div",
        { style: style, className: className + " " + animationClass },
        this.props.children || null
      );
    }
  }]);

  return Transition;
}(_react.Component), _class2.propTypes = {
  sectionName: _propTypes2.default.string
}, _class2.defaultProps = {
  sectionName: _action.ANIMATE_PAGE
}, _temp)) || _class);
exports.default = Transition;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Transition, "Transition", "lib/components/transition/transition.js");
}();

;