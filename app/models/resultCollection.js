ResultCollection = Backbone.Collection.extend({
    model: ResultEntry, 
    parse: function(response){
    	return response;
    },
    initialize: function(){
        this.resultlist = new ResultList;
        this.bind("reset", this.resultlist.renderList);
    }
});