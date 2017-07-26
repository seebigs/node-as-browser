
var fetch = require('node-fetch');
var jsdom = require("jsdom").jsdom;
var usertiming = require('usertiming');

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

    options.url = options.url || 'http://example.com/';

    var win = jsdom(options.html || '<!DOCTYPE html>', options).defaultView;

    mockDomNodeInserted(win);

    // allow child windows
    win.open = function (url) {
        return jsdom('<!DOCTYPE html>', { url: url }).defaultView;
    };

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
}

function mockDomNodeInserted (win) {
    var nodeImpl = require('jsdom/lib/jsdom/living/nodes/Node-impl.js').implementation.prototype;
    var oldInsertBefore = nodeImpl.insertBefore;

    var newInsertBefore = function () {
        var event = new CustomEvent("DOMNodeInserted", {});
        win.document.dispatchEvent(event);
        oldInsertBefore.apply(this, arguments);
    };

    nodeImpl.insertBefore = newInsertBefore;
}

module.exports = {
    init: init
};
