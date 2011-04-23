$(function(){
	
	var nextOption = $('#nextSet'),
		prevOption = $('#prevSet');
	
	prevOption.hide();	
	nextOption.hide();

	nextOption.click(function(e){
		e.preventDefault();
		historySwitch('next');
	});
	
	prevOption.click(function(e){
		e.preventDefault();
		historySwitch('prev');
	});
	

});



function historySwitch(state){
	var hashQuery = "", pageQuery = 0, increment = 0;
	(workspace.q == undefined) ? hashQuery = '' : hashQuery = workspace.q;
	(workspace.p == undefined) ? pageQuery = 1  : pageQuery =  workspace.p;
	(workspace.s == undefined) ? sortQuery = 'relevance' : sortQuery = workspace.s;
	
	pageQuery = parseInt(pageQuery);
	(state == 'next')? pageQuery +=1 : pageQuery -=1;
	
	(pageQuery <1)? null : location.hash = 'search/' + hashQuery + '/s' + sortQuery + '/p' + (pageQuery);
}