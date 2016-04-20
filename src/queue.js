import fs      from 'fs';
import async   from 'async';
import header  from './headers';
import bytes   from './bytes';

export default class Queue {
  constructor(options={}) {
    this.tasks = options['start-id'] || 1;
    this.queue = async.queue((task, callback) => {
      options.type  = options.type || 'png';
      const diff    = options.size.toString().length-(this.tasks).toString().length,
        id          = '0'.repeat(diff < 0 ? 0 : diff).concat(this.tasks++),
        name        = `${options.prefix || 'frame'}_${id}.${options.type}`,
        file        = fs.createWriteStream(name);
      if (options['zero-byte']) {
        file.write('','utf8', () => {
          setTimeout(() => {
            file.write(header[options.type]);
            file.write(bytes(task));
            file.end();
          }, options['write-delay'] || 5);
        });
      } else {
        file.write(header[options.type]);
        file.write(bytes(task));
        file.end();
      }
      file.on('finish', () => {
        console.log('Syni is writing %s...', name);
        callback();
      })
    }, options['write-with'] || 1);
    this.queue.drain = () => {
      console.log('done.');
    };
    return this.queue;
  }
}
