/**
 * Run automated validations
 */

var url = 'https://www.example.com:8888/page.html?one=1&two=2#anchor';

var nodeAsBrowser = require('../index.js');
nodeAsBrowser.init({
    url: url,
    html: '<!DOCTYPE html><head></head><body data-action="bhave" style="color:red"><div id="gremlins"><div class="gizmo mogwai"></div><div class="stripe mogwai"></div></div></body></html>'
});

var _suite = require('./_suite.js');
var define = _suite.define;
var expect = _suite.expect;


define('location', function () {
    expect(location.href).toBe(url);
    expect(location.protocol).toBe('https:');
    expect(location.hostname).toBe('www.example.com');
    expect(location.port).toBe('8888');
    expect(location.pathname).toBe('/page.html');
    expect(location.search).toBe('?one=1&two=2');
    expect(location.hash).toBe('#anchor');
});

define('navigator', function () {
    expect(navigator.userAgent).toContain('Node.js');
});

define('HTMLElement', function () {
    expect(HTMLElement.toString()).toContain('HTMLElement');
});

define('CSSRule', function () {
    expect(CSSRule.toString()).toContain('CSSRule');
});

define('JSON', function () {
    expect(JSON.stringify({ abc: 123 })).toBe('{"abc":123}');
});

define('XMLHttpRequest', function () {
    expect(new XMLHttpRequest().toString()).toBe('[object XMLHttpRequest]');
});

define('addEventListener', function () {
    expect(typeof addEventListener).toBe('function');
});

define('blur', function () {
    expect(typeof blur).toBe('function');
});

define('localStorage', function () {
    expect(typeof localStorage.setItem).toBe('function');
});

define('self', function () {
    expect(self).toBe(window);
});

define('innerWidth', function () {
    expect(innerWidth > 1).toBe(true);
});

define('document.cookie', function () {
    expect(typeof document.cookie).toBe('string');
});

define('document.appendChild', function () {
    expect(typeof document.appendChild).toBe('function');
});

define('document.body', function () {
    expect(document.body.toString()).toBe('[object HTMLBodyElement]');
});

define('document.documentElement.childNodes', function () {
    expect(document.documentElement.childNodes.length).toBe(2);
});

define('document.getElementById', function () {
    expect(document.getElementById('gremlins').parentNode).toBe(document.body);
});

define('document.getElementsByClassName', function () {
    expect(document.getElementsByClassName('mogwai').length).toBe(2);
});

define('document.hasFocus', function () {
    expect(document.hasFocus()).toBe(true);
});

define('document.childNodes[0].nodeName', function () {
    expect(document.body.childNodes[0].nodeName).toBe('DIV');
});

define('document.querySelectorAll', function () {
    expect(document.querySelectorAll('.mogwai').length).toBe(2);
});

define('document.readyState', function () {
    expect(document.readyState).toBe('complete');
});

define('document.body.getAttribute', function () {
    expect(document.body.getAttribute('data-action')).toBe('bhave');
});

define('document.body.getBoundingClientRect', function () {
    expect(document.body.getBoundingClientRect().top).toBe(0);
});

define('document.body.style', function () {
    expect(document.body.style.color).toBe('red');
});


_suite.run();
