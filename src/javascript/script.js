var player; // player object
var MAXTIME = 300; // for the timer, tim player has left
var counter = 0;
objects = new Array(); // the array of objects
var timer = MAXTIME;
var startTimer = false; // start the timer
var endTimer = false; // end the timer
var firstEnterRoom3 = true; // rewrite the string for room 3
var firstJackin = true; // start the timer
// for the help messege that is printed at the begining of the game
var helpString = "The basic commands are: look, move, take, adjacent, time, and inventory. Words that are <span style=\"color:#8797F5\">blue</span>" +
				 " are rooms that can be 'moved' to. to move to them simply type 'move roomname'. 'adjacent' lists the rooms that are" +
				 " adjacent to the current room. You can only move to adjacent rooms. Objects in these rooms are marked in <span style=\"color:#F5F587\">yellow</span>" + 
				 " they can always be looked at by using 'look objectname', you can try to pick them up by doing 'take objectname' not all objects can be" +
				 " picked up. 'inventory' lists the items in your inventory. 'time' shows the time left on the timer after you jackin to cyberspace." +
				 " help shows this screen.";
// list all the adjacent rooms to the platers current room
function ListAdj() { 
	actualAdjRooms = player.currentRoom.adjacentRooms;
	for(var i = 0; i < actualAdjRooms.length; i++) {
		var outString = "<span style=\"color:#8797F5\">" + findRoom(actualAdjRooms[i].id).name + "</span> is adjacent to <span style=\"color:#8797F5\">" +
						player.currentRoom.name + "</span>";
		writeTextToOutput('console',outString);
	}
}
// list all of the inventory items
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

// write function 
// print somethign to the div
function writeTextToOutput(type,msg) { 
	var writerClass = undefined;
	var writer = undefined;
	if (type == 'console') { // mostly used
		writer = 'Console:';
		writerClass = 'consoleoutput';
	}
	else if(type == 'user') { // for echo
		writer = 'You:';
		writerClass = 'useroutput';
	}
	var el = "<span class=\"" + writerClass + "\">" + writer + "</span>" + 
				"<span class=\"textcolor\">" + msg + "</span>" + 
				"<pre>" + "\n" + "</pre>";
	$('#chatArea').append(el);
	$('#chatArea').scrollTop( $('#chatArea').get(0).scrollHeight );
}

