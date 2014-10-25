'use strict';
/**
 * requirements/modules
 */
var packageJson = require('../package.json'); // loads the packages.json into an object
var express = require('express'); // web server
var path = require('path'); // path combining, takes care of diff between windows and *nix
/**
 * basic initialization
 */
var app = express();
var port = process.env.PORT || 3000;
var paths = {
	app: path.join(__dirname, '../build/')
};
/**
 * use middleware
 */
if (process.env.NODE_ENV === 'production') {
	var compression = require('compression');
	app.use(compression()); // gzip css/js
}
app.use('/', express.static(paths.app));

/**
 * let's get this show on the road!
 */
app.listen(port, function() {
	console.log('\r\n');
	console.log(':: server running :');
	console.log(':: serving content from => \'%s\'', paths.app);
	console.log(':: %s (v. %s) is running on => \'http://localhost:%d\'', packageJson.name, packageJson.version, port);
});

/**
 * all not predefined routes go to index.html. Angular handles the rest
 */
app.use(function(req, res) {
	res.sendFile(paths.app + 'index.html');
});