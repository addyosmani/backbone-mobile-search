PhotoCollection = Backbone.Collection.extend({
    model: ResultEntry, 
    initialize: function(){
        this.photolist = new PhotoList;
        this.bind("reset", this.photolist.renderList);
    }
});