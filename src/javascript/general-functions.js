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