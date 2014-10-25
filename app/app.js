/** @module app/app */
'use strict';

// Modernizr (https://www.npmjs.org/package/browsernizr, https://github.com/jnordberg/browsernizr)
require('browsernizr/lib/html5printshiv');
require('browsernizr');

// Setup dev environment, automatically ignored in production
require('./scripts/dev');

// Get modules
require('./scripts/modules/maps');