"use strict";

var _universalFetch = require("universal-fetch");

var _universalFetch2 = _interopRequireDefault(_universalFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require("jsdom"),
    JSDOM = _require.JSDOM;

// Add polyfill of browser where necessary


if (typeof window === "undefined") {
  var _window = new JSDOM("", { runScripts: "outside-only" }).window;

  // Adding custom event
  if (typeof _window.CustomEvent !== "function") {
    var CustomEvent = function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    CustomEvent.prototype = _window.Event.prototype;
    _window.CustomEvent = CustomEvent;
  }

  // Add fetch to window
  _window.fetch = _universalFetch2.default;

  var document = _window.document,
      navigator = _window.navigator;


  global.window = _window;
  global.document = document;
  global.navigator = navigator;
  global.CustomEvent = _window.CustomEvent;
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;