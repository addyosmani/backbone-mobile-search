

var appview = new AppView;	

function dfdQuery(ctx, query, sort, page){
		(page == undefined) ? page = 1  : page =  page;
		switchTitle('Query: ' + query + ' ( Page ' + page + ' )');
		
		loadPrompt('Querying Flickr API...');
		$.when( ctx.ajaxGetNews( query, sort, page ) )
              .then( $.proxy( function( response ){
               	entries = response.photos.photo;
				workspace.q = query;
				workspace.p = page;
				workspace.s = sort;

				$('.search-meta p').html('Page: ' + response.photos.page 
												  + ' / ' + response.photos.pages 
												  + ' of ' + response.photos.total + ' images');
				
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

function switchTitle(title){
	$('.ui-title').text(title);
}

function displayLightbox(imgSrc){
	loadPrompt('Loading image...');
	var ui = $('.ui-lightbox');
		ui.show()
		  .html("<img src='" + imgSrc + "' width='100%' height:'100%'/>")
		  .css({ "display": "block", "opacity": 1, "top": $(window).scrollTop() + 100 });
}


$('.ui-lightbox').bind('click', function(){
	$(this).hide();
});


workspace = new Workspace();
Backbone.history.start();

	



