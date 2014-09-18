'use strict';
var fs = require('fs');
var path = require('path');

var test = require('tape');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var metrics = require('../index.js');

var fakeHome = path.join(String(process.env.TMPDIR), 'famous-metrics-test');

test('Did it setup correctly', function (t) {
  t.plan(1);
  mkdirp.sync(fakeHome);
  fs.exists(fakeHome, function (exists) {
    t.ok(exists, ['The folder', fakeHome, 'should exist after setup'].join(' '));
  });
});

test('Does it load?',  function (t) {
  t.plan(1);
  t.ok(metrics, 'It loads!!!');
});

test('Did it tear down correctly', function (t) {
  t.plan(1);
  rimraf.sync(fakeHome);
  fs.exists(fakeHome, function (exists) {
    t.notOk(exists, ['The folder', fakeHome, 'should not exist after teardown'].join(' '));
  });
});
