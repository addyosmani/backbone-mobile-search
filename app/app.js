/**
	Backbone Mobile Search Demo by Addy Osmani
**/

var mobileSearch = {};

mobileSearch.appview = new AppView;	
mobileSearch.workspace = new Workspace();

hideNavigation();
Backbone.history.start();
