/**
 * Created by luzhin.dm on 31.03.2016.
 */
'use strict';

//Определяем нужные модули gulp
var gulp = require('gulp'),
		watch = require('gulp-watch'),
		prefixer = require('gulp-autoprefixer'),
		uglify = require('gulp-uglify'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		rigger = require('gulp-rigger'),
		cssmin = require('gulp-imagemin'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		rimraf = require('rimraf'),
		browserSync = require("browser-sync"),
		reload =browserSync.reload;


//Пути пишутся тут
var path = {
	build: { //Сюда выплевывает файлы сборщик
		html: 'build/',
		js: 'build/js',
		css: 'build/css',
		images: 'build/images',
		fonts: 'build/fonts/'
	},

	src: {
		html: 'src/*.html', //Говорит, что будет брать файлы с расширением .html
		js: 'src/js/main.js', //В стилях и скриптах нам понадобятся только main файлы
		style: 'src/style/main.scss',
		images: 'src/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
		fonts: 'src/fonts/**/*.*' //То же самое для шрифтов
	},

	watch: {//Указывает на файлы, чьи изменения мы хотим наблюдать
		html: 'src/**/*.html', //значит, что будет отслеживать изменения во всех html-файлах
		js: 'src/js/**/*.js', //значит, что будет отслеживать изменения во всех js-файлах
		style: 'src/style/**/*.scss', //будет следить за всеми .scss файлами
		images: 'src/images/**/*.*', //будет следить за всеми картинками
		fonts: 'src/fonts/**/*.*' //будет следить за всеми шрифтами
	},
	clean: './build'
};

//Настройка dev-сервера
var config = {
	server: {
		baseDir: "./build"
	},
	tunnel: false,
	host: 'localhost',
	port: 8000,
	logePrefix: "test",
	open: false
};

//Сборка html
gulp.task('html:build', function() {
	gulp.src(path.src.html) //выбираем файлы по нужному пути
			.pipe(rigger()) //Прогон через rigger
			.pipe(gulp.dest(path.build.html)) //Выплевывает в папку build
			.pipe(reload({stream: true})); //перезаружает и обновляет
});

//Сборка js
gulp.task('js:build', function() {
	gulp.src(path.src.js) //Ищет main.js
			.pipe(rigger()) //Прогон через rigger
			.pipe(sourcemaps.init()) //Инициализирует sourcemap
			.pipe(uglify()) //Сжимает JS
			.pipe(sourcemaps.write()) //записывает мапы
			.pipe(gulp.dest(path.build.js)) //Выплевывает в build
			.pipe(reload({stream: true})); //Перезагрузит и обновит
});
//Сборка SCSS
gulp.task('style:build', function() {
	gulp.src(path.src.style) //Ищем main.scss
			.pipe(sourcemaps.init()) //инициализирует sourcemaps
			.pipe(sass()) //Компилит
			.pipe(prefixer()) //расставляет префиксы
			.pipe(cssmin()) //минимизирует css
			.pipe(sourcemaps.write()) //Записывает мапы
			.pipe(gulp.dest(path.build.css)) //Плюет в Билд
			.pipe(reload({stream: true})); //Перезагрузит и обновит
});
//Сборка картинок
gulp.task('images:build', function(){
	gulp.src(path.src.images) //Выберет картинки
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()],
				interlaced: true
			}))
			.pipe(gulp.dest(path.build.images)) //в Билд
			.pipe(reload({stream: true}));
});
//Сборка шрифтов
gulp.task('fonts:build', function () {
	gulp.src(path.src.fonts) //Выберет шрифты
			.pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
	'html:build',
	'style:build',
	'js:build',
	'fonts:build',
	'images:build'
]);

//отслеживание изменений
gulp.task('watch', function() {
	watch([path.watch.html], function(event, cb){
		gulp.start('html:build');
	});
	watch([path.watch.style], function(event, cb){
		gulp.start('style:build');
	});
	watch([path.watch.js], function(event, cb){
		gulp.start('js:build');
	});
	watch([path.watch.images], function(event, cb){
		gulp.start('image:build');
	});
	watch([path.watch.fonts], function(event, cb){
		gulp.start('fonts:build');
	});
});

//livereload

gulp.task('webserver', function(){
	browserSync(config);
});

//очисточка
gulp.task('clean', function (cb){
	rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
