"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SCREEN_STATE_CHANGE = exports.SCREEN_STATE_CHANGE = "@@rrs/SCREEN_STATE_CHANGE";
var SCREEN_ANIMATION_CHANGE = exports.SCREEN_ANIMATION_CHANGE = "@@rrs/SCREEN_ANIMATION_CHANGE";
var ANIMATE_SCREEN_SECTION = exports.ANIMATE_SCREEN_SECTION = "@rrs/ANIMATE_SECTION";
var SCREEN_STATE_LOADING = exports.SCREEN_STATE_LOADING = "loading";
var SCREEN_STATE_LOADED = exports.SCREEN_STATE_LOADED = "loaded";
var SCREEN_STATE_PAGE_EXIT = exports.SCREEN_STATE_PAGE_EXIT = "page_exit";
var SCREEN_STATE_PAGE_ENTER = exports.SCREEN_STATE_PAGE_ENTER = "page_enter";
var ANIMATE_PAGE = exports.ANIMATE_PAGE = "page";

var screenLoading = exports.screenLoading = function screenLoading() {
  return {
    type: SCREEN_STATE_CHANGE,
    state: SCREEN_STATE_LOADING
  };
};

var screenLoaded = exports.screenLoaded = function screenLoaded() {
  return {
    type: SCREEN_STATE_CHANGE,
    state: SCREEN_STATE_LOADED
  };
};

var screenPageExit = exports.screenPageExit = function screenPageExit() {
  return {
    type: SCREEN_ANIMATION_CHANGE,
    state: SCREEN_STATE_PAGE_EXIT
  };
};

var screenPageEnter = exports.screenPageEnter = function screenPageEnter() {
  return {
    type: SCREEN_ANIMATION_CHANGE,
    state: SCREEN_STATE_PAGE_ENTER
  };
};

var animateSection = exports.animateSection = function animateSection() {
  var animateSection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ANIMATE_PAGE;

  return {
    type: ANIMATE_SCREEN_SECTION,
    animate_section: animateSection
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(SCREEN_STATE_CHANGE, "SCREEN_STATE_CHANGE", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(SCREEN_ANIMATION_CHANGE, "SCREEN_ANIMATION_CHANGE", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(ANIMATE_SCREEN_SECTION, "ANIMATE_SCREEN_SECTION", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(SCREEN_STATE_LOADING, "SCREEN_STATE_LOADING", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(SCREEN_STATE_LOADED, "SCREEN_STATE_LOADED", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(SCREEN_STATE_PAGE_EXIT, "SCREEN_STATE_PAGE_EXIT", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(SCREEN_STATE_PAGE_ENTER, "SCREEN_STATE_PAGE_ENTER", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(ANIMATE_PAGE, "ANIMATE_PAGE", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(screenLoading, "screenLoading", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(screenLoaded, "screenLoaded", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(screenPageExit, "screenPageExit", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(screenPageEnter, "screenPageEnter", "lib/components/screen/action.js");

  __REACT_HOT_LOADER__.register(animateSection, "animateSection", "lib/components/screen/action.js");
}();

;