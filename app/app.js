

var appview = new AppView;	

function dfdQuery(ctx, query, sort, page){
		(page == undefined) ? page = 1  : page =  page;
		$('.ui-title').text('Query: ' + query + ' ( Page ' + page + ' )');
	
		$.when( ctx.ajaxGetNews( query, sort, page ) )
              .then( $.proxy( function( response ){
               	entries = response.photos.photo;
				workspace.q = query;
				workspace.p = page;
				workspace.s = sort;
               	ctx.news_collection.refresh( entries );
		
              }, ctx ) ); 
}

workspace = new Workspace();
Backbone.history.start();

	



