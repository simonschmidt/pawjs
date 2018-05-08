"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NETWORK_STATE_CHANGE = exports.NETWORK_STATE_CHANGE = "@@rrs/NETWORK_STATE_CHANGE";
var NETWORK_STATE_ONLINE = exports.NETWORK_STATE_ONLINE = "online";
var NETWORK_STATE_OFFLINE = exports.NETWORK_STATE_OFFLINE = "offline";

var networkOnline = exports.networkOnline = function networkOnline() {
  return {
    type: NETWORK_STATE_CHANGE,
    state: NETWORK_STATE_ONLINE
  };
};

var networkOffline = exports.networkOffline = function networkOffline() {
  return {
    type: NETWORK_STATE_CHANGE,
    state: NETWORK_STATE_OFFLINE
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NETWORK_STATE_CHANGE, "NETWORK_STATE_CHANGE", "lib/libs/network/action.js");

  __REACT_HOT_LOADER__.register(NETWORK_STATE_ONLINE, "NETWORK_STATE_ONLINE", "lib/libs/network/action.js");

  __REACT_HOT_LOADER__.register(NETWORK_STATE_OFFLINE, "NETWORK_STATE_OFFLINE", "lib/libs/network/action.js");

  __REACT_HOT_LOADER__.register(networkOnline, "networkOnline", "lib/libs/network/action.js");

  __REACT_HOT_LOADER__.register(networkOffline, "networkOffline", "lib/libs/network/action.js");
}();

;