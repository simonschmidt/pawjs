"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _forEach2 = require("lodash/forEach");

var _forEach3 = _interopRequireDefault(_forEach2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require("react");

var _reactRedux = require("react-redux");

var _utils = require("../../utils/utils");

var _action = require("../screen/action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __development = process.env.NODE_ENV === "development";

var CoreRoot = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    screen: state.screen
  };
}), _dec(_class = function (_Component) {
  _inherits(CoreRoot, _Component);

  function CoreRoot() {
    _classCallCheck(this, CoreRoot);

    return _possibleConstructorReturn(this, (CoreRoot.__proto__ || Object.getPrototypeOf(CoreRoot)).apply(this, arguments));
  }

  _createClass(CoreRoot, [{
    key: "loadPreloadCSS",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var linksPromise;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                linksPromise = [];

                if (!(typeof window !== "undefined" && typeof window.document !== "undefined")) {
                  _context.next = 6;
                  break;
                }

                (0, _forEach3.default)(window.document.querySelectorAll("link[rel=preload]"), function (link) {
                  linksPromise.push((0, _utils.loadStyle)(link.href));
                });

                if (!linksPromise.length) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return Promise.all(linksPromise);

              case 6:
                return _context.abrupt("return", Promise.resolve());

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadPreloadCSS() {
        return _ref.apply(this, arguments);
      }

      return loadPreloadCSS;
    }()
  }, {
    key: "loadGoogleAnalytics",
    value: function loadGoogleAnalytics() {
      if (typeof window === "undefined") return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js"
      });
      // change gtm
      (0, _utils.loadScript)("https://www.googletagmanager.com/gtm.js?id=GTM-TW9PBND").catch();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // Trigger screenLoaded once all the preload-css are loaded
      this.loadPreloadCSS().then(function () {
        _this2.props.dispatch((0, _action.screenLoaded)());
      });
      // Load google analytics
      !__development && this.loadGoogleAnalytics();
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children || null;
    }
  }]);

  return CoreRoot;
}(_react.Component)) || _class);
exports.default = CoreRoot;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(__development, "__development", "lib/components/root/root.js");

  __REACT_HOT_LOADER__.register(CoreRoot, "CoreRoot", "lib/components/root/root.js");
}();

;