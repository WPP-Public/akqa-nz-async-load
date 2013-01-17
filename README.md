# async-load [![Build Status](https://secure.travis-ci.org/heyday/async-load.png)](http://travis-ci.org/heyday/async-load)

An extremely miminal asynchronous JavaScript loader, **async-load** has a full unit test suite that passes in all popular browsers (and some not so popular browsers including IE6+), is **under 330bytes** when compiled with Uglify2 and gzipped, and has simple but featured API.

This library is made to be as small as possible so it can be inlined into the head of your HTML. This means it can be used to bootstrap your application without using blocking script tags or ugly boilerplate code.


## Quick Start

Three options are available for getting the source:

* [Download the latest release](https://github.com/heyday/async-load/zipball/master).
* Clone the repo: `git clone git://github.com/heyday/async-load.git`.
* Install with [Bower](http://twitter.github.com/bower): `bower install async-load`.

### AMD

1. Configure your loader with a package:

	```javascript
	packages: [
		{ name: 'async-load', location: 'path/to/async-load/', main: 'load' },
		// ... other packages ...
	]
	```

1. `define( [ 'async-load', ... ], function( load, ... ) { ... } );` or `require( [ 'async-load', ... ], function( load, ... ) { ... } );`

### Script Tag

1. `<script src="path/to/async-load/load.js"></script>`
1. `async-load` will be available as `window.asyncLoad`


## API

```javascript
asyncLoad( 'path/to/file.js', mySuccessOrErrorFunction, timeoutInMilliseconds );
```

### Basic load

###### Asynchronously load a file with AMD environment:
```javascript
define( [ 'async-load' ], function( asyncLoad ) {
	asyncLoad( 'path/to/your/file.js' );
} );
```

###### Asynchronously load a file with browser global:
```javascript
window.asyncLoad( 'path/to/your/file.js' );
```

### Load with callback

###### Success or error callback:
```javascript
asyncLoad( 'path/to/your/file.js', function() {
	// Success or error callback
} );
```

Due to IE not supporting the standard `onload` and `onerror` events, it is not possible to reliably determine the status of the loaded file (i.e., whether it was successful or there was an error). Because of this the **async-load** API has only a single callback, which is called in both instances. It is recommended, therefore, that you determine the status of the load within the callback function.

###### Determine the status of your loaded file:
```javascript
asyncLoad( 'path/to/your/file.js', function() {
	try {
		window.myInitFunction();
	} catch( e ) {
		console.log( 'ooo something went wrong, maybe the file didn\'t load?', e );
	}
} );
```

### Load with timeout

###### Time out (in milliseconds):
```javascript
asyncLoad( 'path/to/your/file.js', myCallBack, 1000 );
```

The time out will cause the callback function to be triggered after the timeout interval has elapsed. Be aware that this will not stop the file from eventually loading.


## Common usage

### Google analytics

```javascript
var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];

asyncLoad(('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js');
```

### Typekit

```javascript
asyncLoad( '//use.typekit.com/{your-typekit-id}.js', function() {
	try {
		window.Typekit.load();
	} catch(e) {}
} );
```

For more advanced loading of typekit that allows you to control the loading states see the [typekit-load](https://github.com/heyday/typekit-load) module.

## Development

### Running the unit tests

1. `npm install` - Install all required dev modules
1. `npm install -g grunt-cli` - Install Grunt
1. `grunt test` - Lints all files, and then runs the unit tests in a PhantomJS instance

### Building the module locally

1. `npm install` - Install all required dev modules
1. `npm install -g grunt-cli` - Install Grunt
1. `grunt build` - Runs all tests, and then builds the production file
