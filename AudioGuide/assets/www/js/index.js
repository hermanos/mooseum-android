function startSpeech(result){
	var text = $("#x-description").text();
	window.plugins.tts.startup(win,fail);
	window.plugins.tts.setLanguage('en_UK',win,fail);
	window.plugins.tts.speak(text,win,fail);
}
function stopSpeech(result){
	window.plugins.tts.stop(win, fail);
}
function win(result){
//	console.log(result);
}
function fail(result){
	alert("Error initializing Text to Speech engine: "+result);
}

$(document).ready(function(){
	$("#play").click(function(){
		startSpeech();
	});
	$("#stop").click(function(){
		stopSpeech();
	});
});


$(document).ready(function(){
	
	$('div.page a#scan-exhibit').height(document.width * 0.70 * 1.17412141);
	margin = '' + (document.height - $('div.page a#scan-exhibit').height()) / 2 + 'px';
	$('div.page#page-intro a').css('margin-top', margin);
	
	
  // $('#page-intro').show();
   $('#page-exhibit').show();
    
    $('a#scan-exhibit').click(function(){
    	$('.page').hide();
		window.plugins.barcodeScanner.scan( function(result) {			
			$.ajax({
			    type: "GET",
			    url: "http://staging.mooseumapp.com/search.json",
			    data: { q: result.text },
			    dataType: 'json',
			    success: function(response) {
				    if (response['id'] !=0 ) {
					    // build exhibit screen
					    $('h2#x-name').html(response['title']);
					    $('blockquote#x-description').html(response['description']);
					    $('#x-image').attr("src",response['image']);
					    
					    $('#page-exhibit').show();
				    } else {
				    	$('#page-no-exhibit').show();
				    } 
				  },
			    error      : function() {  
				    alert("Error!");
			    }
			});     
		}, function(error) {
		});        
    });

    $('#to-scan').click(function(){
        $('.page').hide();
        $('#page-intro').show();
    });

});
