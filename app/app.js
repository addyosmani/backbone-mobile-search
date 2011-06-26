/**
	Backbone Mobile Search Demo by Addy Osmani
	Copyright AddyOsmani.com 2011.
**/

var mobileSearch = {};

mobileSearch = {
	views:{},
	controllers:{}
};

mobileSearch.views.appview = new AppView;	
mobileSearch.controllers.workspace = new Workspace();

hideNavigation();
Backbone.history.start();
