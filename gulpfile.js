var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    bower = require('gulp-bower'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefix = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    nodemon = require('gulp-nodemon'),
    lr = require('tiny-lr')();
// SassPath, storing sass files that are created, end up getting parsed into the ./public directory
var config = {
	pubPath: './public',
	resPath: './resources',
     sassPath: './resources/sass',
     bowerDir: './bower_components' 
}

// Similar to "bower install", but helps other developers to have them all setup and ready
gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

// Moving fonts out and place them into the ./public directory
// Moving from bower_components/fontawesome/fonts/  to ./public/fonts
gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('css', function() {
    return sass(config.sassPath + '/style.scss', { 
    		style: 'compressed',
    		loadPath : [
    			config.bowerDir + '/bootstrap-sass-official/assets/stylesheets/', 
    			config.bowerDir + '/fontawesome/scss/',
          config.sassPath
			]
		})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.init())
        .pipe(autoprefix('last 2 version'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('compress', function() {
	return gulp.src(config.resPath + '/js/app.js')
		.pipe(uglify({preserveComments:"some"}))
		.pipe(gulp.dest('./public/js'))
});

gulp.task('js', ['compress'],function() {
    return gulp.src([
            config.bowerDir + '/jquery/dist/jquery.min.js',
            config.bowerDir + '/jquery.easing/js/jquery.easing.min.js',
            config.bowerDir + '/jquery-smooth-scroll/jquery.smooth-scroll.js',
            config.bowerDir + '/owl-carousel2/dist/owl.carousel.min.js',
            config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
            config.bowerDir + '/instafeed.js/instafeed.min.js'
            //config.bowerDir + '/rxjs/dist/rx.lite.min.js',
            //config.bowerDir + '/rxjs-jquery/rx.jquery.js',
            //config.bowerDir + '/smooth-scroll/dist/js/smooth-scroll.min.js',
            //config.pubPath + '/js/app.js',
            //config.resPath + '/js/ie10-viewport-bug-workaround.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('html', function() {
    return gulp.src(config.resPath + '/index.html')
        .pipe(gulp.dest('./public'));
});
// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/**/**/**/*.scss', ['css']);
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
  	gulp.watch(config.resPath + '/js/app.js', ['compress']);
  	gulp.watch(config.pubPath + '/js/app.js', ['js']);
  	gulp.watch(config.resPath + '/index.html', ['html']);
    gulp.watch(config.pubPath + '/index.html', notifyLivereload);
});

var gulp = require('gulp');
 
var EXPRESS_PORT = 5000;
var EXPRESS_ROOT = __dirname + '/public';
var LIVERELOAD_PORT = 35729;
 
// // Let's make things more readable by
// // encapsulating each part's setup
// // in its own method
// function startExpress() {
 
//   var express = require('express');
//   var app = express();
//   app.use(require('connect-livereload')());
//   app.use(express.static(EXPRESS_ROOT));
//   app.listen(EXPRESS_PORT);
// }
 
// // We'll need a reference to the tinylr
// // object to send notifications of file changes
// // further down
// var lr;
// function startLivereload() {
 
//   lr = require('tiny-lr')();
//   lr.listen(LIVERELOAD_PORT);
// }
 
// Notifies livereload of changes detected
// by `gulp.watch()` 
function notifyLivereload(event) {
 
  // `gulp.watch()` events provide an absolute path
  // so we need to make it relative to the server root
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
 
  lr.changed({
    body: {
      files: [fileName]
    }
  });
}
 

gulp.task('server', function () {
    lr.listen(LIVERELOAD_PORT);

    nodemon({
      script: 'index.js'
    })
    .on('restart', function () {
        console.log('restarted!')
    });

    gulp.watch(config.pubPath + '/css/*.css', notifyLivereload);
    gulp.watch(config.pubPath + '/js/*.js', notifyLivereload);
    gulp.watch(config.pubPath + '/index.html', notifyLivereload);

});

// // Default task that will be run
// // when no parameter is provided
// // to gulp
// gulp.task('default', function () {
//   var started = false;
//   return nodemon({
//     script: 'index.js'
//   }).on('start', function () {
//     // to avoid nodemon being started multiple times
//     // thanks @matthisk
//     if (!started) {
//       started = true; 

//     } 
//   });
	
//   lr.listen(LIVERELOAD_PORT);
// 	startLivereload();
// 	//gulp.watch(config.pubPath + '/css/*.css', notifyLivereload);
// 	//gulp.watch(config.pubPath + '/js/*.js', notifyLivereload);
// 	//gulp.watch(config.pubPath + '/index.html', notifyLivereload);

// });

  gulp.task('default', ['bower', 'icons', 'css', 'js', 'server', 'html', 'watch']);