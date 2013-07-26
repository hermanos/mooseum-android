function startSpeech(result){
	var text = $("p#x-description").text();
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
	
	$('div.page a#scan-exhibit').height(document.width * 0.70 * 1.17412141);
	margin = '' + (document.height - $('div.page a#scan-exhibit').height()) / 2 + 'px';
	$('div.page#page-intro a').css('margin-top', margin);
	
	// new_img_height = '' + (0.7* document.height) + 'px';
	// new_img_width = '' + (document.width) + 'px';

	// console.log($('div.outer img#x-image').height());
	// console.log($('div.outer img#x-image').width());

	// if($('div.outer img#x-image').height() >= $('div.outer img#x-image').width()){
	// 	$('img#x-image').height(new_img_height);
	// }
	// else{
	// 	$('img#x-image').width(new_img_width);
	// }

	play_height = '' + 0.15 * document.height + 'px';
	$('a#play').css('height',play_height);
	$('a#play').css('width',play_height);
	$('a#play').css('margin-left','-' + 0.8 * document.height / 5.0 / 2.0 + 'px');

	$('#page-intro').show();
   	// $('#page-exhibit').show();
    
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
					    $('p#x-description').html(response['description']);
					    $('.outer').css("background-image","url("+response['image']+")");
					    
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

    $("#play").click(function(){
    	if($(this).hasClass("playing")){
    		$(this).removeClass("playing");
    		stopSpeech();
    	} else {
    		$(this).addClass("playing");
			startSpeech();
    	}
	});


});
