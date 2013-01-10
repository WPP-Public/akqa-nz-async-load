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
	 * @param  {Function} always On success or error callback
	 * @param  {Int} timeout Timeout false, a falsy value will disable this feature
	 */
	return function( url, always, timeout ) {
		var el = document.createElement( SCRIPT ),
			first_script = document.getElementsByTagName( SCRIPT )[ 0 ],
			_timeout, finished;

		/**
		 * Cleanup and unbind events
		 */
		finished = function() {
			el.onload = el.onerror = el.onreadystatechange = null;
			clearTimeout( _timeout );
			always();
		};

		/**
		 * Set url to script
		 */
		el.src = url;

		if ( always ) {

			/**
			 * Set timeout if value is set
			 */
			if ( timeout ) {
				_timeout = setTimeout( finished, timeout );
			}

			/**
			 * Bind to success events
			 */
			el.onload = el.onerror = el.onreadystatechange = function() {
				var rs = this.readyState;

				// Make sure the callback hasn't already been called
				if ( !rs || rs === 'complete' || rs === 'loaded' ) { finished(); }
			};

		}

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