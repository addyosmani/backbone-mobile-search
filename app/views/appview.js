AppView = Backbone.View.extend({
    el: $("#appview"),
    initialize: function(){
        this.result_collection = new ResultCollection;
        
        //figure out how to only create photocollection if needed...
        //this.photo_collection = new PhotoCollection;
    },
    events: {
		"submit #queryForm" : "keyLoadResults",
		"change #sortBy": "keyLoadResults",
		"keydown #searchbox" : "handleKey"
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






