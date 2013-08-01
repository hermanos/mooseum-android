var ref;
var url;
var lang = 'EN';
var exhib;
function startSpeech(result){
	var text = $("p#x-description").text();
	language = lang;
	if(language == 'RO')
		language = 'IT';
	window.plugins.tts.stop(win, fail);

	window.plugins.tts.setLanguage(language.toLowerCase(),win,fail);
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

function introPageLandingSize(){
	$('div.page a#scan-exhibit').height(document.height * 0.50 * 1.17412141);
	$('div.page a#scan-exhibit').width(0.9 * document.height * 0.50 * 1.17412141);
	margin = '' + (document.height - (document.height * 0.70 * 1.17412141)) + 'px';
	margin_left = '' + (document.width * 0.50 - ((0.9 * document.height * 0.50 * 1.17412141) / 2)) + 'px';
	$('div.page#page-intro a').css('margin-top', margin);
	$('div.page#page-intro a').css('margin-left', margin_left);
	$("div#space").height(document.height * 0.15);
}
function introPagePortraitSize(){
	$('div.page a#scan-exhibit').height(document.width * 0.70 * 1.17412141);
	$('div.page a#scan-exhibit').width(0.9 * document.width * 0.70 * 1.17412141);
	margin = '' + (document.height - (document.width * 0.70 * 1.17412141)) / 2.7 + 'px';
	margin_left = '' + (document.width * 0.50 - ((0.9 * document.width * 0.70 * 1.17412141) / 2)) + 'px';
	$('div.page#page-intro a').css('margin-top', margin);
	$('div.page#page-intro a').css('margin-left', margin_left);
	$("div#space").height(document.height * 0.15);
}

function noExhibitPageTxtPortraitSize(){
	$('#page-no-exhibit h2').css('font-size', '1em');
	$('#to-scan').css('font-size', '0.7em');
	$('#to-page').css('font-size', '0.7em');
}

function noExhibitPageTxtLandSize(){
	$('#page-no-exhibit h2').css('font-size', '0.8em');
	$('#to-scan').css('font-size', '0.5em');
	$('#to-page').css('font-size', '0.5em');
}

function bottomBarPortraitSize(){
	play_height = '' + 0.15 * document.height + 'px';
	$('a.play').css('height',play_height);
	$('a.play').css('width',play_height);
	$('a.play').css('margin-left','-' + 0.15 * document.height / 2 + 'px');
	$('a.play').css('left','' + 0.66 * document.width + 'px');
	$('a.play').css('top','' + (document.height - (document.height * 0.15)) + 'px');
	

	$('a#back').css('height',play_height);
	$('a#back').css('width',play_height);
	$('a#back').css('margin-left','-' + 0.15 * document.height / 2 + 'px');
	$('a#back').css('left','' + 0.33 * document.width + 'px');
	$('a#back').css('top','' + (document.height - (document.height * 0.15)) + 'px');
	
}

function bottomBarLandSize(){
	play_height = '' + 0.15 * document.height + 'px';
	$('a.play').css('height',play_height);
	$('a.play').css('width',play_height);
	$('a.play').css('margin-left','-' + 0.15 * document.height / 2 + 'px');
	$('a.play').css('left','' + 0.66 * document.width + 'px');
	$('a.play').css('top','' + (document.height - (document.height * 0.15)) + 'px');
	

	$('a#back').css('height',play_height);
	$('a#back').css('width',play_height);
	$('a#back').css('margin-left','-' + 0.15 * document.height / 2 + 'px');
	$('a#back').css('left','' + 0.33 * document.width + 'px');
	$('a#back').css('top','' + (document.height - (document.height * 0.15)) + 'px');
	
}


function stopAndStartSpeech(){
	if($('a.play').hasClass("playing"))
	{
		$('a.play').removeClass("playing");
		stopSpeech();
		$('a.play').addClass("playing");
		startSpeech();
  } else {
		$('a.play').addClass("playing");
		startSpeech();
  }	
}

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
						    exhib = response;
						    $('h2#x-name').html(response['title_' + lang + '']);
						    img = "<img src='"+ response['image'] +"' id='image-exhibit'>";
						    $('p#x-description').html(img + " " + response['description_' + lang + ''] + "<br><br><br>");
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
 	window.plugins.tts.startup(win,fail);
	if(document.width >= document.height) {
		introPageLandingSize();
		noExhibitPageTxtLandSize();
		bottomBarLandSize();
  } else {
		introPagePortraitSize();
		noExhibitPageTxtPortraitSize();	
		bottomBarPortraitSize();
	}	


		
	$(window).resize(function() {
   	if(document.width >= document.height) {
			introPageLandingSize();
			noExhibitPageTxtLandSize();
			bottomBarLandSize();
	  } else {
			introPagePortraitSize();
			noExhibitPageTxtPortraitSize();	
			bottomBarPortraitSize();	
		}	
	}); 

	
	
	$('#page-intro').show();
	// $('#page-no-exhibit').show();
  // $('#page-exhibit').show();
	$('img#lang-img').attr('src','./img/' + lang + '.png');
	if($('img#lang-img').hasClass('lang-active')){	
	} else {
		$('img#lang-img').click(function(){
			$('img#lang-img').addClass('lang-active');
			$('#lang-box').stop(true,true).show(300,function(){
				setTimeout(function(){
					$('#lang-box').hide(300);
				},2000);
			});	
		});
	}
	

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
			
			switch (lang){
			case 'EN':
				lang = 'IT';
				break;
			case 'IT':
				lang = 'RO';
				break;
			case 'RO':
				lang = 'ES';
				break;
			case 'ES':
				lang = 'FR';
				break;
			case 'FR':
				lang = 'DE';
				break;
			case 'DE':
				lang = 'EN';
				break;
			default:
				lang = 'EN';
				break;
			}
			$('img#lang-img').attr('src','./img/'+ lang +'.png');
			$('h2#x-name').html(exhib['title_' + lang + '']);
			img = "<img src='"+ exhib['image'] +"' id='image-exhibit'>";
			$('p#x-description').html(img + " " + exhib['description_' + lang + ''] + "<br><br><br>");
			stopAndStartSpeech();
		});



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