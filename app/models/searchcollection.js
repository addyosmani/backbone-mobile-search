NewsCollection = Backbone.Collection.extend({
    model: NewsEntry, 
    initialize: function(){
        this.newslist = new NewsList;
        this.bind("refresh", this.newslist.renderList);
    },
});