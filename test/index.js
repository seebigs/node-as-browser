/**
 * Run automated validations
 */

var FeatherTestBrowser = require('feather-test-browser');
global.nodeAsBrowser = require('../index.js');

nodeAsBrowser.init({
    html: '<!DOCTYPE html><head></head><body data-action="bhave" style="color:red"><div id="gremlins"><div class="gizmo mogwai"></div><div class="stripe mogwai"></div></div></body></html>'
});

var mockTest = new FeatherTestBrowser({
    specs: './specs'
});

mockTest.run();
