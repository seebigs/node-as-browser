
describe('location', function (expect) {
    expect(location.href).toBe(url);
    expect(location.protocol).toBe('https:');
    expect(location.hostname).toBe('www.example.com');
    expect(location.port).toBe('8888');
    expect(location.pathname).toBe('/page.html');
    expect(location.search).toBe('?one=1&two=2');
    expect(location.hash).toBe('#anchor');
});

describe('navigator', function (expect) {
    expect(navigator.userAgent).toContain('Node.js');
});

describe('HTMLElement', function (expect) {
    expect(HTMLElement.toString()).toContain('HTMLElement');
});

describe('CSSRule', function (expect) {
    expect(CSSRule.toString()).toContain('CSSRule');
});

describe('JSON', function (expect) {
    expect(JSON.stringify({ abc: 123 })).toBe('{"abc":123}');
});

describe('XMLHttpRequest', function (expect) {
    expect(new XMLHttpRequest().toString()).toBe('[object XMLHttpRequest]');
});

describe('addEventListener', function (expect) {
    expect(typeof addEventListener).toBe('function');
});

describe('blur', function (expect) {
    expect(typeof blur).toBe('function');
});

describe('localStorage', function (expect) {
    expect(typeof localStorage.setItem).toBe('function');
});

describe('self', function (expect) {
    var winHasSelf = self === window;
    expect(winHasSelf).toBe(true);
});

describe('innerWidth', function (expect) {
    expect(innerWidth > 1).toBe(true);
});

describe('fetch', function (expect) {
    expect(typeof fetch).toBe('function');
});

describe('Promise', function (expect) {
    expect(typeof Promise).toBe('function');
});

describe('screen', function (expect) {
    expect(typeof screen.colorDepth).toBe('number');
});
