
describe('location', function () {
    expect(location.href).toBe(url);
    expect(location.protocol).toBe('https:');
    expect(location.hostname).toBe('www.example.com');
    expect(location.port).toBe('8888');
    expect(location.pathname).toBe('/page.html');
    expect(location.search).toBe('?one=1&two=2');
    expect(location.hash).toBe('#anchor');
});

describe('navigator', function () {
    expect(navigator.userAgent).toContain('Node.js');
});

describe('HTMLElement', function () {
    expect(HTMLElement.toString()).toContain('HTMLElement');
});

describe('CSSRule', function () {
    expect(CSSRule.toString()).toContain('CSSRule');
});

describe('JSON', function () {
    expect(JSON.stringify({ abc: 123 })).toBe('{"abc":123}');
});

describe('XMLHttpRequest', function () {
    expect(new XMLHttpRequest().toString()).toBe('[object XMLHttpRequest]');
});

describe('addEventListener', function () {
    expect(typeof addEventListener).toBe('function');
});

describe('blur', function () {
    expect(typeof blur).toBe('function');
});

describe('localStorage', function () {
    expect(typeof localStorage.setItem).toBe('function');
});

describe('self', function () {
    expect(self).toBe(window);
});

describe('innerWidth', function () {
    expect(innerWidth > 1).toBe(true);
});
