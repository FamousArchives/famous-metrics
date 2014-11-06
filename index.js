/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
var mixpanelId = '1ca6a3146db8e6b46af00d0ce399260e ';
var mixpanel = require('mixpanel').init(mixpanelId);
var rc = require('rc');
var crypto = require('crypto');
var fs = require('fs');
var osenv = require('osenv');
var path = require('path');

var config = rc('famous', {
  unique_id: '',
  platform: process.platform,
  tracking: null
});

// get old config value
if (typeof config.noTinfoil === 'boolean') {
  delete config.noTinfoil;
}

if (typeof config.tinfoil === 'boolean') {
  delete config.tinfoil;
}

var setTracking = exports.setTracking = function setTracking(email, cb) {
  if (typeof email === 'string') {
    if (email === '') {
      email = Math.floor(Date.now() * Math.random()).toString();
    }
    config.unique_id = crypto.createHash('sha256').update(email).digest('base64');
    config.tracking = true;
  }
  else {
    config.unique_id = '';
    config.tracking = false;
  }
  fs.writeFile(path.join(osenv.home(), '.famousrc'), JSON.stringify(config, undefined, 2), cb);
};

exports.getTracking = function getTracking() {
  // If they have the sha256 of '' then rerun setTinfoil
  if (config.unique_id === '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=') {
    setTracking('');
  }
  return config.tracking;
};

exports.track = function track(event, data, cb) {
  if (data instanceof Function) {
    cb = data;
    data = {};
  }

  if (config.tracking) {
    data.distinct_id = config.unique_id;
    data.platform = config.platform;
    mixpanel.track(event, data, cb);
  }
  else {
    cb(new Error('User has not opted into tracking. Aborting ...'));
  }
};
