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
    return $.rubySass(['./src/app.scss'], {loadPath: './src', style: 'expanded', compass: true})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        //.pipe($.minifyCss())
        .pipe(gulp.dest(
            [buildDirectory, 'css'].join('/')
        ));
});

gulp.task('min', function () {
    return gulp.src(['src/**/*.*', '!**/*.scss'])
        .pipe(gulp.dest(buildDirectory));
});

gulp.task('clean-d2-source', function (cb) {
    var del = require('del');
    del('jspm_packages/npm/d2/*.js', cb);
});

gulp.task('copy-d2-source', ['clean-d2-source'], function () {
   return gulp.src(['../d2/build/*'], {base: '../d2/build'})
        .pipe(gulp.dest('jspm_packages/npm/d2'));
});

gulp.task('clean-d2-angular-source', function (cb) {
    var del = require('del');
    del('jspm_packages/npm/d2-angular/**', cb);
});

gulp.task('copy-d2-angular-source', ['clean-d2-angular-source'], function () {
    return gulp.src(['../d2-angular/build/**'], {base: '../d2-angular/build'})
        .pipe(gulp.dest('jspm_packages/npm/d2-angular'));
});

gulp.task('deps', function () {
    return gulp.src([
            'config.js',
            'jspm_packages/github/**/*.js',
            'jspm_packages/github/**/*.css',
            'jspm_packages/npm/**/*.js',
            'jspm_packages/npm/**/*.css',
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
    return runSequence('clean', 'copy-d2-source', 'copy-d2-angular-source', /*'test',*/ 'scss', /*'jshint', 'jscs',*/ ['min', 'deps'], 'copy-images', 'copy-app', cb);
});

gulp.task('travis', function () {
    var runSequence = require('run-sequence');
    return runSequence('test', 'jshint', 'jscs');
});

/***********************************************************************************************************************
 * Githooks
 */
gulp.task('git:pre-commit', function (cb) {
    var runSequence = require('run-sequence');

    //Gulp exists with 0 and for the pre-commit hook to fail we need to exit with a not 0 error code
    gulp.on('err', function(e){
        console.log('Pre-commit validate failed');
        process.exit(1);
    });

    runSequence('test', 'jshint', 'jscs', cb);
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