// Object functions
// check if passed the objects where in the commands
function comInObjects(id0) {
	for(var i = 0; i < objects.length; i++) {
		if(inArray(id0,objects[i].names) && objects[i].location == player.currentRoom.id) {
			return true;
		}
	}
	return false;
}
// take object and put it in the inventory
function takeObject(com) {
	roomObjs = player.currentRoom.objects;
	var obj = getFromArray(com.toLowerCase(),roomObjs);
	if(obj == null){
		writeTextToOutput('console',"there is no object " + com + " in the room.");	
	}
	else if(obj != null) {
		var realobj = findObject(obj);
		if(realobj.cantake && !inArray(realobj,player.inventory) ) {
			if(realobj.id == "target") {
				takeTarget();
			}
			else {
				writeTextToOutput('console',"you pick up the " + realobj.id);
				player.inventory.push(realobj);
			}
		}
		else {
			var realobj = findObject(obj);
			writeTextToOutput('console',"you cannot pick up the " + realobj.id);
		}
	}
	
}
// find objects in the object array
function findObject(id0) {
	for(var i = 0; i < objects.length; i++) {
		if(inArray(id0,objects[i].names) && objects[i].location == player.currentRoom.id) {
			return objects[i];
		}
	}
	return null;
}
// parse the passed command
function parseCommand(com) {
	moveRe = /move\s(\w+)/i;
	adjRe = /adjacent/i;
	invRe = /inventory/i;
	takeRe = /take\s(\w+)/i;
	lookRe = /look\s(\w+)/i;
	roomRe = /room/i;
	timeRe = /time/i;
	helpRe = /help/i;
	if(com != '') {
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
				var tobj = findObject(lookRe.exec(com)[1]);
				if(tobj != null) {
					writeTextToOutput('console',tobj.objfunction());
				}
				else {
					writeTextToOutput('console',"There is no object " + lookRe.exec(com)[1] + " in the room.");	
				}
			case comInObjects(com) && !takeRe.test(com):
				break;
			case takeRe.test(com):
				takeObject(takeRe.exec(com)[1]);
				break;
			case roomRe.test(com):
				writeTextToOutput('console',player.currentRoom.description);	
				break;
			case timeRe.test(com):
				if(startTimer) {
					writeTextToOutput('console','You have ' + timer + ' seconds left.');
				}
				else {
					writeTextToOutput('console','Timer hasnt started');	
				}
				break;
			case helpRe.test(com):
				writeTextToOutput('console',helpString);
				break;	
			default:
				writeTextToOutput('console','Invalid command ' + com + '.');	
		}
	}
	else {
		writeTextToOutput('console','zzzZZZzzzZZZ...');
	}
}
// submit the command to the user passed
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
// fix room 3 when you go to it. Rewrite the description.
function fixRoom3() {
	newDescription = "Back in the lobby you see that the icebreaker has worked! you can now move in and out on the vault as needed.";
	world.rooms[2].description = newDescription;
}
// test if the user has the icebreaker
function room3TO4(newRoom) {
	if(newRoom.id == 'room4') {
		if(inArray(icebreaker,player.inventory)) {
			if(firstEnterRoom3) {
				writeTextToOutput('console','You use the icebreaker to enter the vault!');
				firstEnterRoom3 = false;
			}
			fixRoom3();
			return true;
		}
		writeTextToOutput('console','You can\'t get through that ice! wheres that icebreaker?');			
		return false;
	}
	return true;
}
// END THE GAME WAHOO
function takeTarget() {
	writeTextToOutput('console',"You attempt to pick up your target, It prompts for an empolyee identification.");
	if(inArray(identifications,player.inventory)) {
		writeTextToOutput('console',"You provide it with the identification you found in the empolyee lounge. It sputters out the keys! You WIN.");
		endTimer = true;
		$('#chatMessege').prop('disabled','true');
	}
	else {
		writeTextToOutput('console',"You cant fake those ids... maybge one is lying around somewhere....");	
	}
}
// move from one room to the other
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
		if(firstJackin && newRoom.id == "room3" && player.currentRoom.id == "room2") {
			startTimer = true;
			firstJackin = false;
		}
		if(room3TO4(newRoom)) {
			writeTextToOutput('console',newRoom.description);
			player.currentRoom = newRoom;
		}
	}
	else {
		writeTextToOutput('console','\'' + dRoom + '\' is not adjacent to \'' + player.currentRoom.name + '\'.');
	}
}
// initialize everything
$( document ).ready(function() {
	player = {
		"inventory": [],
		"currentRoom":  world.rooms[0]
	}
	writeTextToOutput('console',helpString)
	writeTextToOutput('console',player.currentRoom.description);
	objects.push(clock);
	objects.push(bed);
	objects.push(terminal);
	objects.push(icebreaker);
	objects.push(drawers);
	objects.push(scanner);
	objects.push(icewall);
	objects.push(identifications);
	objects.push(picture);
	objects.push(hitscan);
	objects.push(diagram);
	objects.push(target);
	
});
// the gameloop, pretty simple but effective
setInterval(function(){
	  if(timer <= 0 && !endTimer) {
	  	writeTextToOutput('console','Time has run out, the bank fully scanned you, prepare for the police to come knocking... GAME OVER.');
	  	$('#chatMessege').prop('disabled','true')
	  	endTimer = true;
	  }     
      if(timer % 100 == 0 && timer != MAXTIME && !endTimer) {
      	writeTextToOutput('console','ALERT: you only have ' + timer + 'seconds left.')
      }
      if(startTimer && !endTimer) {
      	timer--;
      }
},1000);