const { src, dest, series, task } = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
// var cp = require('child_process');
// var imagemin = require('gulp-imagemin');
// var browserSync = require('browser-sync');

// var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'bundle';

/*
 * Build the Jekyll Site
 * runs a child process in node that runs the jekyll commands
 */
// gulp.task('jekyll-build', function (done) {
// 	return cp.spawn(jekyllCommand, ['exec', 'jekyll', 'build'], {stdio: 'inherit'}).on('close', done);
// });

/*
 * Rebuild Jekyll & reload browserSync
 */
// gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
// 	browserSync.reload();
// });

/*
 * Build the jekyll site and launch browser-sync
 */
// gulp.task('browser-sync', ['jekyll-build'], function() {
// 	browserSync({
// 		server: {
// 			baseDir: '_site'
// 		}
// 	});
// });

/*
* Compile and minify sass
*/
task('sass', () => {
	return src('src/styles/**/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(csso())
		.pipe(dest('assets/css/'))
})
/*
* Compile fonts
*/
// function fonts () {
// 	gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
// 		.pipe(plumber())
// 		.pipe(gulp.dest('assets/fonts/'));
// }

/*
 * Minify images
 */
// function imagemin () {
// 	return gulp.src('src/img/**/*.{jpg,png,gif}')
// 		.pipe(plumber())
// 		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
// 		.pipe(gulp.dest('assets/img/'));
// }

/**
 * Compile and minify js
 */
task('js', () => {
	return src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(dest('assets/js/'))
})

// function watch() {
// 	gulp.watch('src/styles/**/*.scss', ['sass', 'jekyll-rebuild']);
// 	gulp.watch('src/js/**/*.js', ['js']);
// 	gulp.watch('src/fonts/**/*.{tff,woff,woff2}', ['fonts']);
// 	gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
// 	gulp.watch(['*html', '_includes/*html', '_layouts/*.html'], ['jekyll-rebuild']);
// }

task('default', done => {
	series('sass', 'js')
	done()
})
// exports.sass = series(sass)