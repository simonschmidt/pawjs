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

var ConnectedRouter = (_temp = _class = function (_Component) {
  _inherits(ConnectedRouter, _Component);

  function ConnectedRouter() {
    _classCallCheck(this, ConnectedRouter);

    return _possibleConstructorReturn(this, (ConnectedRouter.__proto__ || Object.getPrototypeOf(ConnectedRouter)).apply(this, arguments));
  }

  _createClass(ConnectedRouter, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(this.props.Router, this.props);
    }
  }]);

  return ConnectedRouter;
}(_react.Component), _class.propTypes = {
  store: _propTypes2.default.object,
  history: _propTypes2.default.object,
  children: _propTypes2.default.node,
  Router: _propTypes2.default.any.isRequired
}, _class.contextTypes = {
  store: _propTypes2.default.object
}, _temp);
exports.default = ConnectedRouter;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ConnectedRouter, "ConnectedRouter", "lib/libs/ConnectedRouter/ConnectedRouter.server.js");
}();

;