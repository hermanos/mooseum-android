function scanExhibit() {
	window.plugins.barcodeScanner.scan( function(result) {

		var jsonUrl = result.text + '.json';
	    $('#heading').html(jsonUrl);
		
		$.ajax({
		    type       : "GET",
		    url        : jsonUrl,
		    dataType   : 'json',
		    success    : function(response) {
			    $('#status').html('succes');
			    $('#description').html(response['description']);
			    
			    // build exhibit screen
			    $('h2#x-name').html(response['title']);
			    $('blockquote#x-description').html(response['description']);
			    $('#x-image').src(response['image']);
			    // activate exhibit screen
		        $('.api-div').hide();
		        $('#api-exhibit').show();
		    },
		    error      : function() {
			    $('#status').html('error');
			    $('#description').html('Te crezi hacker? Nu am gasit exponat!');
		    }
		});     
	}, function(error) {
		$('#status').html('Scanning failed');
	    $('#description').html(error);
	});        
}
