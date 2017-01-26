const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const copy = require('gulp-copy');

gulp.task('material-icons', () => {
    return gulp.src('node_modules/material-design-icons/iconfont/**/*', { read: true })
        .pipe(plumber())
        .pipe(gulp.dest('src/assets/fonts/material-icons'));
});

gulp.task('roboto', () => {
    return gulp.src('node_modules/material-design-icons/iconfont/**/*', { read: true })
        .pipe(plumber())
        .pipe(gulp.dest('src/assets/fonts/material-icons'));
});

gulp.task('default', ['material-icons', 'roboto']);
