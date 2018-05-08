"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.network = undefined;

var _assign2 = require("lodash/assign");

var _assign3 = _interopRequireDefault(_assign2);

var _action = require("./action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  "state": _action.NETWORK_STATE_ONLINE
};

var network = exports.network = function network() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _action.NETWORK_STATE_CHANGE:
      return (0, _assign3.default)({}, state, {
        "state": action.state
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

  __REACT_HOT_LOADER__.register(initialState, "initialState", "lib/libs/network/reducer.js");

  __REACT_HOT_LOADER__.register(network, "network", "lib/libs/network/reducer.js");
}();

;