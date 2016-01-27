'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

exports.default = function (size) {
   var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

   return new Buffer((0, _bytes2.default)(size) - offset);
};

var _bytes = require('bytes');

var _bytes2 = _interopRequireDefault(_bytes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }