"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MoveAfterEmit(params) {
  this.params = params;
}

function copyFileSync(source, target) {

  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (_fs2.default.existsSync(target)) {
    if (_fs2.default.lstatSync(target).isDirectory()) {
      targetFile = _path2.default.join(target, _path2.default.basename(source));
    }
  }

  _fs2.default.writeFileSync(targetFile, _fs2.default.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  var files = [];

  //check if folder needs to be created or integrated
  var targetFolder = _path2.default.join(target, _path2.default.basename(source));
  if (!_fs2.default.existsSync(targetFolder)) {
    _fs2.default.mkdirSync(targetFolder);
  }

  //copy
  if (_fs2.default.lstatSync(source).isDirectory()) {
    files = _fs2.default.readdirSync(source);
    files.forEach(function (file) {
      var curSource = _path2.default.join(source, file);
      if (_fs2.default.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

var rmdir = function rmdir(dir) {
  var list = _fs2.default.readdirSync(dir);
  for (var i = 0; i < list.length; i++) {
    var filename = _path2.default.join(dir, list[i]);
    var stat = _fs2.default.statSync(filename);

    if (filename === "." || filename === "..") {
      // pass these files
    } else if (stat.isDirectory()) {
      // rmdir recursively
      rmdir(filename);
    } else {
      // rm fiilename
      _fs2.default.unlinkSync(filename);
    }
  }
  _fs2.default.rmdirSync(dir);
};

MoveAfterEmit.prototype.apply = function (compiler) {
  var params = this.params;
  var outputPath = "";
  try {
    outputPath = compiler.options.output.path;
  } catch (ex) {
    outputPath = "";
  }

  compiler.plugin("done", function (compilation) {
    outputPath = outputPath || compilation.compiler.outputPath;
    params.forEach(function (_ref) {
      var from = _ref.from,
          to = _ref.to;


      var completeFromPath = _path2.default.join(outputPath, from);
      var completeToPath = _path2.default.join(outputPath, to);
      if (_fs2.default.existsSync(completeFromPath)) {
        copyFolderRecursiveSync(completeFromPath, completeToPath);
        rmdir(completeFromPath);
      }
    });
  });
};

module.exports = MoveAfterEmit;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MoveAfterEmit, "MoveAfterEmit", "lib/webpack/config/move-after-emit.js");

  __REACT_HOT_LOADER__.register(copyFileSync, "copyFileSync", "lib/webpack/config/move-after-emit.js");

  __REACT_HOT_LOADER__.register(copyFolderRecursiveSync, "copyFolderRecursiveSync", "lib/webpack/config/move-after-emit.js");

  __REACT_HOT_LOADER__.register(rmdir, "rmdir", "lib/webpack/config/move-after-emit.js");
}();

;