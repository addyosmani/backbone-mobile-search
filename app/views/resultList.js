ResultList = Backbone.View.extend({
    el: $("#listviewholder"), 
	
    initialize: function(){
    },
    
    renderList: function( collection ){

        var compiled_template = _.template( $("#listviewul").html() );

		mobileSearch.utils.loadPrompt("Loading results...");
		
		toggleNavigation(true);//show
				
        collection.resultlist.el.html( compiled_template( { results: collection.models } ) );
       
        setTimeout(function(){
        	$('#search').find("ul").listview("refresh");
        }, 0);
        

    }
});


