# node-as-browser

**Create a browser-like environment within a Node.js context**

## Install
```
$ npm install node-as-browser
```

## Use
```js
var nodeAsBrowser = require('node-as-browser');

nodeAsBrowser.init(global);

console.log(navigator.userAgent);
```

## Scope
```js
var nodeAsBrowser = require('node-as-browser');

var fakeWindow = {};
nodeAsBrowser.init(fakeWindow);

console.log(fakeWindow.navigator.userAgent);
```
