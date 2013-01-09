var config = module.exports;

config[ 'browser global' ] = {
	environment: 'browser',
	rootPath: '../',
	tests: [
		'test/*-test.js'
	],
	sources: [
		'load.js',
		'node_modules/when/when.js'
	],
	resources: [
		'test/fixtures/*.js'
	]
};

config[ 'browser AMD' ] = {
	environment: 'browser',
	rootPath: '../',
	libs: [
		'node_modules/requirejs/require.js'
	],
	tests: [
		'test/*-test.js'
	],
	resources: [
		'load.js',
		'test/fixtures/*.js',
		'test/*-test.js',
		'node_modules/when/when.js'
	],
	extensions: [
		require( 'buster-amd' )
	]
};