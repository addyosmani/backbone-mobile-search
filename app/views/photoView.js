PhotoView = Backbone.View.extend({
    el: $("#singlePhoto"),
    initialize: function(){
        this.result_collection = new ResultCollection;
    }

    //mobileSearch.utils.fetchResults( 'photo', photo_id) 
});


/*
http://api.flickr.com/services/rest/?format=json&jsoncallback=?&method=flickr.photos.getInfo&photo_id=64321&api_key=8662e376985445d92a07c79ff7d12ff8
http://localhost:8888/#photo/2026
*/