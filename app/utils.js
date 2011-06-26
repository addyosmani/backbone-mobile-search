
/**
	Perform a deferred jQuery request for results.
	@ctx: the context handling the the results
	@query: the search query being looked up
	@sort: how the result set should be sorted
	@page: the page within the result set to be returned
**/
function dfdQuery( ctx, query , sort , page ){
		
	(page == undefined) ? page = 1  : page =  page;
	
	switchTitle('Query: ' + query + ' ( Page ' + page + ' )');
	
	loadPrompt('Querying Flickr API...');
	$.when( ctx.ajaxGetResults( query, sort, page ) )
		  .then( $.proxy( function( response ){
			entries = response.photos.photo;
			mobileSearch.workspace.q = query;
			mobileSearch.workspace.p = page;
			mobileSearch.workspace.s = sort;

			$('.search-meta p').html('Page: ' + response.photos.page 
											  + ' / ' + response.photos.pages 
											  + ' of ' + response.photos.total + ' images');
			
			
			ctx.result_collection.refresh( entries );

			$.mobile.changePage("#search", "slideup", false, false);

	
		  }, ctx ) ); 
}


/**
	
**/
function historySwitch( state ){

	var hashQuery = "", pageQuery = 0, increment = 0;
	(mobileSearch.workspace.q == undefined) ? hashQuery = '' : hashQuery = mobileSearch.workspace.q;
	(mobileSearch.workspace.p == undefined) ? pageQuery = 1  : pageQuery =  mobileSearch.workspace.p;
	(mobileSearch.workspace.s == undefined) ? sortQuery = 'relevance' : sortQuery = mobileSearch.workspace.s;
	
	pageQuery = parseInt(pageQuery);
	(state == 'next')? pageQuery +=1 : pageQuery -=1;
	
	(pageQuery <1)? null : location.hash = 'search/' + hashQuery + '/s' + sortQuery + '/p' + (pageQuery);
}


/**
	Display a custom notification message
	@message: the message to display
**/
function loadPrompt( message ){

	(message == undefined)? message= "" : message = message;

	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+ message +"</h1></div>")
		.css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 100 })
		.appendTo( $.mobile.pageContainer )
		.delay( 800 )
		.fadeOut( 400, function(){
			$(this).remove();
		});

}


function switchTitle( title ){
	$('.ui-title').text(title);
}


var nextOption = $('#nextSet'),
	prevOption = $('#prevSet');

function hideNavigation(){
	prevOption.hide();	
	nextOption.hide();
}

function showNavigation(){
	prevOption.show();	
	nextOption.show();
}
nextOption.bind('click', function(e){
	e.preventDefault();
	historySwitch('next');
});

prevOption.bind('click', function(e){
	e.preventDefault();
	historySwitch('prev');
});
	
	




