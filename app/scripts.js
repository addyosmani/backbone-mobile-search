$LAB
.setOptions({AlwaysPreserveOrder:true})
.script("app/init.js")
.script("app/libs/json2.js")
.script("app/libs/jquery.1.6.1.min.js")
.script("app/libs/jQuery.ui.datepicker.js")
.script("app/libs/jquery.ui.datepicker.mobile.js")
.script("http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.js").wait(function(){
	/*
	This is meant as a global config option for end users to disable hashchange listening 
	(as opposed to urlHistory.listeningEnabled, which is an internal toggle)
	*/
	$.mobile.hashListeningEnabled = false;
	$.mobile.page.prototype.options.degradeInputs.date = true;
	$('#date-min,#date-max').datepicker();

})
.script("app/libs/underscore-min.js")
.script("app/libs/backbone-min.js")
.script("app/utils.js")
.script("app/routers/router.js")
.script("app/models/resultEntry.js")
.script("app/views/resultList.js")
.script("app/models/resultCollection.js")
.script("app/models/photoCollection.js")
.script("app/views/appView.js")
.script("app/views/photoList.js")
.script("app/app.js");