
NewsList = Backbone.View.extend({
    el: $("#newslist"), 
    initialize: function(){
       // this.el.html("Enter in keyword to query Flickr");
    },
    renderList: function( collection ){
        var compiled_template = _.template( $("#newslistul").html() );
		loadPrompt("Loading results...");
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

