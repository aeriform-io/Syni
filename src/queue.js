import async from 'async';

const queue = async.queue(function(task, callback) {
  callback();
});
