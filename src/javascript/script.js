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
	moveRe = /move\s(\w+)/i;
	adjRe = /list\sadjacent/i;
	takeRe = /take\s(\w+)/i;
	lookRe = /look\s(\w+)/i;
	switch(true) {
		case moveRe.test(com): 
			move(moveRe.exec(com)[1]);
			break;
		case adjRe.test(com): 
			console.log("adj");
			break;
		case lookRe.test(com):
			writeTextToOutput('console',findObject(lookRe.exec(com)[1]).objfunction());
		case comInObjects(com) && !takeRe.test(com):
			console.log("room");
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

function log(msg) {
	console.log(msg);
}

function move(dRoom) {
	var found = false;
	var tmp = undefined;
	log("lol");
	actualAdjRooms = player.currentRoom.adjacentRooms;
	for(var i = 0; i < actualAdjRooms.length; i++) {
		log(actualAdjRooms[i]);
		if(dRoom == actualAdjRooms[i].transition) {
			tmp = actualAdjRooms[i].id
			found = true;
			break;
		}
	}
	if(found) {
		log(tmp);
		var newRoom = findRoom(tmp);
		writeTextToOutput('console','Moving to \'' + newRoom.name + '\'.');
		writeTextToOutput('console',newRoom.description);
		player.currentRoom = newRoom;
	}
	else {
		writeTextToOutput('console','\'' + dRoom + '\' is not adjacent to \'' + player.currentRoom.name + '\'.');
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