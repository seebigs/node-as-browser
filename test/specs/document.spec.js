
describe('document.cookie', function (expect) {
    expect(typeof document.cookie).toBe('string');
});

describe('document.appendChild', function (expect) {
    expect(typeof document.appendChild).toBe('function');
});

describe('document.body', function (expect) {
    expect(document.body.toString()).toBe('[object HTMLBodyElement]');
});

describe('document.documentElement.childNodes', function (expect) {
    expect(document.documentElement.childNodes.length).toBe(2);
});

describe('document.getElementById', function (expect) {
    expect(document.getElementById('gremlins').parentNode).toBe(document.body);
});

describe('document.getElementsByClassName', function (expect) {
    expect(document.getElementsByClassName('mogwai').length).toBe(2);
});

describe('document.hasFocus', function (expect) {
    expect(document.hasFocus()).toBe(true);
});

describe('document.childNodes[0].nodeName', function (expect) {
    expect(document.body.childNodes[0].nodeName).toBe('DIV');
});

describe('document.querySelectorAll', function (expect) {
    expect(document.querySelectorAll('.mogwai').length).toBe(2);
});

describe('document.readyState', function (expect) {
    expect(document.readyState).toBe('complete');
});

describe('document.body.getAttribute', function (expect) {
    expect(document.body.getAttribute('data-action')).toBe('bhave');
});

describe('document.body.getBoundingClientRect', function (expect) {
    expect(document.body.getBoundingClientRect().top).toBe(0);
});

describe('document.body.style', function (expect) {
    expect(document.body.style.color).toBe('red');
});

describe('document.appendChild script execution and onload', function (expect, done) {
    var s = document.createElement('script');
    s.src = __dirname + '/../fixture/script.js';
    s.onload = function () {
        expect(this.nodeName).toBe('SCRIPT');
        expect(document.body.innerHTML.indexOf('<span>LOADED</span>')).not.toBe(-1);
        done();
    };
    document.head.appendChild(s);
});
