#Flickly Mobile

*This app was further refactored 21/12

A complete Backbone.js + jQuery Mobile sample app using AMD for separation of modules, Require.js for dependency management + template externalisation and Underscore for templating.

The app allows you to search for images using the Flickr API, lookup individual photos in more detail, bookmark any state for results or photos, supports pagination and more.

##Uses:
<ul>
	<li>Backbone.js to aid application structure, routing</li>
	<li>Underscore.js for micro-templating and utilities</li>
	<li>Require.js and AMD for modular separation of components</li>
	<li>Require.js text plugin to enable external templates</li>
	<li>jQuery Mobile + jQuery for DOM manipulation, mobile helpers</li>
	<li>Flickr API for data</li>
</ul>


<strong>Note:</strong> This application needs to be run on a HTTP server, local or otherwise. To remove this requirement, simply switch from using external templates via Require.js/the text plugin to inline ones.

##Snippets from the upcoming tutorial for this app: Writing Modular Desktop & Mobile Applications With Backbone.js

(in no particular order)

###Why use Require.js with Backbone?

In case you haven't used it before, Require.js is a popular script loader written by James Burke - a developer who has been quite instrumental in helping shape the AMD module format, which we'll discuss more shortly. Some of Require.js's capabilities include helping to load multiple script files, helping define modules with or without dependencies and loading in non-script dependencies such as text files.

So, why use Require.js with Backbone?. Although Backbone is excellent when it comes to providing a sanitary structure to your applications, there are a few key areas where some additional help could be used:

1) Backbone doesn't endorse a particular approach to modular-development. Although this means it's quite open-ended for developers to opt for classical patterns like the module-pattern or object literals for structuring their apps (which both work fine), it also means developers aren't sure of what works best when other concerns come into play, such as dependency management.

Require.js is compatible with the AMD (Asynchronous Module Definition) format, a format which was born from a desire to write something better than the 'write lots of script tags with implicit dependencies and manage them manually' approach to development. In addition to allowing you to clearly declare dependencies, AMD works well in the browser, supports string IDs for dependencies, declaring multiple modules in the same file and gives you easy-to-use tools to avoid polluting the global namespace.

2) Let's discuss dependency management a little more as it can actually be quite challenging to get right if you're doing it by hand. When we write modules in JavaScript, we ideally want to be able to handle the reuse of code units intelligently and sometimes this will mean pulling in other modules at run-time whilst at other times you may want to do this dynamically to avoid a large pay-load when the user first hits your application.

Think about the GMail web-client for a moment. When users initially load up the page on their first visit, Google can simply hide widgets such as the chat module until a user has indicated (by clicking 'expand') that they wish to use it. Through dynamic dependency loading, Google could load up the chat module only then, rather than forcing all users to load it when the page first initializes. This can improve performance and load times and can definitely prove useful when building larger applications.

I've previously written a detailed article covering both AMD and other module formats and script loaders here (http://addyosmani.com/writing-modular-js) in case you'd like to explore this topic further. The takeaway is that although it's perfectly fine to develop applications without a script loader or clean module format in place, it can be of significant benefit to consider using these tools in your application development.

###A brief tutorial on writing AMD modules with Require.js

As discussed above, the overall goal for the AMD format is to provide a solution for modular JavaScript that developers can use today. The two key concepts you need to be aware of when using it with a script-loader are a <code>define()</code> method for facilitating module definition and a <code>require()</code> method for handling dependency loading. <em>define()</em> is used to define named or unnamed modules based on the proposal using the following signature:</p>

<pre>
define(
    module_id /*optional*/, 
    [dependencies] /*optional*/, 
    definition function /*function for instantiating the module or object*/
);
</pre>

