
// AMD or browser wrapper for module format
( function( root, factory ) {
	if ( typeof define === 'function' && define.amd ) {
		define( factory );
	} else {
		root.asyncLoad = factory();
	}
}( this, function() {
	'use strict';

	// Constants
	var SCRIPT = 'script',
		TIMEOUT = 2000;

	// Loader function
	return function( url, success, error ) {
		var el = document.createElement( SCRIPT ),
			first_script = document.getElementsByTagName( SCRIPT )[ 0 ],
			loaded = false,
			timeout;

		// Set url to script
		el.src = url;

		// If error callback is defined activate timeout
		if ( error ) timeout = setTimeout( function() { error( url ); }, TIMEOUT );

		// Listen for load events
		if ( success || error ) el.onload = el.onreadystatechange = function() {
			var rs = this.readyState;

			// Make sure the call back hasn't already been called
			if ( loaded || ( rs && rs !== 'complete' && rs !== 'loaded' ) ) { return; }
			loaded = true;

			// Clear error timeout
			if ( error ) { clearTimeout( timeout ); }

			// Call success
			if ( success ) { success( url ); }
		};

		first_script.parentNode.insertBefore( el, first_script );
	};

} ) );