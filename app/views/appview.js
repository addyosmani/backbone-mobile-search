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
		if(event.which == 13){
		}
	},

	keyLoadResults: function( event ){
	
        query = $('#searchbox').val();
        
		if( query ){	
			
			sort = $('#sortBy').val();
			var hashQuery = query, pageQuery = 1, sortQuery = sort;
			var endPoint = 'search/' + hashQuery + '/s' + sortQuery + '/p' + (parseInt(pageQuery));
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


