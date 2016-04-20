<img src="https://dl.dropboxusercontent.com/u/10131836/syni_logo.svg" width="300">
A tool that simulates rendering, developed for rapid testing of Ramma.

## Example


<pre>syni --type tga --start-id 0 --render --write-with 4    \
--write-delay 5m --prefix frame --write 5:25mb,10:10kb  \
--shuffle</pre>

## Details


Syni supports the common render image formats:
* tga
* dpx
* sgi
* exr
* jpg
* tif
* png


The images that Syni builds are valid in that they comply with their respective file-type header specification. The application is highly efficient by utilizing a system of streams and declarative programming through an asynchronous queue.

## Usage

Flag | Options | Additional
--- | --- | ---
'--type, -t     |   {jpg,png,sgi,tif,dpx,tga,exr} | (default: png)',
'--start-id, -i |   [num]                         | (default: 0)',
'--write-with, -c |  [num]                        | (optional)     (--render)',
'--write-delay, -d | [relative time]              | (default: 5ms) (--render)',
'--prefix, -p  |    [string]                      | (default: frame)',
'--write, -w    |   [num:filesize,...]', |
'--render, -r  |                      |            (optional)',
'--zero-byte, -z  |                      |         (optional)     (--render)',
'--shuffle    |                            |       (optional)'

Options marked with `--render` require the flag.

- `type`: Image (frame) type
- `start-id`: The initial integer by which to increment *(note that padding is applied .e.g. frame_001, ..., frame_100)*
- `prefix`: name of render *(default: frame, e.g. frame_01)*
- `write-with`: Compose frames in sets of `num` for every cycle
- `write-delay`: When used with `zero-byte` a delay of `ms` *(.e.g. 500)* is simulated between the creation of the zero-byte file and the completion of the frame
- `write`: A collection of specified frame file size and amount *(e.g. `10:5kb`, or a set `10:5kb,8:1mb,3:15mb`. note that no specified size may be larger than 120mb)*
- `shuffle`: Given an in-order collection of sets like above, shuffle individually each frame


### License

Copyright (c) 2016 Made by Flame

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
