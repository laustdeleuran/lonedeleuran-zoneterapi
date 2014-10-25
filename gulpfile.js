/*jshint node:true,strict:true,undef:true,unused:true*/
'use strict';

/**
* Configuration of file patterns.
**/
var clientDir = 'app';
var serverDir = 'server';
var paths = {
	project: {
		gulpFile: 'gulpfile.js'
	},
	client: {
		appDir: clientDir,
		// Destination folders.
		destDir: 'build',
		// Source folders and files.
		srcDir: clientDir,
		styleMain: clientDir + '/style/style.scss',
		styleFiles: [ clientDir + '/style/**/*.{scss,sass,css}', '!' + clientDir + '/style/style.css' ],
		jsMain: clientDir + '/app.js',
		jsFiles: [ clientDir + '/scripts/**/*.js', clientDir + '/*.json' ],
		imgFiles: [ clientDir + '/images/**/*.{png,jpeg,jpg,gif}', '!' + clientDir + '/images/sprites-*', '!' + clientDir + '/images/sprites/**/*.*', '!' + clientDir + '/images/sprites-retina/**/*.*' ],
		spriteFiles: clientDir + '/images/sprites-*.png',
		svgFiles: clientDir + '/**/*.svg',
		htmlFiles: clientDir + '/**/*.html',
		staticFiles: [ clientDir + '/**/*.{ico,svg,gif}', clientDir + '/static/**/*', clientDir + '/fonts/**/*' ],
		jshintrc: clientDir + '/.jshintrc'
	},
	server: {
		appDir: serverDir,
		// Source folders and files.
		srcDir: serverDir,
		jsFiles: serverDir + '/**/*.js',
		jshintrc: serverDir + '/.jshintrc'
	}
};

// Create list of destination folders to clean.
paths.project.cleanDirs = [ paths.client.destDir ];

/**
* Import tasks
**/
var minifyHTML = require('gulp-minify-html');
var livereload = require('gulp-livereload');
var browserify = require('gulp-browserify');
var imagemin   = require('gulp-imagemin');
var plumber    = require('gulp-plumber');
var flatten    = require('flatten');
var svgmin     = require('gulp-svgmin');
var ngAnnotate = require('gulp-ng-annotate');
var uglify     = require('gulp-uglify');
var jshint     = require('gulp-jshint');
var rimraf     = require('gulp-rimraf');
var gutil      = require('gulp-util');
var sass       = require('gulp-sass');
var bourbon    = require('node-bourbon').includePaths;
var gulp       = require('gulp');

/**
* Environment
**/
// Determine whether running in production or not:
// If NODE_ENV=production or invoking gulp with --production argument.
var isProduction = process.env.NODE_ENV === 'production' || !!gutil.env.production;

/**
* Tasks
*/
// Cleans the destination build folder: gulp clean
gulp.task('clean', function() {
	gulp.src(flatten([ paths.project.cleanDirs ]), { read: false })
		.pipe(rimraf());
});

// Compile Compass stylesheets to CSS.
gulp.task('style', function() {
	gulp.src(paths.client.styleMain)
		.pipe(plumber())
		.pipe(sass({
			outputStyle: isProduction ? 'compressed' : 'expanded',
			includePaths: flatten([paths.client.styleMain].concat(bourbon)),
			errLogToConsole: true
		}))
		.pipe(gulp.dest(paths.client.destDir + '/style'));
});

// Check client-side JavaScript code quality using JSHint.
gulp.task('lint-js-client', function() {
	gulp.src(flatten([paths.client.jsMain, paths.client.jsFiles, '!' + paths.client.appDir + '/scripts/plugins/**/*.js']))
		.pipe(jshint(paths.client.jshintrc))
		.pipe(jshint.reporter('jshint-stylish'));
});

// Check server-side JavaScript code quality using JSHint.
gulp.task('lint-js-server', function() {
	gulp.src(flatten([ paths.server.jsFiles, paths.project.gulpFile ]))
		.pipe(jshint(paths.server.jshintrc))
		.pipe(jshint.reporter('jshint-stylish'));
});

// Compile and minify JS files using Browserify/CommonJS.
// In production everything is minified to a single bundle.
// Otherwise (in development) the JS is output with source maps.
gulp.task('js', function(){
	gulp.src(paths.client.jsMain)
		.pipe(plumber())
		.pipe(
			browserify({
				// Do not parse require statements in certain modules for faster builds.
				noParse: [
					'jquery'
				],
				shim: {
					'jquery': {
						path: './app/scripts/plugins/jquery-1.11.1.js',
						exports: '$'
					}
				},
				insertGlobals: true,
				ignore: isProduction ? ['./scripts/dev'] : [],
				debug: !isProduction
			})
		)
		.pipe(isProduction ? ngAnnotate() : gutil.noop())
		.pipe(isProduction ? uglify() : gutil.noop())
		.pipe(gulp.dest(paths.client.destDir));
});

// Minify and copy images.
gulp.task('img', function(){
	gulp.src(paths.client.imgFiles)
		.pipe(imagemin({ optimizationLevel: 5 }))
		.pipe(gulp.dest(paths.client.destDir + '/images'));
});

// Minify SVG files.
gulp.task('svg', function(){
	gulp.src(paths.client.svgFiles)
		.pipe(svgmin())
		.pipe(gulp.dest(paths.client.destDir));
});

// Minify HTML files.
gulp.task('html', function(){
	gulp.src(paths.client.htmlFiles)
		.pipe(minifyHTML({
			empty: true,
			quotes: true,
			conditionals: true,
			comments: true
		}))
		.pipe(gulp.dest(paths.client.destDir));
});

// Copy static files.
gulp.task('copy', function(){
	gulp.src(paths.client.staticFiles, { base: paths.client.srcDir })
		.pipe(gulp.dest(paths.client.destDir));
});

// Copy sprite files.
gulp.task('copy-sprites', function(){
	gulp.src(paths.client.spriteFiles, { base: paths.client.srcDir })
		.pipe(gulp.dest(paths.client.destDir));
});

// Watch for file changes and build accordingly.
gulp.task('watch', function() {
	gulp.watch(paths.client.styleFiles, ['style']);
	gulp.watch(paths.client.spriteFiles, ['copy-sprites']);
	gulp.watch(flatten([paths.client.jsMain, paths.client.jsFiles]), ['lint-js-client', 'js']);
	gulp.watch(paths.server.jsFiles, ['lint-js-server']);
	gulp.watch(paths.client.imgFiles, ['img']);
	gulp.watch(paths.client.svgFiles, ['svg']);
	gulp.watch(paths.client.htmlFiles, ['html']);
	gulp.watch(paths.client.staticFiles, ['copy']);

	// Start LiveReload server and emit change events everytime CSS is updated.
	var liveReloadServer = livereload();
	gulp.watch(paths.client.destDir + '/**/*.{css,js,html}').on('change', function(file) {
		liveReloadServer.changed(file.path);
	});
});

// Lint everything.
gulp.task('lint', ['lint-js-client', 'lint-js-server']);

// Default tasks.
// In NPM it is setup with: gulp clean && gulp build --production
gulp.task('build', ['style', 'lint', 'js', 'img', 'svg', 'html', 'copy', 'copy-sprites']);

// specific build for heroku (atm, same as build)
gulp.task('heroku:production', ['build']);

// When developing you can continuously build files using just: gulp
gulp.task('default', ['build', 'watch']);
