/*jshint sub:true */
module.exports = function( grunt ) {

	//
	//
	// Setup
	//

	//
	// Node includes
	//
	var path = require( 'path' ),
		fs = require( 'fs' );

	//
	// Grunt module includes
	// Make sure all task here are defined in package.json `devDependenices`
	//
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-plugin-buster' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-compare-size' );

	//
	// Vars
	//
	var config = {
		jshint: {},
		buster: {},
		uglify: {},
		compare_size: {}
	};

	// Lint all files
	config.jshint[ 'all' ] = ['Gruntfile.js', 'load.js', 'test/**/*.js'];

	// Test all files
	config.buster[ 'browser global' ] = {};
	config.buster[ 'browser AMD' ] = {};

	// Minify lib
	config.uglify[ 'load' ] = {
		options: {
			preserveComments: 'some'
		},
		files: {
			'load.min.js': [ 'load.js' ]
		}
	};

	// Compare size
	config.compare_size[ 'load' ] = {
		src: 'load.js'
	};

	// Default task
	grunt.registerTask( 'default', [ 'jshint', 'buster', 'uglify' ] );

	//
	// Initialise and setup grunt
	//
	grunt.initConfig( config );

};