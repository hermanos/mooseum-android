function startSpeech(result, lang){
	window.plugins.tts.setLanguage(lang,win,fail);
	window.plugins.tts.speak("TTS is working fine!",win,fail);
}

function win{
	console.log(result);
}
function fail{
	console.log(result);
}