import bytes from 'bytes';
export default function(size, offset=0) {
   return new Buffer(bytes(size) - offset);
}
