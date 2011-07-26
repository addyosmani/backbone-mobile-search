PhotoList = Backbone.View.extend({
    el: $("#photoviewholder"), 
	
	initialize: function(){
    },
    
    renderList: function( collection ){
        
        var compiled_template = _.template( $("#photoviewul").html() );

		mobileSearch.utils.loadPrompt("Loading photo...");
		
		$('#photo .ui-title').html('Photo view');
				
        collection.photolist.el.html( compiled_template( { results: collection.models } ) );
            
        setTimeout(function(){
        	$photo = $('#photo');
        	$photo.find('ul').listview();
        	$photo.find('ul').listview("refresh");
        }, 0);
        

    }
});

