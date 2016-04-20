#!/usr/bin/env node
import argv       from 'yargs';
import shuffle    from 'knuth-shuffle';
import colors     from 'colors/safe';
import os         from 'os';
import bytestring from 'bytes';

import Queue      from './queue';

/**
 * Example
 * syni --type tga --start-id 0 --render --write-with 4      \
 * --write-delay 5m --prefix frame --write 5:25mb,10:10kb  \
 * --shuffle
**/

// Initialize
const _argv = argv
  .usage([colors.red('Usage:'),
    '--type, -t        {jpg,png,sgi,tif,dpx,tga,exr} (default: png)',
    '--start-id, -i    [num]                         (default: 1)',
    '--write-with, -c  [num]                         (optional)     (--render)',
    '--write-delay, -d [relative time]               (default: 5ms) (--render)',
    '--prefix, -p      [string]                      (default: frame)',
    '--write, -w       [num:filesize,...]',
    '--render, -r                                    (optional)',
    '--zero-byte, -z                                 (optional)     (--render)',
    '--shuffle                                       (optional)',
    '',
    colors.underline('Examples.'),
    'syni --type png -i 5 --write 5:12kb',
    'syni --type dpx --render --write 5:10.2mb,3:10.4mb,8:10mb --shuffle'
  ]
    .map(e => e
      .replace(/([\{\[].+[\}\]])/, colors.blue('$1'))
      .replace(/(\(.+\))/,      colors.yellow('$1')))
    .join(os.EOL))
  .demand(['write'])
  .implies('write-with',  'render')
  .implies('write-delay', 'render')
  .alias('t',        'type')
  .alias('i',    'start-id')
  .alias('c',  'write-with')
  .alias('d', 'write-delay')
  .alias('z',   'zero-byte')
  .alias('r',      'render')
  .alias('p',      'prefix')
  .alias('w',       'write')
  .epilog(`Copyright (C) ${new Date().getFullYear()}`)
  .argv;

// Determine the write queue buffer
const _writes = _argv.write
  .split(',')
  .map(e        => e.split(':'))
  .reduce((a,b) => {
    a.push.apply(a, [...new Array(b[0] >> 0)].map((_,i) => b[1]));
    return a;
  }, [])
  .filter(e     => bytestring(e) <= 1.2e+8);

// Shuffle?
const writes = (!!_argv.shuffle) ? shuffle.knuthShuffle(_writes) : _writes;

// Size of collection
_argv.size = _writes.length;

// Go.
const queue = new Queue(_argv);
queue
  .push(writes, () => {
    if (_argv['write-delay'] && !_argv['zero-byte']) {
      queue.pause();
      setTimeout(() => queue.resume(), _argv['write-delay']);
    }
});
