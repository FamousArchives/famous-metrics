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
  tinfoil: null
});

// get old config value
if (typeof config.noTinfoil === 'boolean') {
  config.tinfoil = config.noTinfoil;
  delete config.noTinfoil;
}

var setTinfoil = exports.setTinfoil = function setTinfoil(email, cb) {
  if (typeof email === 'string') {
    if (email === '') {
      email =  Math.floor(Date.now() * Math.random()).toString();
    }
    config.unique_id = crypto.createHash('sha256').update(email).digest('base64');
    config.tinfoil = false;
  } else {
    config.unique_id = '';
    config.tinfoil = true;
  }
  fs.writeFile(path.join(osenv.home(), '.famousrc'), JSON.stringify(config, undefined, 2), cb);
};

exports.getTinfoil = function getTinfoil() {
  // If they have the sha256 of '' then rerun setTinfoil
  if (config.unique_id === '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=') {
    setTinfoil('');
  }
  return config.tinfoil;
};

exports.track = function track(event, data, cb) {
  if (data instanceof Function) {
    cb = data;
    data = {};
  }

  if (!config.tinfoil) {
    data.distinct_id = config.unique_id;
    data.platform = config.platform;
    mixpanel.track(event, data, cb);
  } else {
    console.warn('User has not opted into tracking. Aborting ...');
  }
};
