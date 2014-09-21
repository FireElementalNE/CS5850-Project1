console.log("loaded");

var counter = 0;

function writeTextToOutput(type,msg) {
	var writerClass = undefined;
	var writer = undefined;
	if (type == 'console') {
		writer = 'Console:';
		writerClass = 'consoleoutput';
	}
	else if(type == 'user') {
		writer = 'You:';
		writerClass = 'useroutput';
	}
	var el = "<span class=\"" + writerClass + "\">" + writer + "</span>" + 
				"<span>" + msg + "</span>" + 
				"<pre>" + "\n" + "</pre>";
	$('#chatArea').append(el);
}

function submitUserCommand() {
	var data = $("#chatMessege").val();
	$("#chatMessege").val("");
	writeTextToOutput('user',data);
	$("#chatMessege").focus();
}

setInterval(function(){
      writeTextToOutput('console',counter);
      counter++;
},500);