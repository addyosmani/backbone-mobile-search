
/**
	Perform a deferred jQuery request for results.
	@searchType: search or photo
	@ctx: the context handling the the results
	@query: the search query being looked up
	@sort: how the result set should be sorted
	@page: the page within the result set to be returned
**/
mobileSearch.utils.dfdQuery = function( searchType, ctx, query , sort , page ){

    var entries = null;
	(page == undefined) ? page = 1  : page =  page;

	mobileSearch.utils.loadPrompt('Querying Flickr API...');
	
	$.when( mobileSearch.utils.fetchResults( searchType, query, sort, page ) )
		  .then( $.proxy( function( response ){
		  
		  ctx.setCollection(searchType);
		  
		  if(searchType == 'search' || searchType == undefined){
		  
		  		entries = response.photos.photo;
				mobileSearch.routers.workspace.q = query;
				mobileSearch.routers.workspace.p = page;
				mobileSearch.routers.workspace.s = sort;	
				$('.search-meta p').html('Page: ' + response.photos.page  + ' / ' + response.photos.pages );				
				ctx.result_collection.reset(entries);
				
				mobileSearch.utils.changePage("#search", "slide", false, false);
				
				//results view title
				mobileSearch.utils.switchTitle(query + ' ( Page ' + page + ' of ' + response.photos.total + ')');
				
		  }else{
		  		
		  		entries = response.photo;
		  		ctx.photo_collection.reset(entries);
		  		mobileSearch.utils.changePage("#photo", "slide", false, false);

		  }

		  }, ctx ) ); 
}

mobileSearch.utils.changePage = function(pageID, effect, p1, p2){
	//$.mobile.changePage(pageID, effect, p1, p2);
	setTimeout(function(){
	$.mobile.changePage(pageID, { transition: effect, reverse:p1, changeHash: p2});
}, 10);
	//$.mobile.changePage('#index', { transition: 'pop'});
}

/**
	Search service for querying search results or individual photos
	query is either the search term or photo_id
**/
mobileSearch.utils.fetchResults = function( searchType, query, sort, page ){

	
	var serviceUrl = "http://api.flickr.com/services/rest/?format=json&jsoncallback=?",
		apiKey	   = "8662e376985445d92a07c79ff7d12ff8",
		geoTagged = null,
		quantity  = 0,
		safeSearch = '',
		minDate = $('#date-min').val(),
		maxDate = $('#date-max').val();
		

	if(searchType == 'search' || searchType == undefined){
		
		quantity = $('#slider').val() || mobileSearch.defaults.resultsPerPage,
		safeSearch = $('#safeSearch').val() || mobileSearch.defaults.safeSearch;
		
		/*all of this will be going once date support is built into URL routing*/
		maxDate = mobileSearch.utils.dateFormatter(maxDate);
		minDate = mobileSearch.utils.dateFormatter(minDate);
		minDate="";
		maxDate = "";
		
		($('#geo-choice-z1').prop('checked') || mobileSearch.defaults.geoTagged)?  geoTagged = 0 : geoTagged =  1;
		(page == undefined) ? page = 0 : page = page;
		(sort == undefined) ? sort = ($('#sortBy').val()) : sort = sort;
		serviceUrl +=  "&method=flickr.photos.search" + "&per_page=" + quantity + "&page=" + page + "&is_geo=" + geoTagged +"&safe_search=" + safeSearch + "&sort=" + sort + "&min_taken_date=" + minDate + "&max_taken_date=" + maxDate + "&text=" + query +  "&api_key=" + apiKey;
		
	}else if(searchType == 'photo'){
		serviceUrl +=  "&method=flickr.photos.getInfo&photo_id=" + query +  "&api_key=" + apiKey;
	}
		
		
	console.log(serviceUrl);
	
	return $.ajax(serviceUrl, { dataType: "json" });  
}

mobileSearch.utils.dateFormatter = function ( date ){
	console.log(date);
	date = $.datepicker.formatDate('@', new Date( date ));
	(date == undefined)? date = '' : date = date;
	return date;
}

/**
	history switching - needs cleanup
**/
mobileSearch.utils.historySwitch = function( state ){

	var hashQuery = "", pageQuery = 0, increment = 0;
	(mobileSearch.routers.workspace.q == undefined) ? hashQuery = '' : hashQuery = mobileSearch.routers.workspace.q;
	(mobileSearch.routers.workspace.p == undefined) ? pageQuery = 1  : pageQuery =  mobileSearch.routers.workspace.p;
	(mobileSearch.routers.workspace.s == undefined) ? sortQuery = 'relevance' : sortQuery = mobileSearch.routers.workspace.s;
	
	pageQuery = parseInt(pageQuery);
	(state == 'next')? pageQuery +=1 : pageQuery -=1;

	(pageQuery <1)? mobileSearch.utils.changePage("/", "slide") : location.hash = mobileSearch.utils.queryConstructor(hashQuery, sortQuery, pageQuery);
	
}



/**
	Display a custom notification message
	@message: the message to display
**/	
mobileSearch.utils.loadPrompt = function( message ){
	(message == undefined)? message= "" : message = message;

	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+ message +"</h1></div>")
		.css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 100 })
		.appendTo( $.mobile.pageContainer )
		.delay( 800 )
		.fadeOut( 400, function(){
			$(this).remove();
		});
}


/**
	Change the title of the search view
	@title: the title to be used
**/
mobileSearch.utils.switchTitle = function( title ){
	$('.ui-title').text(title);
}


/**
	Construct the complete search query for passing to dfdQuery later.
**/
mobileSearch.utils.queryConstructor = function( query , sortType , pageNum ){
	return 'search/' + query + '/s' + sortType + '/p' + pageNum;
}

/*need to be included in the namespace*/

mobileSearch.ui.nextOption = $('#nextSet'),
mobileSearch.ui.prevOption = $('#prevSet');

mobileSearch.ui.nextOption.bind('click', function(e){
	e.preventDefault();
	mobileSearch.utils.historySwitch('next');
});

mobileSearch.ui.prevOption.bind('click', function(e){
	e.preventDefault();
	mobileSearch.utils.historySwitch('prev');
});
	
/**
	Toggle whether the navigation is displayed or hidden
	@b: boolean value specifying whether to show or hide the controls
**/
mobileSearch.utils.toggleNavigation = function(b){
	mobileSearch.ui.nextOption.toggle(b),
	mobileSearch.ui.prevOption.toggle(b);
}	



