/**
	Backbone Mobile Search Demo by Addy Osmani
	Copyright AddyOsmani.com 2011.
**/


mobileSearch.views.appview = new AppView;	
mobileSearch.controllers.workspace = new Workspace();

toggleNavigation(false); //hide
Backbone.history.start();
