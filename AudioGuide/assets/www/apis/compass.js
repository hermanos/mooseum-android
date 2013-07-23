function scanExhibit() {
	window.plugins.barcodeScanner.scan( function(result) {
		
		$.ajax({
		    type       : "GET",
		    url        : "http://staging.mooseumapp.com/search?q="+result.text,
		    dataType   : 'json',
		    success    : function(response) {
			    $('#status').html('succes');
			    $('#description').html(response['description']);
			    
			    // build exhibit screen
			    $('h2#x-name').html(response['title']);
			    $('blockquote#x-description').html(response['description']);
			    $('#x-image').attr("src",response['image']);
			    // activate exhibit screen
		        $('.api-div').hide();
		        $('#api-exhibit').show();
		    },
		    error      : function() {  
			    
			    });
		    }
		});     
	}, function(error) {
		$('#status').html('Scanning failed');
	    $('#description').html(error);
	});        
}
