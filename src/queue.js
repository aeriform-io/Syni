import fs      from 'fs';
import async   from 'async';
import header  from './headers';
import bytes   from './bytes';

export default class Queue {
  constructor(options={}) {
    this.tasks = options['start-id'] || 0;
    this.queue = async.queue((task, callback) => {
      const name = `${options.prefix || 'frame'}_${this.tasks++}.${options.type}`;
      const file = fs.createWriteStream(name);
      file.write(header[options.type]);
      file.write(bytes(task));
      file.end();
      file.on('finish', () => {
        console.log('Osk is writing %s...', name);
        callback();
      })
    }, options['write-with'] || 1);
    this.queue.drain = () => {
      console.log('done.');
    };
    return this.queue;
  }
}
