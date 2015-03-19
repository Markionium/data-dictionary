var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var dhis2Config = require('./gulphelp.js').checkForDHIS2ConfigFile();
var dhisDirectory = dhis2Config.dhisDeployDirectory;
var buildDirectory = 'build';

var files = [
    //Lib files
    'lib/jQuery/dist/jquery.js',

    //Src files
    'src/**/*.js',

    //Test files
    'test/fixtures/**/*.js',
    'test/mocks/**/*_mock.js',
    'test/specs/**/*_spec.js'
];

/**************************************************************************************************
 * Gulp tasks
 */

gulp.task('clean', function () {
    var del = require('del');
    del(buildDirectory);
});

gulp.task('test', function () {
    return gulp.src([]).pipe(runKarma());
});

gulp.task('watch', function () {
    return gulp.src([]).pipe(runKarma(true));
});

gulp.task('jshint', function () {
    return gulp.src([
            'test/specs/**/*.js',
            'src/**/*.js'
        ])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('jscs', function () {
    return gulp.src([
        'test/specs/**/*.js',
        'src/**/*.js'
    ]).pipe($.jscs('./.jscsrc'));
});

gulp.task('scss', function () {
    return gulp.src('src/app.scss', { base: './src/' })
        .pipe($.rubySass({ sourcemap: true, sourcemapPath: 'scss/', debugInfo: true }))
        .pipe($.minifyCss())
        .pipe(gulp.dest(
            [buildDirectory, 'css'].join('/')
        ));
});

gulp.task('min', function () {
    return gulp.src(['src/**/*.*', '!**/*.scss'])
        .pipe(gulp.dest(buildDirectory));

    //var mangleJS = false;
    //
    //var assets = $.useref.assets();
    //
    //return gulp.src('src/**/*.html')
    //    .pipe(assets)
    //    .pipe(assets.restore())
    //    .pipe($.useref())
    //    .pipe($.if('*.css', $.minifyCss()))
    //    .pipe($.if('**/app.js', $.ngAnnotate({
    //        add: true,
    //        remove: true,
    //        single_quotes: true,
    //        stats: true
    //    })))
    //    //.pipe($.if('*.js', $.uglify({
    //    //    mangle: mangleJS
    //    //})))
    //    .pipe(gulp.dest(buildDirectory));
});

gulp.task('copy-d2-source', function () {
   return gulp.src(['../d2/build/*'], {base: '../d2/build'})
        .pipe(gulp.dest('jspm_packages/npm/d2'));
});

gulp.task('deps', function () {
    return gulp.src([
            'config.js',
            'jspm_packages/github/**/*.js',
            'jspm_packages/github/**/*.css',
            'jspm_packages/npm/d2/*.js',
            'jspm_packages/npm/font-awesome@4.3.0/**',
            'jspm_packages/*.js',
            'jspm_packages/*.map'
        ], {base: '.'})
        .pipe(gulp.dest(buildDirectory));
});

gulp.task('copy-images', function () {
    return gulp.src('src/images/**/*.{jpg,png,gif}', { base: './src/images' })
        .pipe(gulp.dest(
            [buildDirectory, 'images'].join('/')
        ));
});

gulp.task('build', function (cb) {
    var runSequence = require('run-sequence');
    runSequence('clean', 'test', 'scss', 'jshint', 'jscs', 'min', 'copy-images', cb);
});

gulp.task('copy-app', function () {
    gulp.src('build/**/*.*', { base: './build/' }).pipe(gulp.dest(dhisDirectory));
});

gulp.task('copy-to-dev', function (cb) {
    var runSequence = require('run-sequence');
    return runSequence('clean', 'copy-d2-source', /*'test',*/ 'scss', /*'jshint', 'jscs',*/ ['min', 'deps'], 'copy-images', 'copy-app', cb);
});

function runKarma(watch) {
    var config = {
        configFile: 'test/karma.conf.js'
    };

    if (!watch) {
        watch = false;
    }

    if (watch === true) {
        config.action = 'watch';
    }

    return $.karma(config);
}
