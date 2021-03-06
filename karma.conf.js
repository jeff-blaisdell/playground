module.exports = function (config) {
    config.set({
        basePath: 'buildUI/javascripts',

        frameworks: ['jasmine'],

        // list of files to exclude
        exclude: [],

        // use dots reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots', 'progress'
        // CLI --reporters progress
        reporters: ['junit', 'progress'],

        junitReporter: {
            outputFile: '../test-results/jasmine-unit.xml',
            suite: 'unit'
        },

        // list of files / patterns to load in the browser
        files: [
            'lib/jquery.js',
            'lib/lodash.js',
            'lib/angular.js',
            'lib/angular-mocks.js',
            'components/**/*.js',
            'pages/**/*.js'
        ],

        // web server port
        // CLI --port 9876
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // CLI --log-level debug
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        //autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
        browsers: ['Firefox'],

        // Auto run tests on start (when browsers are captured) and exit
        // CLI --single-run --no-single-run
        singleRun: true,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 500,

        // compile coffee scripts
        //preprocessors: {
        //    '**/*.coffee': 'coffee'
        //},

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'
        ]
    });
};
