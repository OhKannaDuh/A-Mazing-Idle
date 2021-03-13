const browserify = require('browserify');
const tsify = require('tsify');
const babelify = require('babelify');

browserify({"basedir": "."})
	.add('src/index.ts')
	.plugin(tsify)
	.transform(babelify, { extensions: ['.ts'] })
	.bundle()
	.on('error', function (error) { console.error(error.toString()); })
  .pipe(process.stdout);
