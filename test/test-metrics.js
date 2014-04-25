var test = require('tape');

test('Does it load?',  function (t) {
  var metrics = require('../index.js');
  
  t.ok(metrics, "It loads!!!");
  t.end();
});