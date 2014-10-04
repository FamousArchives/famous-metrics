famous-metrics
==============
[![Build Status](https://travis-ci.org/FamousTools/famous-metrics.svg)](https://travis-ci.org/FamousTools/famous-metrics) [![Dependency Status](https://david-dm.org/FamousTools/famous-metrics.svg)](https://david-dm.org/FamousTools/famous-metrics) [![devDependency Status](https://david-dm.org/FamousTools/famous-metrics/dev-status.svg)](https://david-dm.org/FamousTools/famous-metrics#info=devDependencies)

This module tracks metrics data related to usage of Famo.us tools. This module exposes three interfaces:

* getTracking: Returns true if the user has opted into tracking and false if they have opted out.

* setTracking: Accepts an email address and a callback. The email will be hashed and included with tracking information. If you pass in false instead of an email or no email string, then tracking is disabled.

* track: Accepts a string with the name of the event and any additional data to be tracked. Will return an error in the callback if user has not opted into tracking

License
-------
Copyright (c) 2014 Famous Industries, Inc.
MPL-2.0

Author
------
Andrew de Andrade <andrew@famo.us>

