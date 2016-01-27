#!/usr/bin/env node
'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _knuthShuffle = require('knuth-shuffle');

var _knuthShuffle2 = _interopRequireDefault(_knuthShuffle);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _bytes = require('bytes');

var _bytes2 = _interopRequireDefault(_bytes);

var _queue = require('./queue');

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Example
 * osk --type tga --start-id 0 --render --write-with 4      \
 * --write-delay 5m --prefix frame --write 5:25mb,10:10kb  \
 * --shuffle
**/

// Initialize
var _argv = _yargs2.default.usage([_safe2.default.red('Usage:'), '--type, -t        {jpg,png,sgi,tif,dpx,tga,exr} (default: png)', '--start-id, -i    [num]                         (default: 0)', '--write-with, -c  [num]                         (optional)     (--render)', '--write-delay, -d [relative time]               (default: 5ms) (--render)', '--prefix, -p      [string]                      (default: frame)', '--write, -w       [num:filesize,...]', '--render, -r                                    (optional)', '--zero-byte, -z                                 (optional)     (--render)', '--shuffle                                       (optional)', '', _safe2.default.underline('Examples.'), 'osk --type png -i 5 --write 5:12kb', 'osk --type dpx --render --write 5:10.2mb,3:10.4mb,8:10mb --shuffle'].map(function (e) {
  return e.replace(/([\{\[].+[\}\]])/, _safe2.default.blue('$1')).replace(/(\(.+\))/, _safe2.default.yellow('$1'));
}).join(_os2.default.EOL)).demand(['write']).implies('write-with', 'render').implies('write-delay', 'render').alias('t', 'type').alias('i', 'start-id').alias('c', 'write-with').alias('d', 'write-delay').alias('z', 'zero-byte').alias('r', 'render').alias('p', 'prefix').alias('w', 'write').epilog('Copyright (C) ' + new Date().getFullYear()).argv;

// Determine the write queue buffer
var _writes = _argv.write.split(',').map(function (e) {
  return e.split(':');
}).reduce(function (a, b) {
  a.push.apply(a, [].concat(_toConsumableArray(new Array(b[0] >> 0))).map(function (_, i) {
    return b[1];
  }));
  return a;
}, []).filter(function (e) {
  return (0, _bytes2.default)(e) <= 1.2e+8;
});

// Shuffle?
var writes = !!_argv.shuffle ? _knuthShuffle2.default.knuthShuffle(_writes) : _writes;

// Go.
var queue = new _queue2.default(_argv).push(writes);