var world = {
	"rooms":
		[
			{
				id: "room1",
				name: "Bedroom",
				description: "You are your in Bedroom. It consists of a terminal, and your bed. " + 
							 "Next to the bed an alarm clock is blinking. a Note on your hand in sharpie" + 
							 " reminds you that today is the day to hack the bank.",
				objects: ["terminal","bed","clock"],
				adjacentRooms: [{ 
								id: "room2",
								transitions: ["terminal"]
							}]
			},
			{
				id: "room2",
				name: "Terminal",
				description: "You are Now sitting at your CRK-150, " +
				 			 " you gotta move into cyberspace, the clock is running...",
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
				name: "Cyberspace",
				description: "Bright colorful waves wash over you as you enter cyberspace." +
							 " upon entering you find the ice-breaker that you loaded the pervious night." +
							 " You will need it to get past the seemingly impenterable ICE wall that" + 
							 " stands before you. behind that ice is the vault",
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
				description: "Upon using the russian icebreaker to get through that nasty ICE wall," +
							" you find yorself in a giant room full of drawers, these drawers correspond to " +
							" basic bank accounts, while these have money they are not what you are looking for." +
							" There is a door in the back of the room, no ICE, seems suspicious.",
				objects: ["drawers"],
				adjacentRooms: [
							{ 
								id: "room3",
								transitions: ["cyberspace"] 
							},
						]
			}
		]
}

