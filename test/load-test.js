/*jshint browser:true */
( function( define ) { 'use strict';
define( [ 'buster', '../load', '../node_modules/when/when' ], function( buster, load, when ) {

	// Buster setup
	var expect = buster.assertions.expect,
		describe = buster.spec.describe, it = buster.spec.it,
		before = buster.spec.before, after = buster.spec.after;

	//
	// Tests
	//
	describe( 'Load', function() {
		before( function() {
			document.body.appendChild( document.createElement( 'script' ) );
			window._TESTS = {};
		} );

		it( 'is defined', function() {
			expect( load ).toBeDefined();
			expect( load ).toBeFunction();
		} );

		describe( 'Success', function() {
			it( '1 file', function( done ) {
				load( 'test/fixtures/test1.js', function() {

					expect( window._TESTS._1 ).toBeTrue();
					done();
				} );
			} );

			it( '2 files (parallel)', function() {
				var d1 = when.defer(), d2 = when.defer();

				load( 'test/fixtures/test1.js', function() {
					expect( window._TESTS._1 ).toBeTrue();
					d1.resolver.resolve();
				} );

				load( 'test/fixtures/test2.js', function() {
					expect( window._TESTS._2 ).toBeTrue();
					d2.resolver.resolve();
				}, 2000 );

				return when.all( [ d1.promise, d2.promise ] ).yield();
			} );

			it( '2 files (sync)', function( done ) {

				load( 'test/fixtures/test1.js', function() {
					expect( window._TESTS._1 ).toBeTrue();
					
					load( 'test/fixtures/test2.js', function() {
						expect( window._TESTS._2 ).toBeTrue();
						done();
					} );
				} );
			} );
		} );

		describe( 'Error 404', function() {
			it( '1 file', function( done ) {
				load( 'test/fixtures/test_undefined.js', function() {
					expect( window._TESTS ).not.toBeTrue();
					done();
				}, 1000 );
			} );

			it( '1 of 2 files (parallel)', function() {
				var d1 = when.defer(), d2 = when.defer();

				load( 'test/fixtures/test1.js', function() {
					expect( window._TESTS._1 ).toBeTrue();
					d1.resolver.resolve();
				} );

				load( 'test/fixtures/test_undefined.js', function() {
					expect( window._TESTS._2 ).not.toBeTrue();
					d2.resolver.resolve();
				}, 1000 );

				return when.all( [ d1.promise, d2.promise ] ).yield();
			} );

			it( '1 of 2 files (sync)', function( done ) {

				load( 'test/fixtures/test_undefined.js', function() {
					expect( window._TESTS._1 ).not.toBeTrue();
					
					load( 'test/fixtures/test2.js', function() {
						expect( window._TESTS._2 ).toBeTrue();
						done();
					} );
				}, 1000 );
			} );

			it( '2 of 2 files (sync)', function( done ) {

				load( 'test/fixtures/test_undefined.js', function() {
					expect( window._TESTS._1 ).not.toBeTrue();
					
					load( 'test/fixtures/test_undefined2.js', function() {
						expect( window._TESTS._2 ).not.toBeTrue();
						done();
					}, 1000 );
				}, 1000 );
			} );
		} );
	} );
} );
} )( typeof define == 'function'
	? define
	: function( deps, factory ) { factory( this.buster, this.asyncLoad, this.when ); }
	// Boilerplate for AMD, and browser global
);