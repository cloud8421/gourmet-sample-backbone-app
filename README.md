# Coffeescript client-side add template

This skeleton includes support for Coffeescript compilation and Jasmine BDD testing with minimal-to-no customization required.
Just remember to change the package name (both in `package.json` and `SpecRunner.html`).

## Grunt support

The included `Gruntfile` will build separate app and spec files (including a minified version). To use it, just run:

    grunt

To keep the watcher running, just run:

    grunt watch

## Livereload

It's possible to use [Livereload](http://livereload.com/) by installing the browser extension and running `make watch`. More information
available in the [node-livereload](https://github.com/napcs/node-livereload/) README.

## Upcoming features

Not a promise, but these are some things I really want to dig into and hopefully make possible.

- AMD support
- Out of the box headless testing
