var ref;
var url;
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
	
	
	if(document.width >= document.height) {
		$('div.page a#scan-exhibit').height(document.height * 0.50 * 1.17412141);
		$('div.page a#scan-exhibit').width(document.height * 0.50 * 1.17412141);
		margin = '' + (document.height - (document.height * 0.70 * 1.17412141)) + 'px';
		margin_left = '' + (document.width * 0.50 - ((document.height * 0.50 * 1.17412141) / 2)) + 'px';
		$('div.page#page-intro a').css('margin-top', margin);
		$('div.page#page-intro a').css('margin-left', margin_left);
		$("div#space").height(document.height * 0.15);
  } else {
		$('div.page a#scan-exhibit').height(document.width * 0.70 * 1.17412141);
		$('div.page a#scan-exhibit').width(document.width * 0.70 * 1.17412141);
		margin = '' + (document.height - (document.width * 0.70 * 1.17412141)) / 2.7 + 'px';
		margin_left = '' + (document.width * 0.50 - ((document.width * 0.70 * 1.17412141) / 2)) + 'px';
		$('div.page#page-intro a').css('margin-top', margin);
		$('div.page#page-intro a').css('margin-left', margin_left);
		$("div#space").height(document.height * 0.15);	
	}	

		
	$(window).resize(function() {
   	if(document.width >= document.height) {
   		$('div.page a#scan-exhibit').height(document.height * 0.50 * 1.17412141);
			$('div.page a#scan-exhibit').width(document.height * 0.50 * 1.17412141);
			margin = '' + (document.height - (document.height * 0.70 * 1.17412141)) + 'px';
			margin_left = '' + (document.width * 0.50 - ((document.height * 0.50 * 1.17412141) / 2)) + 'px';
			$('div.page#page-intro a').css('margin-top', margin);
			$('div.page#page-intro a').css('margin-left', margin_left);
			$("div#space").height(document.height * 0.15);
		} else {
			$('div.page a#scan-exhibit').height(document.width * 0.70 * 1.17412141);
			$('div.page a#scan-exhibit').width(document.width * 0.70 * 1.17412141);
			margin = '' + (document.height - (document.width * 0.70 * 1.17412141)) / 2.7 + 'px';
			margin_left = '' + (document.width * 0.50 - ((document.width * 0.70 * 1.17412141) / 2)) + 'px';
			$('div.page#page-intro a').css('margin-top', margin);
			$('div.page#page-intro a').css('margin-left', margin_left);
			$("div#space").height(document.height * 0.15);
		}	
	}); 

	play_height = '' + 0.15 * document.height + 'px';
	$('a.play').css('height',play_height);
	$('a.play').css('width',play_height);
	$('a.play').css('margin-left','-' + 0.8 * document.height / 5.0 / 2.0 + 'px');
	$('a.play').css('left','' + 0.66 * document.width + 'px');

	$('a#back').css('height',play_height);
	$('a#back').css('width',play_height);
	$('a#back').css('margin-left','-' + 0.8 * document.height / 5.0 / 2.0 + 'px');
	$('a#back').css('left','' + 0.33 * document.width + 'px');
	
	$('#page-intro').show();
	// $('#page-no-exhibit').show();
  // $('#page-exhibit').show();
	
    $('a#scan-exhibit').click(function(){	
		  scan();      
    });

    $('#back').click(function(){
        $('.page').hide();
        if($('a.play').hasClass("playing"))
				{
	    		$('a.play').removeClass("playing");
	    		stopSpeech();
		    }
        scan();
    });

    $("a.play").click(function(){
    	if($(this).hasClass("playing")){
    		$(this).removeClass("playing");
    		stopSpeech();
    	} else {
    		$(this).addClass("playing");
				startSpeech();
    	}
		});

		$("a#to-scan").click(function(){
			$('#page-no-exhibit').hide();
	    scan();
		});

		$("a#to-page").click(function(){
			$(this).addClass('on-browser');
			ref = window.open(url, '_blank', 'location=yes');
		});

		var div = $('div#page-exhibit').Touchable();
		div.bind('doubleTap', function(e, touch){
			alert("Is working!");
		});

});



function scan(){
	window.plugins.barcodeScanner.scan( function(result) {
			// $('a#to-page').attr('href', result.text);
			url = result.text;
			$('.page').hide();	
			if(result.text != ""){	
				$.ajax({
				    type: "GET",
				    url: "http://staging.mooseumapp.com/search.json",
				    data: { q: result.text },
				    dataType: 'json',
				    success: function(response) {
					    if (response['id'] !=0 ) {
						    // build exhibit screen
						    $('h2#x-name').html(response['title']);
						    img = "<img src='"+ response['image'] +"' id='image-exhibit'>";
						    $('p#x-description').html(img + " " + response['description']);
								if(!$('a.play').hasClass("playing"))
								{
					    		$('a.play').addClass("playing");
					    		startSpeech();
						    }				    
						    $('#page-exhibit').show();
					    } else {
					    	// TODO: daca nu exista, sa i se ofere posibilitatea sa dea click pe un link
					    	// var ref = window.open('http://apache.org', '_blank', 'location=yes');
					    	// permissions: app/res/xml/config.xml
					    	// <plugin name="InAppBrowser" value="org.apache.cordova.InAppBrowser" />
					    	// ref.addEventListener('exit', callback);
					    	$('#page-no-exhibit').show();
					    
					    } 
					  },
				    error      : function() {  
					    alert("Error!");
				    }
				}); 
			} else {
				$('#page-intro').show();
			}   
		}, function(error) {
		});

}

function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
        // Register the event listener
        document.addEventListener("backbutton", onBackKeyDown, false);
        ref.addEventListener("backbutton",ref.close());
}

    // Handle the back button
    //
function onBackKeyDown() {
	if($('#page-intro').css('display') != 'none'){
		device.exitApp();
	} else {
		if($('a.play').hasClass("playing"))
		{
    		$('a.play').removeClass("playing");
    		stopSpeech();
    }
		scan();
	}
}
//navitagor