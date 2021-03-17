const browserify = require('browserify');
const tsify = require('tsify');
const babelify = require('babelify');
const priorityjs = require('priorityjs');
const watchify = require('watchify');

const bundler = browserify({"basedir": ".", cache: {}, packageCache: {} })
	.add('src/index.ts')
	.plugin(tsify)
	// .plugin(watchify)
	.transform(babelify, { extensions: ['.ts'] })
	.bundle()
	.on('error', function (error) { console.error(error.toString()); })
  .pipe(process.stdout);

	