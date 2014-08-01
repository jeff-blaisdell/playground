/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var es = require('event-stream');
var _ = require('lodash');
var argv = require('yargs').argv;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var PROJECT = {
    SRC_UI: 'src/ui',
    SCRIPTS_PATTERN: 'src/ui/**/*.js',
    SCRIPTS_OUT: 'buildUI/javascripts',
    TEMPLATE_PATTERN: 'src/ui/**/*.html',
    TEMPLATE_OUT: 'buildUI/javascripts/components/templates',
    STYLES_PATTERN: 'src/ui/**/*.scss',
    STYLES_OUT: 'buildUI/stylesheets',
    STYLES_POST_PROCESS_PATTERN: 'buildUI/stylesheets/**/*.css',
    IMAGES_PATTERN: 'src/ui/images/**/*',
    IMAGES_OUT: 'buildUI/images',
    FONTS_PATTERN: 'src/ui/fonts/**',
    FONTS_OUT: 'buildUI/fonts',
    KARMA_CONFIG: {
        configFile: 'karma.conf.js',
        action: 'run'
    }
};

var VENDOR_SCRIPTS = [
    { 'angular': [
        'bower_components/angular/angular.js',
        'bower_components/angular-resource/angular-resource.js'
        ]
    },
    { 'angular-mocks': ['bower_components/angular-mocks/angular-mocks.js'] },
    { 'lodash': ['bower_components/lodash/dist/lodash.js'] },
    { 'jquery': ['bower_components/jquery/dist/jquery.js'] }
];

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src(PROJECT.SCRIPTS_PATTERN)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src(PROJECT.IMAGES_PATTERN)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(PROJECT.IMAGES_OUT))
    .pipe($.size({title: 'images'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src(PROJECT.FONTS_PATTERN)
    .pipe(gulp.dest(PROJECT.FONTS_OUT))
    .pipe($.size({title: 'fonts'}));
});

gulp.task('scripts:vendor', function () {

    var streams = _.map(VENDOR_SCRIPTS, function(vendor) {
        var name = _.keys(vendor);
        var scripts = vendor[name];
        var target = PROJECT.SCRIPTS_OUT + '/lib';

        return gulp.src(scripts)
            .pipe($.concat(name + '.js'))
            .pipe(gulp.dest(target));
    });

    return es.merge.apply(null, streams);
});

// Prepare Angular template cache.
gulp.task('scripts:views', function () {

    return gulp.src(PROJECT.TEMPLATE_PATTERN)
        .pipe($.minifyHtml())
        .pipe($.angularTemplatecache({
            standalone: true,
            module:     'blaisdell.components.templates',
            filename:   'templates.js'
        }))
        .pipe(gulp.dest(PROJECT.TEMPLATE_OUT));

});

gulp.task('scripts:custom', function () {
    return gulp.src(PROJECT.SCRIPTS_PATTERN)
        .pipe($.ngmin())
        .pipe(gulp.dest(PROJECT.SCRIPTS_OUT));

});

gulp.task('scripts:watch', function (cb) {
    runSequence('jshint', ['scripts:custom'], 'copy', cb);
});

gulp.task('scripts', ['scripts:vendor', 'scripts:views', 'scripts:custom']);

gulp.task('test', ['scripts'], function () {
    var browsers = (argv.browsers ? argv.browsers.split(',') : undefined);
    var config = PROJECT.KARMA_CONFIG;
    config.browsers = browsers;

    var sources = [
        'buildUI/javascripts/lib/jquery.js',
        'buildUI/javascripts/lib/lodash.js',
        'buildUI/javascripts/lib/angular.js',
        'buildUI/javascripts/lib/angular-mocks.js',
        'buildUI/javascripts/components/**/*js',
        'buildUI/javascripts/pages/**/*js'
    ];

    return gulp.src(sources)
        .pipe($.karma(config))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

// Automatically Prefix CSS
gulp.task('styles:css', function () {
  return gulp.src(PROJECT.STYLES_POST_PROCESS_PATTERN)
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest(PROJECT.STYLES_OUT))
    .pipe($.size({title: 'styles:css'}));
});

// Compile Any Other Sass Files You Added (app/styles)
gulp.task('styles:scss', function () {
    return gulp.src(PROJECT.STYLES_PATTERN)
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: [PROJECT.SRC_UI]
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest(PROJECT.STYLES_OUT))
    .pipe($.size({title: 'styles:scss'}));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
    return gulp.src(['buildUI/**/*', '!buildUI/{test-results,test-results/**/*}'])
        .pipe(gulp.dest('grails-app/assets'))
        .pipe($.size({title: 'copy'}));
});

// Output Final CSS Styles
gulp.task('styles', function(cb) {
    runSequence('styles:scss', 'styles:css', cb);
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['buildUI', 'grails-app/assets']));

// Build Production Files, the Default Task
gulp.task('default', function (cb) {
    runSequence('clean', 'jshint', ['scripts', 'styles', 'images', 'fonts'], 'test', 'copy', cb);
});

// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch(PROJECT.TEMPLATE_PATTERN, ['scripts:views']);
  gulp.watch(PROJECT.STYLES_PATTERN, ['styles:scss']);
  gulp.watch(PROJECT.STYLES_POST_PROCESS_PATTERN, ['styles:css']);
  gulp.watch(PROJECT.SCRIPTS_PATTERN, ['scripts:watch']);
  gulp.watch(PROJECT.IMAGES_PATTERN, ['images']);
  gulp.watch(PROJECT.FONTS_PATTERN, ['fonts']);
  gulp.watch('buildUI/**/*', ['copy']);
});
