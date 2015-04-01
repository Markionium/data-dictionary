module.exports = function( config ) {
    config.set({
        basePath: '../',
        //frameworks: ['mocha', 'chai', 'sinon-chai', 'sinon', 'systemjs'],
        //
        //plugins: ['karma-systemjs', 'karma-mocha', 'karma-chai', 'karma-sinon', 'karma-sinon-chai', 'karma-chrome-launcher', 'karma-ng-html2js-preprocessor', 'karma-mocha-reporter'],
        //
        //preprocessors: {
        //    './src/**/*.html': 'html2js'
        //},
        //
        //files: [
        //    './jspm_packages/github/components/jquery@2.1.3/jquery.js',
        //    './test/fixtures/**/*.js',
        //    {pattern: './test/**/*.js', included: false, watched: true, served: true},
        //    {pattern: './src/**/*.js', included: false, watched: true, served: true},
        //    {pattern: './src/**/*.html', included: false, watched: true, served: true},
        //],
        //
        //reporters: ['mocha'],
        //
        //'babelPreprocessor': {
        //    options: {
        //        modules: 'common',
        //        sourceMap: 'inline'
        //    },
        //    filename: function(file) {
        //        console.log('Babelifying: ' + file.originalPath);
        //    },
        //    sourceFileName: function(file) {
        //        return file.originalPath;
        //    }
        //},
        //
        //ngHtml2JsPreprocessor: {
        //    stripPrefix: 'src/'
        //},
        //
        //coverageReporter: {
        //    type: 'lcov',
        //    dir: '../coverage',
        //    subdir: function(browser) {
        //        // Normalization process to keep a consistent browser name accross different OS
        //        return browser.toLowerCase().split(/[ /-]/)[0];
        //    }
        //},
        //
        //systemjs: {
        //    configFile: './config.js',
        //    files: [
        //        //JSPM Dependencies for Systemjs
        //        './jspm_packages/npm/babel@*.js',
        //        './jspm_packages/npm/babel@*/*.js',
        //        //'./jspm_packages/npm/babel-runtime@*/**/*.js',
        //        './jspm_packages/github/components/jquery@2.1.3.js',
        //        './jspm_packages/github/components/jquery@2.1.3/jquery.js',
        //        './jspm_packages/github/angular/bower-angular@1.3.1*.js',
        //        './jspm_packages/github/angular/bower-angular@1.3.1*/angular.js',
        //        './jspm_packages/github/angular/bower-angular-route@1.3.1*.js',
        //        './jspm_packages/github/angular/bower-angular-route@1.3.1*/angular-route.js',
        //        './jspm_packages/github/angular/bower-angular-mocks@1.3.1*.js',
        //        './jspm_packages/github/angular/bower-angular-mocks@1.3.1*/angular-mocks.js',
        //        './jspm_packages/npm/babel-runtime@4.7.16/*.js',
        //
        //        //App source and test files
        //        './src/**/*.js',
        //        './test/**/*_spec.js'
        //    ],
        //
        //    config: {
        //        baseURL: '/',
        //        transpiler: 'babel',
        //        babelOptions: {
        //            optional: [
        //                'runtime'
        //            ]
        //        },
        //        paths: {
        //            //Paths to overwrite/add for test environment
        //            'babel': './jspm_packages/npm/babel@4.7.16.js',
        //            'plugin-css': './jspm_packages/github/systemjs/plugin-css@0.1.6.js',
        //            'jquery': './jspm_packages/github/components/jquery@2.1.3/jquery.js',
        //            'angular': './jspm_packages/github/angular/bower-angular@1.3.1*/angular.js',
        //            'angular-mocks': './jspm_packages/github/angular/bower-angular-mocks@1.3.1*/angular-mocks.js',
        //            'd2.angular': './test/mocks/d2-angular.js'
        //
        //        },
        //        map: {
        //            'angular-material': './test/mocks/material/angular-material',
        //            babel: './jspm_packages/npm/babel@4.7.16/browser',
        //            'babel-runtime': './jspm_packages/npm/babel-runtime@4.7.16'
        //        }
        //    },
        //
        //    testFileSuffix: '_spec.js'
        //},

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
