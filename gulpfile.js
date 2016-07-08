/**
 * Created by luzhin.dm on 31.03.2016.
 */
'use strict';

//���������� ������ ������ gulp
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


//���� ������� ���
var path = {
	build: { //���� ����������� ����� �������
		html: 'build/',
		js: 'build/js',
		css: 'build/css',
		images: 'build/images',
		fonts: 'build/fonts/'
	},

	src: {
		html: 'src/*.html', //�������, ��� ����� ����� ����� � ����������� .html
		js: 'src/js/main.js', //� ������ � �������� ��� ����������� ������ main �����
		style: 'src/style/main.scss',
		images: 'src/images/**/*.*', //��������� img/**/*.* �������� - ����� ��� ����� ���� ���������� �� ����� � �� ��������� ���������
		fonts: 'src/fonts/**/*.*' //�� �� ����� ��� �������
	},

	watch: {//��������� �� �����, ��� ��������� �� ����� ���������
		html: 'src/**/*.html', //������, ��� ����� ����������� ��������� �� ���� html-������
		js: 'src/js/**/*.js', //������, ��� ����� ����������� ��������� �� ���� js-������
		style: 'src/style/**/*.scss', //����� ������� �� ����� .scss �������
		images: 'src/images/**/*.*', //����� ������� �� ����� ����������
		fonts: 'src/fonts/**/*.*' //����� ������� �� ����� ��������
	},
	clean: './build'
};

//��������� dev-�������
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

//������ html
gulp.task('html:build', function() {
	gulp.src(path.src.html) //�������� ����� �� ������� ����
			.pipe(rigger()) //������ ����� rigger
			.pipe(gulp.dest(path.build.html)) //����������� � ����� build
			.pipe(reload({stream: true})); //������������ � ���������
});

//������ js
gulp.task('js:build', function() {
	gulp.src(path.src.js) //���� main.js
			.pipe(rigger()) //������ ����� rigger
			.pipe(sourcemaps.init()) //�������������� sourcemap
			.pipe(uglify()) //������� JS
			.pipe(sourcemaps.write()) //���������� ����
			.pipe(gulp.dest(path.build.js)) //����������� � build
			.pipe(reload({stream: true})); //������������ � �������
});
//������ SCSS
gulp.task('style:build', function() {
	gulp.src(path.src.style) //���� main.scss
			.pipe(sourcemaps.init()) //�������������� sourcemaps
			.pipe(sass()) //��������
			.pipe(prefixer()) //����������� ��������
			.pipe(cssmin()) //������������ css
			.pipe(sourcemaps.write()) //���������� ����
			.pipe(gulp.dest(path.build.css)) //����� � ����
			.pipe(reload({stream: true})); //������������ � �������
});
//������ ��������
gulp.task('images:build', function(){
	gulp.src(path.src.images) //������� ��������
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()],
				interlaced: true
			}))
			.pipe(gulp.dest(path.build.images)) //� ����
			.pipe(reload({stream: true}));
});
//������ �������
gulp.task('fonts:build', function () {
	gulp.src(path.src.fonts) //������� ������
			.pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
	'html:build',
	'style:build',
	'js:build',
	'fonts:build',
	'images:build'
]);

//������������ ���������
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

//���������
gulp.task('clean', function (cb){
	rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
