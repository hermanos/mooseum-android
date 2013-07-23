function startSpeech(result){
	var text = $("#x-description").text();
	window.plugins.tts.startup(win,fail);
	window.plugins.tts.setLanguage('en_UK',win,fail);
	window.plugins.tts.speak(text,win,fail);
}

function win(result){
	console.log(result);
}
function fail(result){
	console.log("Error="+result);
}

$(document).ready(function(){
	$("#play").click(function(){
		startSpeech();
	});
});