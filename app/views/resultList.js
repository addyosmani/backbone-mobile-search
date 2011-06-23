/*ResultList = Backbone.View.extend({
    el: $("#resultlist"), 
	
    initialize: function(){
    },
    
    renderList: function( collection ){
        var compiled_template = _.template( $("#resultlistul").html() );
			
		loadPrompt("Loading results...");
		
		$('#nextSet,#prevSet').show();
		
        collection.resultlist.el.html( compiled_template( { results: collection.models } ) );


		var resultList		  = $('#resultlist').find('ul li'),
		resultImages	  	  = resultList.find('img'),
		resultLinks			  = resultList.find('a');
		
		resultList.append("<div class='loader'></div>");
	    resultImages.bind("load", function(){ 
				$('.loader').remove();
				$(this).show();
			});

		
		$('.ui-result').bind('click', function(e){
			e.preventDefault();
			displayLightbox($(this).attr('href'));
		});
		
		$.scrollTo('200px');//todo: update

    }
});
*/

ResultList = Backbone.View.extend({
    el: $("#listviewholder"), 
	
    initialize: function(){
    },
    
    renderList: function( collection ){
        var compiled_template = _.template( $("#listviewul").html() );
			
		loadPrompt("Loading results...");
		
		$('#nextSet,#prevSet').show();
		
        collection.resultlist.el.html( compiled_template( { results: collection.models } ) );

		//resultList.append("<div class='loader'></div>");
		location.hash = 'search';

    }
});


