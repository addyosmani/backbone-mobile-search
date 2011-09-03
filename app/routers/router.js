Workspace = Backbone.Router.extend({
	  q:'',
	  p:1,
	  s:'relevance',
	  routes: {
		"search/:query":       		   "search",  	// #search/kiwis
		"search/:query/s:sort/p:page": "search",   	// #search/kiwis/srelevance/p7
		"photo/:id":	"photo", 					//#photo/93839
		"" : "default" 								//
	  },
	  search: function( query , sort , page ){
	  	mobileSearch.utils.dfdQuery('search', mobileSearch.views.appview, query, sort, page);
	  },
	  photo: function ( id ){
	  	mobileSearch.utils.dfdQuery('photo', mobileSearch.views.appview, id);
	  },
	  default:function(){
		$.mobile.changePage("#index", "slide", false, false);
	}
});

