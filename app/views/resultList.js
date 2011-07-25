ResultList = Backbone.View.extend({
    el: $("#listviewholder"), 
	
    initialize: function(){
    },
    
    renderList: function( collection ){

        var compiled_template = _.template( $("#listviewul").html() );
        
        //$('#search').find("ul").listview();
        
        

		mobileSearch.utils.loadPrompt("Loading results...");
		
		toggleNavigation(true);
		
        collection.resultlist.el.html( compiled_template( { results: collection.models } ) );
    
        setTimeout(function(){
        $('#search').find("ul").listview();
        	$('#search').find("ul").listview("refresh");
        }, 0);
        

    }
});


