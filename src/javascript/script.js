log("Loaded");

var player; 

var counter = 0;

objects = new Array();

var commonCommands = ["adjacent"]

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

function getFromArray(target,arr) {
	for(var i = 0; i < arr.length; i++) {
		if(target == arr[i]) {
			return arr[i];
		}
	}
	return null;
}

function takeObject(com) {
	roomObjs = player.currentRoom.objects;
	var obj = getFromArray(com.toLowerCase(),roomObjs);
	if(obj == null){
		writeTextToOutput('console',"there is no object " + com + " in the room.");	
	}
	else if(obj != null) {
		var realobj = findObject(obj);
		if(realobj.cantake) {
			writeTextToOutput('console',"you pick up the " + realobj.id);
			player.inventory.push(realobj);
		}
		else {
			var realobj = findObject(obj);
			writeTextToOutput('console',"you cannot pick up the " + realobj.id);
		}
	}
	
}
function parseCommand(com) {

	moveRe = /move\s(\w+)/i;
	adjRe = /adjacent/i;
	invRe = /inventory/i;
	takeRe = /take\s(\w+)/i;
	lookRe = /look\s(\w+)/i;
	switch(true) {
		case moveRe.test(com): 
			move(moveRe.exec(com)[1]);
			break;
		case adjRe.test(com): 
			ListAdj();
			break;
		case invRe.test(com):
			ListInv();
			break;
		case lookRe.test(com):
			writeTextToOutput('console',findObject(lookRe.exec(com)[1]).objfunction());
		case comInObjects(com) && !takeRe.test(com):
			break;
		case takeRe.test(com):
			takeObject(takeRe.exec(com)[1]);
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

function ListAdj() {
	actualAdjRooms = player.currentRoom.adjacentRooms;
	for(var i = 0; i < actualAdjRooms.length; i++) {
		var outString = findRoom(actualAdjRooms[i].id).name + " is adjacent to " +
						player.currentRoom.name;
		writeTextToOutput('console',outString);
	}
}

function ListInv() {
	if(player.inventory.length == 0) {
		writeTextToOutput('console',"Your inventory is empty.");
	}
	else {
		for(var i = 0; i < player.inventory.length; i++) {
			writeTextToOutput('console', player.inventory[i].id + " is in your inventory");
		}
	}
}

function findRoom(roomid) {
	for(var i = 0; i < world['rooms'].length; i++) {
		if(world['rooms'][i].id == roomid) {
			return world['rooms'][i];
		}
	}
	return null;
} 

function log(msg) {
	console.log(msg);
}

function room3TO4(newRoom) {
	if(newRoom.id == 'room4') {
		if(inArray(icebreaker,player.inventory)) {
			writeTextToOutput('console','You use the icebreaker to enter the vault!');			
			return true;
		}
		writeTextToOutput('console','You can\'t get through that ice! where that icebreaker?');			
		return false;
	}
	return true;
}

function move(dRoom) {
	var found = false;
	var tmp = undefined;
	actualAdjRooms = player.currentRoom.adjacentRooms;
	for(var i = 0; i < actualAdjRooms.length; i++) {
		if(inArray(dRoom,actualAdjRooms[i].transitions)) {
			tmp = actualAdjRooms[i].id
			found = true;
			break;
		}
	}
	if(found) {
		var newRoom = findRoom(tmp);
		if(room3TO4(newRoom)) {
			writeTextToOutput('console','Moving to \'' + newRoom.name + '\'.');
			writeTextToOutput('console',newRoom.description);
			player.currentRoom = newRoom;
		}
	}
	else {
		writeTextToOutput('console','\'' + dRoom + '\' is not adjacent to \'' + player.currentRoom.name + '\'.');
	}
}

document.onkeydown = function (evt) {
  var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
  if (keyCode == 13) {
  	 $("#sendButton").click();
    // For Enter.
    // Your function here.
  }
  else {
    return true;
  }
};

$( document ).ready(function() {
	player = {
		"inventory": [],
		"currentRoom":  world.rooms[0]
	}
	writeTextToOutput('console',player.currentRoom.description);
	objects.push(clock);
	objects.push(bed);
	objects.push(terminal);
	objects.push(icebreaker);
	objects.push(drawers);
	objects.push(scanner);
	parseCommand('move terminal');
	parseCommand('move cyberspace');
	parseCommand('look icebreaker');
	parseCommand('take icebreaker');
	parseCommand('inventory');
	parseCommand('move vault');
	parseCommand('move backroom');
	parseCommand('look scanner');
});


setInterval(function(){      
      counter++;
},500);