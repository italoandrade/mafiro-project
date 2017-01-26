const gulp = require('gulp');
const plumber = require('gulp-plumber');

const libs = {
    css: [
        'material-design-icons/iconfont/**/*.css'
    ],
    fonts: [

    ]
};

gulp.task('libs.css', () => {
    return gulp.src('material-design-icons/iconfont/**/*', { cwd: 'node_modules', read: true })
        .pipe(plumber())
        .pipe(gulp.dest('src/assets/fonts/material-icons'));
});

gulp.task('libs.fonts', () => {
    return gulp.src('node_modules/material-design-icons/iconfont/**/*', { read: true })
        .pipe(plumber())
        .pipe(gulp.dest('src/assets/fonts/material-icons'));
});

gulp.task('default', ['material-icons', 'roboto']);
