"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SHOW_TIMEOUT = 50;

/**
 A component for configurable skip loading.
 @examples
  <Fold skip={true}>
    <Footer />
  </Fold>
 @returns {ReactElement} The rendered component
 */

var Fold = (_temp = _class = function (_Component) {
  _inherits(Fold, _Component);

  function Fold(props, context) {
    _classCallCheck(this, Fold);

    var _this = _possibleConstructorReturn(this, (Fold.__proto__ || Object.getPrototypeOf(Fold)).call(this, props, context));

    if (props.skip) {
      _this.state = { visible: false };
    }

    _this._onShow = _this._onShow.bind(_this);
    return _this;
  }

  _createClass(Fold, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.state.visible) {
        this.timeout = setTimeout(this._onShow, SHOW_TIMEOUT);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = undefined;
      }
    }
  }, {
    key: "_onShow",
    value: function _onShow() {
      this.setState({ visible: true });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.visible || !this.props.skip) {

        if (!this.props.children) return null;

        return this.props.children;
      }

      if (this.props.placeholder) return _react2.default.createElement(this.props.placeholder, null);

      return null;
    }
  }]);

  return Fold;
}(_react.Component), _class.propTypes = {
  /**
   Children to render when visible
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),

  /**
   Pass in another element to render when skipping server side rendering
   */
  placeholder: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),

  /**
   * Tell to skip server side rendering
   */
  skip: _propTypes2.default.bool
}, _class.defaultProps = {
  skip: true
}, _temp);
exports.default = Fold;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(SHOW_TIMEOUT, "SHOW_TIMEOUT", "lib/components/fold/fold.js");

  __REACT_HOT_LOADER__.register(Fold, "Fold", "lib/components/fold/fold.js");
}();

;