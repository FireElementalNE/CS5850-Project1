var world = {
	"rooms":
		[
			{
				id: "room1",
				name: "Bedroom",
				description: "You are your in Bedroom. It consists of a terminal, and your bed. Next to the bed an alarm clock is blinking.",
				objects: ["Terminal","Bed","Clock"],
				adjacentRooms: [{ 
								id: "room2",
								transition: "terminal" 
							}]
			},
			{
				id: "room2",
				name: "Terminal",
				description: "You are Now sitting at your C",
				objects: ["a","b","c"],
				adjacentRooms: [{ 
								id: "room1",
								transition: "bedroom" 
							}]
			}
		]
}