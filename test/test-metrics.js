var test = require('tape');
var metrics = require('../index.js');

test('Does it load?',  function (t) {
  t.ok(metrics, "It loads!!!");
  t.end();
});
