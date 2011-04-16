NewsList = Backbone.View.extend({
    el: $("#newslist"), // Every view has a element associated with it
    initialize: function(){
        // Set the initial content of the view
       // this.el.html("Enter in keyword to query Flickr");
    },
    renderList: function( collection ){
        // This function is called when the collection "listens"
        // for the "refresh" event which is called in our loadResults()
        // Now we want to compile our underscore template
        // The underscore template just takes a string of text/html 
        var compiled_template = _.template( $("#newslistul").html() );
        // Once compiled we can call our template and pass it any 
        // matching data we have and append it to our view.el


$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+ 'Loading results...' +"</h1></div>")
	.css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 100 })
	.appendTo( $.mobile.pageContainer )
	.delay( 800 )
	.fadeOut( 400, function(){
		$(this).remove();
	});


$('#nextSet').show();

        collection.newslist.el.html( compiled_template( { news: collection.models } ) );

		$('ul li').append("<div class='loader'></div>");
	    $('ul li img').bind("load", 
			function(){ 
				$('.loader').remove();
				$(this).show();
			});  

    }
});