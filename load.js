/** @license MIT License (c) copyright Heyday Digital */

/**
 * An extremely miminal asynchronous script loader
 *
 * Licensed under the MIT License at:
 * http://heyday.mit-license.org/
 *
 * @version 0.1.0
 */

/*jshint browser:true, laxbreak:true */
( function( define ) { 'use strict';
define( function() {

	// Constants
	var SCRIPT = 'script';

	/**
	 * Load JavaScript file
	 * @param  {String} url     Url to load
	 * @param  {Function} success Success callback
	 * @param  {Function} error   Error callback
	 * @param  {Int} timeout Timeout false, a falsy value will disable this feature
	 */
	return function( url, success, error, timeout ) {
		var el = document.createElement( SCRIPT ),
			first_script = document.getElementsByTagName( SCRIPT )[ 0 ],
			_timeout, finished, onError, onSuccess;

		/**
		 * Cleanup and unbind events
		 */
		finished = function() {
			el.onload = el.onerror = el.onreadystatechange = null;
			clearTimeout( _timeout );
		};

		/**
		 * Call sucess callback
		 */
		onSuccess = function() {
			finished();
			success && success();
		};

		/**
		 * Call error callback
		 */
		onError = function() {
			finished();
			error && error();
		};

		/**
		 * Set url to script
		 */
		el.src = url;

		/**
		 * Set timeout if value is set
		 */
		if ( timeout ) {
			_timeout = setTimeout( function() { onError(); }, timeout );
		}

		/**
		 * Bind to success events
		 */
		el.onload = el.onreadystatechange = function() {
			var rs = this.readyState;

			// Make sure the call back hasn't already been called
			if ( !rs || rs === 'complete' || rs === 'loaded' ) { onSuccess(); }
		};

		/**
		 * Bind to error events
		 */
		el.onerror = onError;

		/**
		 * Insert script into DOM, starts download
		 */
		first_script.parentNode.insertBefore( el, first_script );
	};
} );
} )( typeof define == 'function'
	? define
	: function( factory ) { this.asyncLoad = factory(); }
	// Boilerplate for AMD, and browser global
);