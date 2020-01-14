const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

function style() {
	return gulp
		.src('assets/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('assets/css/'))
		.pipe(browserSync.stream());
}
function watch() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch('assets/sass/**/*.scss', style);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('assets/js/**/*.js').on('change', browserSync.reload);
}

const dev = gulp.series(style, watch);

exports.watch = watch;
exports.style = style;
exports.default = dev;
