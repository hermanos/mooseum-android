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
	
	// left_distance = '' + (document.width / 2 - $("a#back").width() - $("a#play").width() / 2) + 'px';
	// $('a#play').css('left', left_distance);
	// console.log(left_distance);
	height = '' + 0.8 * document.height / 5.0 + 'px';
	console.log(height)
	$('a#play').css('height',height);
	$('a#play').css('width',height);
	$('a#play').css('margin-left','-' + 0.8 * document.height / 5.0 / 2.0 + 'px');
 //  // $('#page-intro').show();
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
