$(function(){
	
	var moreOption = $('#nextSet');
	moreOption.hide();
	moreOption.click(function(){
		//workspace.search(workspace.q, parseInt(workspace.p)+1);
		var hashQuery = "", pageQuery = 0;	
		(workspace.q == undefined) ? hashQuery = '' : hashQuery = workspace.q;
		(workspace.p == undefined) ? pageQuery = 1  : pageQuery =  workspace.p;
		(workspace.s == undefined) ? sortQuery = 'relevance' : sortQuery = workspace.s;
		location.hash = 'search/' + hashQuery + '/s' + sortQuery + '/p' + (parseInt(pageQuery)+1);
		return false;
	});
	
	
	
	$('#queryForm').submit(function() {
	  	var query = $('#searchbox').val(),
            sort = $('#sortBy').val();
			workspace.search(query, 0);
	  return false;
	});
	
	
});
