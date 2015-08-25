# Mockup Web Viewer

The main goal of this software is to provide myself and anyone else interested with the ability to present website graphic mockups to the client via url link. So at most cases it is supposed to male life of web designer little bit easier.

Pros (imho):
- your client gets slick preview for your work right in the window of his web browser.
- you can edit content by adding your jpegs/png mockup files and modifying json text file. Javascript application will do the rest - populate main page with the list of links and create individual widescreen preview for each of your mockups.
- you don't need to run any webserver software for this previewer to work.
- you don't need to edit any code.

Cons:
- Modyfying .json file is still somewhat tedious task.

AngularJS was used to do the most heavy lifting.

## How to use

1. Clone the repository or download .zip somewhere here.
2. Copy folder 'distr' somewhere. Feel free to rename it as you like.
3. Add your mockups into folder 'mockups'.
4. Edit mockups.json file to correspond to your project and new set of mockup files you just added.
5. Replace example logo PNG or leave it's link in json file empty if you are not going to use it.
5. Upload entire folder (former 'disrt' if you renamed it already) to your website.
6. Open at http://your.website.com/path/to/your/mockups/folder (it's only and example url).

## Live preview

[Demo](http://tests.candyface.ru/mwv).

## Versions

### alpha 0.01

- just basic functionality.


<!-- ## Documentation

Documentation is available on the
[AngularJS docs site](http://docs.angularjs.org/guide/bootstrap).
 -->
<!-- ## License

The MIT License

Copyright (c) 2015 Slava Komarov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 -->