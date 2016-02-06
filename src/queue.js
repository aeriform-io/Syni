import fs      from 'fs';
import async   from 'async';
import header  from './headers';
import bytes   from './bytes';

export default class Queue {
  constructor(options={}) {
    this.tasks  = options['start-id'] || 0;
    this.called = false;
    this.queue = async.queue((task, callback) => {
      const name = `${options.prefix || 'frame'}_${this.tasks++}.${options.type || png}`;
      const file = fs.createWriteStream(name);
      if (options['zero-byte']) {
        file.write('','utf8', () => {
          setTimeout(() => {
            if (options['buffer-delay']) {
              this.called = true;
              callback();
              setTimeout(() => {
                file.write(header[options.type]);
                file.write(bytes(task))
                file.end();
              }, options['buffer-delay']);
            } else {
              file.write(header[options.type]);
              file.write(bytes(task));
              file.end();
            }
          }, options['write-delay'] || 5);
        });
      } else {
        if (options['buffer-delay']) {
          this.called = true;
          callback();
          setTimeout(() => {
            file.write(header[options.type]);
            file.write(bytes(task))
            file.end();
          }, options['buffer-delay']);
        } else {
          file.write(header[options.type]);
          file.write(bytes(task));
          file.end();
        }
      }
      file.on('finish', () => {
        console.log('Osk is writing %s...', name);
        if (!this.called) callback();
      })
    }, options['write-with'] || 1);
    this.queue.drain = () => {
      if (!this.called) console.log('done.');
    };
    return this.queue;
  }
}
