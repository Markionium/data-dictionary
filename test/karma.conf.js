module.exports = function( config ) {
    config.set({
        basePath: '../',
        frameworks: ['mocha', 'chai', 'sinon-chai', 'sinon', 'systemjs'],

        plugins: ['karma-systemjs', 'karma-mocha', 'karma-chai', 'karma-sinon', 'karma-sinon-chai', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-firefox-launcher', 'karma-ng-html2js-preprocessor', 'karma-mocha-reporter'],

        preprocessors: {
            './src/**/*.html': 'html2js'
        },

        files: [
            './jspm_packages/github/components/jquery@2.1.3/jquery.js',
            './test/fixtures/**/*.js',
            {pattern: './test/**/*.js', included: false, watched: true, served: true},
            {pattern: './src/**/*.js', included: false, watched: true, served: true},
            {pattern: './src/**/*.html', included: false, watched: true, served: true},
        ],

        reporters: ['mocha'],

        'babelPreprocessor': {
            options: {
                modules: 'common',
                sourceMap: 'inline'
            },
            filename: function(file) {
                console.log('Babelifying: ' + file.originalPath);
            },
            sourceFileName: function(file) {
                return file.originalPath;
            }
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/'
        },

        coverageReporter: {
            type: 'lcov',
            dir: '../coverage',
            subdir: function(browser) {
                // Normalization process to keep a consistent browser name accross different OS
                return browser.toLowerCase().split(/[ /-]/)[0];
            }
        },

        systemjs: {
            configFile: './config.js',
            files: [
                //JSPM Dependencies for Systemjs
                './jspm_packages/github/components/jquery@2.1.3.js',
                './jspm_packages/github/components/jquery@2.1.3/jquery.js',
                './jspm_packages/github/angular/bower-angular@1.3.14.js',
                './jspm_packages/github/angular/bower-angular@1.3.14/angular.js',
                './jspm_packages/github/angular/bower-angular-mocks@1.3.14.js',
                './jspm_packages/github/angular/bower-angular-mocks@1.3.14/angular-mocks.js',

                //App source and test files
                './src/**/*.js',
                './test/**/*_spec.js'
            ],

            config: {
                baseURL: '/',
                transpiler: 'babel',
                paths: {
                    //Paths to overwrite/add for test environment
                    'jquery': './jspm_packages/github/components/jquery@2.1.3/jquery.js',
                    'angular': './jspm_packages/github/angular/bower-angular@1.3.14/angular.js',
                    'angular-mocks': './jspm_packages/github/angular/bower-angular-mocks@1.3.14/angular-mocks.js',
                    'd2.angular': './test/mocks/d2-angular.js'
                }
            },

            testFileSuffix: '_spec.js'
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,

        autoWatch: true,
        autoWatchBatchDelay: 100,
        usePolling: true,

        browsers: [/*'PhantomJS',*/ 'Chrome'/*, 'Firefox'*/],
        singleRun: true
    });
};
