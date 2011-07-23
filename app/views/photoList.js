PhotoList = Backbone.View.extend({
    el: $("#singlephoto"), 
	
    initialize: function(){
    },
    
    renderList: function( collection ){

        var compiled_template = _.template( $("#photoview").html() );

		mobileSearch.utils.loadPrompt("Loading photo...");
		
        collection.resultlist.el.html( compiled_template( { results: collection.models } ) );
    
        setTimeout(function(){
        	$('#search').find("ul").listview("refresh");
        	/*note this needs to be written better otherwise multiple calls will
        	be made.*/
        }, 0);
        

    }
});

