import world, room, functions, player


r1 = room.Room('a',"room1",[],['b'])
r2 = room.Room('b',"room2",[],['a','c'])
r3 = room.Room('c',"room3",[],['b'])

w = world.World()
w.addRoom(r1)
w.addRoom(r2)
w.addRoom(r3)

p = player.Player(r1)

p.printLocation()

p = w.move(p,'b')

p.printLocation()

p = w.move(p,'c')

p.printLocation()

p = w.move(p,'a')