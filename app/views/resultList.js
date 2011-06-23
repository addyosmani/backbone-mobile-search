ResultList = Backbone.View.extend({
    el: $("#listviewholder"), 
	
    initialize: function(){
    },
    
    renderList: function( collection ){
        var compiled_template = _.template( $("#listviewul").html() );
			
		loadPrompt("Loading results...");
		
		$('#nextSet,#prevSet').show();
		
        collection.resultlist.el.html( compiled_template( { results: collection.models } ) );

		//resultList.append("<div class='loader'></div>");
		//location.hash = 'search';

    }
});


