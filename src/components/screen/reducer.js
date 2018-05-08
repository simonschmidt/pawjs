"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.screen = undefined;

var _assign2 = require("lodash/assign");

var _assign3 = _interopRequireDefault(_assign2);

var _action = require("./action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  "state": _action.SCREEN_STATE_LOADED,
  "animation": _action.SCREEN_STATE_PAGE_ENTER,
  "animate_section": _action.ANIMATE_PAGE
};

var screen = exports.screen = function screen() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _action.SCREEN_STATE_CHANGE:
      return (0, _assign3.default)({}, state, {
        "state": action.state
      });
    case _action.SCREEN_ANIMATION_CHANGE:
      return (0, _assign3.default)({}, state, {
        "animation": action.state
      });
    case _action.ANIMATE_SCREEN_SECTION:
      return (0, _assign3.default)({}, state, {
        "animate_section": action.animate_section
      });
    default:
      return state;
  }
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(initialState, "initialState", "lib/components/screen/reducer.js");

  __REACT_HOT_LOADER__.register(screen, "screen", "lib/components/screen/reducer.js");
}();

;