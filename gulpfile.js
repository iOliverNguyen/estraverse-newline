'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
var tests = [ 'test.js' ];
var lints = [
  'gulpfile.js',
  'index.js'
];

var eslintOption = {
  'rules': {
    'quotes': 0,
    'eqeqeq': 0,
    'no-use-before-define': 0,
    'no-shadow': 0,
    'no-unused-vars': [
      2,
      {
        'vars': 'all',
        'args': 'none'
      }
    ],
    'no-multi-spaces': false,
    'new-cap': [
      2,
      {
        'capIsNew': false
      }
    ]
  },
  'env': {
    'node': true
  }
};

gulp.task('test', function () {
  return gulp.src(tests)
    .pipe(mocha({
      reporter: 'spec',
      timeout: 10000 // 10s
    }));
});

gulp.task('lint', function () {
  return gulp.src(lints)
    .pipe(eslint(eslintOption))
    .pipe(eslint.formatEach('stylish', process.stderr))
    .pipe(eslint.failOnError());
});

gulp.task('travis', [ 'lint', 'test' ]);
gulp.task('default', [ 'travis' ]);
