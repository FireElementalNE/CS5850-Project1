var world = {
	"rooms":
		[
			{
				id: "room1",
				name: "Bedroom",
				description: "You are your in Bedroom. It consists of a terminal, and your bed. " + 
							 "Next to the bed an alarm clock is blinking.",
				objects: ["terminal","bed","clock"],
				adjacentRooms: [{ 
								id: "room2",
								transitions: ["terminal"]
							}]
			},
			{
				id: "room2",
				name: "Terminal",
				description: "You are Now sitting at your CRK-150, To move to cyberspace" +
				 			 "all you have to do is jackin... (move cyberspace)",
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
							 "upon entering you find the ice-breaker that you loaded the pervious night." +
							 "You will need it to get past the seemingly impenterable ICE wall that" + 
							 "stands before you.",
				objects: ["icebreaker"],
				adjacentRooms: [
							{ 
								id: "room2",
								transitions: ["terminal"] 
							}
						]
			}
		]
}