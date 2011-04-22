

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

function loadPrompt(message){
$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+ message +"</h1></div>")
	.css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 100 })
	.appendTo( $.mobile.pageContainer )
	.delay( 800 )
	.fadeOut( 400, function(){
		$(this).remove();
});
}

workspace = new Workspace();
Backbone.history.start();

	



