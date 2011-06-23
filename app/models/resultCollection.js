ResultCollection = Backbone.Collection.extend({
    model: ResultEntry, 
    initialize: function(){
        this.resultlist = new ResultList;
        this.bind("refresh", this.resultlist.renderList);
    }
});