/**
 * Run automated validations
 */

var FeatherTestBrowser = require('feather-test-browser');
var nodeAsBrowser = require('../index.js');

global.url = 'https://www.example.com:8888/page.html?one=1&two=2#anchor';
nodeAsBrowser.init({
    url: url,
    html: '<!DOCTYPE html><head></head><body data-action="bhave" style="color:red"><div id="gremlins"><div class="gizmo mogwai"></div><div class="stripe mogwai"></div></div></body></html>'
});

var mockTest = new FeatherTestBrowser({
    specs: './specs'
});

mockTest.run();
