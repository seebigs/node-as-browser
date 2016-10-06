/**
 * Open a command line prompt to evaluate expressions in the node-as-browser environment
 */

var nodeAsBrowser = require('../index.js');
var repl = require("repl");

nodeAsBrowser.init(global);

var replServer = repl.start({
    useGlobal: true
});

console.log('You are now in the node-as-browser interactive environment...\n');
