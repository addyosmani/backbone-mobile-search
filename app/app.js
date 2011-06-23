

var appview = new AppView;	

function dfdQuery(ctx, query, sort, page){
		
		(page == undefined) ? page = 1  : page =  page;
		switchTitle('Query: ' + query + ' ( Page ' + page + ' )');
		
		loadPrompt('Querying Flickr API...');
		$.when( ctx.ajaxGetResults( query, sort, page ) )
              .then( $.proxy( function( response ){
               	entries = response.photos.photo;
				workspace.q = query;
				workspace.p = page;
				workspace.s = sort;

				$('.search-meta p').html('Page: ' + response.photos.page 
												  + ' / ' + response.photos.pages 
												  + ' of ' + response.photos.total + ' images');
				
               	
               	ctx.result_collection.refresh( entries );
               	setTimeout(function(){$.mobile.changePage("#search", "slideup", false, false);},0);
		
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




$(function(){

	var nextOption = $('#nextSet'),
		prevOption = $('#prevSet');
	
	prevOption.hide();	
	nextOption.hide();

	nextOption.bind('click', function(e){
		e.preventDefault();
		historySwitch('next');
	});
	
	prevOption.bind('click', function(e){
		e.preventDefault();
		historySwitch('prev');
	});
	

});



function historySwitch(state){

	var hashQuery = "", pageQuery = 0, increment = 0;
	(workspace.q == undefined) ? hashQuery = '' : hashQuery = workspace.q;
	(workspace.p == undefined) ? pageQuery = 1  : pageQuery =  workspace.p;
	(workspace.s == undefined) ? sortQuery = 'relevance' : sortQuery = workspace.s;
	
	pageQuery = parseInt(pageQuery);
	(state == 'next')? pageQuery +=1 : pageQuery -=1;
	
	(pageQuery <1)? null : location.hash = 'search/' + hashQuery + '/s' + sortQuery + '/p' + (pageQuery);
}



workspace = new Workspace();
Backbone.history.start();

	



