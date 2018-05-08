"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getErrorComponent = exports.applyServerFilter = undefined;

var _renderer = require("./renderer");

var _reactRouter = require("react-router");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Apply server filter
 */
var applyServerFilter = exports.applyServerFilter = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
    for (var _len = arguments.length, otherArgs = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      otherArgs[_key - 3] = arguments[_key];
    }

    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var data = arguments[2];

    var _res$locals$wook;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(res && res.locals && res.locals.wook && res.locals.wook.apply_filters && name)) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return (_res$locals$wook = res.locals.wook).apply_filters.apply(_res$locals$wook, [name, data].concat(_toConsumableArray(otherArgs)));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
            return _context.abrupt("return", data);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function applyServerFilter(_x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * return the error component when error is provided with storage, store and api
 * @param err
 * @param store
 * @param storage
 * @param api
 */
var getErrorComponent = exports.getErrorComponent = function getErrorComponent(err, store, storage, api) {
  if (!(err instanceof Error)) {
    err = new Error(err);
  }
  err.statusCode = err.statusCode || 500;
  return (0, _renderer.renderErrorPage)({
    render: false,
    Router: _reactRouter.StaticRouter,
    Route: _reactRouter.Route,
    Switch: _reactRouter.Switch,
    error: err,
    store: store,
    storage: storage,
    api: api
  });
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(applyServerFilter, "applyServerFilter", "lib/utils/server.js");

  __REACT_HOT_LOADER__.register(getErrorComponent, "getErrorComponent", "lib/utils/server.js");
}();

;