const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('imagemin', () => {
    gulp.src('./dev/assets/*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('./public/assets'));
});

gulp.task('styles', () => {
    gulp.src('dev/css/**/*.scss')
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
})

gulp.task('watch', () => {
    gulp.watch('dev/css/**/*.scss', ['styles']);
    gulp.watch('dev/assets/**/*', ['imagemin']);
});

gulp.task('default', ['imagemin', 'watch']);