As you can tell by the inline comments, the <code>module_id</code> is an optional argument which is typically only required when non-AMD concatenation tools are being used (there may be some other edge cases where it's useful too). When this argument is left out, we call the module 'anonymous'. When working with anonymous modules, the idea of a module's identity is DRY, making it trivial to avoid duplication of filenames and code. 

Back to the define signature, the dependencies argument represents an array of dependencies which are required by the module you are defining and the third argument ('definition function') is a function that's executed to instantiate your module. A barebone module (compatible with Require.js) could be defined using <code>define()</code> as follows: </p>

<pre>
// A module ID has been omitted here to make the module anonymous

define(['foo', 'bar'], 
    // module definition function
    // dependencies (foo and bar) are mapped to function parameters
    function ( foo, bar ) {
        // return a value that defines the module export
        // (i.e the functionality we want to expose for consumption)
    
        // create your module here
        var myModule = {
            doStuff:function(){
                console.log('Yay! Stuff');
            }
        }

        return myModule;
});
</pre>


<code>require()</code> on the other hand is typically used to load code in a top-level JavaScript file or within a module should you wish to dynamically fetch dependencies. An example of its usage is:</p>

<pre>
// Consider 'foo' and 'bar' are two external modules
// In this example, the 'exports' from the two modules loaded are passed as
// function arguments to the callback (foo and bar)
// so that they can similarly be accessed

require(['foo', 'bar'], function ( foo, bar ) {
        // rest of your code here
        foo.doSomething();
});
</pre>


<strong>Defining AMD Modules Using Require.js</strong>

//Todo: explain and demonstrate how to wrap views etc. inside AMD modules and how that all works.

<pre>
require(['app/myModule'], 
    function( myModule ){
        // start the main module which in-turn
        // loads other modules
        var module = new myModule();
        module.doStuff();
});
</pre>


### Modular desktop applications with Require.js and Backbone

My side-project TodoMVC now includes a modular Backbone example using AMD and Require.js (thanks to Thomas Davis) for anyone wishing to look at a sample without any of the jQuery Mobile code included:

https://github.com/addyosmani/todomvc/tree/master/todo-example/backbone+require

This covers how to wrap your views, models, modules etc. using AMD and also cleanly demonstrates handling dependency management as well as Flickly does.


###External [Underscore/Handlebars/Mustache] templates using Require.js

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

<strong>Note:</strong> You may also be interested in looking at https://github.com/ZeeAgency/requirejs-tpl. It's an AMD-compatible version of the Underscore templating system that also includes support for optimization (pre-compiled templates) which can lead to better performance and no evals. I have yet to use it myself, but it comes as a recommended resource.



###Backbone and jQuery Mobile: Resolving the routing conflicts

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

The next question that arises is, if we're preventing jQuery Mobile from listening to URL hash changes, how can we still get the benefit of being able to navigate to other sections in a document using the built-in transitions and effects supported?. Good question. This can now be solve by simply calling <code>$.mobile.changePage()</code> as follows:

<pre>
var url = '#about',
    effect = 'slideup',
    reverse = false,
    changeHash = false;

$.mobile.changePage( url , { transition: effect}, reverse, changeHash );
</pre>

In the above sample, <code>url</code> can refer to a URL or a hash identifier to navigate to, <code>effect</code> is simply the transition effect to animate the page in with and the final two parameters decide the direction for the transition (<code>reverse</code>) and whether or not the hash in the address bar should be updated (<code>changeHash</code>). With respect to the latter, I typically set this to false to avoid managing two sources for hash updates, but feel free to set this to true if you're comfortable doing so. 

<strong>Note:</strong> For some parallel work being done to explore how well the jQuery Mobile Router plugin works with Backbone, you may be interested in checking out https://github.com/Filirom1/jquery-mobile-backbone-requirejs.



###Getting started

Once you feel comfortable with the Backbone fundamentals (http://msdn.microsoft.com/en-us/scriptjunkie/hh377172.aspx) and you've put together a rough wireframe of the app you may wish to build, start to think about your application architecture. Ideally, you'll want to logically separate concerns so that it's as easy as possible to maintain the app in the future.

<strong>Namespacing</strong>

For this application, I opted for the nested namespacing pattern. Implemented correctly, this enables you to clearly identify if items being referenced in your app are views, other modules and so on. This initial structure is a sane place to also include application defaults (unless you prefer maintaining those in a separate file).

<pre>
window.mobileSearch = window.mobileSearch || {
    views: {
        appview: new AppView
    },
    routers:{
        workspace:new Workspace()
    },
    utils: utils,
    defaults:{
        resultsPerPage: 16,
        safeSearch: 2,
        maxDate:'',
        minDate:'01/01/1970'
    }
}
</pre>

<strong>Models</strong>

In the Flickly application, there are at least two unique types of data that need to be modelled - search results and individual photos, both of which contain additional meta-data like photo titles. If you simplify this down, search results are actually groups of photos in their own right, so the application only requires:

* A single model (a photo or 'result' entry)
* A result collection (containing a group of result entries) for search results
* A photo collection (containing one or more result entries) for individual photos or photos with more than one image

<strong>Views</strong>

The views we'll need include an application view, a search results view and a photo view. Static views or pages of the single-page application which do not require a dynamic element to them (e.g an 'about' page) can be easily coded up in your document's markup, independant of Backbone. 

<strong>Routers</strong>

A number of possible routes need to be taken into consideration:

* Basic search queries <code>#search/kiwis</code>
* Search queries with additional parameters (e.g sort, pagination) <code>#search/kiwis/srelevance/p7</code>
* Queries for specific photos <code>#photo/93839</code>
* A default route (no parameters passed)


###jQuery Mobile: Going beyond mobile application development

The majority of jQM apps I've seen in production have been developed for the purpose of providing an optimal experience to users on mobile devices. Given that the framework was developed for this purpose, there's nothing fundamentally wrong with this, but many developers forget that jQM is a UI framework not dissimilar to jQuery UI. It's using the widget factory and is capable of being used for a lot more than we give it credit for.

If you open up Flickly in a desktop browser, you'll get an image search UI that's modelled on Google.com, however, review the components (buttons, text inputs, tabs) on the page for a moment. The desktop UI doesn't look anything like a mobile application yet I'm still using jQM for theming mobile components; the tabs, date-picker, sliders - everything in the desktop UI is re-using what jQM would be providing users on mobile devices. Thanks to some media queries, the desktop UI can make optimal use of whitespace, expanding component blocks out and providing alternative layouts whilst still making use of jQM as a component framework.

The benefit of this is that I don't need to go pulling in jQuery UI separately to be able to take advantage of these features. Thanks to the recent ThemeRoller my components can look pretty much exactly how I would like them to and users of the app can get a jQM UI for lower-resolutions and a jQM-ish UI for everything else. 

The takeaway here is just to remember that if you're not (already) going through the hassle of conditional script/style loading based on screen-resolution (using matchMedia.js etc), there are simpler approaches that can be taken to cross-device component theming. 

                                  

