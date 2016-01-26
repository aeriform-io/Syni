#!/usr/bin/env node
import argv     from 'yargs';
import colors   from 'colors/safe';
import os       from 'os';
import bytes    from './bytes';

/**
 * Example
 * osk -type tga -start-id 0 --render -write-with 4     \
 * -write-delay 5m -prefix frame -write 5:25mb, 10:10kb \
 * --shuffle
**/

// Initialize
const _argv = argv
  .usage([colors.red('Usage:'),
    '--type        {jpg,png,sgi,tif,dpx,tga,exr} (default: png)',
    '--start-id    [num]                         (default: 0)',
    '--write-with  [num]                         (optional)     (--render required)',
    '--write-delay [relative time]               (default: 5ms) (--render required)',
    '--prefix      [string]                      (default: frame)',
    '--write       [num:filesize,...]',
    '--render                                   (optional)',
    '--shuffle                                  (optional)',
    '',
    colors.underline('Examples.'),
    'osk --type png --write 5:12kb',
    'osk --type dpx --render --write 5:10.2mb,3:10.4mb,8:10mb --shuffle'
  ]
    .map(e => e
      .replace(/([\{\[].+[\}\]])/, colors.blue('$1'))
      .replace(/(\(.+\))/, colors.yellow('$1')))
    .join(os.EOL))
  .demand(['write'])
  .implies('write-with',  'render')
  .implies('write-delay', 'render')
  .epilog(`Copyright (C) ${new Date().getFullYear()}`)
  .argv;
