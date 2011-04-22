
NewsList = Backbone.View.extend({
    el: $("#newslist"), 
	
    initialize: function(){
       // this.el.html("Enter in keyword to query Flickr");
    },
    renderList: function( collection ){
        var compiled_template = _.template( $("#newslistul").html() );
			
		loadPrompt("Loading results...");
		
		$('#nextSet').show();
		
        collection.newslist.el.html( compiled_template( { news: collection.models } ) );

		var resultList		  = $('#newslist').find('ul li'),
		resultImages	  	  = resultList.find('img'),
		resultLinks			  = resultList.find('a');
		
		resultList.append("<div class='loader'></div>");
	    resultImages.bind("load", function(){ 
				$('.loader').remove();
				$(this).show();
			});
			
		$('.ui-result').click(function(e){
			e.preventDefault();
			displayLightbox($(this).attr('href'));
		});
		
		$.scrollTo('250px');//todo: update

    }
});

