/*
effectively have three views - appview, photolist and resultlist 
the last two of which are dynamically used.
*/
AppView = Backbone.View.extend({
    el: $("#appview"),
    initialize: function(){
    },
    events: {
		"submit #queryForm" : "keyLoadResults",
		"change #sortBy": "keyLoadResults",
		"keydown #searchbox" : "handleKey"
    },
    
    setCollection: function( option ){
    	if(option == 'search'){
    		this.result_collection = new ResultCollection;
    	}else{
    		this.photo_collection = new PhotoCollection;
    	}
    },

	handleKey : function( event ){
	},

	keyLoadResults: function( event ){
        var query = $('#searchbox').val();
		if( query ){	
			var sort = $('#sortBy').val(),
			    endPoint = mobileSearch.utils.queryConstructor(query, sort, 1);
			location.hash = endPoint;

		}else{
			mobileSearch.utils.loadPrompt('Please enter a search query to continue');
		}
		return false;
	}
});






