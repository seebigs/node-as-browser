/**
 * Run automated validations
 */

var featherTest = require('feather-test');

global.url = 'https://www.example.com:8888/page.html?one=1&two=2#anchor';

var nodeAsBrowser = require('../index.js');
nodeAsBrowser.init({
    url: url,
    html: '<!DOCTYPE html><head></head><body data-action="bhave" style="color:red"><div id="gremlins"><div class="gizmo mogwai"></div><div class="stripe mogwai"></div></div></body></html>'
});

featherTest.specs('./specs');

featherTest.run();
