"use strict";

var path = require("path");
module.exports = function (source) {

  var bundleKey = path.basename(this.resourcePath, path.extname(this.resourcePath));

  var routesKeyword = "routes";
  var match = source.match(/exports.default[ \t]*=[ \t]*(\w+).*/);
  if (match.length && match.length >= 2) {
    routesKeyword = match[1];
  }

  var extendedSource = "\n  exports.bundleKey = " + JSON.stringify(bundleKey) + ";\n  ";

  if (process.env.NODE_ENV !== "development") {
    extendedSource += "\n    if (typeof window !== \"undefined\") {\n      window.__updatePage && window.__updatePage({ routes: " + routesKeyword + ", bundleKey: " + JSON.stringify(bundleKey) + " });\n      window.__renderRoutes && window.__renderRoutes();\n    }";
  }

  return source + "\n  " + extendedSource;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;