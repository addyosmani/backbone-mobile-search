var Workspace = Backbone.Router.extend({
	  q:'',
	  p:1,
	  s:'relevance',
	  routes: {
		"search/:query":       		   "search",  // #search/kiwis
		"search/:query/s:sort/p:page": "search",   // #search/kiwis/srelevance/p7
		"photo/:id":	"photo"
	  },
	  search: function( query , sort , page ){
	  	mobileSearch.utils.dfdQuery('search', mobileSearch.views.appview, query, sort, page);
	  },
	  photo: function ( id ){
	  	//photo id intercepted.
	  	mobileSearch.utils.dfdQuery('photo', mobileSearch.views.appview, id);
	  }	
});

