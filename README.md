# Jotter
A global shortcut enabled note taker

## How To Use Jotter

Jotter runs in the background. Once it's running, hit one of the following key combinations to pull up the Jotter window:
* OSX: cmd+ctrl+shift+N
* Other: alt+ctrl+shift+N

## Debugging Notes

### Debugging Production Package

#### OSX

To debug the packaged production executable use `lldb`:

`lldb /path/to/jotter.app`

Then in the `lldb` console:

`run --remote-debugging-port=8315`

If the window doesn't appear on it's own, point your browser to http://localhost:8315 and select the link for the Jotter app.

## Thank You List

* [theolazian](https://github.com/theolazian)'s [Electron+Webpack+Bootstrap+FontAwesome+JQuery tutorial](https://dev.to/theola/electron-app-with-webpack-bootstrap-fontawesome-and-jquery-a-complete-guide-54k2) helped me get the initial structure going.
