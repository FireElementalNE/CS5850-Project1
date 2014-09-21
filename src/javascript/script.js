console.log("loaded");

var player; 

var counter = 0;
$( document ).ready(function() {
  player = {
	"inventory": [],
	"currentRoom":  world.rooms[0]
	}
});

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

function chomp(str) {
	return str.replace(/(\n|\r|\s)+$/, '');
}

function parseCommand(com) {
	moveRe = /move\s(Room\d)/i;
	adjRe = /list\sadjacent/i;
	switch(true) {
		case moveRe.test(com): 
			move(moveRe.exec(com)[1]);
			break;
		case adjRe.test(com): 
			console.log("adj");
			break;
	}
}


function submitUserCommand() {
	var data = $("#chatMessege").val();
	$("#chatMessege").val("");
	writeTextToOutput('user',data);
	$("#chatMessege").focus();
	parseCommand(chomp(data.toLowerCase()));
}

function findRoom(id) {
	for(var i = 0; i < world.rooms.length; i++) {
		if(world.rooms[i].id == id) {
			return world.rooms[i];
		}
	}
	return null;
}

function ListAdj(cRoom) {

}

function move(dRoom) {
	var found = false;
	actualAdjRooms = player.currentRoom.adjacentRooms;
	for(var i = 0; i < actualAdjRooms.length; i++) {
		console.log('#' + actualAdjRooms[i] + ' ' + dRoom + '#');
		if(dRoom == actualAdjRooms[i]) {
			found = true;
			break;
		}
	}
	if(found) {
		var newRoom = findRoom(dRoom);
		writeTextToOutput('console','Moving to \'' + dRoom + '\'.');
		player.currentRoom = newRoom;
	}
	else {
		writeTextToOutput('console','\'' + dRoom + '\' is not adjacent to \'' + player.currentRoom.id + '\'.');
	}
}

setInterval(function(){      
      counter++;
},500);