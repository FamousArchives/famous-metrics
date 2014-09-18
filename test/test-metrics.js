/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
var fs = require('fs');
var path = require('path');

var test = require('tape');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var metrics = require('../index.js');

var fakeHome = path.join(String(process.env.TMPDIR), 'famous-metrics-test');
var rcPath = path.join(fakeHome, '.famousrc');

test('Did it setup correctly', function (t) {
  t.plan(2);
  mkdirp.sync(fakeHome);
  process.env.HOME = fakeHome;
  fs.exists(fakeHome, function (exists) {
    t.ok(exists, ['The folder', fakeHome, 'should exist after setup'].join(' '));
    t.equals(process.env.HOME, fakeHome, ['$HOME should equal', fakeHome].join(' '));
  });
});

test('Does it load?',  function (t) {
  t.plan(1);
  t.ok(metrics, 'It loads!!!');
});

test('If setTinfoil is given no email address tracking should be set to null', function (t) {
  t.plan(3);
  metrics.setTracking(null, function (err) {
    var rc = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
    
    t.notok(err, 'We should not get back an error in saved .rc');
    t.notok(rc.tracking, 'Tracking should not be turned on in saved .rc');
    t.equal(rc['unique_id'], '', 'There should be no unique id in saved .rc');
  });
});

test('Tracking should not work if turned off', function (t) {
  t.plan(3);
  var tracking = metrics.getTracking();
  t.notok(tracking, 'getTracking should return false');
  metrics.track('shouldNotWork', function (err) {
    t.ok(err, 'There should be an error when given an event and no payload');
  });
  metrics.track('shouldNotWork', { payload: 'partyTime' }, function (err) {
    t.ok(err, 'There should be an error when given an event and a payload');
  });
});

test('If setTinfoil is given an email address tracking should be turned on', function (t) {
  t.plan(4);
  metrics.setTracking('funkyDoodle@snoodle-pood.le', function (err) {
    var rc = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
    var tracking = metrics.getTracking();
    
    t.notok(err, 'We should not get back an error');
    t.ok(rc.tracking, 'Tracking should be turned on');
    t.ok(rc['unique_id'], 'Unique id should exist');
    t.ok(tracking, 'getTracking should return true');
  });
});

test('Tracking should work if turned on', function (t) {
  t.plan(3);
  var tracking = metrics.getTracking();
  t.ok(tracking, 'getTracking should return true');
  metrics.track('shouldWork', function (err) {
    t.notok(err, 'There should be no error when given an event and no payload');
  });
  metrics.track('shouldWork', { payload: 'partyTime' }, function (err) {
    t.notok(err, 'There should be no error when given an event and a payload');
  });
});

test('Did it tear down correctly', function (t) {
  t.plan(1);
  rimraf.sync(fakeHome);
  fs.exists(fakeHome, function (exists) {
    t.notOk(exists, ['The folder', fakeHome, 'should not exist after teardown'].join(' '));
  });
});
