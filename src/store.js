"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = configureStore;
exports.injectAsyncReducers = injectAsyncReducers;

var _redux = require("redux");

var _reactRouterRedux = require("react-router-redux");

var _reducers = require("./reducers");

var coreReducers = _interopRequireWildcard(_reducers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createReducer = function createReducer() {
  var reducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _redux.combineReducers)(_extends({}, reducers, coreReducers, {
    router: _reactRouterRedux.routerReducer
  }));
};

var composeEnhancers = _redux.compose;
if (typeof window !== "undefined") {
  composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || _redux.compose;
}

function configureStore(_ref) {
  var _ref$initialState = _ref.initialState,
      initialState = _ref$initialState === undefined ? {} : _ref$initialState,
      history = _ref.history,
      _ref$middleware = _ref.middleware,
      middleware = _ref$middleware === undefined ? [] : _ref$middleware,
      _ref$reducers = _ref.reducers,
      reducers = _ref$reducers === undefined ? {} : _ref$reducers,
      _ref$enhancers = _ref.enhancers,
      enhancers = _ref$enhancers === undefined ? [] : _ref$enhancers;

  // Add history middleware
  var historyMiddleware = (0, _reactRouterRedux.routerMiddleware)(history);
  middleware.push(historyMiddleware);

  var store = (0, _redux.createStore)(createReducer(reducers), initialState, composeEnhancers.apply(undefined, _toConsumableArray(enhancers).concat([_redux.applyMiddleware.apply(undefined, _toConsumableArray(middleware))])));
  store.asyncReducers = reducers;
  return store;
}

function injectAsyncReducers(store, asyncReducers) {
  store.asyncReducers = _extends({}, store.asyncReducers, asyncReducers);
  store.replaceReducer(createReducer(store.asyncReducers));
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createReducer, "createReducer", "lib/store.js");

  __REACT_HOT_LOADER__.register(composeEnhancers, "composeEnhancers", "lib/store.js");

  __REACT_HOT_LOADER__.register(configureStore, "configureStore", "lib/store.js");

  __REACT_HOT_LOADER__.register(injectAsyncReducers, "injectAsyncReducers", "lib/store.js");
}();

;