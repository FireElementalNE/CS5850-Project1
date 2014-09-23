var world = {
	"rooms":
		[
			{
				id: "room1",
				name: "Bedroom",
				description: "Your Bedroom. It consists of a terminal, and your bed. Next to the bed an alarm clock is blinking.",
				objects: ["Terminal","Bed","Clock"],
				adjacentRooms: ["room2"]
			},
			{
				id: "room2",
				name: "Lobby Cyber",
				description: "",
				objects: ["a","b","c"],
				adjacentRooms: ["room2"]
			}
		]
}