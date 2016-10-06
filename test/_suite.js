
var currentLabel;
var testQueue = [];

var currentLabel;
var currentTest;

var passedTests = [];
var failedTests = [];

function define (label, assertions) {
    testQueue.push({
        label: label,
        assertions: assertions
    });
}

function expect (expected) {
    return {
        toBe: function (actual) {
            var result = 'Expected "' + expected + '" to be "' + actual + '"';
            recordResult(actual === expected, result);
        },
        toContain: function (actual) {
            var result = 'Expected "' + expected + '" to contain "' + actual + '"';
            recordResult(expected.indexOf(actual) !== -1, result);
        }
    }
}

function recordResult (passed, result) {
    if (passed) {
        currentTest.passedExpectations.push(result);
    } else {
        currentTest.failedExpectations.push(result);
    }
}

function run () {
    testQueue.forEach(function (test) {
        currentTest = {
            label: test.label,
            passedExpectations: [],
            failedExpectations: []
        };

        test.assertions();

        if (currentTest.failedExpectations.length) {
            failedTests.push(currentTest);
        } else {
            passedTests.push(currentTest);
        }
    });

    console.log('Results\n------');
    console.log('passed: ' +  passedTests.length);
    console.log('failed: ' + failedTests.length);

    if (failedTests.length) {
        console.log('\nFailed tests:');
        failedTests.forEach(function (failure) {
            console.log('\n' + failure.label);
            failure.failedExpectations.forEach(function (reason) {
                console.log('   ' + reason);
            })
        });

    } else {
        console.log('\nAll tests passed!');
    }
}

module.exports = {
    define: define,
    expect: expect,
    run: run
};
