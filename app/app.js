/**
	Backbone Mobile Search Demo by Addy Osmani
	Copyright AddyOsmani.com 2011.
**/


mobileSearch.views.appview = new AppView;	
mobileSearch.views.photoview = new PhotoView;
mobileSearch.routers.workspace = new Workspace();
toggleNavigation(false); //hide
Backbone.history.start();
