ResultList = Backbone.View.extend({
    el: $("#listviewholder"), 
	
    initialize: function(){
    },
    
    renderList: function( collection ){
        var compiled_template = _.template( $("#listviewul").html() );

		loadPrompt("Loading results...");
		showNavigation();
		
        collection.resultlist.el.html( compiled_template( { results: collection.models } ) );

    }
});


