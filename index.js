var mixpanelId = '1ca6a3146db8e6b46af00d0ce399260e';
var mixpanel = require('mixpanel').init(mixpanelId);
var rc = require('rc');
var crypto = require('crypto');
var fs = require('fs');
var osenv = require('osenv');
var path = require('path');

var config = rc('famous', {
  unique_id: '',
  tinfoil: true
});

exports.setTinfoil = function (email, cb) {
  if (email || !(email instanceof Function)) {
    config.unique_id = crypto.createHash('sha256').update(email).digest('base64');
    config.tinfoil = false;
  } else {
    config.unique_id = '';
    config.tinfoil = true;
  }
  fs.writeFile(path.join(osenv.home(), '.famousrc'), JSON.stringify(config, undefined, 2), cb);
};

exports.getTinfoil = function () {
  return config.tinfoil;
};

exports.track = function (event, data, cb) {
  if (data instanceof Function) {
    cb = data;
    data = {};
  }

  if (!config.tinfoil) {
    data.distinct_id = config.unique_id;
    mixpanel.track(event, data, cb);
  } else {
    console.warn('User has not opted into tracking. Aborting ...');
  }
};
