console.log("loaded");

var player; 

var counter = 0;

objects = new Array();


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

function findObject(id0) {
	for(var i = 0; i < objects.length; i++) {
		if(inArray(id0,objects[i].names) && objects[i].location == player.currentRoom.id) {
			return objects[i];
		}
	}
	return null;
}

function comInObjects(id0) {
	for(var i = 0; i < objects.length; i++) {
		if(inArray(id0,objects[i].names) && objects[i].location == player.currentRoom.id) {
			return true;
		}
	}
	return false;
}

function inArray(target,arr) {
	for(var i = 0; i < arr.length; i++) {
		if(target == arr[i]) {
			return true;
		}
	}
	return false;
}

function parseCommand(com) {
	moveRe = /move\s(Room\d)/i;
	adjRe = /list\sadjacent/i;
	takeRe = /take\s(\w+)/i
	switch(true) {
		case moveRe.test(com): 
			move(moveRe.exec(com)[1]);
			break;
		case adjRe.test(com): 
			console.log("adj");
			break;
		case comInObjects(com) && !takeRe.test(com):
			writeTextToOutput('console',findObject(com).objfunction());
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

$( document ).ready(function() {
	player = {
		"inventory": [],
		"currentRoom":  world.rooms[0]
	}
	writeTextToOutput('console',player.currentRoom.description);
	objects.push(clock);
	objects.push(bed);
	objects.push(terminal);

});


setInterval(function(){      
      counter++;
},500);