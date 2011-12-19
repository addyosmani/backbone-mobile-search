
A complete Backbone.js mobile application demonstrating searching for images using the Flickr API with full support for pagination, bookmarking and more.

**Uses:**
<ul>
	<li>Backbone.js to aid application structure, routing</li>
	<li>Underscore.js for micro-templating and utilities</li>
	<li>Require.js and AMD for modular separation of components</li>
	<li>Require.js text plugin to enable external templates</li>
	<li>jQuery Mobile + jQuery for DOM manipulation, mobile helpers</li>
	<li>Flickr API for data</li>
</ul>


<strong>Note:</strong> This application needs to be run on a HTTP server, local or otherwise. To remove this requirement, simply switch from using external templates via Require.js/the text plugin to inline ones.

**Snippets**

**Backbone and jQuery Mobile: Resolving the routing conflicts**

The first major hurdle developers typically run into when building Backbone applications with jQuery Mobile is that both frameworks have their own opinions about how to handle application navigation. 

Backbone's routers offer an explicit way to define custom navigation routes through Backbone.Router, whilst jQuery Mobile encourages the use of URL hash fragments to reference separate 'pages' or views in the same document. jQuery Mobile also supports automatically pulling in external content for links through XHR calls meaning that there can be quite a lot of inter-framework confusion about what a link pointing at '#/photo/id' should actually be doing. 

Some of the solutions that have been previously proposed to work-around this problem included manually patching Backbone or jQuery Mobile. I discourage opting for these techniques as it becomes necessary to manually patch your framework builds when new releases get made upstream. 

There's also https://github.com/azicchetti/jquerymobile-router, which tries to solve this problem differently, however I think my proposed solution is both simpler and allows both frameworks to cohabit quite peacefully without the need to extend either. What we're after is a way to prevent one framework from listening to hash changes so that we can fully rely on the other (e.g. Backbone.Router) to handle this for us exclusively. 

Using jQuery Mobile this can be done by setting: 

<pre>
$.mobile.hashListeningEnabled = false;
</pre>

prior to initializing any of your other code. 

I discovered this method looking through some jQuery Mobile commits that didn't make their way into the official docs, but am happy to see that they are now covered here http://jquerymobile.com/test/docs/api/globalconfig.html in more detail.

The next question that arises is, if we're preventing jQuery Mobile from listening to URL hash changes, how can we still get the benefit of being able to navigate to other sections in a document using the built-in transitions and effects supported?. Good question. This can now be solve by simply calling $mobile.changePage() as follows:

<pre>
var url = '#about',
	effect = 'slideup',
	reverse = false,
	changeHash = false;

$.mobile.changePage( url , { transition: effect}, reverse, changeHash );
</pre>

In the above sample, <code>url</code> can refer to a URL or a hash identifier to navigate to, <code>effect</code> is simply the transition effect to animate the page in with and the final two parameters decide the direction for the transition (<code>reverse</code>) and whether or not the hash in the address bar should be updated (<code>changeHash</code>). With respect to the latter, I typically set this to false to avoid managing two sources for hash updates, but feel free to set this to true if you're comfortable doing so. 

**Using External Teplates**

Moving your [Underscore/Mustache/Handlebars] templates to external files is actually quite straight-forward. As this application makes use of Require.js, I'll discuss how to implement external templates using this specific script loader.

RequireJS has a special plugin called text.js which is used to load in text file dependencies. To use the text plugin, simply follow these simple steps:

1. Download the plugin from http://requirejs.org/docs/download.html#text and place it in either the same directory as your application's main JS file or a suitable sub-directory.

2. Next, include the text.js plugin in your initial Require.js configuration options. In the code snippet below, we assume that require.js is being included in our page prior to this code snippet being executed. Any of the other scripts being loaded are just there for the sake of example.
 
<pre>
require.config( {
    paths: {
        'backbone':         'libs/AMDbackbone-0.5.3',
        'underscore':       'libs/underscore-1.2.2',
        'text':             'libs/require/text',
        'jquery':           'libs/jQuery-1.7.1',
        'json2':            'libs/json2',
        'datepicker':       'libs/jQuery.ui.datepicker',
        'datepickermobile': 'libs/jquery.ui.datepicker.mobile',
        'jquerymobile':     'libs/jquery.mobile-1.0'
    },
    baseUrl: 'app'
} );
</pre>

3. When the <code>text!</code> prefix is used for a dependency, Require.js will automatically load the text plugin and treat the dependency as a text resource. A typical example of this in action may look like..

<pre>
require(['js/app', 'text!templates/mainView.html'],
	function(app, mainView){
		// the contents of the mainView file will be
		// loaded into mainView for usage.
	}
);
</pre>

4. Finally we can use the text resource that's been loaded for templating purposes. You're probably used to storing your HTML templates inline using a script with a specific identifier. 

With Underscore.js's micro-templating (and jQuery) this would typically be:

HTML:
<pre>
&lt;script type=&quot;text/template&quot; id=&quot;mainViewTemplate&quot;&gt;
	&lt;% _.each( person, function( person_item ){ %&gt;
                &lt;li&gt;&lt;%= person_item.get(&quot;name&quot;) %&gt;&lt;/li&gt;  
     &lt;% }); %&gt;
&lt;/script&gt;
</pre>

JS:
<pre>
var compiled_template = _.template( $('#mainViewTemplate').html() );
</pre>

With Require.js and the text plugin however, it's as simple as saving your template into an external text file (say, mainView.html) and doing the following:

<pre>
require(['js/app', 'text!templates/mainView.html'],
	function(app, mainView){
		
		var compiled_template = _.template( mainView );
	}
);
</pre>

That's it!. You can then go applying your template to a view in Backbone doing something like:

<pre>
collection.someview.el.html( compiled_template( { results: collection.models } ) );
</pre>


All templating solutions will have their own custom methods for handling template compilation, but if you understand the above, substituting Underscore's micro-templating for any other solution should be fairly trivial.

