var gulp = require('gulp');

var files = [
    //Lib files
    'lib/jQuery/dist/jquery.js',

    //Src files
    'src/**/*.js',

    //Test files
    'test/fixtures/**/*.js',
    'test/matchers/**/*.js',
    'test/mocks/**/*_mock.js',
    'test/specs/**/*_spec.js'
];
var buildDirectory = 'build';

gulp.task('clean', function () {
    var del = require('del');
    del(buildDirectory);
});

gulp.task('test', function () {
    return gulp.src(files).pipe(runKarma());
});

gulp.task('watch', function () {
    return gulp.src(files).pipe(runKarma(true));
});

gulp.task('jshint', function () {
    var jshint = require('gulp-jshint');

    return gulp.src([
            'test/specs/**/*.js',
            'src/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function () {
    var jscs = require('gulp-jscs');

    return gulp.src([
        'test/specs/**/*.js',
        'src/**/*.js'
    ]).pipe(jscs('./.jscsrc'));
});

gulp.task('scss', function () {
    var sass = require('gulp-ruby-sass');
    var minifyCss = require('gulp-minify-css');

    return gulp.src('src/app.scss', { base: './src/' })
        .pipe(gulp.dest(
            [buildDirectory, 'scss'].join('/')
        ))
        .pipe(sass({ sourcemap: true, sourcemapPath: 'scss/' }))
        .pipe(minifyCss())
        .pipe(gulp.dest(
            [buildDirectory, 'css'].join('/')
        ));
});

gulp.task('min', function () {
    var usemin = require('gulp-usemin');
    var minifyHtml = require('gulp-minify-html');
    var sass = require('gulp-ruby-sass');
    var uglify = require('gulp-uglify');
    var rev = require('gulp-rev');

    return gulp.src(['src/**/*.html'])
        .pipe(usemin({
            html: [minifyHtml({empty: true, quotes: true })],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest(buildDirectory));
});

gulp.task('copy-images', function () {
    return gulp.src('src/images/**/*.{jpg,png,gif}', { base: './src/images' })
        .pipe(gulp.dest(
            [buildDirectory, 'images'].join('/')
        ));
});

gulp.task('build', function () {
    var runSequence = require('run-sequence');
    runSequence('clean', 'test', 'scss', 'jshint', 'jscs', 'min', 'copy-images');
});

gulp.task('default', function () {
    //TODO: Think of something to do here that is sensible but does not do unexpected stuff
});

function runKarma(watch) {
    var karma = require('gulp-karma');
    var config = {
        configFile: 'test/karma.conf.js'
    };

    if (!watch) {
        watch = false;
    }

    if (watch === true) {
        config.action = 'watch';
    }

    return karma(config);
}
