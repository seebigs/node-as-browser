
var fetch = require('node-fetch');
var JSDOM = require("jsdom").JSDOM;
var usertiming = require('usertiming');

function newJSDOM (html, options) {
    return new JSDOM(html || '<!DOCTYPE html>', options);
}

function enhanceToString () {
    "use strict"; // causes fn.call(null) to return [object Null] instead of [object global]

    var oldToString = Object.prototype.toString;
    Object.prototype.toString = function () {
        var ts = oldToString.call(this);
        if (ts === '[object Object]') {
            if (this.nodeType) {
                return this.toString();
            }
            return ts;
        }
        return ts;
    };
}

function init (options) {
    options = options || {};
    var context = options.context || global;

    if (options.url) {
        options.url = options.url;
    }

    options.runScripts = 'dangerously';
    options.resources = "usable";

    this._dom = newJSDOM(options.html, options);
    var win = this._dom.window;

    // allow child windows
    win.open = function (url) {
        return newJSDOM(null, { url: url }).window;
    };

    win.navigator.sendBeacon = function () {};

    win.document.hasFocus = function () { return true; };

    // Adds LocalStorage
    // This should only be needed until jsdom adds this feature
    // https://github.com/tmpvar/jsdom/issues/1137
    win.localStorage = win.sessionStorage = (function () {
        return {
            getItem: function (key) {
                return this[key] || null;
            },
            setItem: function (key, value) {
                this[key] = value;
            },
            removeItem: function (key) {
                this[key] = null;
            },
        };
    })();

    // https://github.com/tmpvar/jsdom/issues/1510
    win.performance = usertiming;
    win.performance.navigation = {
        redirectCount: 0,
        type: 1
    };

    win.fetch = fetch;

    win.screen.availTop = 0;
    win.screen.availLeft = 0;
    win.screen.width = win.innerWidth;
    win.screen.height = win.innerHeight;
    win.screen.colorDepth = 32;
    win.screen.pixelDepth = 32;

    context.window = win;

    for (var x in win) {
        if (typeof context[x] === 'undefined') {
            context[x] = win[x];
        }
    }

    for (var y in win._core) {
        if (typeof context[y] === 'undefined') {
            context[y] = win[y];
        }
    }

    context.Image = win.Image;

    // Enhance toString output for DOM nodes
    enhanceToString();

    return context;
}

function reconfigure (options) {
    this._dom.reconfigure(options);
}

function NodeAsBrowser () {
    this._dom = null;
    this.init = init;
    this.reconfigure = reconfigure;
}

module.exports = new NodeAsBrowser();
