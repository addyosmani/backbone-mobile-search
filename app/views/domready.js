$(function(){
	
	var nextOption = $('#nextSet'),
		prevOption = $('#prevSet');
	
	prevOption.hide();	
	nextOption.hide();
	
	/*
	all of this needs to be refactored - waaayyy too much rep. switch to e.prevDef as well.
	*/
	
	nextOption.click(function(){
		//workspace.search(workspace.q, parseInt(workspace.p)+1);
		//todo: refactor all of this into a new function
		var hashQuery = "", pageQuery = 0;	
		(workspace.q == undefined) ? hashQuery = '' : hashQuery = workspace.q;
		(workspace.p == undefined) ? pageQuery = 1  : pageQuery =  workspace.p;
		(workspace.s == undefined) ? sortQuery = 'relevance' : sortQuery = workspace.s;
		location.hash = 'search/' + hashQuery + '/s' + sortQuery + '/p' + (parseInt(pageQuery)+1);
		return false;
	});
	
	prevOption.click(function(){
		var hashQuery = "", pageQuery = 0;	
		(workspace.q == undefined) ? hashQuery = '' : hashQuery = workspace.q;
		(workspace.p == undefined) ? pageQuery = 1  : pageQuery =  workspace.p;
		(workspace.s == undefined) ? sortQuery = 'relevance' : sortQuery = workspace.s;
		
		pageQuery -=1;
		if(pageQuery>=1){
			location.hash = 'search/' + hashQuery + '/s' + sortQuery + '/p' + (parseInt(pageQuery));
		}
		return false;
	});
	

});
