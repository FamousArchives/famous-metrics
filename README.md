famous-metrics
==============
[![Build Status](https://travis-ci.org/Famous/famous-metrics.svg)](https://travis-ci.org/Famous/famous-metrics) [![Dependency Status](https://david-dm.org/Famous/famous-metrics.svg)](https://david-dm.org/Famous/famous-metrics) [![devDependency Status](https://david-dm.org/Famous/famous-metrics/dev-status.svg)](https://david-dm.org/Famous/famous-metrics#info=devDependencies)

This module tracks metrics data related to usage of Famo.us tools. This module exposes three interfaces:

* getTinfoil: Returns true if the user has not opted into tracking and false if they have.

* setTinfoil: Accepts an email address and a callback. The email will be hashed and included with tracking information. If you pass in false instead of an email or no email string, then tracking is disabled.

* track: Accepts a string with the name of the event and any additional data to be tracked. Will print a warning to the console if the user has not opted into famous.

License
-------
Copyright (c) 2014 Famous Industries, Inc.
MPL-2.0

Author
------
Andrew de Andrade <andrew@famo.us>

