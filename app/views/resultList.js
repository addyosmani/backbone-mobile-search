ResultList = Backbone.View.extend({
    el: $("#listviewholder"), 
	
    initialize: function(){
    },
    
    renderList: function( collection ){

        var compiled_template = _.template( $("#listviewul").html() );

		mobileSearch.utils.loadPrompt("Loading results...");
		
		mobileSearch.utils.toggleNavigation(true);
		
        collection.resultlist.el.html( compiled_template( { results: collection.models } ) );
    
        setTimeout(function(){
        	$search = $('#search');
        	//$search.find("ul").listview();
        	$search.find("ul").listview("refresh");
        }, 0);
        

    }
});


