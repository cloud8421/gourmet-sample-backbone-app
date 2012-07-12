# Gourmet

Sample application (a database restaurant) that includes support for Coffeescript compilation and Jasmine BDD testing.

## Grunt support

The bundled `Gruntfile` offers a few facilities:

- convert, concat and minify coffee files
- a watch task that executes all of the above every time you save and runs the test suite in a headless environment
- in addition it's  possible to use [Livereload](http://livereload.com/) by installing the browser extension and running `grunt`. Right now it works properly with Chrome.

## Headless testing

It requires [Phantomjs](http://phantomjs.org/). If you're on a Mac and use Homebrew, just `brew install phantomjs`. The test task can be invoked separately by running `grunt shell`, however it's part of the `watch` task so that shouldn't be necessary.

Alternatively, visiting [the test page](http://localhost:8000/SpecRunner.html) will run specs in the browser (better for debugging).

## Hard dependencies

- Node with npm
- Phantomjs
