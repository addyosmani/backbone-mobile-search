AppView = Backbone.View.extend({
    el: $("#appview"),
    initialize: function(){
        this.news_collection = new NewsCollection;
    },
    events: {
		"submit #queryForm" : "keyLoadResults",
		"change #sortBy": "keyLoadResults"
    },

	keyLoadResults: function(event){
        query = $('#searchbox').val();
        sort = $('#sortBy').val();
		var hashQuery = query, pageQuery = 1, sortQuery = sort;
		location.hash = 'search/' + hashQuery + '/s' + sortQuery + '/p' + (parseInt(pageQuery));
		return false;
	},

    ajaxGetNews: function( query, sort, page){
		var apiKey = "8662e376985445d92a07c79ff7d12ff8",
		    quantity = 24;
			(page == undefined) ? page = 0 : page = page;
			(sort == undefined) ? sort = ($('#sortBy').val()) : sort = sort;
			
		return $.ajax("http://api.flickr.com/services/rest/?format=json&jsoncallback=?" + "&method=flickr.photos.search" + "&per_page=" + quantity + "&page=" + page + "&sort=" + sort + "&text=" + query +  "&api_key=" + apiKey, { dataType: "json" });
      
    }

});


