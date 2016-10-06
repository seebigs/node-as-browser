
var jsdom = require("jsdom").jsdom;

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

    var win = jsdom(options.html || '<!DOCTYPE html>', options).defaultView;

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

    // Enhance toString output for DOM nodes
    enhanceToString();
}

module.exports = {
    init: init
};
