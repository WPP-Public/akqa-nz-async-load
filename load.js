/** @license MIT License (c) Heyday Digital */

/**
 * An extremely minimal asynchronous JavaScript loader
 *
 * Licensed under the MIT License at:
 * http://heyday.mit-license.org/
 *
 * @version 0.1.3
 */

/*jshint browser:true, laxbreak:true, expr:true */
( function( define ) {
define( function() {

	/**
	 * Load JavaScript file
	 * @param  {String} url     Url to load
	 * @param  {Function} [always] On success or error callback
	 * @param  {Int} [timeout] A false value will disable this feature
	 */
	return function( url, always, timeout ) {
		var el = document.createElement( 'script' ),
			first_script = document.getElementsByTagName( 'script' )[ 0 ],
			_timeout, addEventCallback, finished;

		/**
		 * Bind to or unbind from onload and on error events
		 * @param {Function|Null} cb Callback
		 */
		addEventCallback = function( cb ) {
			el.onload = el.onerror = el.onreadystatechange = cb;
		};

		/**
		 * Cleanup and unbind events
		 */
		finished = function() {
			addEventCallback( null );
			clearTimeout( _timeout );
			always();
		};

		/**
		 * Set url of script to load
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
			 * Bind to success/error events
			 */
			addEventCallback( function() {
				var rs = this.readyState;

				// Check for funky IE readyStates
				if ( !rs || rs === 'complete' || rs === 'loaded' ) { finished(); }
			} );

		}

		/**
		 * Insert script into DOM, starts download
		 */
		first_script.parentNode.insertBefore( el, first_script );
	};
} );
} )( typeof define === 'function' && define.amd
	? define
	: function( factory ) { typeof exports === 'object' ? module.exports = factory() : this.asyncLoad = factory(); }
	// Boilerplate for AMD, CommonJS and browser global
);