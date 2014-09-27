// rooms <span style=\"color:#8797F5\"></span>
// objects <span style=\"color:#F5F587\"></span>
var world = {
	"rooms":
		[
			{
				id: "room1",
				name: "bedroom",
				description: "You are your in <span style=\"color:#8797F5\">bedroom</span>. It consists of a terminal, and your <span style=\"color:#F5F587\">bed</span>. " + 
							 "Next to the bed an alarm <span style=\"color:#F5F587\">clock</span> is blinking. a Note on your hand in sharpie" + 
							 " reminds you that today is the day to hack the bank.",
				objects: ["terminal","bed","clock"],
				adjacentRooms: [{ 
								id: "room2",
								transitions: ["terminal"]
							}]
			},
			{
				id: "room2",
				name: "terminal",
				description: "You are Now sitting at your CRK-150, " +
				 			 " you gotta move into <span style=\"color:#8797F5\">cyberspace</span>, the clock is running...",
				objects: [],
				adjacentRooms: [
							{ 
								id: "room1",
								transitions: ["bedroom"] 
							},
							{ 
								id: "room3",
								transitions: ["cyberspace"] 
							}
						]
			},
			{
				id: "room3",
				name: "cyberspace",
				description: "Bright colorful waves wash over you as you enter cyberspace." +
							 " As soon as you deck in you feel the bank start to scan you, you have 5 minutes before the scan is complete, you had better hurry..." +
							 " upon entering you find the <span style=\"color:#F5F587\">icebreaker</span> that you loaded the pervious night." +
							 " You will need it to get past the seemingly impenterable ICE wall that" + 
							 " stands before you. behind that ice is the <span style=\"color:#8797F5\">vault</span>",
				objects: ["icebreaker"],
				adjacentRooms: [
							{ 
								id: "room2",
								transitions: ["terminal"] 
							},
							{ 
								id: "room4",
								transitions: ["vault"] 
							}
						]
			},
			{
				id: "room4",
				name: "vault",
				description: "You find yorself in a giant room full of <span style=\"color:#F5F587\">drawers</span>, these drawers correspond to " +
							" basic bank accounts, while these have money they are not what you are looking for. " +
							" There is a door to a <span style=\"color:#8797F5\">backroom</span>, no ICE, seems suspicious. Annother un-ICEd door also leads to the <span style=\"color:#8797F5\">left</span>",
				objects: ["drawers"],
				adjacentRooms: [
							{ 
								id: "room3",
								transitions: ["cyberspace"] 
							},
							{ 
								id: "room5",
								transitions: ["backroom"] 
							},
							{ 
								id: "room6",
								transitions: ["hallway"] 
							}
						]
			},
			{
				id: "room5",
				name: "backroom",
				description: "You knew it looked to good to be true, upon entering the room you are presented, with" +
							" a military grade <span style=\"color:#F5F587\">scanner</span> module that you must use to continue... how the hell are you going to" +
							" get past that?",
				objects: ["scanner"],
				adjacentRooms: [
							{ 
								id: "room4",
								transitions: ["vault"] 
							},
							{ 
								id: "room9",
								transitions: ["deposit"] 
							}
						]
			},
			{
				id: "room6",
				name: "hallway",
				description: "You find yourself in a long hallway. In front of you is the <span style=\"color:#8797F5\">lobby</span> behind you is the <span style=\"color:#8797F5\">vault</span>. A door " +
							" to the right leads to the employee <span style=\"color:#8797F5\">lounge</span>, that might be promising. There is a <span style=\"color:#F5F587\">picture</span> hanging on the wall.",
				objects: ["picture"],
				adjacentRooms: [
							{ 
								id: "room7",
								transitions: ["lobby"] 
							},
							{ 
								id: "room4",
								transitions: ["vault"] 
							},
							{ 
								id: "room8",
								transitions: ["lounge"] 
							}
						]
			},
			{
				id: "room7",
				name: "lobby",
				description: "You sneak through the door to the left. After peeking around a courner you see that you arre on the" +
				" behind annother <span style=\"color:#F5F587\">icewall</span> this one seperating you from the main lobby of the banking program, in the lobby patrons are bustling about" +
				" unaware of the intruder in their midst. Probobly shouldnt hang around here for too long... should probobly go back to the" +
				" <span style=\"color:#8797F5\">hallway</span>.",
				objects: ["icewall"],
				adjacentRooms: [
							{ 
								id: "room6",
								transitions: ["hallway"] 
							},
						]
			},
			{
				id: "room8",
				name: "lounge",
				description: "You enter the employee lounge, fortunatly some n00bies have left their <span style=\"color:#F5F587\">identifications</span> on the table, might need those." +
							" you also see a busted <span style=\"color:#F5F587\">hitscan</span> weapon and a <span style=\"color:#F5F587\">diagram</span>, not sure what it is. behind you is the" +
							" <span style=\"color:#8797F5\">hallway</span>.",
				objects: ["identifications","hitscan","diagram"],
				adjacentRooms: [
							{ 
								id: "room6",
								transitions: ["hallway"] 
							},
						]
			},
			{
				id: "room9",
				name: "deposit",
				description: "You enter the deposit room. You see your target.",
				objects: ["target"],
				adjacentRooms: [
							{ 
								id: "room5",
								transitions: ["backroom"] 
							},
						]
			}
		]
}

