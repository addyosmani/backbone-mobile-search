/*
This is meant as a global config option for end users to disable hashchange listening (as opposed to urlHistory.listeningEnabled, which is an internal toggle)
*/

$.mobile.hashListeningEnabled = false;
$.mobile.urlHistory.listeningEnabled = false;

$(function(){
		
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
	
	var moreOption = $('#nextSet');
	moreOption.hide();
	moreOption.click(function(){
		//workspace.search(workspace.q, parseInt(workspace.p)+1);
		var hashQuery = "", pageQuery = 0;	
		(workspace.q == undefined) ? hashQuery = '' : hashQuery = workspace.q;
		(workspace.p == undefined) ? pageQuery = 1  : pageQuery =  workspace.p;
		(workspace.s == undefined) ? sortQuery = 'relevance' : sortQuery = workspace.s;
		location.hash = 'search/' + hashQuery + '/s' + sortQuery + '/p' + (parseInt(pageQuery)+1);
		return false;
	});
	
	var appview = new AppView;
	workspace = new Workspace();
	Backbone.history.start();

})();