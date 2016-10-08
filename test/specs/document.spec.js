
describe('document.cookie', function () {
    expect(typeof document.cookie).toBe('string');
});

describe('document.appendChild', function () {
    expect(typeof document.appendChild).toBe('function');
});

describe('document.body', function () {
    expect(document.body.toString()).toBe('[object HTMLBodyElement]');
});

describe('document.documentElement.childNodes', function () {
    expect(document.documentElement.childNodes.length).toBe(2);
});

describe('document.getElementById', function () {
    expect(document.getElementById('gremlins').parentNode).toBe(document.body);
});

describe('document.getElementsByClassName', function () {
    expect(document.getElementsByClassName('mogwai').length).toBe(2);
});

describe('document.hasFocus', function () {
    expect(document.hasFocus()).toBe(true);
});

describe('document.childNodes[0].nodeName', function () {
    expect(document.body.childNodes[0].nodeName).toBe('DIV');
});

describe('document.querySelectorAll', function () {
    expect(document.querySelectorAll('.mogwai').length).toBe(2);
});

describe('document.readyState', function () {
    expect(document.readyState).toBe('complete');
});

describe('document.body.getAttribute', function () {
    expect(document.body.getAttribute('data-action')).toBe('bhave');
});

describe('document.body.getBoundingClientRect', function () {
    expect(document.body.getBoundingClientRect().top).toBe(0);
});

describe('document.body.style', function () {
    expect(document.body.style.color).toBe('red');
});
