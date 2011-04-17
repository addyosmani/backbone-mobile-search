AppView = Backbone.View.extend({
    el: $("#appview"),
    initialize: function(){
        // Lets create an empty collection to store the news
        this.news_collection = new NewsCollection;


    },
    events: {
        "keydown #searchbox": "loadResults",
		"change #sortBy": "loadResults"
    },

    loadResults: function(event){
        query = $('#searchbox').val();
        sort = $('#sortBy').val();
        dfdQuery(this, query, sort);
    },
    ajaxGetNews: function( query, sort, page){
		var apiKey = "8662e376985445d92a07c79ff7d12ff8",
		    quantity = 24;
			(page == undefined) ? page = 0 : page = page;
			(sort == undefined) ? sort = ($('#sortBy').val()) : sort = sort;
			
	return $.ajax("http://api.flickr.com/services/rest/?format=json&jsoncallback=?" + "&method=flickr.photos.search" + "&per_page=" + quantity + "&page=" + page + "&sort=" + sort + "&text=" + query +  "&api_key=" + apiKey, { dataType: "json" });
      
    }

});


