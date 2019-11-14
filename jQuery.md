# [jQuery](http://www.jquery.com) — New Ware JavaScript

![](https://camo.githubusercontent.com/5d9de981d9d8bac0704c88c883fb7ea189853438/68747470733a2f2f6170702e666f7373612e696f2f6170692f70726f6a656374732f6769742532426769746875622e636f6d2532466a71756572792532466a71756572792e7376673f747970653d736869656c64)

![](https://camo.githubusercontent.com/23f54f6f19526affe12eff896c1e88d65cc9c921/68747470733a2f2f6261646765732e6769747465722e696d2f6a71756572792f6a71756572792e737667)

## Contribution Guides
In the spirit of open source software development，jQuey always encourages community code contribution. To help you get started abd before you jump into writing code, be sure to read these important contribution guidelines thoroughly:

1. [Getting Involved](https://contribute.jquery.org/)
2. [Core Style Guide](https://contribute.jquery.org/style-guide/js/)
3. [Writing Code for jQuery Foundation Projects](https://contribute.jquery.org/code/)
## Environments in which to use jQuery
* [Browser support]()
* jQuery also supports Node, browser extensions, and other non-browser environments.
## What you need to build your own jQuery
To build jQuery, you need to have the latest Node.js/npm and git 1.7 or later. Earlier versions might work, but are not supported.

For Windows, you have to download and install git and Node.js.

OS X users should install Homebrew. Once Homebrew is installed, run `brew install git` to install git, and `brew install node` to install Node.js.

Linux/BSD users should use their appropriate package managers to install git and Node.js, or build from source if you swing that way. Easy-peasy.

## How to build your own jQuery
Clone a copy of the main jQuery git repo by running:
```sh    
git clone git ://github.com/jquery/jquery.git
```
Enter the jquery directory and run the build script:
```sh
cd jquery && npm run build
```
The built version of jQuery will be put in the `dist/` subdirectory, along with the minified copy and associated map file. 

If you want to create custom build or help with jQuery development, it would be better to install [grunt command line interface]() as a global package:
```sh
npm install -g grunt-cli
```
Make sure you have `grunt` install by testing:
```sh
grunt -V
```
There are many other tasks available for jQuery Core:
```sh
grunt -help
```
## Modules
Special builds can be created that exclude subsets of jQuery functionality. This allows for smaller custom builds when the builder is certain that those parts of jQuery are not being used. For example, an app that only used JSONP for `$.ajax()` and did not need to caculate offsets or positions of elements could exclude the offset and ajax/xhr modules.

Any module may be excluded except for `core`, and `selector`. To exclude a modules, pass its path relative to the  `src` folder (without the `.js` extension).

Some example modules that can be excluded are:
* **ajax**: All AJAX functionality: `$.ajax()`, `$.get()`, `$.post()`, `$.ajaxSetup()`, `$.load()`,transports, and ajax event shorthands such as `.ajaxStart()`.
* **ajax/xhr**: The XMLHTTPRequest AJAX transport only.
* **ajax/script**: The `<script>` AJAX transport only; used to retrieve scripts.
* **ajax/jsoup**: The JSOUP AJAX transport only; depends on the ajax/script transport.
* **css**: The `.css()` method. Also removes all modules depending on css (including **effects**, **dimensions**, and **offset**).
* **css/showHide**： Non-animated `.show()`, `.hide()` and `.toggle()`; can be excluded if you use classes or explicit `.css()` calls to set the `displays` property. Also removes the **effects** module.
* **depracated**: Methods documented as deprecated but not yet removed.
* **dimensions**: The `.width()` and `.height()` methods, including `inner-` and `outer-` variations.
* **effects**: The `.animate()` method and its shorthands such as `.slideUp()` or `.hide("slow")`.
* **event**: The `.on()` and `.off()` methods and all event functionality. Also removes `.event/alias`.
* **event/alias**: All event attaching/triggering shorthands like `.click()` or `.mouseover()`.
* **event/trigger**: The `.trigger()` and `.triggerHandler()` methods. Used by the **alias** module.
* **offset**: The `.offset()`, `.postion()`, `.offsetParent()`, `.scrollLeft()`, and `.scrollTop()` methods.
* **wrap**: The `.wrap()`, `.wrapAll()`, `.wrapInner()`, and `.unwrap()` methods.
* **core/ready**: Exclude the ready module if you place your script at the end of body. Any ready callbacks bound with `jQuery()` will simply be called immediately. However, `jQuery(document).ready()` will not be a funtion and `.on("ready", ...)` or similar sill not be triggered.
* **deferred**: Exclude jQuery. Deferred. This also removes jQuery.Callbacks. *Note* that modules taht depend on jQuery. Deferred(AJAX, effects, core/ready) will not be removed and will still expect jQuery. Deferred to be there .Include your own jQuery. Deferred implementation or exclude those modules as well (`grunt custom:-deferred,-ajax,-effects.-core/ready`).
* **exports/global**: Exclude the attachment of global jQuery variables ($ and jQeury) to the window.
* **exports/amd**: Exclude the AMD definition.
The build process shows a message for each dependent module it excludes or includes
##### AMD name
As an option, you can set the module name for jQuery's AMD definition. Be default, it is set to "jquery", which plays nicely with plugins and third-party libraries, but there may be cases where you'd like to change this. Simply set the `"amd"` option:
```sh
grunt custom --amd="custom-name"
```
Or, to define anonymously, set the name to an empty string.
```sh
grunt custom --amd=""
```
##### Custom Build Examples 
To create a custom build, first check out the version:
```sh
git pull; git checkout VERSION
```
Where VERSION is the version you want to customize. Then, make sure all Node dependencies are installed:
```sh
npm install
```
Create the custom build using the `grunt custom` option, listing the modules to be excluded.

Exclude all **ajax** functionality:
```sh
grunt custom:-ajax
```
Excluding **css** removes modules depending on CSS: **effects**, **offset**, **dimensions**.
```sh
grunt custom:-css
```
Exclude a bunch of modules:
```sh
grunt custom:-ajax, -css, -deprecated, -dimensions, -effects, -event/alias, -offset, -warp 
```
For questions or requests regarding custom builds, please start a thread an the [Developing jQuery Core]() section of the forum, Due to the combinatorics and custom nature of these builds, they are not regularly tested in jQuery's unit test process.
## Running the Unit Tests
Make sure you have the necessary dependencies:
```sh
npm install
```
Start `grunt watch` or `npm start` to auto-build jQuery as you work:
```sh
grunt watch
```
Run the unit tests with a local server that supports PHP. Ensure that you run the site from the root directory, not the "test" directory. No database is required. Pre-configured php local servers are availables for Windows and Mac. Here are some options:
* Windows: [WAMP download](http://www.wampserver.com/en/)
* Mac: [MAMP download](https://www.mamp.info/en/downloads/)
* Linux: [Setting up LAMP](https://www.linux.com/learn/tutorials/288158-easy-lamp-server-installation)
* [Mongoose(most platforms)](https://code.google.com/p/mongoose/)
## Building to a different directory
To copy the built jQuery files from `/dist` to another directory:
```sh
grunt && grunt dist:/path/to/special/location/
```
With this example, the output files would be:
```sh
/path/to/special/location/jquery.js
/path/to/special/location/jquery.min.js
```
To add a permanent copy destination, create a file in `dist/` called ".destination.json". Inside the file, paste and customize the following:
```json
{
    "/Absolute/path/to/other/destionation": true
}
```
Additionally, both methods can be combined.
## Essential Git
As the source code is handled by the Git version control system, it's useful to knome some features used.
### Cleaning
If you want to purge your working directory back to the status of upstream, the following commands can be used(remember everything you've worked on is gone after these):
```sh
git reset --hard upstream/master
git clean -fdx
```
### Rebasing
For feature/topic branches, you should always use the `--rebase` flag to `git pull`, or if you are usually handling many temporary "to be in a github pull request" branches, run the following to autimate this:
```sh
git config branch.autosetuprebase local
```
(see `man git-config` for more information)
### Handling merge conflicts
If you're getting merge confilicts when merging, instead of editing the conflicted files manually, you can use the feature `git mergetool`. Even though the default tool `xxdiff` looks awful/old, it's rather useful.

The following are some commands that can be used there:
* `Ctrl + Alt + M` - automerge as much as possible
* `b` -jump to next merge confict
* `s` -change the order of the conflicted lines
* `u` -undo a merge
* `left mouse button` -mark ablock to be the winner
* `middle mouse button` -mark a line to be the winner
* `Ctrl + S` -Save
* `Ctrl + Q` -Quit
## QUnit Reference
### Test methods
```javascript
expect( numAssertions );
stop();
start();
```
*Note*: QUnit's eventual addition of an argument to stop/start is ignored in this test suite so that start and stop can passed as callbacks without worrying about their paramenters.
### Test assertions
```javascript
ok( value, [message] );
equals( actual, expected, [message] );
notEqual( actual, expected, [message] );
deepEqual( actual, expected, [message] );
notDeepEqual( actual, expected, [message] );
strictEqual( actual, expected, [message] );
notStrictEqual( actual, expected, [message] );
throws( block, [expected], [message] );
```
## Test Suite Convenience Methods REference (See [test/data/testinit.js](https://github.com/jquery/jquery/blob/master/test/data/testinit.js))
### Returns an array of elements with the givens IDs
```javascript
q( ... );
```
EXample:
```javascript
q( "main", "foo", "bar" );

=> [ div#main, span#foo, input#bar ]
```
### Asserts that a selecttion matches the given IDs
```javascript
t( testName, selector, [ "array", "of", "ids" ] );
```
Example:
```javascript
t( "Check for somthing" , "//[a]", [ "foo", "bar" ] );
```
### Fires a native DOM event without going throungh jQuery
```javascript
fireNative( Node, eventType )
```
Example:
```javascript
fireNative( jQuery("#elem")[0], "click" );
```
### Add random number to url to stop caching
```javascript
url( "some/url" );
```
Exmaple:
```javascript
url( "index.html" );

=> "data/index.html?102948375893"


url( "mock.php?foo=bar" );

=> "data/mock.php?foo=bar&139829482748"
```
### Run tests in an iframe
Some tests may require a document other than the standard test fixture, and these can be run in a separate iframe. The actual test code and assertions remain in jQuery's main test files; only the minimal test fixture markup and setup code should be palced in the iframe file.
```javascript
testIframe( testName, fileName,
    function testCallback(
        assert, jQuery, window, document,
            [ additional args ] ) {
        ...
            });
```
This loads a page, constructing a url with fileName `"./data/" + fileName`. The iframed page determines when the callback occurs in the test by including the "/test/data/iframeTest.js" script and calling `startIframeTest( [ additional args ] )` hwen appropriate. Often this be after either document ready or `window.onload` files.

The `testCallback` receives the QUnit `assert` object created by `testIframe` for this test, followed by the global `jQuery`, `window` and `document` from the iframe. If the iframe code passes any arguments to `startIframeTest`, they follow the `document` argument.
## Questions?
If you have any questions, please feel free to ask on the [Developing jQuery Core forum](https://forum.jquery.com/developing-jquery-core) or in #jquery on irc. freenode.net.

