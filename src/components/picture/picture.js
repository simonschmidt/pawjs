"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _isEmpty2 = require("lodash/isEmpty");

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _last2 = require("lodash/last");

var _last3 = _interopRequireDefault(_last2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _first2 = require("lodash/first");

var _first3 = _interopRequireDefault(_first2);

var _isString2 = require("lodash/isString");

var _isString3 = _interopRequireDefault(_isString2);

var _without2 = require("lodash/without");

var _without3 = _interopRequireDefault(_without2);

var _find2 = require("lodash/find");

var _find3 = _interopRequireDefault(_find2);

var _isArray2 = require("lodash/isArray");

var _isArray3 = _interopRequireDefault(_isArray2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fold = require("../fold/fold");

var _fold2 = _interopRequireDefault(_fold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Picture = (_temp = _class = function (_Component) {
  _inherits(Picture, _Component);

  function Picture(props) {
    _classCallCheck(this, Picture);

    var _this = _possibleConstructorReturn(this, (Picture.__proto__ || Object.getPrototypeOf(Picture)).call(this, props));

    _this.state = {
      image: _this.rearrange(props.image)
    };
    return _this;
  }

  _createClass(Picture, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        image: this.rearrange(nextProps.image)
      });
    }
  }, {
    key: "rearrange",
    value: function rearrange(image) {
      if (!(0, _isArray3.default)(image)) return image;
      var webpSet = (0, _find3.default)(image, function (img) {
        return img.type.toLowerCase() === "image/webp";
      });
      // If no webp set is found, then simply return the image as it is
      if (!webpSet) return image;

      var sortedImages = (0, _without3.default)(image, webpSet);
      sortedImages.unshift(webpSet);
      return sortedImages;
    }
  }, {
    key: "getFallbackSrc",
    value: function getFallbackSrc(image) {
      if ((0, _isString3.default)(image)) return image;
      if ((0, _isArray3.default)(image) && image.length >= 2) {
        var selectSet = (0, _find3.default)(image, function (img) {
          return img.type.toLowerCase() !== "image/webp";
        });
        if (!selectSet) {
          selectSet = (0, _first3.default)(image);
        }

        var placeholder = (0, _get3.default)(selectSet, "placeholder.url", "");
        if (placeholder) return placeholder;

        var sources = (0, _get3.default)(selectSet, "sources", {});
        var sourcesKeys = Object.keys(sources);
        if (!sourcesKeys.length) return "";
        return sources[(0, _last3.default)(sourcesKeys)];
      }
    }
  }, {
    key: "getSourceSrc",
    value: function getSourceSrc(image) {
      var sources = (0, _get3.default)(image, "sources", {});
      if ((0, _isEmpty3.default)(sources)) return "";
      return sources[(0, _last3.default)(Object.keys(sources))];
    }
  }, {
    key: "getSrcSet",
    value: function getSrcSet(image) {
      var srcSet = (0, _get3.default)(image, "srcSet", "");
      if (srcSet) return srcSet;

      return this.getSourceSrc(image) + " 1w";
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          alt = _props.alt,
          imgClassName = _props.imgClassName,
          pictureClassName = _props.pictureClassName;
      var image = this.state.image;

      return _react2.default.createElement(
        "picture",
        { className: pictureClassName },
        _react2.default.createElement(
          _fold2.default,
          null,
          Array.map(image, function (img, index) {
            return _react2.default.createElement("source", { type: img.type, srcSet: _this2.getSrcSet(img), key: index });
          })
        ),
        _react2.default.createElement("img", { className: imgClassName, src: this.getFallbackSrc(image), alt: alt })
      );
    }
  }]);

  return Picture;
}(_react.Component), _class.propTypes = {
  alt: _propTypes2.default.string,
  image: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.shape({
    "sources": _propTypes2.default.object,
    "type": _propTypes2.default.string,
    "srcSet": _propTypes2.default.string,
    "placeholder": _propTypes2.default.shape({
      "color": _propTypes2.default.array,
      "url": _propTypes2.default.string,
      "ratio": _propTypes2.default.number
    })
  })), _propTypes2.default.string]),
  pictureClassName: _propTypes2.default.string,
  imgClassName: _propTypes2.default.string
}, _class.defaultProps = {
  alt: "",
  image: [],
  pictureClassName: "",
  imgClassName: ""
}, _temp);
exports.default = Picture;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Picture, "Picture", "lib/components/picture/picture.js");
}();

;