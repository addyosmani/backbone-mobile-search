
NewsList = Backbone.View.extend({
    el: $("#newslist"), 
    initialize: function(){
       // this.el.html("Enter in keyword to query Flickr");
    },
    renderList: function( collection ){
        var compiled_template = _.template( $("#newslistul").html() );

/*
		$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+ "Loading results..." +"</h1></div>")
			.css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 100 })
			.appendTo( $.mobile.pageContainer )
			.delay( 800 )
			.fadeOut( 400, function(){
				$(this).remove();
	    });
*/
		
		$('#nextSet').show();
        collection.newslist.el.html( compiled_template( { news: collection.models } ) );

		$('ul li').append("<div class='loader'></div>");
	    $('ul li img').bind("load", function(){ 
				$('.loader').remove();
				$(this).show();
			});  
			
		$.scrollTo('250px'); //improve. this shouldn't be a fixed number at all

    }
});

