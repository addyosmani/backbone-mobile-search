AppView = Backbone.View.extend({
    el: $("#appview"),
    initialize: function(){
        this.result_collection = new ResultCollection;
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
	},

    ajaxGetResults: function( query, sort, page){
		var apiKey = "8662e376985445d92a07c79ff7d12ff8",
		    quantity = 16;
			(page == undefined) ? page = 0 : page = page;
			(sort == undefined) ? sort = ($('#sortBy').val()) : sort = sort;
		return $.ajax("http://api.flickr.com/services/rest/?format=json&jsoncallback=?" + "&method=flickr.photos.search" + "&per_page=" + quantity + "&page=" + page + "&sort=" + sort + "&text=" + query +  "&api_key=" + apiKey, { dataType: "json" });  
    }
});






