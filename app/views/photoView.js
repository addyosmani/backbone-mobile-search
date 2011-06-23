
var PhotoView = Backbone.View.extend({
	initialize: function() {
		this.el = $('#singlePhoto');
		_.bindAll(this, "render");
		
		//this.collection.bind('add', renderDeb);
	},

	render: function() {
		var loc = this.collection.at(0);
		this.el.html(loc.get('name') + " <br /> " + loc.phone() + " <br /> " + loc.get('address') + " " + loc.get('city') + ", " + loc.get('province'));
	}
});