/*
This is meant as a global config option for end users to disable hashchange listening 
(as opposed to urlHistory.listeningEnabled, which is an internal toggle)
*/

$.mobile.hashListeningEnabled = false;
$.mobile.urlHistory.listeningEnabled = false;
		
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

var appview = new AppView;
workspace = new Workspace();
Backbone.history.start();

	



