
    
      
	function dfdQuery(ctx, query, sort, page)
	{
			$.when( ctx.ajaxGetNews( query, sort, page ) )
               .then( $.proxy( function( response ){
                entries = response.photos.photo;
				workspace.q = query;
				workspace.p = page;
				workspace.s = sort;
                ctx.news_collection.refresh( entries );
			
               }, ctx ) ); 

	}

	var Workspace = Backbone.Controller.extend({
		
	  q:'',
	  p:1,
	  s:'relevance',

	  routes: {
	    "search/:query":       		   "search",  // #search/kiwis
	    "search/:query/s:sort/p:page": "search"   // #search/kiwis/srelevance/p7

	  },

	  search: function(query, sort, page) {
	    dfdQuery(appview, query, sort, page);
	  }
	
	});
	
